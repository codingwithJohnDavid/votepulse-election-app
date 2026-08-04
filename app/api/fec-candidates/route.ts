import { NextRequest, NextResponse } from 'next/server'
import { CANDIDATES, US_STATES, type Candidate, type Party } from '@/lib/mock-data'
import { getEnrichment } from '@/lib/fec-enrichment'

// Cache for 24 hours at the edge
export const revalidate = 86400

const FEC_BASE = 'https://api.fec.gov/v1'
const API_KEY = process.env.FEC_API_KEY ?? ''

// ─── Party mapping ────────────────────────────────────────────────────────────

const PARTY_MAP: Record<string, Party> = {
  DEM: 'Democrat',
  REP: 'Republican',
  IND: 'Independent',
  GRE: 'Green',
  LIB: 'Libertarian',
  NNE: 'Independent',
  NPA: 'Independent',
  UNK: 'Independent',
  OTH: 'Independent',
}

const OFFICE_LABEL: Record<string, string> = {
  S: 'U.S. Senate',
  H: 'U.S. House of Representatives',
}

// ─── Name formatting ──────────────────────────────────────────────────────────
// FEC returns names as "LASTNAME, FIRSTNAME MIDDLE" — invert to "First Last"

function formatName(fecName: string): string {
  if (!fecName) return 'Unknown Candidate'
  const commaIdx = fecName.indexOf(',')
  let first: string
  let last: string
  if (commaIdx === -1) {
    first = ''
    last = fecName.trim()
  } else {
    last = fecName.slice(0, commaIdx).trim()
    first = fecName.slice(commaIdx + 1).trim()
  }
  const fullRaw = first ? `${first} ${last}` : last
  return fullRaw
    .toLowerCase()
    .split(/\s+/)
    .map((word) =>
      word.includes('-')
        ? word.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('-')
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(' ')
}

// ─── FEC fetch ────────────────────────────────────────────────────────────────

interface FECCandidate {
  candidate_id: string
  name: string
  party: string
  office: string
  office_full: string
  state: string
  district?: string
  incumbent_challenge?: string  // 'I' | 'C' | 'O'
}

async function fetchFECOffice(state: string, office: 'S' | 'H'): Promise<FECCandidate[]> {
  const params = new URLSearchParams({
    api_key: API_KEY,
    state,
    office,
    per_page: '100',
    sort: 'name',
  })

  // Try 2026 first, fall back to 2024 if no results yet filed for 2026
  for (const year of ['2026', '2024']) {
    params.set('election_year', year)
    try {
      const res = await fetch(`${FEC_BASE}/candidates/?${params}`, {
        next: { revalidate: 86400 },
      })
      if (!res.ok) {
        console.error(`[FEC] ${office}/${year} HTTP ${res.status} for ${state}`)
        continue
      }
      const json = await res.json()
      const results: FECCandidate[] = json?.results ?? []
      if (results.length > 0) return results
    } catch (err) {
      console.error(`[FEC] ${office}/${year} fetch error for ${state}:`, err)
    }
  }
  return []
}

// ─── Map FEC → app Candidate ──────────────────────────────────────────────────

function mapCandidate(fec: FECCandidate, stateName: string): Candidate {
  const partyCode = (fec.party ?? 'UNK').toUpperCase()
  const party = PARTY_MAP[partyCode] ?? 'Independent'
  const fullName = formatName(fec.name)
  const enrichment = getEnrichment(fullName, partyCode)

  const district =
    fec.district && fec.district !== '00'
      ? `District ${parseInt(fec.district, 10)}`
      : undefined

  const officeLabel = OFFICE_LABEL[fec.office] ?? fec.office_full ?? fec.office

  return {
    id: fec.candidate_id,
    name: fullName,
    party,
    office: officeLabel,
    state: stateName,
    stateCode: fec.state,
    district,
    imageUrl: enrichment.imageUrl,
    bannerColor: enrichment.bannerColor,
    bio: enrichment.bio,
    incumbent: fec.incumbent_challenge === 'I' || enrichment.incumbent,
    yearsExperience: enrichment.yearsExperience,
    website: enrichment.website,
    twitter: enrichment.twitter,
    keyIssues: enrichment.keyIssues,
    funders: enrichment.funders,
  }
}

// ─── Route Handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const stateCode = (searchParams.get('state') ?? 'FL').toUpperCase().slice(0, 2)
  const stateName = US_STATES.find((s) => s.code === stateCode)?.name ?? stateCode

  if (!API_KEY) {
    console.error('[FEC] FEC_API_KEY is not set — returning mock data')
    return NextResponse.json({
      candidates: CANDIDATES.filter((c) => c.stateCode === stateCode),
      source: 'mock-no-key',
      state: stateCode,
    })
  }

  try {
    // Fetch Senate + House in parallel
    const [senateRaw, houseRaw] = await Promise.all([
      fetchFECOffice(stateCode, 'S'),
      fetchFECOffice(stateCode, 'H'),
    ])

    const allFEC = [...senateRaw, ...houseRaw]

    // If FEC returned nothing, fall back to full mock data silently
    if (allFEC.length === 0) {
      console.log(`[FEC] No results for ${stateCode} — using mock fallback`)
      return NextResponse.json(
        {
          candidates: CANDIDATES.filter((c) => c.stateCode === stateCode),
          source: 'mock-empty',
          state: stateCode,
        },
        { headers: { 'Cache-Control': 'no-store' } }
      )
    }

    // Deduplicate by normalized name
    const seen = new Set<string>()
    const federal: Candidate[] = []
    for (const fec of allFEC) {
      const mapped = mapCandidate(fec, stateName)
      const key = mapped.name.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        federal.push(mapped)
      }
    }

    // Merge state-level races (Governor etc.) from mock — FEC only covers federal
    const stateLevelMock = CANDIDATES.filter(
      (c) =>
        c.stateCode === stateCode &&
        c.office !== 'U.S. Senate' &&
        c.office !== 'U.S. House of Representatives'
    )

    const candidates = [...federal, ...stateLevelMock]

    return NextResponse.json(
      { candidates, source: 'fec', state: stateCode, count: candidates.length },
      {
        headers: {
          'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
        },
      }
    )
  } catch (err) {
    console.error('[FEC] Unhandled route error:', err)
    // Always return something — never a blank candidates page
    return NextResponse.json(
      {
        candidates: CANDIDATES.filter((c) => c.stateCode === stateCode),
        source: 'mock-error',
        state: stateCode,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  }
}
