/**
 * fec-enrichment.ts
 *
 * The FEC API returns official filing data (name, party, office, district,
 * incumbent status) but no bios, avatars, key issues, or funders.
 * This file provides per-candidate enrichment keyed by normalized full name
 * ("first last" lowercase) so it works regardless of FEC candidate_id changes.
 *
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
  incumbent?: boolean
}

// ─── Enrichment map (keyed by "firstname lastname" lowercase) ─────────────────

const ENRICHMENT: Record<string, CandidateEnrichment> = {

  // ── Texas ─────────────────────────────────────────────────────────────────
  'ken paxton': {
    bio: 'Texas Attorney General since 2015 and Trump-endorsed Senate candidate, centering his campaign on border security, law enforcement, and conservative cultural issues. Paxton has aggressively sued the federal government dozens of times and describes himself as a fighter against the Washington establishment.',
    keyIssues: ['Border Security', 'Law Enforcement', 'Second Amendment', 'Energy Independence', 'Anti-Establishment'],
    funders: [
      { name: 'Texas Values Action PAC', amount: '$3.1M', type: 'PAC' },
      { name: 'Republican Senate Campaign Cmte', amount: '$2.4M', type: 'Party Committee' },
      { name: 'Oil & gas industry donors', amount: '$1.8M', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$980K', type: 'Small Donors' },
    ],
    website: 'https://kenpaxton.com',
    bannerColor: '#fee2e2',
    incumbent: false,
    yearsExperience: 22,
  },
  'james talarico': {
    bio: 'Texas State Representative and Presbyterian seminarian running on moral accountability and economic affordability, courting independents and moderate conservatives across the state.',
    keyIssues: ['Affordable Housing', 'Healthcare Access', 'Government Accountability', 'Public Education', 'Economic Fairness'],
    funders: [
      { name: 'Texas Democratic Party', amount: '$1.6M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$2.1M', type: 'Small Donors' },
      { name: 'Progressive advocacy coalitions', amount: '$880K', type: 'PAC' },
      { name: 'Education advocates', amount: '$540K', type: 'Individual' },
    ],
    website: 'https://jamestalarico.com',
    bannerColor: '#dbeafe',
    incumbent: false,
    yearsExperience: 8,
  },

  // ── Florida ───────────────────────────────────────────────────────────────
  'rick scott': {
    bio: 'Florida Senator and former two-term Governor seeking re-election, focused on fiscal conservatism, border security, and confronting China\'s economic and military influence.',
    keyIssues: ['Fiscal Conservatism', 'Border Security', 'National Security', 'Energy', 'Anti-China Policy'],
    funders: [
      { name: 'Republican Senate Campaign Cmte', amount: '$3.4M', type: 'Party Committee' },
      { name: 'Business industry donors', amount: '$2.8M', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.2M', type: 'Small Donors' },
      { name: 'Americans for Prosperity PAC', amount: '$990K', type: 'PAC' },
    ],
    website: 'https://rickscott.com',
    bannerColor: '#fee2e2',
    incumbent: true,
    yearsExperience: 18,
  },
  'debbie mucarsel-powell': {
    bio: 'Former U.S. Representative and the first South American-born member of Congress, challenging Rick Scott with a focus on gun safety, climate resilience, and protecting Social Security.',
    keyIssues: ['Gun Safety', 'Climate Change', 'Immigration', 'Healthcare', 'Democracy'],
    funders: [
      { name: 'Democratic Senatorial Campaign Cmte', amount: '$2.6M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.9M', type: 'Small Donors' },
      { name: 'Gun safety advocacy PACs', amount: '$1.1M', type: 'PAC' },
    ],
    website: 'https://debbieforfl.com',
    bannerColor: '#dbeafe',
    incumbent: false,
    yearsExperience: 12,
  },
  'cory mills': {
    bio: 'Incumbent U.S. Representative for Florida\'s 7th District, Army combat veteran and defense contractor, focused on national security, veterans\' issues, and the Second Amendment.',
    keyIssues: ['National Security', 'Veterans\' Affairs', 'Second Amendment', 'Border Security', 'Government Spending'],
    funders: [
      { name: 'National Republican Congressional Cmte', amount: '$890K', type: 'Party Committee' },
      { name: 'Defense industry donors', amount: '$720K', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$540K', type: 'Small Donors' },
    ],
    website: 'https://corymills.com',
    bannerColor: '#fee2e2',
    incumbent: true,
    yearsExperience: 4,
  },
  'karen green': {
    bio: 'Democratic challenger for Florida\'s 7th District, educator and community organizer running on affordable healthcare and education funding.',
    keyIssues: ['Public Education', 'Affordable Healthcare', 'Economic Opportunity', 'Environment', 'Voting Rights'],
    funders: [
      { name: 'Democratic Congressional Campaign Cmte', amount: '$620K', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$480K', type: 'Small Donors' },
      { name: 'Teachers unions', amount: '$310K', type: 'PAC' },
    ],
    website: 'https://example.com',
    bannerColor: '#dbeafe',
    incumbent: false,
    yearsExperience: 6,
  },

  // ── California ────────────────────────────────────────────────────────────
  'adam schiff': {
    bio: 'U.S. Representative and former House Intelligence Committee chair who led the first Trump impeachment, now serving a full Senate term after winning the 2024 special election.',
    keyIssues: ['Democracy & Rule of Law', 'National Security', 'Gun Safety', 'Climate Change', 'Healthcare'],
    funders: [
      { name: 'Democratic Senatorial Campaign Cmte', amount: '$4.2M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$3.8M', type: 'Small Donors' },
      { name: 'Tech industry donors', amount: '$1.6M', type: 'Individual' },
      { name: 'Environmental advocacy PACs', amount: '$820K', type: 'PAC' },
    ],
    website: 'https://adamschiff.com',
    bannerColor: '#dbeafe',
    incumbent: true,
    yearsExperience: 24,
  },
  'steve garvey': {
    bio: 'Former LA Dodgers first baseman and 2024 Republican Senate candidate, running on border security, public safety, and reducing California\'s cost of living.',
    keyIssues: ['Border Security', 'Public Safety', 'Cost of Living', 'Education', 'Economic Recovery'],
    funders: [
      { name: 'Republican Senate Campaign Cmte', amount: '$2.1M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.4M', type: 'Small Donors' },
      { name: 'Business industry donors', amount: '$980K', type: 'Individual' },
    ],
    website: 'https://garveyforsenate.com',
    bannerColor: '#fee2e2',
    incumbent: false,
    yearsExperience: 4,
  },
}

// ─── Party colour defaults ────────────────────────────────────────────────────

const PARTY_COLORS: Record<string, { bg: string; banner: string }> = {
  DEM: { bg: 'b6e3f4', banner: '#dbeafe' },
  REP: { bg: 'fee2e2', banner: '#fee2e2' },
  IND: { bg: 'ede9fe', banner: '#ede9fe' },
  GRE: { bg: 'd1fae5', banner: '#d1fae5' },
  LIB: { bg: 'fef9c3', banner: '#fef9c3' },
}

const DEFAULT_ISSUES: Record<string, string[]> = {
  DEM: ['Healthcare Access', 'Climate Change', 'Voting Rights', 'Economic Equity', 'Education'],
  REP: ['Border Security', 'Fiscal Conservatism', 'Second Amendment', 'Energy Independence', 'Deregulation'],
  IND: ['Government Reform', 'Transparency', 'Fiscal Responsibility', 'Local Priorities', 'Term Limits'],
  GRE: ['Climate Action', 'Renewable Energy', 'Social Justice', 'Campaign Finance Reform', 'Healthcare for All'],
  LIB: ['Individual Liberty', 'Limited Government', 'Free Markets', 'Non-Interventionism', 'Drug Policy Reform'],
}

// ─── Exported helper ──────────────────────────────────────────────────────────

export function getEnrichment(
  fullName: string,   // normalized "First Last"
  fecParty: string,  // FEC party code e.g. "DEM", "REP"
): Required<CandidateEnrichment> {
  const key = fullName.toLowerCase().trim()
  const stored = ENRICHMENT[key] ?? {}
  const colors = PARTY_COLORS[fecParty] ?? PARTY_COLORS['IND']
  const seed = encodeURIComponent(fullName.replace(/\s+/g, ''))

  return {
    bio: stored.bio ?? `${fullName} is a 2026 federal candidate for office.`,
    keyIssues: stored.keyIssues ?? DEFAULT_ISSUES[fecParty] ?? ['Public Service', 'Community'],
    funders: stored.funders ?? [],
    imageUrl: stored.imageUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=${colors.bg}`,
    bannerColor: stored.bannerColor ?? colors.banner,
    yearsExperience: stored.yearsExperience ?? 0,
    website: stored.website ?? '',
    twitter: stored.twitter ?? '',
    incumbent: stored.incumbent ?? false,
  }
}
