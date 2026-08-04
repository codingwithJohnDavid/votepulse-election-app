import { NextRequest, NextResponse } from 'next/server'
import type { Candidate, Party } from '@/lib/mock-data'
import { getEnrichment } from '@/lib/fec-enrichment'

// Revalidate once every 24 hours
export const revalidate = 86400

const FEC_BASE = 'https://api.fec.gov/v1'
const API_KEY = process.env.FEC_API_KEY ?? ''

// Map FEC party codes → app Party type
const PARTY_MAP: Record<string, Party> = {
  DEM: 'Democrat',
  REP: 'Republican',
  IND: 'Independent',
  GRE: 'Green',
  LIB: 'Libertarian',
  NNE: 'Independent',
  UNK: 'Independent',
}

// Map FEC office codes → readable labels
const OFFICE_MAP: Record<string, string> = {
  S: 'U.S. Senate',
  H: 'U.S. House of Representatives',
  P: 'President',
}

interface FECCandidate {
  candidate_id: string
  name: string
  party: string
  office: string
  office_full: string
  state: string
  district?: string
  incumbent_challenge?: string   // 'I' | 'C' | 'O'
  election_years?: number[]
  active_through?: number
}

async function fetchCandidates(state: string, office: string): Promise<FECCandidate[]> {
  const params = new URLSearchParams({
    api_key: API_KEY,
    state,
    office,
    per_page: '100',
    sort: 'name',
  })

  // Try 2026 first, fall back to most recent if empty
  for (const year of ['2026', '2024', '2022']) {
    params.set('election_year', year)
    const url = `${FEC_BASE}/candidates/?${params}`
    try {
      const res = await fetch(url, { next: { revalidate: 86400 } })
      if (!res.ok) continue
      const data = await res.json()
      const results: FECCandidate[] = data?.results ?? []
      if (results.length > 0) return results
    } catch {
      continue
    }
  }
  return []
}

function mapFECCandidate(fec: FECCandidate, stateFullName: string): Candidate {
  const partyCode = fec.party?.toUpperCase() ?? 'IND'
  const party = PARTY_MAP[partyCode] ?? 'Independent'
  const enrichment = getEnrichment(fec.candidate_id, partyCode, fec.name)

  // FEC names are ALL CAPS — convert to Title Case
  const name = fec.name
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())

  const office = OFFICE_MAP[fec.office] ?? fec.office_full ?? fec.office
  const district = fec.district && fec.district !== '00'
    ? `District ${parseInt(fec.district, 10)}`
    : undefined

  return {
    id: fec.candidate_id,
    name,
    party,
    office,
    state: stateFullName,
    stateCode: fec.state,
    district,
    imageUrl: enrichment.imageUrl,
    bannerColor: enrichment.bannerColor,
    bio: enrichment.bio,
    incumbent: fec.incumbent_challenge === 'I',
    yearsExperience: enrichment.yearsExperience,
    website: enrichment.website,
    twitter: enrichment.twitter,
    keyIssues: enrichment.keyIssues,
    funders: enrichment.funders,
  }
}

const STATE_NAMES: Record<string, string> = {
  FL: 'Florida',
  TX: 'Texas',
  CA: 'California',
  NY: 'New York',
}

// Supported states and offices for Phase 1
const PHASE1_STATES = ['FL', 'TX', 'CA', 'NY']
const OFFICES = ['S', 'H']  // Senate + House (federal races)

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const stateParam = searchParams.get('state')?.toUpperCase() ?? 'FL'

  // Validate state
  const state = PHASE1_STATES.includes(stateParam) ? stateParam : 'FL'
  const stateName = STATE_NAMES[state]

  if (!API_KEY) {
    return NextResponse.json({ error: 'FEC_API_KEY not configured', candidates: [] }, { status: 500 })
  }

  try {
    // Fetch Senate + House in parallel
    const [senateRaw, houseRaw] = await Promise.all(
      OFFICES.map((office) => fetchCandidates(state, office))
    )

    const all = [...senateRaw, ...houseRaw]

    if (all.length === 0) {
      return NextResponse.json({ candidates: [], source: 'fec', state, fallback: true })
    }

    const candidates: Candidate[] = all.map((fec) => mapFECCandidate(fec, stateName))

    return NextResponse.json({
      candidates,
      source: 'fec',
      state,
      count: candidates.length,
      fallback: false,
    })
  } catch (err) {
    console.error('[v0] FEC API error:', err)
    return NextResponse.json({ error: 'FEC fetch failed', candidates: [], fallback: true }, { status: 500 })
  }
}
