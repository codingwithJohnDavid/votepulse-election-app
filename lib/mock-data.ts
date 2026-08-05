// ─── Types ─────────────────────────────────────────────────────────────────

export type Party = 'Democrat' | 'Republican' | 'Independent' | 'Green' | 'Libertarian'

export interface CandidateFunder {
  name: string          // donor name or PAC name
  amount: string        // formatted e.g. "$2.4M"
  type: 'PAC' | 'Individual' | 'Small Donors' | 'Party Committee' | 'Corporate'
}

export interface Candidate {
  id: string
  name: string
  party: Party
  office: string          // e.g. "U.S. Senate"
  state: string           // full state name
  stateCode: string       // 2-letter code
  district?: string       // e.g. "District 7" (House) or null (Senate/Gov)
  imageUrl: string
  bannerColor: string     // Tailwind background class used for card banner
  bio: string
  incumbent: boolean
  yearsExperience: number
  website: string
  twitter?: string
  instagram?: string
  keyIssues: string[]
  funders?: CandidateFunder[]
}

export interface Race {
  id: string
  office: string
  stateCode: string
  district?: string
  label: string           // short display label e.g. "Senate" or "House-7"
}

export interface CandidateResult {
  candidateId: string
  name: string
  lastName: string
  party: Party
  count: number
  percent: number
}

export interface DemographicBreakdown {
  label: string
  count: number
  candidates: { name: string; lastName: string; party: Party; percent: number }[]
}

export interface RaceResult {
  raceId: string
  raceLabel: string      // "Senate" or "House – District 7"
  office: string
  stateCode: string
  totalResponses: number
  candidates: CandidateResult[]
  byAge: DemographicBreakdown[]
  byRace: DemographicBreakdown[]
  byReligion: DemographicBreakdown[]
  byGender: DemographicBreakdown[]
  byPolitical: DemographicBreakdown[]
}

/** @deprecated use RACE_RESULTS instead */
export interface ResultsData {
  questionId: string
  question: string
  yesCount: number
  noCount: number
  totalResponses: number
  byAge: DemographicBreakdown[]
  byRace: DemographicBreakdown[]
  byReligion: DemographicBreakdown[]
  byGender: DemographicBreakdown[]
  byIncome: DemographicBreakdown[]
  byEducation: DemographicBreakdown[]
}

// ─── States ────────────────────────────────────────────────────────────────

export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' },
  { code: 'DC', name: 'Washington D.C.' },
]

// ─── Candidates ─────────────────────────────────────────────────────────────

export const CANDIDATES: Candidate[] = [
  // ── Florida ── (Source: FEC, Ballotpedia — August 2026)
  {
    id: 'fl-sen-1',
    name: 'Ashley Moody',
    party: 'Republican',
    office: 'U.S. Senate',
    state: 'Florida',
    stateCode: 'FL',
    imageUrl: '/candidates/ashley-moody.png',
    bannerColor: '#fee2e2',
    bio: 'Appointed U.S. Senator from Florida and former Florida Attorney General, appointed to the Senate seat vacated by Marco Rubio in January 2025. As AG, Moody led major fentanyl trafficking prosecutions and joined multistate suits on immigration and tech regulation. She is running for a full six-year term in November 2026 as the clear Republican frontrunner.',
    incumbent: true,
    yearsExperience: 16,
    website: 'https://www.ashleymoody.com',
    twitter: '@AshleyMoody',
    keyIssues: ['Border Security', 'Fentanyl Enforcement', 'Law & Order', 'Veterans Affairs', 'Lower Taxes'],
    funders: [
      { name: 'Republican Senate Campaign Cmte', amount: '$3.2M', type: 'Party Committee' },
      { name: 'Florida Republican Party', amount: '$1.8M', type: 'Party Committee' },
      { name: 'Law enforcement advocacy PACs', amount: '$920K', type: 'PAC' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.4M', type: 'Small Donors' },
    ],
  },
  {
    id: 'fl-sen-2',
    name: 'Angie Nixon',
    party: 'Democrat',
    office: 'U.S. Senate',
    state: 'Florida',
    stateCode: 'FL',
    imageUrl: '/candidates/angie-nixon.png',
    bannerColor: '#dbeafe',
    bio: 'Florida State Representative from Jacksonville and community organizer running in the August 18 Democratic primary. Nixon has championed Medicaid expansion, criminal justice reform, and voting rights in the state legislature. Polling shows her as a competitive candidate in hypothetical matchups against incumbent Ashley Moody.',
    incumbent: false,
    yearsExperience: 8,
    website: 'https://www.angienixon.com',
    twitter: '@AngieNixon',
    keyIssues: ['Healthcare Access', 'Criminal Justice Reform', 'Voting Rights', 'Affordable Housing', 'Education Funding'],
    funders: [
      { name: 'Florida Democratic Party', amount: '$1.4M', type: 'Party Committee' },
      { name: 'Progressive advocacy coalitions', amount: '$860K', type: 'PAC' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.9M', type: 'Small Donors' },
      { name: 'Labor union PACs', amount: '$640K', type: 'PAC' },
    ],
  },
  {
    id: 'fl-gov-1',
    name: 'Byron Donalds',
    party: 'Republican',
    office: 'Governor',
    state: 'Florida',
    stateCode: 'FL',
    imageUrl: '/candidates/byron-donalds.png',
    bannerColor: '#fee2e2',
    bio: 'U.S. Representative from Naples and Trump-endorsed candidate for Florida Governor. Donalds has served in Congress since 2021 and was a finalist in the January 2023 Speaker of the House vote. He campaigns on border enforcement, school choice, and reversing what he calls the "Bidenification" of Florida\'s economy. He is the frontrunner in the August 18 Republican primary.',
    incumbent: false,
    yearsExperience: 10,
    website: 'https://www.byrondonalds.com',
    twitter: '@ByronDonalds',
    keyIssues: ['Border Security', 'School Choice', 'Lower Taxes', 'Energy Independence', 'Government Accountability'],
    funders: [
      { name: 'Florida Republican Party', amount: '$4.1M', type: 'Party Committee' },
      { name: 'Trump-aligned PACs', amount: '$3.6M', type: 'PAC' },
      { name: 'Business and real estate donors', amount: '$2.2M', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.7M', type: 'Small Donors' },
    ],
  },
  {
    id: 'fl-gov-2',
    name: 'David Jolly',
    party: 'Democrat',
    office: 'Governor',
    state: 'Florida',
    stateCode: 'FL',
    imageUrl: '/candidates/david-jolly.png',
    bannerColor: '#dbeafe',
    bio: 'Former U.S. Representative from Pinellas County and onetime Republican turned independent, now running as a Democrat for Florida Governor. Jolly is known for his bipartisan credibility, frequent national media appearances, and outspoken criticism of Trump-era GOP politics. His campaign focuses on restoring democratic norms, expanding healthcare, and rebuilding Florida\'s hurricane-battered insurance market.',
    incumbent: false,
    yearsExperience: 12,
    website: 'https://www.davidjolly.com',
    twitter: '@DavidJollyFL',
    keyIssues: ['Democratic Norms', 'Healthcare Access', 'Property Insurance Reform', 'Climate Resilience', 'Public Education'],
    funders: [
      { name: 'Florida Democratic Party', amount: '$2.3M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$2.8M', type: 'Small Donors' },
      { name: 'Environmental advocacy PACs', amount: '$1.1M', type: 'PAC' },
      { name: 'Healthcare industry donors', amount: '$880K', type: 'Individual' },
    ],
  },
  {
    id: 'fl-house-7-1',
    name: 'Cory Mills',
    party: 'Republican',
    office: 'U.S. House of Representatives',
    state: 'Florida',
    stateCode: 'FL',
    district: 'District 7',
    imageUrl: '/candidates/cory-mills.png',
    bannerColor: '#fee2e2',
    bio: 'Incumbent U.S. Representative for Florida\'s 7th Congressional District, first elected in 2022. Mills is a combat veteran and former defense contractor who sits on the House Armed Services Committee. He is running for re-election in the August 18 Republican primary and is known for personally leading the evacuation of American citizens from Sudan in 2023.',
    incumbent: true,
    yearsExperience: 6,
    website: 'https://www.corymills.com',
    twitter: '@CoryMillsFL',
    keyIssues: ['Veterans Affairs', 'National Defense', 'Border Security', 'Second Amendment', 'Energy Independence'],
    funders: [
      { name: 'Republican National Committee', amount: '$980K', type: 'Party Committee' },
      { name: 'Defense industry donors', amount: '$740K', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$620K', type: 'Small Donors' },
      { name: 'NRA Political Victory Fund', amount: '$290K', type: 'PAC' },
    ],
  },
  {
    id: 'fl-house-7-2',
    name: 'Alan Grayson',
    party: 'Democrat',
    office: 'U.S. House of Representatives',
    state: 'Florida',
    stateCode: 'FL',
    district: 'District 7',
    imageUrl: '/candidates/alan-grayson.png',
    bannerColor: '#dbeafe',
    bio: 'Former two-term Congressman from Orlando running to reclaim Florida\'s 7th Congressional District. Grayson served in the House from 2009–2011 and 2013–2017, where he was known for sharp progressive rhetoric and his work on the Affordable Care Act. His campaign centers on healthcare access, veteran services, and restoring checks and balances in Washington.',
    incumbent: false,
    yearsExperience: 14,
    website: 'https://www.graysonforcongress.com',
    twitter: '@AlanGrayson',
    keyIssues: ['Healthcare Access', 'Veterans Services', 'Economic Fairness', 'Government Accountability', 'Education Funding'],
    funders: [
      { name: 'Florida Democratic Party', amount: '$680K', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.1M', type: 'Small Donors' },
      { name: 'Progressive advocacy coalitions', amount: '$520K', type: 'PAC' },
      { name: 'Labor union PACs', amount: '$390K', type: 'PAC' },
    ],
  },

  // ── Texas ──
  {
    id: 'tx-sen-1',
    name: 'Ken Paxton',
    party: 'Republican',
    office: 'U.S. Senate',
    state: 'Texas',
    stateCode: 'TX',
    imageUrl: '/candidates/ken-paxton.png',
    bannerColor: '#fee2e2',
    bio: 'Texas Attorney General since 2015 and Trump-endorsed Senate candidate, centering his campaign on border security, law enforcement, and conservative cultural issues. Paxton has aggressively sued the Biden and Biden-era federal government dozens of times and describes himself as a fighter against the Washington establishment.',
    incumbent: false,
    yearsExperience: 22,
    website: 'https://kenpaxton.com',
    keyIssues: ['Border Security', 'Law Enforcement', 'Second Amendment', 'Energy Independence', 'Anti-Establishment'],
    funders: [
      { name: 'Texas Values Action PAC', amount: '$3.1M', type: 'PAC' },
      { name: 'Republican Senate Campaign Cmte', amount: '$2.4M', type: 'Party Committee' },
      { name: 'Oil & gas industry donors', amount: '$1.8M', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$980K', type: 'Small Donors' },
    ],
  },
  {
    id: 'tx-sen-2',
    name: 'James Talarico',
    party: 'Democrat',
    office: 'U.S. Senate',
    state: 'Texas',
    stateCode: 'TX',
    imageUrl: '/candidates/james-talarico.png',
    bannerColor: '#dbeafe',
    bio: 'Texas State Representative and Presbyterian seminarian running on a message of moral accountability and economic affordability. Talarico has made Paxton\'s corruption allegations a centerpiece of his campaign while courting independents, moderate conservatives, and Black voters across the state.',
    incumbent: false,
    yearsExperience: 8,
    website: 'https://jamestalarico.com',
    keyIssues: ['Affordable Housing', 'Healthcare Access', 'Government Accountability', 'Public Education', 'Economic Fairness'],
    funders: [
      { name: 'Texas Democratic Party', amount: '$1.6M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$2.1M', type: 'Small Donors' },
      { name: 'Progressive advocacy coalitions', amount: '$880K', type: 'PAC' },
      { name: 'Education advocates', amount: '$540K', type: 'Individual' },
    ],
  },
  {
    id: 'tx-gov-1',
    name: 'Greg Abbott',
    party: 'Republican',
    office: 'Governor',
    state: 'Texas',
    stateCode: 'TX',
    imageUrl: '/candidates/greg-abbott.png',
    bannerColor: '#fee2e2',
    bio: 'Incumbent Governor of Texas since 2015 seeking a fourth term. Abbott has prioritized border security operations including Operation Lone Star, signed major school choice legislation, and overseen record state budget surpluses driven by energy revenues. He previously served as Texas Attorney General for 12 years.',
    incumbent: true,
    yearsExperience: 28,
    website: 'https://gregabbott.com',
    keyIssues: ['Border Security', 'School Choice', 'Energy Independence', 'Economic Development', 'Deregulation'],
    funders: [
      { name: 'Texas Republican Party', amount: '$4.2M', type: 'Party Committee' },
      { name: 'Energy industry donors', amount: '$3.8M', type: 'Individual' },
      { name: 'Texas Business PAC', amount: '$2.1M', type: 'PAC' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.3M', type: 'Small Donors' },
    ],
  },
  {
    id: 'tx-gov-2',
    name: 'Gina Hinojosa',
    party: 'Democrat',
    office: 'Governor',
    state: 'Texas',
    stateCode: 'TX',
    imageUrl: '/candidates/gina-hinojosa.png',
    bannerColor: '#dbeafe',
    bio: 'Texas State Representative from Austin and civil rights attorney challenging Governor Abbott. Hinojosa has focused her campaign on reproductive rights, public school funding, and expanding Medicaid. She is the first Latina to seek the Democratic gubernatorial nomination in Texas.',
    incumbent: false,
    yearsExperience: 10,
    website: 'https://ginahinojosa.com',
    keyIssues: ['Reproductive Rights', 'Public Education Funding', 'Medicaid Expansion', 'Voting Rights', 'Criminal Justice Reform'],
    funders: [
      { name: 'Texas Democratic Party', amount: '$1.9M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.7M', type: 'Small Donors' },
      { name: 'Reproductive rights coalitions', amount: '$1.1M', type: 'PAC' },
      { name: 'Trial lawyers association', amount: '$620K', type: 'Individual' },
    ],
  },

  // ── California — November 3, 2026 (Source: Ballotpedia) ──
  {
    id: 'ca-gov-1',
    name: 'Xavier Becerra',
    party: 'Democrat',
    office: 'Governor',
    state: 'California',
    stateCode: 'CA',
    imageUrl: '/candidates/xavier-becerra.jpg',
    bannerColor: '#dbeafe',
    bio: 'Former U.S. Secretary of Health and Human Services under President Biden and former California Attorney General. Becerra served 24 years in Congress before becoming AG in 2017, where he filed over 100 lawsuits against the Trump administration. His gubernatorial campaign emphasizes expanding healthcare access, protecting reproductive rights, and continuing California\'s climate leadership.',
    incumbent: false,
    yearsExperience: 32,
    website: 'https://xavierbecerra.com',
    keyIssues: ['Healthcare Access', 'Reproductive Rights', 'Climate Policy', 'Consumer Protection', 'Housing Affordability'],
    funders: [
      { name: 'California Democratic Party', amount: '$3.4M', type: 'Party Committee' },
      { name: 'Healthcare industry donors', amount: '$2.1M', type: 'Individual' },
      { name: 'Environmental advocacy PACs', amount: '$1.3M', type: 'PAC' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.8M', type: 'Small Donors' },
    ],
  },
  {
    id: 'ca-gov-2',
    name: 'Steve Hilton',
    party: 'Republican',
    office: 'Governor',
    state: 'California',
    stateCode: 'CA',
    imageUrl: '/candidates/steve-hilton.jpg',
    bannerColor: '#fee2e2',
    bio: 'Former Fox News host, Trump-endorsed candidate, and ex-British Conservative Party strategist. Hilton campaigns on ending single-party Democratic rule in California, dramatically cutting state spending and regulations, eliminating income tax on the first $100,000 of earnings, and cracking down on homelessness and crime. He argues California\'s progressive governance has driven out businesses and middle-class families.',
    incumbent: false,
    yearsExperience: 6,
    website: 'https://stevehiltonforgovernor.com',
    keyIssues: ['Tax Cuts', 'Deregulation', 'Homelessness', 'Crime Reduction', 'Fiscal Conservatism'],
    funders: [
      { name: 'California Republican Party', amount: '$1.8M', type: 'Party Committee' },
      { name: 'Trump-aligned PACs', amount: '$2.4M', type: 'PAC' },
      { name: 'Business and real estate donors', amount: '$1.6M', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.1M', type: 'Small Donors' },
    ],
  },
  {
    id: 'ca-ag-1',
    name: 'Rob Bonta',
    party: 'Democrat',
    office: 'Attorney General',
    state: 'California',
    stateCode: 'CA',
    imageUrl: '/candidates/rob-bonta.jpg',
    bannerColor: '#dbeafe',
    bio: 'Incumbent California Attorney General, appointed by Governor Newsom in 2021 and elected in 2022. Bonta is the first Filipino American to serve as California AG. He has focused on enforcing state housing laws against non-compliant cities, protecting democratic institutions, filing over 50 lawsuits against the Trump administration\'s federal policies, and advancing criminal justice reforms.',
    incumbent: true,
    yearsExperience: 14,
    website: 'https://robbonta.com',
    keyIssues: ['Democracy Protection', 'Housing Law Enforcement', 'Criminal Justice Reform', 'Consumer Protection', 'Civil Rights'],
    funders: [
      { name: 'California Democratic Party', amount: '$2.0M', type: 'Party Committee' },
      { name: 'Trial lawyers association', amount: '$1.4M', type: 'Individual' },
      { name: 'Labor unions', amount: '$980K', type: 'PAC' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.1M', type: 'Small Donors' },
    ],
  },
  {
    id: 'ca-ag-2',
    name: 'Michael Gates',
    party: 'Republican',
    office: 'Attorney General',
    state: 'California',
    stateCode: 'CA',
    imageUrl: '/candidates/michael-gates.png',
    bannerColor: '#fee2e2',
    bio: 'Former Huntington Beach City Attorney and brief Trump DOJ appointee, running on a law-and-order platform. Gates prioritizes implementing Proposition 36\'s tougher drug and theft penalties, investigating state government waste and fraud, reinforcing parental rights in schools, and pushing back against state housing mandates on local governments. He gained national attention filing legal challenges to state vaccine and housing laws.',
    incumbent: false,
    yearsExperience: 18,
    website: 'https://www.gates4ag.com',
    keyIssues: ['Law Enforcement', 'Proposition 36 Implementation', 'Government Fraud', 'Parental Rights', 'Local Government Autonomy'],
    funders: [
      { name: 'California Republican Party', amount: '$1.2M', type: 'Party Committee' },
      { name: 'Law enforcement associations', amount: '$860K', type: 'PAC' },
      { name: 'Business coalition donors', amount: '$740K', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$580K', type: 'Small Donors' },
    ],
  },

  // ── New York ── (Source: Ballotpedia, campaign websites — August 2026)
  {
    id: 'ny-gov-1',
    name: 'Kathy Hochul',
    party: 'Democrat',
    office: 'Governor',
    state: 'New York',
    stateCode: 'NY',
    imageUrl: '/candidates/kathy-hochul.png',
    bannerColor: '#dbeafe',
    bio: 'Incumbent Governor of New York, the first woman to hold the office, having assumed the role in August 2021 following Andrew Cuomo\'s resignation and winning a full term in 2022. Hochul has focused her administration on housing production, economic development, and a major MTA capital investment plan. She is seeking her second full term against Republican Nassau County Executive Bruce Blakeman.',
    incumbent: true,
    yearsExperience: 18,
    website: 'https://www.kathyhochul.com',
    twitter: '@KathyHochul',
    keyIssues: ['Housing Production', 'Public Transit', 'Economic Development', 'Reproductive Rights', 'Public Safety'],
    funders: [
      { name: 'New York Democratic Party', amount: '$4.8M', type: 'Party Committee' },
      { name: 'Real estate and business donors', amount: '$3.6M', type: 'Individual' },
      { name: 'Labor union PACs', amount: '$2.1M', type: 'PAC' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.9M', type: 'Small Donors' },
    ],
  },
  {
    id: 'ny-gov-2',
    name: 'Bruce Blakeman',
    party: 'Republican',
    office: 'Governor',
    state: 'New York',
    stateCode: 'NY',
    imageUrl: '/candidates/bruce-blakeman.png',
    bannerColor: '#fee2e2',
    bio: 'Nassau County Executive since 2022 and Republican nominee for New York Governor. Blakeman has made crime, illegal immigration, and New York City\'s handling of migrants central themes of his campaign. He has sued the state over gun licensing laws and positioned himself as a law-and-order conservative challenging what he calls Albany\'s failed Democratic leadership.',
    incumbent: false,
    yearsExperience: 10,
    website: 'https://www.blakemanfornewyork.com',
    twitter: '@BruceBlakeman',
    keyIssues: ['Public Safety', 'Immigration Enforcement', 'Lower Taxes', 'School Choice', 'Second Amendment'],
    funders: [
      { name: 'New York Republican Party', amount: '$2.4M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.6M', type: 'Small Donors' },
      { name: 'Business coalition donors', amount: '$1.8M', type: 'Individual' },
      { name: 'Law enforcement PACs', amount: '$780K', type: 'PAC' },
    ],
  },
]

// ─── Races per state ─────────────────────────────────────────────────────────

export const RACES_BY_STATE: Record<string, Race[]> = {
  FL: [
    { id: 'fl-sen', office: 'U.S. Senate', stateCode: 'FL', label: 'Senate' },
    { id: 'fl-gov', office: 'Governor', stateCode: 'FL', label: 'Governor' },
    { id: 'fl-house-7', office: 'U.S. House of Representatives', stateCode: 'FL', district: 'District 7', label: 'House-7' },
  ],
  TX: [
    { id: 'tx-sen', office: 'U.S. Senate', stateCode: 'TX', label: 'Senate' },
    { id: 'tx-gov', office: 'Governor', stateCode: 'TX', label: 'Governor' },
  ],
  CA: [
    { id: 'ca-gov', office: 'Governor', stateCode: 'CA', label: 'Governor' },
    { id: 'ca-ag',  office: 'Attorney General', stateCode: 'CA', label: 'Atty. General' },
  ],
  NY: [
    { id: 'ny-gov', office: 'Governor', stateCode: 'NY', label: 'Governor' },
  ],
}

export function getCandidatesForRace(raceId: string): Candidate[] {
  return CANDIDATES.filter((c) => {
    const race = Object.values(RACES_BY_STATE)
      .flat()
      .find((r) => r.id === raceId)
    if (!race) return false
    return (
      c.stateCode === race.stateCode &&
      c.office === race.office &&
      (race.district ? c.district === race.district : !c.district)
    )
  })
}

// ─── Results mock data ────────────────────────────────────────────────────────

export const RESULTS_DATA: ResultsData = {
  questionId: 'q-climate-2026',
  question: 'Should Congress pass a federal climate action bill before the 2026 midterms?',
  yesCount: 3847,
  noCount: 2956,
  totalResponses: 6803,
  byAge: [
    { label: '18–24', yesPercent: 72, noPercent: 28, count: 1102 },
    { label: '25–34', yesPercent: 65, noPercent: 35, count: 1488 },
    { label: '35–44', yesPercent: 58, noPercent: 42, count: 1344 },
    { label: '45–54', yesPercent: 51, noPercent: 49, count: 1220 },
    { label: '55–64', yesPercent: 44, noPercent: 56, count: 980 },
    { label: '65+',   yesPercent: 38, noPercent: 62, count: 669 },
  ],
  byRace: [
    { label: 'White',              yesPercent: 50, noPercent: 50, count: 2891 },
    { label: 'Black / African Am.', yesPercent: 71, noPercent: 29, count: 1134 },
    { label: 'Hispanic / Latino',  yesPercent: 67, noPercent: 33, count: 1022 },
    { label: 'Asian / Pacific Is.', yesPercent: 69, noPercent: 31, count: 501 },
    { label: 'Multiracial',        yesPercent: 63, noPercent: 37, count: 255 },
  ],
  byReligion: [
    { label: 'Christian',        yesPercent: 47, noPercent: 53, count: 2720 },
    { label: 'Catholic',         yesPercent: 54, noPercent: 46, count: 980 },
    { label: 'Jewish',           yesPercent: 68, noPercent: 32, count: 410 },
    { label: 'Muslim',           yesPercent: 70, noPercent: 30, count: 330 },
    { label: 'Non-religious',    yesPercent: 74, noPercent: 26, count: 1363 },
  ],
  byGender: [
    { label: 'Female',           yesPercent: 62, noPercent: 38, count: 3280 },
    { label: 'Male',             yesPercent: 51, noPercent: 49, count: 3120 },
    { label: 'Non-binary / Other', yesPercent: 76, noPercent: 24, count: 403 },
  ],
  byIncome: [
    { label: 'Under $30K',       yesPercent: 64, noPercent: 36, count: 890 },
    { label: '$30K–$60K',        yesPercent: 60, noPercent: 40, count: 1450 },
    { label: '$60K–$100K',       yesPercent: 57, noPercent: 43, count: 1890 },
    { label: '$100K–$150K',      yesPercent: 52, noPercent: 48, count: 1340 },
    { label: '$150K+',           yesPercent: 48, noPercent: 52, count: 1233 },
  ],
  byEducation: [
    { label: 'High School',      yesPercent: 48, noPercent: 52, count: 1210 },
    { label: 'Some College',     yesPercent: 54, noPercent: 46, count: 1660 },
    { label: "Bachelor's",       yesPercent: 62, noPercent: 38, count: 2180 },
    { label: "Master's+",        yesPercent: 70, noPercent: 30, count: 1753 },
  ],
}

// ─── Demographic options ──────────────────────────────────────────────────────

export const AGE_OPTIONS = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65+']
export const RACE_OPTIONS = [
  'White',
  'Black / African American',
  'Hispanic / Latino',
  'Asian / Pacific Islander',
  'Middle Eastern / North African',
  'Native American',
  'Multiracial',
  'Other',
]
export const RELIGION_OPTIONS = [
  'Christian (Protestant)',
  'Catholic',
  'Jewish',
  'Muslim',
  'Hindu',
  'Buddhist',
  'Non-religious / Atheist',
  'Other',
]
export const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
export const INCOME_OPTIONS = [
  'Under $30,000',
  '$30,000–$60,000',
  '$60,000–$100,000',
  '$100,000–$150,000',
  '$150,000+',
]
export const EDUCATION_OPTIONS = [
  'Some High School',
  'High School Diploma / GED',
  'Some College',
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  'Doctoral / Professional Degree',
]
export const POLITICAL_OPTIONS = [
  'Democrat',
  'Republican',
  'Independent',
  'No Party Affiliation',
]

// ─── Propositions ────────────────────────────────────────────────────────────

export interface Proposition {
  id: string
  stateCode: string
  state: string
  number: string          // e.g. "Proposition 1" or "Amendment 2"
  ballotType?: string     // e.g. "BI", "LRCA", "CICA", "CISS", "LRSS"
  title: string
  summary: string
  fiscalImpact: string
  proArgument: string
  conArgument: string
  category: 'Education' | 'Environment' | 'Healthcare' | 'Economy' | 'Criminal Justice' | 'Infrastructure' | 'Housing' | 'Election Administration' | 'Government Reform' | 'Taxes' | 'Public Health' | 'Campaign Finance' | 'Local Government'
}

export const PROPOSITIONS: Proposition[] = [
  // ── Florida — 3 Confirmed Constitutional Amendments, November 3, 2026 ──
  // All three are legislatively referred and require 60% voter approval to pass.
  {
    id: 'fl-prop-1',
    stateCode: 'FL',
    state: 'Florida',
    number: 'Amendment 1',
    title: 'Budget Stabilization Fund Cap Increase',
    summary: 'This legislatively referred constitutional amendment would increase the maximum cap on Florida\'s Budget Stabilization Fund — commonly called the rainy-day fund — from 10% to 25% of net general revenue collections. The amendment also mandates annual transfers into the fund of the lesser of $750 million or the amount required to reach the new 25% cap each year. The legislature would retain the ability to suspend required transfers under specific emergency circumstances defined in state law. Currently, Florida\'s rainy-day fund holds approximately $11 billion. If the cap were raised and fully funded over time, the fund could eventually hold upward of $27 billion based on current revenue projections. The measure is designed to better prepare the state for major economic downturns, natural disasters, or other financial emergencies that require rapid government spending.',
    fiscalImpact: 'The direct fiscal impact on the state budget is considered indeterminate but likely insignificant on an annual basis, as the mandatory transfers of up to $750 million per year would redirect money that currently flows to discretionary spending. In the short term this reduces available funds for other state programs. Over the long term the larger reserve is intended to reduce the state\'s reliance on borrowing or emergency budget cuts during a financial crisis, potentially saving significant interest costs and avoiding disruptive mid-year spending reductions.',
    proArgument: 'Supporters including Governor Ron DeSantis and the Republican majority in the Florida Legislature argue that a larger rainy-day fund is essential prudent fiscal management for a state that faces regular hurricane seasons, economic cycles, and growing federal funding uncertainty. They contend that having a well-funded reserve insulates Florida from the severe budget crises that hit states with thinner reserves during the 2008 financial crisis and COVID-19 pandemic. Proponents also argue that a stronger reserve improves Florida\'s credit rating, which lowers borrowing costs on state bonds and ultimately saves taxpayers money over time.',
    conArgument: 'Opponents including the Florida Policy Institute and various public employee unions argue that mandating $750 million per year into savings during times when the state faces pressing needs in education, healthcare, and social services amounts to hoarding money that could be put to immediate productive use. Critics contend that the current 10% cap is already a generous reserve by national standards and that increasing it to 25% prioritizes a financial cushion over services that low-income Floridians depend on today. Some budget analysts warn that locking up a larger share of general revenue could force cuts to programs or result in pressure to raise fees elsewhere to compensate for the diverted funds.',
    category: 'Economy',
  },
  {
    id: 'fl-prop-2',
    stateCode: 'FL',
    state: 'Florida',
    number: 'Amendment 2',
    title: 'Farm Equipment and Agritourism Property Tax Exemption',
    summary: 'This legislatively referred constitutional amendment would exempt certain tangible personal property — primarily farm equipment, tools, and machinery — from local ad valorem (property) taxes, provided the property meets three conditions: it is habitually located on agricultural land, it is used for agricultural production or agritourism activities, and it is owned by the landowner or leaseholder of that agricultural land. Currently, Florida\'s constitution allows the legislature to exempt certain personal property from taxation but does not specifically address farm equipment on agricultural land. If passed, the exemption would take effect for tax years beginning January 1, 2027. Agritourism includes activities such as farm tours, U-pick operations, hayrides, corn mazes, and other events that bring the public onto agricultural land for entertainment, education, or recreation. The measure is intended to reduce the operating costs of Florida farmers and encourage the growth of the agritourism industry, which contributes significantly to rural economies.',
    fiscalImpact: 'The Revenue Estimating Conference projects a recurring negative fiscal impact on local government revenues of approximately $31 million annually beginning in fiscal year 2027-2028. This represents the property tax revenue that local governments and school districts would no longer collect from qualifying farm equipment. The impact would vary by county — agricultural counties with large farming operations such as Hendry, Glades, and Okeechobee would experience proportionally larger revenue reductions than urban counties. Local governments may need to adjust their budgets to account for the lost revenue, though the relatively small statewide total suggests the impact on any single government entity would be modest.',
    proArgument: 'Supporters including the Florida Farm Bureau and agricultural industry groups argue that farm equipment is a working tool of production, not wealth sitting idle, and that taxing it creates an ongoing financial burden on farmers that discourages investment in modern machinery and equipment. They contend that reducing the tax load on Florida\'s $8 billion agricultural industry helps keep farming economically viable in a state where farmland faces increasing pressure from residential and commercial development. Proponents also argue the agritourism component supports rural communities and small farms that depend on visitor revenue to supplement traditional crop income.',
    conArgument: 'Opponents raise concerns that the exemption primarily benefits large agricultural operations and wealthy landowners rather than small subsistence farmers, since larger farms have more equipment and therefore receive a proportionally larger tax break. Some local government officials and county commissioners argue that even a $31 million annual reduction in property tax revenue statewide adds up over time and could require cuts to local road maintenance, emergency services, or school funding in agricultural counties that are already operating with limited budgets. Critics also question whether including agritourism — which can be a significant commercial enterprise — is an appropriate expansion of an agricultural exemption that was originally intended to support food production.',
    category: 'Economy',
  },
  {
    id: 'fl-prop-3',
    stateCode: 'FL',
    state: 'Florida',
    number: 'Amendment 3',
    title: 'Save Our Homes From Excessive Property Taxes',
    summary: 'This legislatively referred constitutional amendment — titled "Save Our Homes From Excessive Property Taxes" by its sponsors — makes several significant changes to Florida\'s property tax system. First, it increases the homestead exemption for non-school levies to $150,000 in 2027 and $250,000 in 2028, with adjustments tied to inflation starting in 2029. Residents who become Florida homesteaders after 2026 would receive a smaller initial exemption of $50,000 for their first five years of residency before receiving the full exemption. Second, the amendment reduces the annual assessment increase cap for non-homestead properties — such as rental housing, commercial property, and second homes — from 10% to 5% per year. Third, it restricts how local governments may spend ad valorem (property tax) revenue, limiting expenditures to core services including public safety, transportation infrastructure, and public education. These restrictions are intended to prevent local governments from using property tax revenue for what supporters characterize as nonessential spending.',
    fiscalImpact: 'The measure carries one of the largest fiscal impacts of any Florida constitutional amendment in recent history. The Revenue Estimating Conference estimates a recurring annual reduction of approximately $11.86 billion in local non-school property tax revenues once fully phased in. This represents revenue that would no longer be collected from homeowners and non-homestead property owners under the expanded exemptions and lower assessment cap. Local governments, special districts, and county services funded by property taxes would face significant budget pressure. To maintain current service levels, local governments would likely need to cut services, raise other fees and non-property taxes, or seek additional state funding — impacts that would vary significantly by county and municipality.',
    proArgument: 'Supporters including Governor Ron DeSantis and Republican legislators who placed the measure on the ballot argue that Florida homeowners are being crushed by rapidly rising property tax bills driven by soaring home valuations, and that the state\'s existing "Save Our Homes" cap on assessment increases has not been sufficient to protect families from sticker shock on their annual tax bills. They argue that the expanded exemptions provide meaningful, direct relief to middle-class homeowners — particularly seniors on fixed incomes and working families — who risk being taxed out of their homes. Proponents also argue that restricting local government spending to core services forces governments to prioritize essential functions rather than expanding government programs funded by rising property values.',
    conArgument: 'Opponents including the Florida Policy Institute, the Florida League of Cities, and county governments across the state argue that a nearly $12 billion annual reduction in local government revenues would devastate funding for public services that communities depend on, including libraries, parks, fire departments, public transit, and affordable housing programs. Critics point out that the measure disproportionately benefits owners of expensive homes and that the spending restrictions on local governments constitute an unprecedented state takeover of local decision-making that ignores the different needs of Florida\'s 67 counties. Economists warn the measure could also worsen housing affordability by reducing property taxes on rental properties without any requirement that landlords pass the savings on to tenants, while simultaneously cutting the local services and infrastructure investments that make communities livable.',
    category: 'Economy',
  },
  // ── Texas — No Statewide Ballot Measures on the November 3, 2026 Ballot ──
  // Texas held its constitutional amendment election in November 2025 (17 measures approved).
  // The 89th Legislature's next regular session begins January 2027, so no new amendments
  // have been referred for the November 2026 general election.
  // ── New York — No Statewide Ballot Measures on the November 3, 2026 Ballot ──
  // New York's constitutional amendment process requires passage by two successive legislative
  // sessions before referral to voters. No measures have completed that process for 2026.
  // ── California — November 3, 2026 Ballot (Source: Ballotpedia) ──
  {
    id: 'ca-prop-1',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 1',
    ballotType: 'BI',
    title: 'Housing Assistance Bond Act',
    summary: 'This bond initiative would authorize California to issue $10 billion in general obligation bonds to fund housing assistance programs for low- and middle-income residents, veterans, and people experiencing homelessness. Funds would be distributed through the California Housing Finance Agency and local housing authorities for construction, rehabilitation, and acquisition of affordable housing units statewide. The measure sets aside a portion of funds specifically for permanent supportive housing paired with wraparound services for chronically homeless individuals.',
    fiscalImpact: 'The state would pay an estimated $500 million annually over 30 years to repay principal and interest on the bonds, totaling approximately $15 billion. Local governments receiving funds would be required to contribute a 20% match for most projects. The measure is expected to produce over 30,000 affordable housing units over the life of the program.',
    proArgument: 'Supporters including affordable housing advocates and mayors across the state argue that California faces a crisis-level housing shortage with over 180,000 homeless residents and hundreds of thousands of families spending more than half their income on rent. They contend that bond financing is a proven, cost-effective mechanism to build affordable housing at scale and that the long-term social savings from reducing homelessness — in emergency services, healthcare, and criminal justice costs — far exceed the debt service costs.',
    conArgument: 'Opponents including fiscal watchdog groups argue that California already carries significant bond debt and that adding $10 billion more increases the state\'s long-term financial obligations at a time of budget uncertainty. Critics also argue that subsidized housing alone does not address the underlying regulatory and zoning barriers that drive up housing costs, and that without broader housing reform, bond-funded units will be insufficient to meaningfully reduce the shortage.',
    category: 'Housing',
  },
  {
    id: 'ca-prop-2',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 2',
    ballotType: 'LRCA',
    title: 'Budget Stabilization Fund Reforms',
    summary: 'This legislatively referred constitutional amendment would modify the rules governing California\'s Budget Stabilization Account (rainy-day fund). The measure increases the required annual contribution rate, raises the maximum fund cap from 10% to 15% of General Fund revenues, and creates a new sub-account dedicated exclusively to K-12 education funding stabilization. It also expands the criteria under which the governor may declare a fiscal emergency to access the funds, and requires the legislature to vote on whether to use the reserve when its balance exceeds the new cap.',
    fiscalImpact: 'The measure would redirect additional General Fund revenues into the stabilization account each year, reducing discretionary spending in the near term. The Legislative Analyst\'s Office estimates the change could reduce available spending by $500 million to $1.5 billion annually during strong revenue years, while providing a larger cushion during recessions or revenue downturns.',
    proArgument: 'Supporters argue that California\'s volatile income tax base — heavily dependent on capital gains from a small number of wealthy taxpayers — creates boom-and-bust budget cycles that devastate school funding and social services during recessions. A larger, better-structured reserve would smooth out those cycles, protect schools from mid-year cuts, and reduce the state\'s reliance on painful emergency budget measures during downturns.',
    conArgument: 'Critics argue that diverting more revenue into reserves comes at the cost of immediate investments in education, healthcare, and housing that Californians need now. Some budget analysts warn that the fund\'s rules are already sufficiently restrictive and that expanding the cap without also making it easier to spend during genuine emergencies simply locks money away without providing meaningful additional protection.',
    category: 'Economy',
  },
  {
    id: 'ca-prop-3',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 3',
    ballotType: 'CICA',
    title: 'Public Education and Higher Education Funding Initiative',
    summary: 'This citizen-initiated constitutional amendment would increase the state\'s minimum funding guarantee for K-12 public schools and community colleges by adding a new floor tied to per-pupil spending in the top ten states nationally. It would also create a new dedicated stream of income tax revenue — a 1.5% surcharge on taxable income above $500,000 — to fund California State University and University of California campuses, with the goal of eliminating undergraduate tuition at CSU within five years and reducing UC tuition by 50%.',
    fiscalImpact: 'The income tax surcharge is estimated to generate $8 billion to $11 billion annually, depending on high-income taxpayer behavior. Of that amount, roughly 60% would go to the UC and CSU systems. K-12 funding increases under the new per-pupil floor could cost an additional $3 billion to $5 billion per year from the General Fund once the new benchmark is met by other states.',
    proArgument: 'Supporters including the California Teachers Association and student advocacy groups argue that decades of underfunding have left California public schools ranking near the bottom nationally in per-pupil spending despite being one of the wealthiest states. They contend that making higher education free or nearly free at public universities is essential to rebuilding the middle class, reducing student debt, and ensuring that cost is never a barrier to a college education for working-class Californians.',
    conArgument: 'Opponents argue that the income tax surcharge on high earners would push California\'s combined top marginal tax rate above 16%, accelerating the departure of high-income residents and businesses to lower-tax states and ultimately reducing total revenues. Critics also argue that guaranteeing tuition reductions through the constitution removes the flexibility that university administrators need to manage budgets responsibly and could force cuts to research programs, faculty, and campus services that make California universities world-class.',
    category: 'Education',
  },
  {
    id: 'ca-prop-37',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 37',
    ballotType: 'CISS',
    title: 'Affordable Housing Zoning and Production Act',
    summary: 'This citizen-initiated state statute would override local zoning ordinances to allow higher-density affordable housing development by right on commercially zoned parcels within one mile of a transit stop. Developers would be required to set aside at least 25% of units at below-market rents for households earning 80% or less of area median income. The measure strips cities and counties of the ability to use design review, neighborhood character standards, or environmental review under CEQA to block qualifying projects, though basic health and safety codes would still apply.',
    fiscalImpact: 'The measure would have no direct cost to the state or local governments. Local governments would lose some permitting fee revenue from projects that no longer require discretionary approvals. The broader economic impact — increased property tax base from new construction, reduced homelessness-related service costs — is estimated to be net positive over 10 to 20 years.',
    proArgument: 'Supporters argue that California\'s housing crisis is fundamentally a supply problem caused by exclusionary local zoning and that cities have repeatedly failed to meet their state-assigned housing production goals. They contend that allowing higher-density housing near transit by right — without years of discretionary review — is the single most effective tool to increase housing supply and reduce rents over time. The affordability set-aside ensures that at least a quarter of new units serve working-class households.',
    conArgument: 'Opponents including many city councils and neighborhood organizations argue that stripping local control over land use removes communities\' ability to shape their own character, manage infrastructure capacity, and ensure new development is compatible with existing neighborhoods. Critics argue that the CEQA exemption could allow environmentally harmful or poorly designed projects to proceed without adequate review, and that the 25% affordability requirement — while well-intentioned — does not go far enough to ensure that most new units are accessible to lower-income residents.',
    category: 'Housing',
  },
  {
    id: 'ca-prop-38',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 38',
    ballotType: 'CISS',
    title: 'Healthcare Facility Funding and Vaccine Policy Act',
    summary: 'This citizen-initiated state statute would issue $6 billion in revenue bonds to fund construction, renovation, and equipment upgrades at public and nonprofit hospitals, clinics, and community health centers serving Medi-Cal patients. It would also codify into state statute — and make more difficult to change — the current California immunization schedule for school attendance, requiring a two-thirds legislative supermajority to modify any vaccine requirement for K-12 schools. The bond funds would be administered by a newly created Office of Healthcare Facility Investment with independent oversight.',
    fiscalImpact: 'Annual bond repayment costs are estimated at $350 million to $400 million over 30 years. The bond proceeds would leverage additional federal matching funds under Medicaid, potentially doubling the effective investment in healthcare infrastructure. Codifying vaccine requirements has no direct fiscal impact, though it reduces legislative flexibility to respond to future public health developments.',
    proArgument: 'Supporters including the California Hospital Association and public health advocates argue that many safety-net hospitals serving low-income communities are operating in outdated facilities that were built decades ago and lack modern infrastructure for emergency care, mental health services, and infection control. They also argue that codifying vaccine requirements provides stability against political efforts to weaken public health protections that have successfully controlled measles, whooping cough, and other infectious diseases in California.',
    conArgument: 'Opponents raise concerns about combining two unrelated issues — healthcare facility funding and vaccine policy — in a single measure, making it difficult for voters who support one but not the other to express their true preference. Some civil liberties advocates object to constitutionalizing vaccine mandates, arguing it removes the flexibility needed to respond to new scientific evidence or unusual circumstances. Fiscal critics question the use of revenue bonds rather than direct appropriations for infrastructure that would otherwise qualify for grants.',
    category: 'Healthcare',
  },
  {
    id: 'ca-prop-39',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 39',
    ballotType: 'CICA',
    title: 'Voter ID and Election Administration Reform Act',
    summary: 'This citizen-initiated constitutional amendment would require voters to present government-issued photo identification when voting in person and provide the last four digits of a state or federal ID number when submitting a mail ballot. The state would be required to issue free voter ID cards. The measure also mandates annual citizenship verification of voter rolls using federal and state databases, requires county election officials to publish quarterly reports on voter roll maintenance, and establishes criminal penalties for election officials who fail to remove ineligible voters within 90 days of notification.',
    fiscalImpact: 'The state would incur one-time costs of $40 million to $70 million to establish a free voter ID program and upgrade election systems. Annual ongoing costs for ID issuance, voter roll audits, and compliance reporting are estimated at $15 million to $25 million statewide. The measure could increase litigation costs if implementation is challenged in court.',
    proArgument: 'Supporters argue that voter ID requirements are standard practice in most democracies and that a free state-issued ID removes any financial barrier to compliance. They contend that annual citizenship verification of voter rolls is a reasonable safeguard to ensure election integrity and that transparent reporting requirements build public confidence in the accuracy of election results.',
    conArgument: 'Opponents including the ACLU, League of Women Voters, and disability rights organizations argue that voter fraud in California is vanishingly rare and that ID requirements create real barriers for elderly voters, people with disabilities, and low-income communities who are less likely to carry current photo ID. They argue that mandatory citizenship database checks using imperfect government records will produce false positives that disenfranchise eligible citizens, and that criminal penalties for election officials will create a chilling effect on public service.',
    category: 'Election Administration',
  },
  {
    id: 'ca-prop-4',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 4',
    ballotType: 'LRSS',
    title: 'Campaign Finance and Election Transparency Act',
    summary: 'This legislatively referred state statute would allow the California state government and local governments to establish voluntary public campaign financing programs, and would strengthen disclosure requirements for independent expenditure committees. Under the public financing option, qualifying candidates who agree to spending limits and demonstrate community support through a threshold number of small-dollar donations would receive matching public funds. The measure also requires near-real-time online disclosure of major independent expenditures and creates a new enforcement division within the Fair Political Practices Commission.',
    fiscalImpact: 'A statewide public financing program would cost an estimated $50 million to $200 million per election cycle depending on participation rates and program design. Local programs would vary in cost. The enhanced disclosure and enforcement provisions would require an estimated $15 million in annual funding for the FPPC, offset partly by increased fine revenue.',
    proArgument: 'Supporters including good-government organizations and many Democratic legislators argue that the Supreme Court\'s Citizens United decision has flooded California elections with undisclosed dark money, and that public financing creates a pathway for grassroots candidates to compete without becoming beholden to wealthy donors. They contend that stronger real-time disclosure makes it easier for voters to know who is funding the campaigns trying to influence their vote.',
    conArgument: 'Opponents argue that using taxpayer funds for political campaigns is fundamentally objectionable to many voters who would be financing candidates they strongly oppose. Some critics argue that spending limits attached to public financing are often set too low to run a competitive statewide campaign, disadvantaging candidates who opt into the system against well-funded opponents who do not. Others argue existing disclosure laws are already sufficient and that the new enforcement division creates unnecessary bureaucracy.',
    category: 'Campaign Finance',
  },
  {
    id: 'ca-prop-40',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 40',
    ballotType: 'CICA/SS',
    title: 'Income Tax Increase for Public Health Insurance Act',
    summary: 'This citizen-initiated constitutional amendment and companion statute would increase California income taxes on high earners to fund a new universal public health insurance program for all California residents regardless of immigration status. The income tax surcharge would apply at a rate of 2.5% on income above $200,000 and 3.5% on income above $400,000. Revenue would be directed to a newly created California Health Insurance Fund administered by the Department of Health Care Services. The program would provide comprehensive coverage including medical, dental, vision, and mental health services with no premiums or deductibles for enrollees below 400% of the federal poverty level.',
    fiscalImpact: 'The Legislative Analyst\'s Office estimates the tax surcharge would generate $18 billion to $24 billion annually. Program costs for covering the estimated 3.5 million currently uninsured Californians and supplementing coverage for Medi-Cal enrollees are estimated at $20 billion to $30 billion annually once fully implemented, requiring additional funding sources or federal waiver revenue to close the gap.',
    proArgument: 'Supporters argue that California has the economic size and political will to lead the nation in universal health coverage and that the human cost of leaving millions uninsured — in preventable deaths, emergency room overuse, and reduced workforce productivity — far exceeds the cost of the program. They contend that the income tax increase affects only the wealthiest Californians and would be offset by the elimination of private insurance premiums for millions of middle-class families.',
    conArgument: 'Opponents argue that the measure\'s revenue estimates are optimistic and that the program would require significant additional federal approvals and funding that may not materialize. Critics warn that pushing California\'s top marginal tax rate above 16% would accelerate the departure of high earners and businesses to lower-tax states. Healthcare industry groups also warn that the reimbursement rates in the new program are too low to sustain hospitals and physician practices, potentially reducing access to care.',
    category: 'Public Health',
  },
  {
    id: 'ca-prop-41',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 41',
    ballotType: 'CICA',
    title: 'Tax and Revenue Administration Modernization Act',
    summary: 'This citizen-initiated constitutional amendment would restructure the California Franchise Tax Board and Board of Equalization into a single unified Department of Revenue with an appointed director confirmed by the Senate, replacing elected members with career civil servants. The measure also codifies a series of taxpayer rights protections, requires the department to publish plain-language explanations of all tax guidance within 60 days of issuance, and establishes an independent taxpayer advocate office with the authority to issue expedited relief orders in cases of undue hardship.',
    fiscalImpact: 'Consolidating two agencies into one is estimated to produce administrative savings of $80 million to $120 million annually within five years through reduced administrative overhead and improved compliance technology. Establishing the taxpayer advocate office would cost an estimated $20 million annually. Net fiscal impact is estimated to be modestly positive over the long term.',
    proArgument: 'Supporters argue that having elected members on the Board of Equalization creates a structure where political fundraising from taxpayers who have cases before the board creates inherent conflicts of interest, and that a professional civil service agency with independent oversight would administer tax law more consistently, fairly, and efficiently. They contend the taxpayer protections are long overdue and that plain-language guidance will reduce costly disputes and litigation.',
    conArgument: 'Critics argue that elected tax board members provide direct democratic accountability that an appointed director cannot replicate, and that removing elected officials from tax administration reduces voters\' ability to influence how tax laws are enforced. Some argue the consolidation would be disruptive and that the projected savings are speculative. Business groups warn that codifying revenue-spending limits could constrain future government responses to fiscal emergencies.',
    category: 'Government Reform',
  },
  {
    id: 'ca-prop-42',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 42',
    ballotType: 'CICA',
    title: 'Income Tax Brackets Modernization Act',
    summary: 'This citizen-initiated constitutional amendment would add two new income tax brackets at the top of California\'s income tax schedule — a 16.8% rate on income above $2 million and an 18.5% rate on income above $5 million — and dedicate all new revenue exclusively to climate resilience infrastructure, wildfire prevention, and drought mitigation programs. The measure prohibits the legislature from reducing funding to existing environmental programs as a result of the new revenue, and creates an independent oversight board to audit expenditures annually.',
    fiscalImpact: 'The new brackets are estimated to generate $6 billion to $9 billion annually. Economists note significant uncertainty due to behavioral responses by high-income taxpayers, particularly portfolio timing and residency changes. The revenue would be constitutionally dedicated to climate programs and could not be used for other purposes even during budget emergencies.',
    proArgument: 'Supporters including environmental groups and progressive legislators argue that the wealthiest Californians — who have benefited most from the economy — should pay more to address the climate crisis that is devastating communities through wildfires, drought, and extreme heat. They contend that constitutionally dedicated funding protects climate programs from being cut during budget downturns and that the independent oversight board ensures money is spent effectively.',
    conArgument: 'Opponents argue that California\'s top marginal income tax rate is already the highest in the nation and that further increases will cause high-income residents to change their state of residency or delay realizing capital gains, potentially producing less revenue than projected. Critics also argue that constitutionally dedicating revenue to specific programs reduces the legislature\'s ability to respond to changing needs and priorities, and that existing state climate programs are already funded.',
    category: 'Taxes',
  },
  {
    id: 'ca-prop-43',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 43',
    ballotType: 'LRCA',
    title: 'Local Government Finance and Supermajority Requirements Act',
    summary: 'This legislatively referred constitutional amendment would change two aspects of California\'s local government finance rules. First, it lowers the voter approval threshold for local bonds for affordable housing, public safety infrastructure, and school construction from two-thirds to 55%. Second, it raises the existing two-thirds legislative vote requirement for the state to redirect local tax revenues or mandate new local government spending to a three-fourths supermajority. The measure is designed to simultaneously make it easier for local governments to fund essential infrastructure and harder for the state to shift costs onto local governments.',
    fiscalImpact: 'Lowering the bond threshold could allow local governments to issue billions more in bonds for housing, schools, and public safety that previously could not reach the two-thirds threshold. The higher state supermajority requirement for cost shifts would reduce the state\'s flexibility to balance its budget by redirecting local revenues, potentially increasing pressure on state finances during downturns.',
    proArgument: 'Supporters argue that the two-thirds threshold for local bonds is among the highest in the country and has blocked urgently needed school construction, fire station upgrades, and affordable housing projects that have broad community support but cannot quite reach the supermajority threshold. They also argue that the state has a history of shifting costs onto cities and counties during budget crises, and that a stronger supermajority requirement provides essential protection for local fiscal stability.',
    conArgument: 'Critics argue that lowering the bond threshold reduces the check on local government debt and could lead to excessive borrowing that saddles future property owners with high tax bills to pay off bonds. Some fiscal conservatives argue that the 55% threshold approved for school bonds has already resulted in large bond programs in some districts, and that extending that model broadly could repeat those outcomes. The higher supermajority for state cost shifts could also make it harder for the state to respond to fiscal emergencies.',
    category: 'Local Government',
  },
  {
    id: 'ca-prop-44',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 44',
    ballotType: 'CISS',
    title: 'Business Regulations and Healthcare Governance Modernization Act',
    summary: 'This citizen-initiated state statute would establish a new regulatory framework for large healthcare corporations operating in California, requiring private equity-owned medical practices and hospital chains to obtain approval from a new state Office of Healthcare Consolidation before completing mergers, acquisitions, or management agreement changes. The measure also increases penalties for price gouging in pharmaceutical and medical supply markets, and requires healthcare businesses with more than $100 million in annual California revenue to file detailed ownership structure and profit margin reports with the attorney general.',
    fiscalImpact: 'Establishing and operating the new Office of Healthcare Consolidation is estimated to cost $30 million to $50 million annually, to be funded by filing fees from regulated entities. Increased penalties and reporting requirements could generate additional revenue through fines but also increase compliance costs for healthcare businesses, which may be passed on to consumers through higher prices or reduced access.',
    proArgument: 'Supporters including the California Medical Association and patient advocacy groups argue that a wave of private equity acquisitions of physician practices and hospitals has prioritized profits over patient care, leading to physician burnout, reduced staffing, surprise billing, and facility closures in underserved communities. They contend that requiring prior approval for major consolidations gives the state the ability to block deals that harm competition or patient access before damage is done rather than attempting costly reversal after the fact.',
    conArgument: 'Opponents including the California Chamber of Commerce and hospital industry groups argue that the approval process will create costly delays and uncertainty that discourage investment in California healthcare infrastructure. Critics argue that existing antitrust laws and the attorney general\'s oversight authority already provide sufficient tools to address harmful consolidations, and that additional regulation will drive healthcare providers out of the state, worsening physician shortages in rural and underserved communities.',
    category: 'Healthcare',
  },
  {
    id: 'ca-prop-45',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 45',
    ballotType: 'CISS',
    title: 'Administrative Powers, Land Use and Development Policy Reform',
    summary: 'This citizen-initiated state statute would require all state agencies to conduct a cost-benefit analysis and a small business impact assessment for any new regulation that is projected to cost the regulated industry more than $25 million annually. The measure also restricts state agencies from using emergency rulemaking authority for non-emergency regulatory changes, requires the Office of Administrative Law to post all proposed regulations in plain language, and limits the use of categorical exemptions under CEQA for large mixed-use real estate projects in coastal zones.',
    fiscalImpact: 'The new analysis requirements would add administrative costs to the rulemaking process, estimated at $10 million to $20 million annually across all affected agencies. Restricting CEQA categorical exemptions for coastal development could slow permitting for some projects but also reduce litigation risk. The overall economic impact depends on how the cost-benefit requirements affect the pace and scope of future regulations.',
    proArgument: 'Supporters including business groups and property rights advocates argue that California\'s regulatory process is among the most burdensome in the nation and that requiring rigorous cost-benefit analysis will force agencies to weigh economic impacts more carefully before imposing new rules. They contend that the CEQA restrictions on coastal development close a loophole that has allowed large luxury real estate projects to bypass environmental review that smaller projects must complete.',
    conArgument: 'Opponents including environmental and labor organizations argue that mandatory cost-benefit analyses will slow the pace of essential health, safety, and environmental regulations that protect workers and communities. They contend that the administrative burden of the new requirements will tie up agencies in analysis rather than rulemaking, effectively blocking regulations even when the benefits clearly outweigh the costs. Critics also argue that restricting CEQA exemptions for coastal development could perversely harm affordable housing production near the coast.',
    category: 'Government Reform',
  },
  {
    id: 'ca-prop-5',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 5',
    ballotType: 'LRCA',
    title: 'State Executive Branch Structure and Recall Process Reform',
    summary: 'This legislatively referred constitutional amendment makes two structural changes to California\'s state government. First, it reorganizes the executive branch by merging the separately elected offices of State Controller and State Treasurer into a single elected office of Chief Financial Officer, combining their functions under one official elected statewide every four years. Second, it reforms the recall election process by eliminating the simultaneous successor candidate election that currently appears alongside the recall question, instead providing that a recalled statewide officer\'s duties transfer to the lieutenant governor or the next in the line of succession pending a special election.',
    fiscalImpact: 'Merging the Controller and Treasurer offices would produce estimated administrative savings of $15 million to $25 million annually through consolidation of staff, technology systems, and office infrastructure. The change to the recall process would reduce the cost of recall elections modestly by eliminating the successor candidate portion of the ballot, though a subsequent special election could offset some of those savings.',
    proArgument: 'Supporters argue that having separately elected Controller and Treasurer offices results in duplicative functions, inter-agency conflicts, and inefficient use of taxpayer resources, and that consolidation is a sensible modernization that most other states have already completed. They also argue that the recall reform closes a well-documented flaw in California law that allows a recalled officer to be replaced by someone who wins with a small plurality — far less than the majority required to win a regular election.',
    conArgument: 'Opponents of the office consolidation argue that having two separately elected financial officers provides an important system of checks and balances within the executive branch — each office has historically caught errors and irregularities that the other may have missed. Critics of the recall reform argue that eliminating the simultaneous successor election effectively reduces voters\' choices and that allowing the lieutenant governor to assume office without a new election may not reflect the will of voters who supported the recall specifically to change policy direction.',
    category: 'Government Reform',
  },
]

// ─── Race results mock data ───────────────────────────────────────────────────

export const RACE_RESULTS: RaceResult[] = [
  // ── FL Senate — Ashley Moody (R, incumbent) vs. Angie Nixon (D) ──
  {
    raceId: 'fl-sen',
    raceLabel: 'Senate',
    office: 'Senate',
    stateCode: 'FL',
    totalResponses: 4620,
    candidates: [
      { candidateId: 'fl-sen-2', name: 'Angie Nixon',    lastName: 'Nixon', party: 'Democrat',     count: 1983, percent: 43 },
      { candidateId: 'fl-sen-1', name: 'Ashley Moody',   lastName: 'Moody', party: 'Republican', count: 2637, percent: 57 },
    ],
    byAge: [
      { label: '18–24', count: 870,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 59 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 41 }] },
      { label: '25–34', count: 940,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 54 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 46 }] },
      { label: '35–44', count: 810,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 48 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 52 }] },
      { label: '45–54', count: 750,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 41 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 59 }] },
      { label: '55–64', count: 620,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 35 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 65 }] },
      { label: '65+',   count: 630,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 31 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 69 }] },
    ],
    byRace: [
      { label: 'White',               count: 1820, candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 37 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 63 }] },
      { label: 'Black / African Am.', count: 980,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 74 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 26 }] },
      { label: 'Hispanic / Latino',   count: 1100, candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 52 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 48 }] },
      { label: 'Asian / Pacific Is.', count: 420,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 61 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 39 }] },
      { label: 'Multiracial',         count: 300,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 55 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 45 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 1680, candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 34 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 66 }] },
      { label: 'Catholic',      count: 880,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 46 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 54 }] },
      { label: 'Jewish',        count: 310,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 62 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 38 }] },
      { label: 'Muslim',        count: 250,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 68 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 32 }] },
      { label: 'Non-religious', count: 1500, candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 58 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 42 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2300, candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 52 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 48 }] },
      { label: 'Male',               count: 2100, candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 34 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 66 }] },
      { label: 'Non-binary / Other', count: 220,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 71 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 29 }] },
    ],
    byPolitical: [
      { label: 'Democrat',              count: 2160, candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 90 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 10 }] },
      { label: 'Republican',            count: 2000, candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 10 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 90 }] },
      { label: 'Independent',           count: 1040, candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 44 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 56 }] },
      { label: 'No Party Affiliation',  count: 600,  candidates: [{ name: 'Angie Nixon', lastName: 'Nixon', party: 'Democrat', percent: 38 }, { name: 'Ashley Moody', lastName: 'Moody', party: 'Republican', percent: 62 }] },
    ],
  },

  // ── FL Governor — Byron Donalds (R) vs. David Jolly (D) ──
  {
    raceId: 'fl-gov',
    raceLabel: 'Governor',
    office: 'Governor',
    stateCode: 'FL',
    totalResponses: 4280,
    candidates: [
      { candidateId: 'fl-gov-2', name: 'David Jolly',    lastName: 'Jolly',   party: 'Democrat',   count: 1840, percent: 43 },
      { candidateId: 'fl-gov-1', name: 'Byron Donalds',  lastName: 'Donalds', party: 'Republican', count: 2440, percent: 57 },
    ],
    byAge: [
      { label: '18–24', count: 800,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 58 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 42 }] },
      { label: '25–34', count: 870,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 52 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 48 }] },
      { label: '35–44', count: 760,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 46 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 54 }] },
      { label: '45–54', count: 700,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 39 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 61 }] },
      { label: '55–64', count: 580,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 34 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 66 }] },
      { label: '65+',   count: 570,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 31 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 69 }] },
    ],
    byRace: [
      { label: 'White',               count: 1720, candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 36 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 64 }] },
      { label: 'Black / African Am.', count: 920,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 78 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 22 }] },
      { label: 'Hispanic / Latino',   count: 1040, candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 50 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 50 }] },
      { label: 'Asian / Pacific Is.', count: 380,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 59 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 41 }] },
      { label: 'Multiracial',         count: 220,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 53 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 47 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 1580, candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 33 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 67 }] },
      { label: 'Catholic',      count: 820,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 45 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 55 }] },
      { label: 'Jewish',        count: 290,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 64 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 36 }] },
      { label: 'Muslim',        count: 230,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 66 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 34 }] },
      { label: 'Non-religious', count: 1360, candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 57 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 43 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2140, candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 50 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 50 }] },
      { label: 'Male',               count: 1960, candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 35 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 65 }] },
      { label: 'Non-binary / Other', count: 180,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 70 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 30 }] },
    ],
    byPolitical: [
      { label: 'Democrat',              count: 1980, candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 91 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 9  }] },
      { label: 'Republican',            count: 1900, candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 9  }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 91 }] },
      { label: 'Independent',           count: 980,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 46 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 54 }] },
      { label: 'No Party Affiliation',  count: 560,  candidates: [{ name: 'David Jolly', lastName: 'Jolly', party: 'Democrat', percent: 40 }, { name: 'Byron Donalds', lastName: 'Donalds', party: 'Republican', percent: 60 }] },
    ],
  },

  // ── CA Governor — Xavier Becerra (D) vs. Steve Hilton (R) ──
  {
    raceId: 'ca-gov',
    raceLabel: 'Governor',
    office: 'Governor',
    stateCode: 'CA',
    totalResponses: 5840,
    candidates: [
      { candidateId: 'ca-gov-1', name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat',   count: 3738, percent: 64 },
      { candidateId: 'ca-gov-2', name: 'Steve Hilton',   lastName: 'Hilton',  party: 'Republican', count: 2102, percent: 36 },
    ],
    byAge: [
      { label: '18–24', count: 1020, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 76 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 24 }] },
      { label: '25–34', count: 1180, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 71 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 29 }] },
      { label: '35–44', count: 1090, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 66 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 34 }] },
      { label: '45–54', count: 960,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 60 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 40 }] },
      { label: '55–64', count: 840,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 55 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 45 }] },
      { label: '65+',   count: 750,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 50 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 50 }] },
    ],
    byRace: [
      { label: 'White',               count: 1870, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 57 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 43 }] },
      { label: 'Hispanic / Latino',   count: 1540, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 72 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 28 }] },
      { label: 'Asian / Pacific Is.', count: 1220, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 69 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 31 }] },
      { label: 'Black / African Am.', count: 760,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 82 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 18 }] },
      { label: 'Multiracial',         count: 450,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 67 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 33 }] },
    ],
    byReligion: [
      { label: 'Non-religious', count: 1980, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 74 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 26 }] },
      { label: 'Catholic',      count: 1120, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 63 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 37 }] },
      { label: 'Christian',     count: 1310, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 51 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 49 }] },
      { label: 'Jewish',        count: 430,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 71 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 29 }] },
      { label: 'Muslim',        count: 390,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 70 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 30 }] },
      { label: 'Buddhist',      count: 610,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 76 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 24 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2980, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 70 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 30 }] },
      { label: 'Male',               count: 2620, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 57 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 43 }] },
      { label: 'Non-binary / Other', count: 240,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 83 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 17 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 2850, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 92 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 8  }] },
      { label: 'Republican',           count: 1610, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 11 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 89 }] },
      { label: 'Independent',          count: 1380, candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 58 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 42 }] },
      { label: 'No Party Affiliation', count: 710,  candidates: [{ name: 'Xavier Becerra', lastName: 'Becerra', party: 'Democrat', percent: 52 }, { name: 'Steve Hilton', lastName: 'Hilton', party: 'Republican', percent: 48 }] },
    ],
  },

  // ── CA Attorney General — Rob Bonta (D) vs. Michael Gates (R) ──
  {
    raceId: 'ca-ag',
    raceLabel: 'Atty. General',
    office: 'Attorney General',
    stateCode: 'CA',
    totalResponses: 4610,
    candidates: [
      { candidateId: 'ca-ag-1', name: 'Rob Bonta',     lastName: 'Bonta', party: 'Democrat',   count: 2950, percent: 64 },
      { candidateId: 'ca-ag-2', name: 'Michael Gates', lastName: 'Gates', party: 'Republican', count: 1660, percent: 36 },
    ],
    byAge: [
      { label: '18–24', count: 810,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 78 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 22 }] },
      { label: '25–34', count: 940,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 73 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 27 }] },
      { label: '35–44', count: 870,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 66 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 34 }] },
      { label: '45–54', count: 760,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 60 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 40 }] },
      { label: '55–64', count: 680,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 55 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 45 }] },
      { label: '65+',   count: 550,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 51 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 49 }] },
    ],
    byRace: [
      { label: 'White',               count: 1490, candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 56 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 44 }] },
      { label: 'Hispanic / Latino',   count: 1210, candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 70 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 30 }] },
      { label: 'Asian / Pacific Is.', count: 980,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 74 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 26 }] },
      { label: 'Black / African Am.', count: 610,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 83 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 17 }] },
      { label: 'Multiracial',         count: 320,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 68 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 32 }] },
    ],
    byReligion: [
      { label: 'Non-religious', count: 1560, candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 76 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 24 }] },
      { label: 'Catholic',      count: 900,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 62 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 38 }] },
      { label: 'Christian',     count: 1040, candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 49 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 51 }] },
      { label: 'Jewish',        count: 340,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 71 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 29 }] },
      { label: 'Muslim',        count: 310,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 69 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 31 }] },
      { label: 'Buddhist',      count: 460,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 78 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 22 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2350, candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 69 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 31 }] },
      { label: 'Male',               count: 2080, candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 59 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 41 }] },
      { label: 'Non-binary / Other', count: 180,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 85 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 15 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 2400, candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 92 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 8  }] },
      { label: 'Republican',           count: 1110, candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 12 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 88 }] },
      { label: 'Independent',          count: 1100, candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 57 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 43 }] },
      { label: 'No Party Affiliation', count: 500,  candidates: [{ name: 'Rob Bonta', lastName: 'Bonta', party: 'Democrat', percent: 50 }, { name: 'Michael Gates', lastName: 'Gates', party: 'Republican', percent: 50 }] },
    ],
  },

  // ─��� CA House District 33 ──
  {
    raceId: 'ca-house-33',
    raceLabel: 'House – District 33',
    office: 'House',
    stateCode: 'CA',
    totalResponses: 2960,
    candidates: [
      { candidateId: 'ca-house-33-1', name: 'Michelle Park',   lastName: 'Park',   party: 'Democrat',   count: 1954, percent: 66 },
      { candidateId: 'ca-house-33-2', name: 'Tom Whitfield',   lastName: 'Whitfield', party: 'Republican', count: 1006, percent: 34 },
    ],
    byAge: [
      { label: '18–24', count: 530,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 78 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 22 }] },
      { label: '25–34', count: 610,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 73 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 27 }] },
      { label: '35–44', count: 580,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 67 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 33 }] },
      { label: '45–54', count: 520,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 61 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 39 }] },
      { label: '55–64', count: 410,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 57 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 43 }] },
      { label: '65+',   count: 310,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 52 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 48 }] },
    ],
    byRace: [
      { label: 'White',               count: 870,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 59 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 41 }] },
      { label: 'Asian / Pacific Is.', count: 810,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 74 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 26 }] },
      { label: 'Hispanic / Latino',   count: 680,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 68 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 32 }] },
      { label: 'Black / African Am.', count: 380,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 82 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 18 }] },
      { label: 'Multiracial',         count: 220,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 70 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 30 }] },
    ],
    byReligion: [
      { label: 'Non-religious', count: 990,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 76 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 24 }] },
      { label: 'Catholic',      count: 590,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 62 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 38 }] },
      { label: 'Christian',     count: 640,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 53 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 47 }] },
      { label: 'Buddhist',      count: 430,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 79 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 21 }] },
      { label: 'Jewish',        count: 310,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 71 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 29 }] },
    ],
    byGender: [
      { label: 'Female',             count: 1540, candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 71 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 29 }] },
      { label: 'Male',               count: 1310, candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 60 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 40 }] },
      { label: 'Non-binary / Other', count: 110,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 87 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 13 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 1580, candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 91 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 9  }] },
      { label: 'Republican',           count: 640,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 12 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 88 }] },
      { label: 'Independent',          count: 740,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 61 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 39 }] },
      { label: 'No Party Affiliation', count: 360,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 55 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 45 }] },
    ],
  },

  // ── TX Senate — Ken Paxton (R) vs. James Talarico (D) ──
  {
    raceId: 'tx-sen',
    raceLabel: 'Senate',
    office: 'Senate',
    stateCode: 'TX',
    totalResponses: 5120,
    candidates: [
      { candidateId: 'tx-sen-1', name: 'Ken Paxton',      lastName: 'Paxton',   party: 'Republican', count: 3021, percent: 59 },
      { candidateId: 'tx-sen-2', name: 'James Talarico',  lastName: 'Talarico', party: 'Democrat',   count: 2099, percent: 41 },
    ],
    byAge: [
      { label: '18–24', count: 820,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 42 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 58 }] },
      { label: '25–34', count: 960,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 48 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 52 }] },
      { label: '35–44', count: 980,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 55 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 45 }] },
      { label: '45–54', count: 940,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 63 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 37 }] },
      { label: '55–64', count: 780,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 69 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 31 }] },
      { label: '65+',   count: 640,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 72 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 28 }] },
    ],
    byRace: [
      { label: 'White',               count: 2010, candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 72 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 28 }] },
      { label: 'Hispanic / Latino',   count: 1760, candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 48 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 52 }] },
      { label: 'Black / African Am.', count: 820,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 22 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 78 }] },
      { label: 'Asian / Pacific Is.', count: 340,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 43 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 57 }] },
      { label: 'Multiracial',         count: 190,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 50 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 50 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 2240, candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 72 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 28 }] },
      { label: 'Catholic',      count: 1180, candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 56 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 44 }] },
      { label: 'Non-religious', count: 980,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 38 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 62 }] },
      { label: 'Muslim',        count: 310,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 29 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 71 }] },
      { label: 'Jewish',        count: 410,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 34 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 66 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2530, candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 51 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 49 }] },
      { label: 'Male',               count: 2460, candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 67 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 33 }] },
      { label: 'Non-binary / Other', count: 130,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 31 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 69 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 1740, candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 9  }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 91 }] },
      { label: 'Republican',           count: 2280, candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 91 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 9  }] },
      { label: 'Independent',          count: 1100, candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 54 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 46 }] },
      { label: 'No Party Affiliation', count: 540,  candidates: [{ name: 'Ken Paxton', lastName: 'Paxton', party: 'Republican', percent: 48 }, { name: 'James Talarico', lastName: 'Talarico', party: 'Democrat', percent: 52 }] },
    ],
  },

  // ── TX Governor — Greg Abbott (R) vs. Gina Hinojosa (D) ─���
  {
    raceId: 'tx-gov',
    raceLabel: 'Governor',
    office: 'Governor',
    stateCode: 'TX',
    totalResponses: 4840,
    candidates: [
      { candidateId: 'tx-gov-1', name: 'Greg Abbott',    lastName: 'Abbott',   party: 'Republican', count: 2953, percent: 61 },
      { candidateId: 'tx-gov-2', name: 'Gina Hinojosa',  lastName: 'Hinojosa', party: 'Democrat',   count: 1887, percent: 39 },
    ],
    byAge: [
      { label: '18–24', count: 740,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 38 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 62 }] },
      { label: '25–34', count: 890,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 46 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 54 }] },
      { label: '35–44', count: 920,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 58 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 42 }] },
      { label: '45–54', count: 870,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 66 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 34 }] },
      { label: '55–64', count: 760,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 72 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 28 }] },
      { label: '65+',   count: 660,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 76 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 24 }] },
    ],
    byRace: [
      { label: 'White',               count: 1920, candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 74 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 26 }] },
      { label: 'Hispanic / Latino',   count: 1680, candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 50 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 50 }] },
      { label: 'Black / African Am.', count: 790,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 18 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 82 }] },
      { label: 'Asian / Pacific Is.', count: 300,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 40 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 60 }] },
      { label: 'Multiracial',         count: 150,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 48 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 52 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 2180, candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 75 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 25 }] },
      { label: 'Catholic',      count: 1140, candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 58 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 42 }] },
      { label: 'Non-religious', count: 900,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 34 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 66 }] },
      { label: 'Muslim',        count: 280,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 25 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 75 }] },
      { label: 'Jewish',        count: 340,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 31 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 69 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2390, candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 54 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 46 }] },
      { label: 'Male',               count: 2340, candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 68 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 32 }] },
      { label: 'Non-binary / Other', count: 110,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 28 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 72 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 1580, candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 8  }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 92 }] },
      { label: 'Republican',           count: 2240, candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 93 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 7  }] },
      { label: 'Independent',          count: 1020, candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 57 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 43 }] },
      { label: 'No Party Affiliation', count: 480,  candidates: [{ name: 'Greg Abbott', lastName: 'Abbott', party: 'Republican', percent: 51 }, { name: 'Gina Hinojosa', lastName: 'Hinojosa', party: 'Democrat', percent: 49 }] },
    ],
  },

  // ── TX House District 21 ──
  {
    raceId: 'tx-house-21',
    raceLabel: 'House – District 21',
    office: 'House',
    stateCode: 'TX',
    totalResponses: 2380,
    candidates: [
      { candidateId: 'tx-house-21-1', name: 'Kyle Barnett',   lastName: 'Barnett', party: 'Republican', count: 1404, percent: 59 },
      { candidateId: 'tx-house-21-2', name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', count: 976,  percent: 41 },
    ],
    byAge: [
      { label: '18–24', count: 390,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 44 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 56 }] },
      { label: '25–34', count: 450,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 51 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 49 }] },
      { label: '35–44', count: 470,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 58 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 42 }] },
      { label: '45–54', count: 430,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 64 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 36 }] },
      { label: '55–64', count: 360,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 69 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 31 }] },
      { label: '65+',   count: 280,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 73 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 27 }] },
    ],
    byRace: [
      { label: 'White',               count: 980,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 71 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 29 }] },
      { label: 'Hispanic / Latino',   count: 890,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 46 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 54 }] },
      { label: 'Black / African Am.', count: 320,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 21 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 79 }] },
      { label: 'Asian / Pacific Is.', count: 120,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 44 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 56 }] },
      { label: 'Multiracial',         count: 70,   candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 50 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 50 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 1090, candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 71 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 29 }] },
      { label: 'Catholic',      count: 590,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 54 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 46 }] },
      { label: 'Non-religious', count: 430,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 37 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 63 }] },
      { label: 'Muslim',        count: 150,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 28 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 72 }] },
      { label: 'Jewish',        count: 120,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 32 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 68 }] },
    ],
    byGender: [
      { label: 'Female',             count: 1190, candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 52 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 48 }] },
      { label: 'Male',               count: 1140, candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 66 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 34 }] },
      { label: 'Non-binary / Other', count: 50,   candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 34 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 66 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 800,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 9  }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 91 }] },
      { label: 'Republican',           count: 1080, candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 92 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 8  }] },
      { label: 'Independent',          count: 500,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 55 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 45 }] },
      { label: 'No Party Affiliation', count: 240,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 52 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 48 }] },
    ],
  },

  // ── NY Governor — Kathy Hochul (D, incumbent) vs. Bruce Blakeman (R) ──
  {
    raceId: 'ny-gov',
    raceLabel: 'Governor',
    office: 'Governor',
    stateCode: 'NY',
    totalResponses: 4980,
    candidates: [
      { candidateId: 'ny-gov-1', name: 'Kathy Hochul',    lastName: 'Hochul',   party: 'Democrat',   count: 3187, percent: 64 },
      { candidateId: 'ny-gov-2', name: 'Bruce Blakeman',  lastName: 'Blakeman', party: 'Republican', count: 1793, percent: 36 },
    ],
    byAge: [
      { label: '18–24', count: 890,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 75 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 25 }] },
      { label: '25–34', count: 1010, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 72 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 28 }] },
      { label: '35–44', count: 940,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 66 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 34 }] },
      { label: '45–54', count: 860,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 60 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 40 }] },
      { label: '55–64', count: 720,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 55 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 45 }] },
      { label: '65+',   count: 560,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 51 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 49 }] },
    ],
    byRace: [
      { label: 'White',               count: 1640, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 55 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 45 }] },
      { label: 'Black / African Am.', count: 1190, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 82 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 18 }] },
      { label: 'Hispanic / Latino',   count: 980,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 70 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 30 }] },
      { label: 'Asian / Pacific Is.', count: 740,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 73 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 27 }] },
      { label: 'Multiracial',         count: 430,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 67 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 33 }] },
    ],
    byReligion: [
      { label: 'Non-religious', count: 1490, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 76 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 24 }] },
      { label: 'Jewish',        count: 780,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 70 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 30 }] },
      { label: 'Catholic',      count: 1020, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 59 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 41 }] },
      { label: 'Christian',     count: 1090, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 52 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 48 }] },
      { label: 'Muslim',        count: 380,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 74 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 26 }] },
      { label: 'Hindu',         count: 220,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 78 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 22 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2560, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 69 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 31 }] },
      { label: 'Male',               count: 2230, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 57 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 43 }] },
      { label: 'Non-binary / Other', count: 190,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 85 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 15 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 2640, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 91 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 9  }] },
      { label: 'Republican',           count: 1320, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 10 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 90 }] },
      { label: 'Independent',          count: 1020, candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 56 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 44 }] },
      { label: 'No Party Affiliation', count: 500,  candidates: [{ name: 'Kathy Hochul', lastName: 'Hochul', party: 'Democrat', percent: 53 }, { name: 'Bruce Blakeman', lastName: 'Blakeman', party: 'Republican', percent: 47 }] },
    ],
  },

  // ── FL House District 7 — Cory Mills (R, incumbent) vs. Alan Grayson (D) ──
  {
    raceId: 'fl-house-7',
    raceLabel: 'House – District 7',
    stateCode: 'FL',
    office: 'House',
    totalResponses: 2140,
    candidates: [
      { candidateId: 'fl-house-7-2', name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat',   count: 1113, percent: 52 },
      { candidateId: 'fl-house-7-1', name: 'Cory Mills',   lastName: 'Mills',   party: 'Republican', count: 1027, percent: 48 },
    ],
    byAge: [
      { label: '18–24', count: 410, candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 61 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 39 }] },
      { label: '25–34', count: 480, candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 57 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 43 }] },
      { label: '35–44', count: 390, candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 52 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 48 }] },
      { label: '45–54', count: 340, candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 46 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 54 }] },
      { label: '55–64', count: 290, candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 42 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 58 }] },
      { label: '65+',   count: 230, candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 38 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 62 }] },
    ],
    byRace: [
      { label: 'White',               count: 890,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 44 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 56 }] },
      { label: 'Black / African Am.', count: 510,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 72 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 28 }] },
      { label: 'Hispanic / Latino',   count: 490,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 55 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 45 }] },
      { label: 'Asian / Pacific Is.', count: 180,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 59 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 41 }] },
      { label: 'Multiracial',         count: 70,   candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 53 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 47 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 780,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 41 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 59 }] },
      { label: 'Catholic',      count: 390,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 49 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 51 }] },
      { label: 'Non-religious', count: 640,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 65 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 35 }] },
      { label: 'Jewish',        count: 180,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 60 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 40 }] },
      { label: 'Muslim',        count: 150,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 67 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 33 }] },
    ],
    byGender: [
      { label: 'Female',             count: 1100, candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 58 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 42 }] },
      { label: 'Male',               count: 980,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 45 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 55 }] },
      { label: 'Non-binary / Other', count: 60,   candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 73 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 27 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 960,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 89 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 11 }] },
      { label: 'Republican',           count: 600,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 10 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 90 }] },
      { label: 'Independent',          count: 580,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 50 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 50 }] },
      { label: 'No Party Affiliation', count: 280,  candidates: [{ name: 'Alan Grayson', lastName: 'Grayson', party: 'Democrat', percent: 46 }, { name: 'Cory Mills', lastName: 'Mills', party: 'Republican', percent: 54 }] },
    ],
  },
]

// ─── Party helpers ─────────────────────────────────────────────────��──────────

export function partyColor(party: Party): { ring: string; bg: string; text: string; badge: string } {
  switch (party) {
    case 'Democrat':
      return { ring: '#3b82f6', bg: '#dbeafe', text: '#1e40af', badge: 'bg-blue-100 text-blue-800' }
    case 'Republican':
      return { ring: '#ef4444', bg: '#fee2e2', text: '#991b1b', badge: 'bg-red-100 text-red-800' }
    case 'Independent':
      return { ring: '#8b5cf6', bg: '#ede9fe', text: '#5b21b6', badge: 'bg-violet-100 text-violet-800' }
    case 'Green':
      return { ring: '#22c55e', bg: '#dcfce7', text: '#166534', badge: 'bg-green-100 text-green-800' }
    case 'Libertarian':
      return { ring: '#f59e0b', bg: '#fef3c7', text: '#92400e', badge: 'bg-amber-100 text-amber-800' }
    default:
      return { ring: '#6b7280', bg: '#f3f4f6', text: '#374151', badge: 'bg-gray-100 text-gray-800' }
  }
}
