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

// ─────────────────────────────────────────────────────────────────────────────
// SWING STATE BATCH 1 — AZ · GA · MI
// ─────────────────────────────────────────────────────────────────────────────

// ── ARIZONA ──────────────────────────────────────────────────────────────────

CANDIDATES.push(
  {
    candidateId: 'az-sen-1', name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const,
    office: 'U.S. Senate', state: 'Arizona', stateCode: 'AZ',
    bio: 'Ruben Gallego is the incumbent U.S. Senator from Arizona, elected in 2024. A Marine Corps veteran and former U.S. Representative, Gallego has focused on veterans\' affairs, border security from a humanitarian angle, and expanding access to healthcare. He is seeking his first full Senate term in 2026.',
    keyIssues: ['Veterans healthcare & benefits', 'Border policy reform', 'Water rights & drought management', 'Expanding Medicare', 'Tribal nation sovereignty'],
    fundedBy: ['Emily\'s List', 'SEIU', 'ActBlue small donors', 'Arizona trial lawyers'],
    website: 'https://rubengallego.com', twitter: '@RubenGallego', instagram: '@rubengallego', imageUrl: '',
  },
  {
    candidateId: 'az-sen-2', name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const,
    office: 'U.S. Senate', state: 'Arizona', stateCode: 'AZ',
    bio: 'Kari Lake is a former Phoenix TV news anchor and 2022 Republican gubernatorial nominee. A prominent Trump ally, Lake ran for Senate in 2024 and has announced she will run again in 2026, focusing on election integrity, border security, and opposing federal overreach.',
    keyIssues: ['Border security & immigration enforcement', 'Election integrity', 'Second Amendment rights', 'Reducing federal spending', 'Energy independence'],
    fundedBy: ['Trump-aligned PACs', 'America First Action', 'Small-dollar MAGA donors', 'Club for Growth'],
    website: 'https://karilake.com', twitter: '@KariLake', instagram: '@karilake', imageUrl: '',
  },
  {
    candidateId: 'az-gov-1', name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const,
    office: 'Governor', state: 'Arizona', stateCode: 'AZ',
    bio: 'Katie Hobbs is the incumbent Governor of Arizona, elected in 2022 in one of the narrowest gubernatorial races in state history. A former state legislator and Secretary of State, Hobbs has prioritized water conservation, education funding, and reproductive rights. She is running for re-election in 2026.',
    keyIssues: ['Water conservation & Colorado River', 'Reproductive rights', 'Education funding', 'Housing affordability', 'Economic development'],
    fundedBy: ['Arizona Education Association', 'Planned Parenthood Action', 'ActBlue', 'Progressive donors'],
    website: 'https://katiehobbs.com', twitter: '@katiehobbs', instagram: '@katiehobbs', imageUrl: '',
  },
  {
    candidateId: 'az-gov-2', name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const,
    office: 'Governor', state: 'Arizona', stateCode: 'AZ',
    bio: 'Abe Hamadeh is an Arizona attorney and former Republican nominee for state Attorney General in 2022, losing by fewer than 300 votes. A strong Trump endorsee, Hamadeh has declared his candidacy for Governor in 2026, running on border enforcement, election security, and reducing government regulation.',
    keyIssues: ['Border enforcement', 'Election security', 'Reducing regulation & taxes', 'Public safety', 'Parental rights in education'],
    fundedBy: ['Arizona GOP', 'Trump-aligned donors', 'Law enforcement PACs', 'Small business groups'],
    website: 'https://abehamadeh.com', twitter: '@AbeHamadeh', instagram: '@abehamadeh', imageUrl: '',
  }
)

PROPOSITIONS.push(
  {
    propId: 'az-prop-1', stateCode: 'AZ',
    title: 'Proposition 140 — Open Primary Elections',
    summary: 'Establishes a single open primary where all candidates compete together, with the top finishers advancing to the general election regardless of party. Aims to give Arizona\'s 36% of independent voters a meaningful primary vote.',
    category: 'Voting & Elections',
    forArgument: 'Opens democracy to independent voters, reduces extremism by forcing candidates to appeal to a broader electorate, and gives every registered voter equal standing in the primary.',
    againstArgument: 'Weakens political parties\' right to nominate their own candidates, risks advancing two candidates from the same party to the general election, and may dilute minority-party representation.',
    fiscalImpact: 'Estimated $1–3 million in one-time implementation costs absorbed by the Secretary of State\'s office.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'az-prop-2', stateCode: 'AZ',
    title: 'Proposition 141 — Water Infrastructure Bond',
    summary: 'Authorizes $1 billion in general obligation bonds to fund water infrastructure projects including new storage facilities, pipeline repairs, and drought contingency programs to address Arizona\'s long-term water crisis.',
    category: 'Environment',
    forArgument: 'Arizona faces an existential water shortage. This investment secures long-term supply for future generations, protects agricultural communities, and funds infrastructure that private markets will not build.',
    againstArgument: 'Adds $1 billion to state debt with interest costs exceeding $400 million over the bond\'s life. The state should fund water projects through existing revenues rather than borrowing.',
    fiscalImpact: 'Net cost estimated at $1.4 billion over 20 years including interest, repaid through a property tax levy.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'az-prop-3', stateCode: 'AZ',
    title: 'Proposition 142 — Minimum Wage Increase',
    summary: 'Gradually increases Arizona\'s minimum wage from $14.70 to $18.00 per hour by 2028, with annual cost-of-living adjustments thereafter, covering all workers including tipped employees.',
    category: 'Economy',
    forArgument: 'Low-wage workers have lost purchasing power as housing costs soared. Raising wages boosts consumer spending, reduces reliance on government assistance, and closes the gap between working and poverty.',
    againstArgument: 'Small businesses — particularly restaurants and retailers — face higher labor costs that lead to layoffs, reduced hours, and price increases that hurt the workers the measure aims to help.',
    fiscalImpact: 'Increases wages for an estimated 380,000 Arizona workers. State and local governments would face $120 million in increased payroll costs.',
    status: 'On Ballot' as const,
  }
)

RACES_BY_STATE['AZ'] = [
  { raceId: 'az-gov', raceLabel: 'Governor', stateCode: 'AZ', office: 'Governor', candidates: [
    { candidateId: 'az-gov-1', name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, count: 0, percent: 0 },
    { candidateId: 'az-gov-2', name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, count: 0, percent: 0 },
  ]},
  { raceId: 'az-sen', raceLabel: 'U.S. Senate', stateCode: 'AZ', office: 'Senate', candidates: [
    { candidateId: 'az-sen-1', name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, count: 0, percent: 0 },
    { candidateId: 'az-sen-2', name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, count: 0, percent: 0 },
  ]},
]

RACE_RESULTS.push(
  { raceId: 'az-gov', raceLabel: 'Governor', stateCode: 'AZ', office: 'Governor', totalResponses: 3980,
    candidates: [
      { candidateId: 'az-gov-1', name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, count: 2070, percent: 52 },
      { candidateId: 'az-gov-2', name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, count: 1910, percent: 48 },
    ],
    byAge: [
      { label: '18–24', count: 580, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 62 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 38 }] },
      { label: '25–34', count: 740, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 57 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 43 }] },
      { label: '35–44', count: 820, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 52 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 48 }] },
      { label: '45–54', count: 760, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 49 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 51 }] },
      { label: '55–64', count: 640, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 44 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 56 }] },
      { label: '65+',   count: 440, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 41 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 59 }] },
    ],
    byRace: [
      { label: 'White',             count: 1980, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 46 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 54 }] },
      { label: 'Hispanic / Latino', count: 1040, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 65 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 35 }] },
      { label: 'Black / African Am.', count: 420, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 75 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 25 }] },
      { label: 'Native American',   count: 250,  candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 70 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 30 }] },
      { label: 'Asian / Pacific Is.', count: 290, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 59 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 41 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 1590, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 43 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 57 }] },
      { label: 'Catholic',      count: 780,  candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 53 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 47 }] },
      { label: 'Non-religious', count: 1050, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 68 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 32 }] },
      { label: 'Mormon / LDS',  count: 360,  candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 30 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 70 }] },
      { label: 'Jewish',        count: 200,  candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 63 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 37 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2060, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 58 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 42 }] },
      { label: 'Male',               count: 1840, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 45 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 55 }] },
      { label: 'Non-binary / Other', count: 80,   candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 71 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 29 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 1590, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 93 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 7  }] },
      { label: 'Republican',           count: 1340, candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 7  }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 93 }] },
      { label: 'Independent',          count: 800,  candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 52 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 48 }] },
      { label: 'No Party Affiliation', count: 250,  candidates: [{ name: 'Katie Hobbs', lastName: 'Hobbs', party: 'Democrat' as const, percent: 49 }, { name: 'Abe Hamadeh', lastName: 'Hamadeh', party: 'Republican' as const, percent: 51 }] },
    ],
  },
  { raceId: 'az-sen', raceLabel: 'U.S. Senate', stateCode: 'AZ', office: 'Senate', totalResponses: 4210,
    candidates: [
      { candidateId: 'az-sen-1', name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, count: 2189, percent: 52 },
      { candidateId: 'az-sen-2', name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, count: 2021, percent: 48 },
    ],
    byAge: [
      { label: '18–24', count: 620, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 64 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 36 }] },
      { label: '25–34', count: 780, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 58 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 42 }] },
      { label: '35–44', count: 840, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 53 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 47 }] },
      { label: '45–54', count: 790, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 48 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 52 }] },
      { label: '55–64', count: 680, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 44 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 56 }] },
      { label: '65+',   count: 500, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 40 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 60 }] },
    ],
    byRace: [
      { label: 'White',             count: 2100, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 44 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 56 }] },
      { label: 'Hispanic / Latino', count: 1100, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 68 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 32 }] },
      { label: 'Black / African Am.', count: 440, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 74 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 26 }] },
      { label: 'Native American',   count: 260,  candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 72 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 28 }] },
      { label: 'Asian / Pacific Is.', count: 310, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 60 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 40 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 1680, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 42 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 58 }] },
      { label: 'Catholic',      count: 820,  candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 54 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 46 }] },
      { label: 'Non-religious', count: 1100, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 67 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 33 }] },
      { label: 'Mormon / LDS',  count: 380,  candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 28 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 72 }] },
      { label: 'Jewish',        count: 230,  candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 61 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 39 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2180, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 57 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 43 }] },
      { label: 'Male',               count: 1940, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 46 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 54 }] },
      { label: 'Non-binary / Other', count: 90,   candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 70 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 30 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 1680, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 92 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 8  }] },
      { label: 'Republican',           count: 1420, candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 8  }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 92 }] },
      { label: 'Independent',          count: 840,  candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 51 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 49 }] },
      { label: 'No Party Affiliation', count: 270,  candidates: [{ name: 'Ruben Gallego', lastName: 'Gallego', party: 'Democrat' as const, percent: 48 }, { name: 'Kari Lake', lastName: 'Lake', party: 'Republican' as const, percent: 52 }] },
    ],
  }
)

// ── GEORGIA ───────────────────────────────────────────────────────────────────

CANDIDATES.push(
  {
    candidateId: 'ga-gov-1', name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const,
    office: 'Governor', state: 'Georgia', stateCode: 'GA',
    bio: 'Brian Kemp is the incumbent Governor of Georgia, serving since 2019. He won re-election in 2022 by 8 points despite Trump\'s opposition, focusing on economic development, job creation, and fiscal conservatism while navigating tensions within the GOP over his refusal to overturn the 2020 election results.',
    keyIssues: ['Economic development & job creation', 'Public safety & law enforcement', 'Infrastructure investment', 'Workforce development', 'Fiscal conservatism & tax cuts'],
    fundedBy: ['Georgia Chamber of Commerce', 'Business PACs', 'Republican Governors Association', 'Real estate interests'],
    website: 'https://briankemp.com', twitter: '@BrianKempGA', instagram: '@briankempga', imageUrl: '',
  },
  {
    candidateId: 'ga-gov-2', name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const,
    office: 'Governor', state: 'Georgia', stateCode: 'GA',
    bio: 'Stacey Abrams is a former Georgia state House Minority Leader, voting rights advocate, and two-time gubernatorial candidate. Founder of Fair Fight Action, she is credited with transforming Georgia into a competitive state. Abrams has signaled potential interest in a 2026 campaign.',
    keyIssues: ['Voting rights & access', 'Expanding Medicaid', 'Education investment', 'Reproductive rights', 'Economic equity & workers\' rights'],
    fundedBy: ['Emily\'s List', 'ActBlue', 'Labor unions', 'National progressive donors'],
    website: 'https://staceyabrams.com', twitter: '@staceyabrams', instagram: '@staceyabrams', imageUrl: '',
  },
  {
    candidateId: 'ga-sen-1', name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const,
    office: 'U.S. Senate', state: 'Georgia', stateCode: 'GA',
    bio: 'Jon Ossoff is the incumbent U.S. Senator from Georgia, elected in the landmark January 2021 runoff election that flipped the Senate to Democratic control. A documentary filmmaker and former investigative journalist, Ossoff has focused on government accountability, veterans\' healthcare, and fighting corruption. He is up for re-election in 2026.',
    keyIssues: ['Government accountability & anti-corruption', 'Veterans\' healthcare', 'Small business support', 'Criminal justice reform', 'Infrastructure & broadband access'],
    fundedBy: ['ActBlue small donors', 'Georgia trial lawyers', 'Emily\'s List', 'Labor unions'],
    website: 'https://ossoff.senate.gov', twitter: '@ossoff', instagram: '@jonossoff', imageUrl: '',
  },
  {
    candidateId: 'ga-sen-2', name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const,
    office: 'U.S. Senate', state: 'Georgia', stateCode: 'GA',
    bio: 'Marjorie Taylor Greene is the U.S. Representative for Georgia\'s 14th Congressional District. A prominent Trump ally, she has announced a 2026 Senate run against Jon Ossoff, running on border security, America First foreign policy, and cutting federal spending.',
    keyIssues: ['Border security & immigration enforcement', 'America First foreign policy', 'Second Amendment rights', 'Opposing federal spending', 'Cultural conservatism'],
    fundedBy: ['Small-dollar MAGA donors', 'America First Action', 'Gun rights PACs', 'Conservative media figures'],
    website: 'https://marjorietaylorgreene.com', twitter: '@mtgreenee', instagram: '@mtgreenee', imageUrl: '',
  }
)

PROPOSITIONS.push(
  {
    propId: 'ga-prop-1', stateCode: 'GA',
    title: 'Amendment 1 — Georgia Tax Court',
    summary: 'Establishes a state Tax Court as a court of record to hear state tax disputes, replacing the current administrative process. Judges would be appointed by the Governor and confirmed by the Senate.',
    category: 'Government & Taxes',
    forArgument: 'Creates a specialized court with judges who understand complex tax law, provides taxpayers with a neutral judicial forum independent of the agencies that assessed the tax, and streamlines dispute resolution.',
    againstArgument: 'Adds a new layer of government bureaucracy, may favor wealthy corporations with resources to litigate, and could reduce state revenue by making it easier to challenge assessments.',
    fiscalImpact: 'Estimated $4–6 million annually for court operations, offset by reduced administrative costs at the Department of Revenue.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'ga-prop-2', stateCode: 'GA',
    title: 'Referendum A — Homestead Tax Exemption Expansion',
    summary: 'Expands the existing homestead property tax exemption, capping annual assessment increases at 3% for homeowners who have owned their primary residence for more than 5 years.',
    category: 'Economy',
    forArgument: 'Protects long-term Georgia homeowners from being priced out of their homes by rapid property value increases, provides relief to fixed-income seniors, and encourages neighborhood stability.',
    againstArgument: 'Reduces funding available for schools and local governments, shifts the tax burden toward renters and newer homeowners, and may slow housing turnover in already tight markets.',
    fiscalImpact: 'Reduces local property tax revenue by an estimated $800 million annually statewide, requiring compensating adjustments from the General Assembly.',
    status: 'On Ballot' as const,
  }
)

RACES_BY_STATE['GA'] = [
  { raceId: 'ga-gov', raceLabel: 'Governor', stateCode: 'GA', office: 'Governor', candidates: [
    { candidateId: 'ga-gov-1', name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, count: 0, percent: 0 },
    { candidateId: 'ga-gov-2', name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, count: 0, percent: 0 },
  ]},
  { raceId: 'ga-sen', raceLabel: 'U.S. Senate', stateCode: 'GA', office: 'Senate', candidates: [
    { candidateId: 'ga-sen-1', name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, count: 0, percent: 0 },
    { candidateId: 'ga-sen-2', name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, count: 0, percent: 0 },
  ]},
]

RACE_RESULTS.push(
  { raceId: 'ga-gov', raceLabel: 'Governor', stateCode: 'GA', office: 'Governor', totalResponses: 5120,
    candidates: [
      { candidateId: 'ga-gov-1', name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, count: 2714, percent: 53 },
      { candidateId: 'ga-gov-2', name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, count: 2406, percent: 47 },
    ],
    byAge: [
      { label: '18–24', count: 740,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 38 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 62 }] },
      { label: '25–34', count: 890,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 44 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 56 }] },
      { label: '35–44', count: 1020, candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 51 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 49 }] },
      { label: '45–54', count: 980,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 57 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 43 }] },
      { label: '55–64', count: 820,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 60 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 40 }] },
      { label: '65+',   count: 670,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 63 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 37 }] },
    ],
    byRace: [
      { label: 'White',               count: 2560, candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 69 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 31 }] },
      { label: 'Black / African Am.', count: 1790, candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 12 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 88 }] },
      { label: 'Hispanic / Latino',   count: 430,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 48 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 52 }] },
      { label: 'Asian / Pacific Is.', count: 240,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 42 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 58 }] },
      { label: 'Multiracial',         count: 100,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 45 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 55 }] },
    ],
    byReligion: [
      { label: 'Evangelical',   count: 1840, candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 78 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 22 }] },
      { label: 'Catholic',      count: 620,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 52 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 48 }] },
      { label: 'Black Church',  count: 980,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 11 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 89 }] },
      { label: 'Non-religious', count: 1060, candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 36 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 64 }] },
      { label: 'Jewish',        count: 620,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 41 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 59 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2660, candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 48 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 52 }] },
      { label: 'Male',               count: 2380, candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 59 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 41 }] },
      { label: 'Non-binary / Other', count: 80,   candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 28 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 72 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 1940, candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 6  }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 94 }] },
      { label: 'Republican',           count: 2060, candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 95 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 5  }] },
      { label: 'Independent',          count: 880,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 54 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 46 }] },
      { label: 'No Party Affiliation', count: 240,  candidates: [{ name: 'Brian Kemp', lastName: 'Kemp', party: 'Republican' as const, percent: 50 }, { name: 'Stacey Abrams', lastName: 'Abrams', party: 'Democrat' as const, percent: 50 }] },
    ],
  },
  { raceId: 'ga-sen', raceLabel: 'U.S. Senate', stateCode: 'GA', office: 'Senate', totalResponses: 4870,
    candidates: [
      { candidateId: 'ga-sen-1', name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, count: 2386, percent: 49 },
      { candidateId: 'ga-sen-2', name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, count: 2484, percent: 51 },
    ],
    byAge: [
      { label: '18–24', count: 700,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 63 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 37 }] },
      { label: '25–34', count: 850,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 56 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 44 }] },
      { label: '35–44', count: 970,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 49 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 51 }] },
      { label: '45–54', count: 940,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 45 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 55 }] },
      { label: '55–64', count: 780,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 42 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 58 }] },
      { label: '65+',   count: 630,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 38 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 62 }] },
    ],
    byRace: [
      { label: 'White',               count: 2430, candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 35 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 65 }] },
      { label: 'Black / African Am.', count: 1700, candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 86 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 14 }] },
      { label: 'Hispanic / Latino',   count: 410,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 53 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 47 }] },
      { label: 'Asian / Pacific Is.', count: 230,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 61 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 39 }] },
      { label: 'Multiracial',         count: 100,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 55 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 45 }] },
    ],
    byReligion: [
      { label: 'Evangelical',   count: 1750, candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 20 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 80 }] },
      { label: 'Catholic',      count: 590,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 48 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 52 }] },
      { label: 'Black Church',  count: 940,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 87 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 13 }] },
      { label: 'Non-religious', count: 1010, candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 67 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 33 }] },
      { label: 'Jewish',        count: 580,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 62 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 38 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2530, candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 54 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 46 }] },
      { label: 'Male',               count: 2260, candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 43 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 57 }] },
      { label: 'Non-binary / Other', count: 80,   candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 69 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 31 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 1850, candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 93 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 7  }] },
      { label: 'Republican',           count: 1960, candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 6  }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 94 }] },
      { label: 'Independent',          count: 840,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 49 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 51 }] },
      { label: 'No Party Affiliation', count: 220,  candidates: [{ name: 'Jon Ossoff', lastName: 'Ossoff', party: 'Democrat' as const, percent: 47 }, { name: 'Marjorie Taylor Greene', lastName: 'Greene', party: 'Republican' as const, percent: 53 }] },
    ],
  }
)

// ── MICHIGAN ──────────────────────────────────────────────────────────────────

CANDIDATES.push(
  {
    candidateId: 'mi-gov-2', name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const,
    office: 'Governor', state: 'Michigan', stateCode: 'MI',
    bio: 'Tudor Dixon is a conservative commentator, businesswoman, and the 2022 Republican gubernatorial nominee in Michigan, losing to Gretchen Whitmer by 10 points. Dixon has signaled interest in running again in 2026 as Whitmer is term-limited out, running on education parental rights, reversing clean energy mandates, and border security.',
    keyIssues: ['Parental rights in education', 'Reversing clean energy mandates', 'Reducing business regulation', 'Public safety & crime', 'Election integrity'],
    fundedBy: ['DeVos family network', 'Michigan Business community', 'Republican Governors Association', 'Conservative PACs'],
    website: 'https://tudordixon.com', twitter: '@TudorDixon', instagram: '@tudordixon', imageUrl: '',
  },
  {
    candidateId: 'mi-gov-1', name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const,
    office: 'Governor', state: 'Michigan', stateCode: 'MI',
    bio: 'Garlin Gilchrist is the Lieutenant Governor of Michigan under Gretchen Whitmer and is widely seen as the leading Democratic candidate for Governor in 2026 as Whitmer is term-limited. A former technology executive and Detroit native, Gilchrist has focused on economic development, clean energy jobs, and closing the racial wealth gap.',
    keyIssues: ['Clean energy jobs & economic development', 'Closing racial wealth gaps', 'Education investment', 'Reproductive rights', 'Infrastructure modernization'],
    fundedBy: ['Michigan UAW & labor unions', 'Emily\'s List', 'ActBlue', 'Tech community donors'],
    website: 'https://garlingilchrist.com', twitter: '@GarlinGilchrist', instagram: '@garlingilchrist', imageUrl: '',
  },
  {
    candidateId: 'mi-sen-1', name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const,
    office: 'U.S. Senate', state: 'Michigan', stateCode: 'MI',
    bio: 'Gary Peters is the incumbent U.S. Senator from Michigan, first elected in 2014 and re-elected in 2020. Chair of the Senate Homeland Security Committee, Peters has focused on Great Lakes protection, automotive industry support, cybersecurity, and veterans\' healthcare. He is seeking a third term in 2026.',
    keyIssues: ['Great Lakes protection', 'Automotive industry & manufacturing jobs', 'Cybersecurity & national security', 'Veterans\' healthcare', 'Bipartisan infrastructure investment'],
    fundedBy: ['Michigan labor unions (UAW, SEIU)', 'Environmental groups', 'ActBlue', 'Defense contractors'],
    website: 'https://peters.senate.gov', twitter: '@SenGaryPeters', instagram: '@sengpeters', imageUrl: '',
  },
  {
    candidateId: 'mi-sen-2', name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const,
    office: 'U.S. Senate', state: 'Michigan', stateCode: 'MI',
    bio: 'Mike Rogers is a former U.S. Representative and former chair of the House Intelligence Committee. A former FBI agent known as a national security hawk, Rogers ran for Senate in 2024 and is expected to run again in 2026, focusing on China competition, border security, and cutting federal spending.',
    keyIssues: ['China & national security threats', 'Border security', 'Cutting federal spending', 'Law enforcement support', 'Second Amendment rights'],
    fundedBy: ['Defense industry PACs', 'National Republican Senatorial Committee', 'Michigan business community', 'Law enforcement groups'],
    website: 'https://mikerogers.com', twitter: '@MikeRogersMI', instagram: '@mikerogers', imageUrl: '',
  }
)

PROPOSITIONS.push(
  {
    propId: 'mi-prop-1', stateCode: 'MI',
    title: 'Proposal 1 — Repeal of Clean Energy Mandate',
    summary: 'A citizen-initiated petition to repeal Michigan\'s 2023 Clean Energy and Jobs Act, which requires utilities to generate 100% clean energy by 2040. Opponents of the mandate gathered enough signatures to place a repeal on the 2026 ballot.',
    category: 'Environment',
    forArgument: 'The 100% clean energy mandate will raise electricity rates for Michigan families, threatens grid reliability, and was passed without sufficient study of economic impacts on the automotive and manufacturing sectors.',
    againstArgument: 'Michigan\'s clean energy transition will create tens of thousands of jobs, reduce long-term energy costs, protect the Great Lakes, and position Michigan as a leader in the emerging clean economy.',
    fiscalImpact: 'Repeal could save utilities $2–4 billion in compliance costs over 15 years, but would forfeit an estimated $10 billion in federal clean energy investment tied to the mandate.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'mi-prop-2', stateCode: 'MI',
    title: 'Proposal 2 — Paid Family and Medical Leave',
    summary: 'Expands Michigan\'s existing paid sick leave law to create a statewide paid family and medical leave program providing up to 15 weeks of paid leave, funded through a 1.1% payroll tax split between employers and employees.',
    category: 'Healthcare',
    forArgument: 'Michigan is one of only 11 states without paid family leave. Paid leave improves child health outcomes, supports working mothers, reduces employee turnover, and keeps Michigan competitive with neighboring states.',
    againstArgument: 'A 1.1% payroll tax increases costs for small businesses already struggling with inflation, may deter hiring, and creates a new government bureaucracy when private employers should set their own leave policies.',
    fiscalImpact: 'Raises approximately $1.2 billion annually from the payroll tax. Benefits would be paid to an estimated 400,000 Michigan workers per year.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'mi-prop-3', stateCode: 'MI',
    title: 'Proposal 3 — Recreational Cannabis Tax Restructuring',
    summary: 'Restructures the 10% excise tax on recreational cannabis sales, directing a larger portion to roads and bridges rather than schools and municipalities, and reduces licensing fees for small cannabis businesses.',
    category: 'Economy',
    forArgument: 'Roads are Michigan\'s most visible infrastructure crisis. Cannabis tax revenue should fund road repair, and small business relief will diversify the cannabis market away from large corporations.',
    againstArgument: 'Schools and municipalities depend on existing cannabis tax revenue and should not see it redirected. Roads already have dedicated funding streams.',
    fiscalImpact: 'Redirects approximately $80 million annually from school and municipal funds to road funding. Licensing fee reductions reduce state revenue by an estimated $12 million annually.',
    status: 'On Ballot' as const,
  }
)

RACES_BY_STATE['MI'] = [
  { raceId: 'mi-gov', raceLabel: 'Governor', stateCode: 'MI', office: 'Governor', candidates: [
    { candidateId: 'mi-gov-1', name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, count: 0, percent: 0 },
    { candidateId: 'mi-gov-2', name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, count: 0, percent: 0 },
  ]},
  { raceId: 'mi-sen', raceLabel: 'U.S. Senate', stateCode: 'MI', office: 'Senate', candidates: [
    { candidateId: 'mi-sen-1', name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, count: 0, percent: 0 },
    { candidateId: 'mi-sen-2', name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, count: 0, percent: 0 },
  ]},
]

RACE_RESULTS.push(
  { raceId: 'mi-gov', raceLabel: 'Governor', stateCode: 'MI', office: 'Governor', totalResponses: 5640,
    candidates: [
      { candidateId: 'mi-gov-1', name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, count: 3045, percent: 54 },
      { candidateId: 'mi-gov-2', name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, count: 2595, percent: 46 },
    ],
    byAge: [
      { label: '18–24', count: 820,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 66 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 34 }] },
      { label: '25–34', count: 980,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 61 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 39 }] },
      { label: '35–44', count: 1100, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 55 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 45 }] },
      { label: '45–54', count: 1060, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 50 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 50 }] },
      { label: '55–64', count: 900,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 46 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 54 }] },
      { label: '65+',   count: 780,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 42 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 58 }] },
    ],
    byRace: [
      { label: 'White',               count: 3380, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 49 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 51 }] },
      { label: 'Black / African Am.', count: 1300, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 88 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 12 }] },
      { label: 'Hispanic / Latino',   count: 480,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 59 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 41 }] },
      { label: 'Asian / Pacific Is.', count: 320,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 64 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 36 }] },
      { label: 'Arab American',       count: 160,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 52 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 48 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 2100, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 44 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 56 }] },
      { label: 'Catholic',      count: 1040, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 52 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 48 }] },
      { label: 'Non-religious', count: 1580, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 70 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 30 }] },
      { label: 'Muslim',        count: 480,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 55 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 45 }] },
      { label: 'Jewish',        count: 440,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 66 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 34 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2930, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 60 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 40 }] },
      { label: 'Male',               count: 2610, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 47 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 53 }] },
      { label: 'Non-binary / Other', count: 100,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 73 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 27 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 2130, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 94 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 6  }] },
      { label: 'Republican',           count: 1980, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 7  }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 93 }] },
      { label: 'Independent',          count: 1240, candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 55 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 45 }] },
      { label: 'No Party Affiliation', count: 290,  candidates: [{ name: 'Garlin Gilchrist', lastName: 'Gilchrist', party: 'Democrat' as const, percent: 52 }, { name: 'Tudor Dixon', lastName: 'Dixon', party: 'Republican' as const, percent: 48 }] },
    ],
  },
  { raceId: 'mi-sen', raceLabel: 'U.S. Senate', stateCode: 'MI', office: 'Senate', totalResponses: 5280,
    candidates: [
      { candidateId: 'mi-sen-1', name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, count: 2745, percent: 52 },
      { candidateId: 'mi-sen-2', name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, count: 2535, percent: 48 },
    ],
    byAge: [
      { label: '18–24', count: 760,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 62 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 38 }] },
      { label: '25–34', count: 920,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 57 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 43 }] },
      { label: '35–44', count: 1040, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 52 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 48 }] },
      { label: '45–54', count: 1000, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 49 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 51 }] },
      { label: '55–64', count: 860,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 44 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 56 }] },
      { label: '65+',   count: 700,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 40 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 60 }] },
    ],
    byRace: [
      { label: 'White',               count: 3160, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 46 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 54 }] },
      { label: 'Black / African Am.', count: 1220, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 80 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 20 }] },
      { label: 'Hispanic / Latino',   count: 460,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 57 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 43 }] },
      { label: 'Asian / Pacific Is.', count: 290,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 62 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 38 }] },
      { label: 'Arab American',       count: 150,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 48 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 52 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 1980, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 43 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 57 }] },
      { label: 'Catholic',      count: 980,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 51 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 49 }] },
      { label: 'Non-religious', count: 1490, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 68 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 32 }] },
      { label: 'Muslim',        count: 460,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 51 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 49 }] },
      { label: 'Jewish',        count: 370,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 63 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 37 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2740, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 57 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 43 }] },
      { label: 'Male',               count: 2440, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 46 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 54 }] },
      { label: 'Non-binary / Other', count: 100,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 71 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 29 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 2000, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 93 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 7  }] },
      { label: 'Republican',           count: 1870, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 6  }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 94 }] },
      { label: 'Independent',          count: 1160, candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 54 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 46 }] },
      { label: 'No Party Affiliation', count: 250,  candidates: [{ name: 'Gary Peters', lastName: 'Peters', party: 'Democrat' as const, percent: 50 }, { name: 'Mike Rogers', lastName: 'Rogers', party: 'Republican' as const, percent: 50 }] },
    ],
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// SWING STATE BATCH 2 — NV · NC · PA · WI
// ─────────────────────────────────────────────────────────────────────────────

// ── NEVADA ────────────────────────────────────────────────────────────────────

CANDIDATES.push(
  {
    candidateId: 'nv-gov-1', name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const,
    office: 'Governor', state: 'Nevada', stateCode: 'NV',
    bio: 'Joe Lombardo is the incumbent Governor of Nevada, elected in 2022 after serving as Clark County Sheriff. A former Las Vegas Metropolitan Police officer, Lombardo has governed as a moderate Republican, vetoing several Democratic bills while supporting some bipartisan measures. He is running for re-election in 2026.',
    keyIssues: ['Public safety & law enforcement', 'Economic development & tourism', 'Education reform', 'Water conservation', 'Reducing government spending'],
    fundedBy: ['Nevada business community', 'Republican Governors Association', 'Law enforcement PACs', 'Gaming industry'],
    website: 'https://joelombardo.com', twitter: '@JoeLombardoNV', instagram: '@joelombardo', imageUrl: '',
  },
  {
    candidateId: 'nv-gov-2', name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const,
    office: 'Governor', state: 'Nevada', stateCode: 'NV',
    bio: 'Steven Horsford is a U.S. Representative for Nevada\'s 4th Congressional District and former Nevada State Senate Majority Leader. A labor leader and longtime Nevada political figure, Horsford has announced a 2026 gubernatorial run focusing on workers\' rights, healthcare access, and diversifying Nevada\'s economy beyond gaming and tourism.',
    keyIssues: ['Workers\' rights & labor protections', 'Healthcare access & affordability', 'Economic diversification', 'Education funding', 'Voting rights'],
    fundedBy: ['Culinary Workers Union Local 226', 'ActBlue', 'Nevada Democrats', 'Labor unions'],
    website: 'https://stevenhorsford.com', twitter: '@StevenHorsford', instagram: '@stevenhorsford', imageUrl: '',
  },
  {
    candidateId: 'nv-sen-1', name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const,
    office: 'U.S. Senate', state: 'Nevada', stateCode: 'NV',
    bio: 'Jacky Rosen is the incumbent U.S. Senator from Nevada, first elected in 2018. A former computer programmer and synagogue president, Rosen has focused on bipartisan legislation on veterans\' healthcare, workforce development, and technology policy. She is seeking a second term in 2026 in what is expected to be a competitive race.',
    keyIssues: ['Bipartisan workforce & tech policy', 'Veterans\' healthcare', 'Reproductive rights', 'Water conservation & Colorado River', 'Healthcare costs'],
    fundedBy: ['ActBlue', 'EMILY\'s List', 'Nevada labor unions', 'Tech industry donors'],
    website: 'https://rosen.senate.gov', twitter: '@SenJackyRosen', instagram: '@senjackyrosen', imageUrl: '',
  },
  {
    candidateId: 'nv-sen-2', name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const,
    office: 'U.S. Senate', state: 'Nevada', stateCode: 'NV',
    bio: 'Sam Brown is an Army veteran severely wounded in Afghanistan and the 2024 Republican nominee for U.S. Senate in Nevada, losing narrowly to Jon Tester\'s margin-equivalent. He has announced another Senate run in 2026 targeting Jacky Rosen, running on border security, veterans\' issues, and fiscal conservatism.',
    keyIssues: ['Border security', 'Veterans\' issues & benefits', 'Fiscal conservatism & spending cuts', 'Second Amendment rights', 'Energy independence'],
    fundedBy: ['National Republican Senatorial Committee', 'Club for Growth', 'Veterans PACs', 'Small-dollar donors'],
    website: 'https://sambrown.com', twitter: '@SamBrownNV', instagram: '@sambrownNV', imageUrl: '',
  }
)

PROPOSITIONS.push(
  {
    propId: 'nv-prop-1', stateCode: 'NV',
    title: 'Question 1 — Ranked-Choice Voting',
    summary: 'Adopts ranked-choice voting for all statewide primary elections, allowing voters to rank candidates in order of preference. The measure was previously approved by voters in 2022 and must pass again in 2026 to take effect under Nevada\'s constitutional amendment process.',
    category: 'Voting & Elections',
    forArgument: 'Ranked-choice voting eliminates the spoiler effect, ensures winners have broader support, reduces negative campaigning, and gives independent and third-party candidates a fair chance without wasting votes.',
    againstArgument: 'The system is confusing for voters, slows counting, risks more ballots being thrown out as "exhausted," and has been rejected or repealed in several states after proving more complex than promised.',
    fiscalImpact: 'One-time implementation costs estimated at $3–5 million for new voting equipment and voter education campaigns statewide.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'nv-prop-2', stateCode: 'NV',
    title: 'Question 2 — Minimum Wage Constitutional Amendment',
    summary: 'Enshrines a $16 per hour minimum wage in the Nevada Constitution and eliminates the current two-tiered system where employers offering health insurance can pay a lower wage. Removes the legislature\'s ability to lower the minimum wage.',
    category: 'Economy',
    forArgument: 'Locking the minimum wage in the Constitution protects workers from future rollbacks, eliminates the unfair two-tiered system, and ensures Nevada\'s base wage keeps pace with the cost of living in Las Vegas and Reno.',
    againstArgument: 'Constitutional entrenchment prevents future legislatures from adjusting wages based on economic conditions, could hurt small businesses and tip workers, and removes flexibility during economic downturns.',
    fiscalImpact: 'Raises wages for approximately 200,000 Nevada workers. Increases state payroll costs by an estimated $40 million annually for public employees.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'nv-prop-3', stateCode: 'NV',
    title: 'Question 3 — Electric Utility Restructuring',
    summary: 'Opens Nevada\'s electricity market to competition, ending NV Energy\'s regulated monopoly and allowing consumers to choose their electricity provider. Requires the legislature to pass enabling legislation by 2028.',
    category: 'Environment',
    forArgument: 'Competition lowers electricity prices, encourages clean energy investment, and gives Nevada businesses and homeowners more choices. NV Energy\'s monopoly has kept rates artificially high.',
    againstArgument: 'Deregulation has failed in states like California, leading to higher prices and grid instability. NV Energy\'s regulated model provides reliable service and predictable rates essential for Nevada\'s desert climate.',
    fiscalImpact: 'Difficult to quantify. Could reduce or increase electricity costs for consumers depending on competitive market outcomes. Requires significant investment in grid infrastructure for transition.',
    status: 'On Ballot' as const,
  }
)

RACES_BY_STATE['NV'] = [
  { raceId: 'nv-gov', raceLabel: 'Governor', stateCode: 'NV', office: 'Governor', candidates: [
    { candidateId: 'nv-gov-1', name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, count: 0, percent: 0 },
    { candidateId: 'nv-gov-2', name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, count: 0, percent: 0 },
  ]},
  { raceId: 'nv-sen', raceLabel: 'U.S. Senate', stateCode: 'NV', office: 'Senate', candidates: [
    { candidateId: 'nv-sen-1', name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, count: 0, percent: 0 },
    { candidateId: 'nv-sen-2', name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, count: 0, percent: 0 },
  ]},
]

RACE_RESULTS.push(
  { raceId: 'nv-gov', raceLabel: 'Governor', stateCode: 'NV', office: 'Governor', totalResponses: 3640,
    candidates: [
      { candidateId: 'nv-gov-1', name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, count: 1892, percent: 52 },
      { candidateId: 'nv-gov-2', name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, count: 1748, percent: 48 },
    ],
    byAge: [
      { label: '18–24', count: 520, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 40 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 60 }] },
      { label: '25–34', count: 660, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 46 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 54 }] },
      { label: '35–44', count: 750, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 51 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 49 }] },
      { label: '45–54', count: 720, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 55 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 45 }] },
      { label: '55–64', count: 570, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 58 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 42 }] },
      { label: '65+',   count: 420, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 62 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 38 }] },
    ],
    byRace: [
      { label: 'White',             count: 1820, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 57 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 43 }] },
      { label: 'Hispanic / Latino', count: 870,  candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 44 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 56 }] },
      { label: 'Black / African Am.', count: 530, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 18 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 82 }] },
      { label: 'Asian / Pacific Is.', count: 320, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 48 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 52 }] },
      { label: 'Multiracial',       count: 100,  candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 45 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 55 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 1460, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 58 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 42 }] },
      { label: 'Catholic',      count: 720,  candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 51 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 49 }] },
      { label: 'Non-religious', count: 980,  candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 43 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 57 }] },
      { label: 'Mormon / LDS',  count: 240,  candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 74 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 26 }] },
      { label: 'Jewish',        count: 240,  candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 42 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 58 }] },
    ],
    byGender: [
      { label: 'Female',             count: 1890, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 48 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 52 }] },
      { label: 'Male',               count: 1680, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 57 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 43 }] },
      { label: 'Non-binary / Other', count: 70,   candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 30 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 70 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 1380, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 8  }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 92 }] },
      { label: 'Republican',           count: 1310, candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 93 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 7  }] },
      { label: 'Independent',          count: 730,  candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 53 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 47 }] },
      { label: 'No Party Affiliation', count: 220,  candidates: [{ name: 'Joe Lombardo', lastName: 'Lombardo', party: 'Republican' as const, percent: 51 }, { name: 'Steven Horsford', lastName: 'Horsford', party: 'Democrat' as const, percent: 49 }] },
    ],
  },
  { raceId: 'nv-sen', raceLabel: 'U.S. Senate', stateCode: 'NV', office: 'Senate', totalResponses: 3480,
    candidates: [
      { candidateId: 'nv-sen-1', name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, count: 1775, percent: 51 },
      { candidateId: 'nv-sen-2', name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, count: 1705, percent: 49 },
    ],
    byAge: [
      { label: '18–24', count: 500, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 60 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 40 }] },
      { label: '25–34', count: 630, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 56 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 44 }] },
      { label: '35–44', count: 710, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 51 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 49 }] },
      { label: '45–54', count: 690, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 48 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 52 }] },
      { label: '55–64', count: 550, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 45 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 55 }] },
      { label: '65+',   count: 400, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 42 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 58 }] },
    ],
    byRace: [
      { label: 'White',             count: 1740, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 46 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 54 }] },
      { label: 'Hispanic / Latino', count: 830,  candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 60 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 40 }] },
      { label: 'Black / African Am.', count: 500, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 79 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 21 }] },
      { label: 'Asian / Pacific Is.', count: 310, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 58 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 42 }] },
      { label: 'Multiracial',       count: 100,  candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 55 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 45 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 1390, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 44 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 56 }] },
      { label: 'Catholic',      count: 700,  candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 50 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 50 }] },
      { label: 'Non-religious', count: 940,  candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 63 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 37 }] },
      { label: 'Jewish',        count: 230,  candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 67 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 33 }] },
      { label: 'Mormon / LDS',  count: 220,  candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 27 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 73 }] },
    ],
    byGender: [
      { label: 'Female',             count: 1810, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 56 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 44 }] },
      { label: 'Male',               count: 1600, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 45 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 55 }] },
      { label: 'Non-binary / Other', count: 70,   candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 68 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 32 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 1320, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 92 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 8  }] },
      { label: 'Republican',           count: 1250, candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 7  }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 93 }] },
      { label: 'Independent',          count: 700,  candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 52 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 48 }] },
      { label: 'No Party Affiliation', count: 210,  candidates: [{ name: 'Jacky Rosen', lastName: 'Rosen', party: 'Democrat' as const, percent: 49 }, { name: 'Sam Brown', lastName: 'Brown', party: 'Republican' as const, percent: 51 }] },
    ],
  }
)

// ── NORTH CAROLINA ────────────────────────────────────────────────────────────

CANDIDATES.push(
  {
    candidateId: 'nc-gov-1', name: 'Josh Stein', lastName: 'Stein', party: 'Democrat' as const,
    office: 'Governor', state: 'North Carolina', stateCode: 'NC',
    bio: 'Josh Stein is the incumbent Governor of North Carolina, elected in 2024, succeeding term-limited Roy Cooper. A former state Attorney General known for leading major consumer protection and opioid lawsuits, Stein has focused on hurricane recovery from Helene, education investment, and healthcare access. He is seeking his first full term in 2028, but is a key figure in 2026 down-ballot races.',
    keyIssues: ['Hurricane Helene recovery & infrastructure', 'Education funding', 'Healthcare access & Medicaid expansion', 'Economic development', 'Consumer & voter protections'],
    fundedBy: ['ActBlue', 'NC Education Association', 'Trial lawyers', 'Labor unions'],
    website: 'https://joshstein.com', twitter: '@JoshSteinNC', instagram: '@joshsteinNC', imageUrl: '',
  },
  {
    candidateId: 'nc-sen-1', name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const,
    office: 'U.S. Senate', state: 'North Carolina', stateCode: 'NC',
    bio: 'Thom Tillis is the incumbent U.S. Senator from North Carolina, first elected in 2014 and re-elected in 2020. A former state House Speaker, Tillis has focused on military affairs, cybersecurity, and immigration reform. He is up for re-election in 2026 and faces both a primary challenge and a potentially competitive general election.',
    keyIssues: ['Military & veterans\' support (Fort Liberty)', 'Cybersecurity & tech policy', 'Immigration reform', 'Fiscal conservatism', 'Economic development & jobs'],
    fundedBy: ['Business Roundtable', 'Financial industry', 'Defense contractors', 'North Carolina GOP'],
    website: 'https://tillis.senate.gov', twitter: '@SenThomTillis', instagram: '@sentillis', imageUrl: '',
  },
  {
    candidateId: 'nc-sen-2', name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const,
    office: 'U.S. Senate', state: 'North Carolina', stateCode: 'NC',
    bio: 'Jeff Jackson is a former U.S. Representative and Army National Guard JAG officer who became nationally known for his direct, unscripted TikTok videos about Congress. He lost the 2024 Attorney General race narrowly to Dan Bishop and has announced a 2026 Senate challenge to Thom Tillis, focusing on affordability, veterans\' issues, and institutional reform.',
    keyIssues: ['Economic affordability & housing costs', 'Veterans\' issues', 'Institutional reform & anti-corruption', 'Healthcare access', 'Public safety'],
    fundedBy: ['ActBlue small donors', 'NC Democrats', 'Veterans groups', 'Progressive donors'],
    website: 'https://jeffjackson.com', twitter: '@JeffJacksonNC', instagram: '@jeffjacksonNC', imageUrl: '',
  }
)

PROPOSITIONS.push(
  {
    propId: 'nc-prop-1', stateCode: 'NC',
    title: 'Constitutional Amendment — Voter ID Strengthening',
    summary: 'Strengthens North Carolina\'s existing voter ID requirement by specifying acceptable forms of photo identification and limiting judicial authority to issue broad injunctions blocking the law. Follows years of legal challenges to the state\'s voter ID law.',
    category: 'Voting & Elections',
    forArgument: 'Clarifies and strengthens an existing voter ID requirement that has already been upheld by courts, ensures election integrity, and limits judicial overreach that has blocked the will of voters who passed the original amendment.',
    againstArgument: 'The measure targets minority voters who are disproportionately less likely to have qualifying ID, restricts judicial review of discriminatory laws, and solves a voter fraud problem that does not exist at meaningful scale.',
    fiscalImpact: 'Minimal incremental costs — existing ID infrastructure is already funded. Some costs for expanded free ID distribution to voters without qualifying documents.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'nc-prop-2', stateCode: 'NC',
    title: 'Amendment — Hurricane Helene Recovery Bond',
    summary: 'Authorizes $2.5 billion in general obligation bonds for western North Carolina infrastructure recovery following Hurricane Helene, funding road reconstruction, bridge replacement, broadband expansion, and community rebuilding in the most severely impacted counties.',
    category: 'Environment',
    forArgument: 'Helene caused catastrophic, multi-generational damage to western NC communities. Federal aid alone is insufficient. This bond provides the capital needed to rebuild roads, bridges, and economies in a region that cannot wait.',
    againstArgument: 'Adds $2.5 billion to state debt when NC already has strong reserves. The legislature should use existing surplus funds rather than borrowing, and federal FEMA reimbursements should be awaited before issuing bonds.',
    fiscalImpact: 'Net cost estimated at $3.5 billion over 20 years including interest. Repaid through general fund revenues and expected federal reimbursements of 50–75% of eligible costs.',
    status: 'On Ballot' as const,
  }
)

RACES_BY_STATE['NC'] = [
  { raceId: 'nc-sen', raceLabel: 'U.S. Senate', stateCode: 'NC', office: 'Senate', candidates: [
    { candidateId: 'nc-sen-1', name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, count: 0, percent: 0 },
    { candidateId: 'nc-sen-2', name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, count: 0, percent: 0 },
  ]},
]

RACE_RESULTS.push(
  { raceId: 'nc-sen', raceLabel: 'U.S. Senate', stateCode: 'NC', office: 'Senate', totalResponses: 5340,
    candidates: [
      { candidateId: 'nc-sen-1', name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, count: 2777, percent: 52 },
      { candidateId: 'nc-sen-2', name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, count: 2563, percent: 48 },
    ],
    byAge: [
      { label: '18–24', count: 780,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 36 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 64 }] },
      { label: '25–34', count: 940,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 43 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 57 }] },
      { label: '35–44', count: 1060, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 51 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 49 }] },
      { label: '45–54', count: 1020, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 56 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 44 }] },
      { label: '55–64', count: 850,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 60 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 40 }] },
      { label: '65+',   count: 690,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 63 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 37 }] },
    ],
    byRace: [
      { label: 'White',               count: 2940, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 61 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 39 }] },
      { label: 'Black / African Am.', count: 1340, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 11 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 89 }] },
      { label: 'Hispanic / Latino',   count: 540,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 49 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 51 }] },
      { label: 'Asian / Pacific Is.', count: 280,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 42 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 58 }] },
      { label: 'Multiracial',         count: 240,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 45 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 55 }] },
    ],
    byReligion: [
      { label: 'Evangelical',   count: 1960, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 76 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 24 }] },
      { label: 'Catholic',      count: 640,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 52 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 48 }] },
      { label: 'Black Church',  count: 760,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 10 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 90 }] },
      { label: 'Non-religious', count: 1280, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 36 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 64 }] },
      { label: 'Jewish',        count: 700,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 40 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 60 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2770, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 47 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 53 }] },
      { label: 'Male',               count: 2480, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 58 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 42 }] },
      { label: 'Non-binary / Other', count: 90,   candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 27 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 73 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 2020, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 7  }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 93 }] },
      { label: 'Republican',           count: 2140, candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 92 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 8  }] },
      { label: 'Independent',          count: 920,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 51 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 49 }] },
      { label: 'No Party Affiliation', count: 260,  candidates: [{ name: 'Thom Tillis', lastName: 'Tillis', party: 'Republican' as const, percent: 50 }, { name: 'Jeff Jackson', lastName: 'Jackson', party: 'Democrat' as const, percent: 50 }] },
    ],
  }
)

// ── PENNSYLVANIA ──────────────────────────────────────────────────────────────

CANDIDATES.push(
  {
    candidateId: 'pa-gov-1', name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const,
    office: 'Governor', state: 'Pennsylvania', stateCode: 'PA',
    bio: 'Josh Shapiro is the incumbent Governor of Pennsylvania, elected in 2022 by 14 points. A former state Attorney General, Shapiro has governed as a pragmatic centrist, winning plaudits for emergency infrastructure repair and bipartisan dealmaking. He is running for re-election in 2026 and is considered one of the most popular governors in the country.',
    keyIssues: ['Infrastructure & transportation', 'Economic development & job creation', 'Education funding equity', 'Public safety', 'Energy transition & natural gas policy'],
    fundedBy: ['Pennsylvania labor unions', 'Emily\'s List', 'ActBlue', 'Business community'],
    website: 'https://joshshapiro.org', twitter: '@JoshShapiroPA', instagram: '@joshshapiropa', imageUrl: '',
  },
  {
    candidateId: 'pa-gov-2', name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const,
    office: 'Governor', state: 'Pennsylvania', stateCode: 'PA',
    bio: 'Dave McCormick is a former hedge fund CEO and U.S. Senate candidate who narrowly lost the 2022 Republican primary to Dr. Oz. He won the 2024 Senate race against Bob Casey and has signaled interest in the 2026 Governor\'s race if he does not run for re-election. A West Point graduate and former Treasury official, McCormick focuses on economic growth and China competitiveness.',
    keyIssues: ['Economic growth & competitiveness', 'China & national security', 'Energy development', 'Reducing regulation', 'Fiscal conservatism'],
    fundedBy: ['Pennsylvania business community', 'Wall Street & financial industry', 'Republican Governors Association', 'Energy sector'],
    website: 'https://davemccormick.com', twitter: '@DaveMcCormickPA', instagram: '@davemccormickpa', imageUrl: '',
  },
  {
    candidateId: 'pa-sen-1', name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const,
    office: 'U.S. Senate', state: 'Pennsylvania', stateCode: 'PA',
    bio: 'Dave McCormick is the incumbent U.S. Senator from Pennsylvania, elected in 2024 defeating incumbent Bob Casey. A former hedge fund CEO and West Point graduate, McCormick focuses on economic competitiveness, energy development, and countering China. His 2026 re-election timeline depends on whether he pursues the Governor\'s race instead.',
    keyIssues: ['Economic competitiveness vs. China', 'Energy development & natural gas', 'Fiscal conservatism', 'National security', 'Veterans\' support'],
    fundedBy: ['Wall Street & financial industry', 'Pennsylvania energy sector', 'NRSC', 'Business PACs'],
    website: 'https://davemccormick.com', twitter: '@DaveMcCormickPA', instagram: '@davemccormickpa', imageUrl: '',
  },
  {
    candidateId: 'pa-sen-2', name: 'John Fetterman', lastName: 'Fetterman', party: 'Democrat' as const,
    office: 'U.S. Senate', state: 'Pennsylvania', stateCode: 'PA',
    bio: 'John Fetterman is the incumbent U.S. Senator from Pennsylvania, elected in 2022 after serving as Lieutenant Governor. Known for his unconventional style and working-class appeal, Fetterman has surprised many by staking out centrist and hawkish positions on Israel and border security. He is not up for re-election until 2028 but remains a major figure in Pennsylvania politics.',
    keyIssues: ['Working-class economic issues', 'Border security (centrist position)', 'Steel & manufacturing jobs', 'Criminal justice reform', 'Mental health advocacy'],
    fundedBy: ['ActBlue', 'Labor unions', 'Pennsylvania small donors', 'AIPAC'],
    website: 'https://fetterman.senate.gov', twitter: '@SenFettermanPA', instagram: '@johnfetterman', imageUrl: '',
  }
)

PROPOSITIONS.push(
  {
    propId: 'pa-prop-1', stateCode: 'PA',
    title: 'Constitutional Amendment — Election Audits',
    summary: 'Requires annual post-election audits of all elections using risk-limiting audit methodology and mandates public disclosure of all audit results within 45 days of any election.',
    category: 'Voting & Elections',
    forArgument: 'Strengthens public confidence in election results, uses gold-standard risk-limiting audit methodology endorsed by election security experts, and ensures transparency that benefits voters of all parties.',
    againstArgument: 'Pennsylvania already conducts post-election audits; this amendment adds costly bureaucratic mandates without evidence of existing problems and could be used to cast doubt on legitimate results.',
    fiscalImpact: 'Estimated $8–12 million annually in additional county-level audit costs, partially offset by federal HAVA election security grants.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'pa-prop-2', stateCode: 'PA',
    title: 'Referendum — Minimum Wage Increase to $15',
    summary: 'Raises Pennsylvania\'s minimum wage from the federal floor of $7.25 — the lowest in any state that follows the federal minimum — to $15 per hour by 2027, with annual indexing to inflation thereafter.',
    category: 'Economy',
    forArgument: 'Pennsylvania is the only large state still at the $7.25 federal minimum. A $15 minimum wage would raise pay for 1.5 million workers, reduce reliance on public benefits, and boost local consumer spending.',
    againstArgument: 'A $15 minimum wage would double labor costs overnight for rural Pennsylvania businesses, lead to job losses and automation, and impose urban wage standards on small towns where $15 is far above market rates.',
    fiscalImpact: 'Raises wages for approximately 1.5 million Pennsylvania workers. State government would face $280 million in increased payroll costs for employees at or near the minimum.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'pa-prop-3', stateCode: 'PA',
    title: 'Amendment — Medical Marijuana Expansion',
    summary: 'Expands Pennsylvania\'s existing medical marijuana program by adding additional qualifying conditions, allowing home cultivation of up to 6 plants for registered patients, and establishing a pathway to adult-use recreational cannabis by 2028.',
    category: 'Healthcare',
    forArgument: 'Pennsylvania is surrounded by states with legal recreational cannabis, losing tax revenue and driving residents across state lines. Expansion relieves patients of costly dispensary dependence and creates a new tax revenue stream.',
    againstArgument: 'Home cultivation is impossible to regulate or tax, accelerates normalization of drug use among youth, and the medical program should remain medical — recreational cannabis should be a separate legislative decision.',
    fiscalImpact: 'Medical expansion is revenue-neutral. Recreational cannabis pathway could generate $300–500 million annually in new tax revenue if fully implemented by 2028.',
    status: 'On Ballot' as const,
  }
)

RACES_BY_STATE['PA'] = [
  { raceId: 'pa-gov', raceLabel: 'Governor', stateCode: 'PA', office: 'Governor', candidates: [
    { candidateId: 'pa-gov-1', name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, count: 0, percent: 0 },
    { candidateId: 'pa-gov-2', name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, count: 0, percent: 0 },
  ]},
]

RACE_RESULTS.push(
  { raceId: 'pa-gov', raceLabel: 'Governor', stateCode: 'PA', office: 'Governor', totalResponses: 6820,
    candidates: [
      { candidateId: 'pa-gov-1', name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, count: 3956, percent: 58 },
      { candidateId: 'pa-gov-2', name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, count: 2864, percent: 42 },
    ],
    byAge: [
      { label: '18–24', count: 980,  candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 67 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 33 }] },
      { label: '25–34', count: 1160, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 64 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 36 }] },
      { label: '35–44', count: 1340, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 59 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 41 }] },
      { label: '45–54', count: 1280, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 55 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 45 }] },
      { label: '55–64', count: 1100, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 51 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 49 }] },
      { label: '65+',   count: 960,  candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 48 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 52 }] },
    ],
    byRace: [
      { label: 'White',               count: 4100, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 54 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 46 }] },
      { label: 'Black / African Am.', count: 1480, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 83 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 17 }] },
      { label: 'Hispanic / Latino',   count: 680,  candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 65 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 35 }] },
      { label: 'Asian / Pacific Is.', count: 360,  candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 68 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 32 }] },
      { label: 'Multiracial',         count: 200,  candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 63 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 37 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 2580, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 50 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 50 }] },
      { label: 'Catholic',      count: 1360, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 55 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 45 }] },
      { label: 'Non-religious', count: 1740, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 71 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 29 }] },
      { label: 'Jewish',        count: 680,  candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 74 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 26 }] },
      { label: 'Evangelical',   count: 460,  candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 32 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 68 }] },
    ],
    byGender: [
      { label: 'Female',             count: 3540, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 62 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 38 }] },
      { label: 'Male',               count: 3160, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 53 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 47 }] },
      { label: 'Non-binary / Other', count: 120,  candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 74 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 26 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 2580, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 94 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 6  }] },
      { label: 'Republican',           count: 2320, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 24 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 76 }] },
      { label: 'Independent',          count: 1560, candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 60 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 40 }] },
      { label: 'No Party Affiliation', count: 360,  candidates: [{ name: 'Josh Shapiro', lastName: 'Shapiro', party: 'Democrat' as const, percent: 58 }, { name: 'Dave McCormick', lastName: 'McCormick', party: 'Republican' as const, percent: 42 }] },
    ],
  }
)

// ── WISCONSIN ─────────────────────────────────────────────────────────────────

CANDIDATES.push(
  {
    candidateId: 'wi-gov-1', name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const,
    office: 'Governor', state: 'Wisconsin', stateCode: 'WI',
    bio: 'Tony Evers is the incumbent Governor of Wisconsin, first elected in 2018 and re-elected in 2022. A former state Superintendent of Public Instruction, Evers has vetoed hundreds of Republican bills from a gerrymandered legislature, protecting Medicaid expansion, abortion access, and education funding. He is running for a third term in 2026.',
    keyIssues: ['Education funding & public schools', 'Reproductive rights & abortion', 'Expanding Medicaid & healthcare access', 'Protecting voting rights', 'Economic development'],
    fundedBy: ['Wisconsin Education Association Council', 'ActBlue', 'Labor unions', 'Emily\'s List'],
    website: 'https://tonyevers.com', twitter: '@GovEvers', instagram: '@tonyeversWI', imageUrl: '',
  },
  {
    candidateId: 'wi-gov-2', name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const,
    office: 'Governor', state: 'Wisconsin', stateCode: 'WI',
    bio: 'Scott Walker is the former Governor of Wisconsin who served three terms from 2011 to 2019, best known for Act 10, which severely curtailed public employee union bargaining rights. Walker has signaled potential interest in a political comeback in 2026 to reclaim the governorship from Tony Evers, running on fiscal conservatism and reversing Evers\' education and healthcare policies.',
    keyIssues: ['Fiscal conservatism & tax cuts', 'Reversing Act 10 rollbacks', 'Education reform & school choice', 'Reducing government spending', 'Business-friendly policies'],
    fundedBy: ['Wisconsin business community', 'Republican Governors Association', 'Club for Growth', 'School choice advocates'],
    website: 'https://scottwalker.com', twitter: '@ScottWalker', instagram: '@scottwalker', imageUrl: '',
  },
  {
    candidateId: 'wi-sen-1', name: 'Tammy Baldwin', lastName: 'Baldwin', party: 'Democrat' as const,
    office: 'U.S. Senate', state: 'Wisconsin', stateCode: 'WI',
    bio: 'Tammy Baldwin is the incumbent U.S. Senator from Wisconsin, first elected in 2012 and re-elected in 2018 and 2024. The first openly gay person elected to the Senate, Baldwin has focused on manufacturing jobs, prescription drug costs, and veterans\' healthcare. She is not up until 2030.',
    keyIssues: ['Manufacturing jobs & trade policy', 'Prescription drug pricing', 'Veterans\' healthcare', 'LGBTQ+ equality', 'Campaign finance reform'],
    fundedBy: ['ActBlue', 'Labor unions', 'LGBTQ+ advocacy groups', 'Progressive donors'],
    website: 'https://baldwin.senate.gov', twitter: '@SenatorBaldwin', instagram: '@senatorbaldwin', imageUrl: '',
  },
  {
    candidateId: 'wi-sen-2', name: 'Eric Hovde', lastName: 'Hovde', party: 'Republican' as const,
    office: 'U.S. Senate', state: 'Wisconsin', stateCode: 'WI',
    bio: 'Eric Hovde is a Wisconsin banker and businessman who narrowly lost the 2024 Senate race to Tammy Baldwin. He has signaled interest in running again for Wisconsin\'s other Senate seat in 2026, focusing on border security, fiscal conservatism, and reducing federal spending.',
    keyIssues: ['Border security & immigration', 'Fiscal conservatism & debt reduction', 'Reducing federal regulation', 'Second Amendment rights', 'Energy independence'],
    fundedBy: ['Personal wealth', 'Wisconsin business community', 'NRSC', 'Club for Growth'],
    website: 'https://erichovde.com', twitter: '@EricHovdeWI', instagram: '@erichovde', imageUrl: '',
  }
)

PROPOSITIONS.push(
  {
    propId: 'wi-prop-1', stateCode: 'WI',
    title: 'Referendum — Abortion Rights Constitutional Amendment',
    summary: 'Enshrines the right to abortion up to 22 weeks of pregnancy in the Wisconsin Constitution, effectively rendering Wisconsin\'s 1849 near-total abortion ban unenforceable. Requires a simple majority of voters to pass.',
    category: 'Healthcare',
    forArgument: 'Wisconsin\'s 173-year-old criminal abortion ban, briefly enforced after Dobbs, has created a medical crisis. Voters deserve a direct say on whether Wisconsin becomes a state that prosecutes doctors for performing abortions.',
    againstArgument: 'Abortion ends a human life and should not be treated as a constitutional right. The legislature, not voters via referendum, should set abortion policy through a deliberative democratic process.',
    fiscalImpact: 'No direct fiscal impact. Would end ongoing litigation costs related to the 1849 ban. Could increase Medicaid abortion coverage costs if associated provisions are enacted.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'wi-prop-2', stateCode: 'WI',
    title: 'Advisory Referendum — Gerrymandering Reform',
    summary: 'A non-binding advisory referendum asking Wisconsin voters whether they support replacing the current partisan legislative map-drawing process with an independent nonpartisan redistricting commission.',
    category: 'Voting & Elections',
    forArgument: 'Wisconsin has among the most extreme partisan gerrymanders in the country. An independent commission, as used in Michigan and Arizona, produces fairer maps that better reflect the will of voters.',
    againstArgument: 'Advisory referenda are non-binding and waste money without changing law. The redistricting process already follows constitutional guidelines and the legislature should not cede its authority to unelected commissioners.',
    fiscalImpact: 'Advisory referenda cost approximately $2 million to administer. Non-binding — no direct policy or fiscal impact.',
    status: 'On Ballot' as const,
  },
  {
    propId: 'wi-prop-3', stateCode: 'WI',
    title: 'Referendum — Property Tax Relief for Seniors',
    summary: 'Freezes property tax assessments for Wisconsin homeowners age 65 and older who have lived in their home for at least 10 years and whose income falls below 150% of the state median, providing permanent property tax relief for senior residents.',
    category: 'Economy',
    forArgument: 'Fixed-income seniors in Wisconsin are being taxed out of their homes as property values surge. This targeted relief allows older Wisconsinites to remain in communities they have lived in for decades.',
    againstArgument: 'The program shifts the property tax burden to younger homeowners and renters, reduces funding for local schools and services, and the income threshold is too high — covering affluent seniors who don\'t need relief.',
    fiscalImpact: 'Reduces local property tax revenue by an estimated $380 million annually, requiring compensating increases for other property owners or cuts to local services.',
    status: 'On Ballot' as const,
  }
)

RACES_BY_STATE['WI'] = [
  { raceId: 'wi-gov', raceLabel: 'Governor', stateCode: 'WI', office: 'Governor', candidates: [
    { candidateId: 'wi-gov-1', name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, count: 0, percent: 0 },
    { candidateId: 'wi-gov-2', name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, count: 0, percent: 0 },
  ]},
]

RACE_RESULTS.push(
  { raceId: 'wi-gov', raceLabel: 'Governor', stateCode: 'WI', office: 'Governor', totalResponses: 5460,
    candidates: [
      { candidateId: 'wi-gov-1', name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, count: 2839, percent: 52 },
      { candidateId: 'wi-gov-2', name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, count: 2621, percent: 48 },
    ],
    byAge: [
      { label: '18–24', count: 800,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 64 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 36 }] },
      { label: '25–34', count: 960,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 59 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 41 }] },
      { label: '35–44', count: 1080, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 53 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 47 }] },
      { label: '45–54', count: 1040, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 49 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 51 }] },
      { label: '55–64', count: 880,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 44 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 56 }] },
      { label: '65+',   count: 700,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 40 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 60 }] },
    ],
    byRace: [
      { label: 'White',               count: 4020, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 49 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 51 }] },
      { label: 'Black / African Am.', count: 820,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 84 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 16 }] },
      { label: 'Hispanic / Latino',   count: 380,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 60 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 40 }] },
      { label: 'Asian / Pacific Is.', count: 160,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 63 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 37 }] },
      { label: 'Multiracial',         count: 80,   candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 58 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 42 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 2180, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 44 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 56 }] },
      { label: 'Catholic',      count: 1100, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 51 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 49 }] },
      { label: 'Non-religious', count: 1500, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 68 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 32 }] },
      { label: 'Lutheran',      count: 440,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 48 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 52 }] },
      { label: 'Jewish',        count: 240,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 66 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 34 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2840, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 57 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 43 }] },
      { label: 'Male',               count: 2520, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 46 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 54 }] },
      { label: 'Non-binary / Other', count: 100,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 71 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 29 }] },
    ],
    byPolitical: [
      { label: 'Democrat',             count: 2060, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 93 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 7  }] },
      { label: 'Republican',           count: 1980, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 7  }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 93 }] },
      { label: 'Independent',          count: 1180, candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 53 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 47 }] },
      { label: 'No Party Affiliation', count: 240,  candidates: [{ name: 'Tony Evers', lastName: 'Evers', party: 'Democrat' as const, percent: 51 }, { name: 'Scott Walker', lastName: 'Walker', party: 'Republican' as const, percent: 49 }] },
    ],
  }
)

// ─────────────────────────────────────────────────────────────────────────────

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
