/**
 * fec-enrichment.ts
 *
 * The FEC API returns official filing data (name, party, office, district,
 * incumbent status) but no bios, avatars, key issues, or funders.
 * This file provides per-candidate enrichment keyed by FEC candidate_id.
 * For candidates with no enrichment entry, sensible defaults are generated
 * automatically so the app never shows a blank card.
 */

import type { CandidateFunder } from './mock-data'

export interface CandidateEnrichment {
  bio?: string
  keyIssues?: string[]
  funders?: CandidateFunder[]
  imageUrl?: string
  bannerColor?: string
  yearsExperience?: number
  website?: string
  twitter?: string
}

// Keyed by FEC candidate_id (e.g. "S4FL00040")
const ENRICHMENT: Record<string, CandidateEnrichment> = {}

// ─── Defaults ────────────────────────────────────────────────────────────────

const PARTY_COLORS: Record<string, { bg: string; banner: string }> = {
  DEM: { bg: 'b6e3f4', banner: '#dbeafe' },
  REP: { bg: 'fee2e2', banner: '#fee2e2' },
  IND: { bg: 'ede9fe', banner: '#ede9fe' },
  GRE: { bg: 'd1fae5', banner: '#d1fae5' },
  LIB: { bg: 'fef9c3', banner: '#fef9c3' },
}

export function getEnrichment(
  candidateId: string,
  party: string,
  name: string,
): Required<CandidateEnrichment> {
  const stored = ENRICHMENT[candidateId] ?? {}
  const colors = PARTY_COLORS[party] ?? PARTY_COLORS['IND']
  const seed = encodeURIComponent(name.replace(/\s+/g, ''))

  return {
    bio: stored.bio ?? `${name} is a candidate for office in the 2026 midterm elections.`,
    keyIssues: stored.keyIssues ?? ['Economic Policy', 'Public Safety', 'Healthcare', 'Education', 'Infrastructure'],
    funders: stored.funders ?? [],
    imageUrl: stored.imageUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=${colors.bg}`,
    bannerColor: stored.bannerColor ?? colors.banner,
    yearsExperience: stored.yearsExperience ?? 0,
    website: stored.website ?? '',
    twitter: stored.twitter ?? '',
  }
}
