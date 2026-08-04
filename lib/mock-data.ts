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
  office: 'Senate' | 'House'
  totalResponses: number
  candidates: CandidateResult[]
  byAge: DemographicBreakdown[]
  byRace: DemographicBreakdown[]
  byReligion: DemographicBreakdown[]
  byGender: DemographicBreakdown[]
  byIncome: DemographicBreakdown[]
  byEducation: DemographicBreakdown[]
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
  // ── Florida ──
  {
    id: 'fl-sen-1',
    name: 'Maria Elena Reyes',
    party: 'Democrat',
    office: 'U.S. Senate',
    state: 'Florida',
    stateCode: 'FL',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MariaReyes&backgroundColor=b6e3f4',
    bannerColor: '#dbeafe',
    bio: 'Former Miami-Dade County Commissioner with 14 years of public service, focused on climate resilience and healthcare access.',
    incumbent: false,
    yearsExperience: 14,
    website: 'https://example.com',
    twitter: '@mariaforfl',
    instagram: '@mariaforfl',
    keyIssues: ['Climate Resilience', 'Healthcare Access', 'Housing Affordability', 'Clean Energy Jobs', 'Public Education'],
    funders: [
      { name: 'Florida Democratic Party', amount: '$1.8M', type: 'Party Committee' },
      { name: 'EMILY\'s List PAC', amount: '$940K', type: 'PAC' },
      { name: 'Climate Action Now', amount: '$620K', type: 'PAC' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.1M', type: 'Small Donors' },
    ],
  },
  {
    id: 'fl-sen-2',
    name: 'James T. Holbrook',
    party: 'Republican',
    office: 'U.S. Senate',
    state: 'Florida',
    stateCode: 'FL',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JamesHolbrook&backgroundColor=fee2e2',
    bannerColor: '#fee2e2',
    bio: 'Two-term Florida state senator and military veteran, championing border security and lower taxes for small businesses.',
    incumbent: true,
    yearsExperience: 10,
    website: 'https://example.com',
    twitter: '@holbrookfl',
    keyIssues: ['Border Security', 'Tax Cuts', 'Veterans Affairs', '2nd Amendment', 'Energy Independence'],
    funders: [
      { name: 'National Rifle Association PAC', amount: '$850K', type: 'PAC' },
      { name: 'Florida Business Council', amount: '$1.2M', type: 'Corporate' },
      { name: 'Republican Senate Campaign Cmte', amount: '$2.1M', type: 'Party Committee' },
      { name: 'Oil & Gas Industry donors', amount: '$730K', type: 'Individual' },
    ],
  },
  {
    id: 'fl-sen-3',
    name: 'David Nguyen',
    party: 'Independent',
    office: 'U.S. Senate',
    state: 'Florida',
    stateCode: 'FL',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidNguyen&backgroundColor=ede9fe',
    bannerColor: '#ede9fe',
    bio: 'Tech entrepreneur and civic activist pushing for electoral reform and bipartisan cooperation on infrastructure.',
    incumbent: false,
    yearsExperience: 5,
    website: 'https://example.com',
    keyIssues: ['Electoral Reform', 'Infrastructure', 'Tech Policy', 'Government Transparency', 'Broadband Access'],
    funders: [
      { name: 'Self-funded', amount: '$1.4M', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$880K', type: 'Small Donors' },
      { name: 'Tech industry individuals', amount: '$410K', type: 'Individual' },
    ],
  },
  {
    id: 'fl-house-7-1',
    name: 'Sandra Wiley',
    party: 'Democrat',
    office: 'U.S. House of Representatives',
    state: 'Florida',
    stateCode: 'FL',
    district: 'District 7',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SandraWiley&backgroundColor=b6e3f4',
    bannerColor: '#dbeafe',
    bio: 'Orlando educator and school board member with a 12-year track record on public education and youth mental health.',
    incumbent: false,
    yearsExperience: 12,
    website: 'https://example.com',
    keyIssues: ['Education Funding', 'Mental Health', 'Voting Rights', 'Childcare Access', 'Medicaid Expansion'],
    funders: [
      { name: 'National Education Association PAC', amount: '$620K', type: 'PAC' },
      { name: 'Florida Democratic Party', amount: '$480K', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$590K', type: 'Small Donors' },
    ],
  },
  {
    id: 'fl-house-7-2',
    name: 'Carlos Mendez',
    party: 'Republican',
    office: 'U.S. House of Representatives',
    state: 'Florida',
    stateCode: 'FL',
    district: 'District 7',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarlosMendez&backgroundColor=fee2e2',
    bannerColor: '#fee2e2',
    bio: 'Business owner and former Orange County sheriff deputy focused on public safety and economic growth.',
    incumbent: true,
    yearsExperience: 6,
    website: 'https://example.com',
    keyIssues: ['Public Safety', 'Small Business', 'Energy Independence', 'Immigration Enforcement', 'Lower Taxes'],
    funders: [
      { name: 'Florida Chamber of Commerce PAC', amount: '$510K', type: 'PAC' },
      { name: 'Law Enforcement Alliance PAC', amount: '$290K', type: 'PAC' },
      { name: 'Republican National Committee', amount: '$660K', type: 'Party Committee' },
      { name: 'Real estate industry donors', amount: '$340K', type: 'Individual' },
    ],
  },

  // ── Texas ──
  {
    id: 'tx-sen-1',
    name: 'Amanda Okafor',
    party: 'Democrat',
    office: 'U.S. Senate',
    state: 'Texas',
    stateCode: 'TX',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AmandaOkafor&backgroundColor=b6e3f4',
    bannerColor: '#dbeafe',
    bio: 'Houston civil rights attorney and community organizer, championing criminal justice reform and immigrant rights.',
    incumbent: false,
    yearsExperience: 18,
    website: 'https://example.com',
    keyIssues: ['Criminal Justice Reform', 'Immigration', 'Gun Safety', 'Voting Rights', 'Affordable Healthcare'],
    funders: [
      { name: 'ACLU Voters Alliance PAC', amount: '$720K', type: 'PAC' },
      { name: 'Texas Democratic Party', amount: '$1.1M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.4M', type: 'Small Donors' },
      { name: 'Trial lawyers association', amount: '$510K', type: 'Individual' },
    ],
  },
  {
    id: 'tx-sen-2',
    name: 'Robert "Bob" Crane',
    party: 'Republican',
    office: 'U.S. Senate',
    state: 'Texas',
    stateCode: 'TX',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BobCrane&backgroundColor=fee2e2',
    bannerColor: '#fee2e2',
    bio: 'Three-term Texas congressman and rancher, fighting for energy independence and securing the southern border.',
    incumbent: true,
    yearsExperience: 16,
    website: 'https://example.com',
    keyIssues: ['Energy Independence', 'Border Security', '2nd Amendment', 'Deregulation', 'Agricultural Policy'],
    funders: [
      { name: 'Texas Oil & Gas Association PAC', amount: '$2.3M', type: 'PAC' },
      { name: 'Republican Senate Campaign Cmte', amount: '$1.9M', type: 'Party Committee' },
      { name: 'Americans for Prosperity PAC', amount: '$1.1M', type: 'PAC' },
      { name: 'Agricultural industry donors', amount: '$680K', type: 'Individual' },
    ],
  },

  // ── California ──
  {
    id: 'ca-sen-1',
    name: 'Priya Sharma',
    party: 'Democrat',
    office: 'U.S. Senate',
    state: 'California',
    stateCode: 'CA',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaSharma&backgroundColor=b6e3f4',
    bannerColor: '#dbeafe',
    bio: 'State senator and former tech executive focused on clean energy innovation, housing affordability, and universal broadband.',
    incumbent: true,
    yearsExperience: 9,
    website: 'https://example.com',
    keyIssues: ['Clean Energy', 'Housing Affordability', 'Tech Regulation', 'Universal Broadband', 'Homelessness'],
    funders: [
      { name: 'California Democratic Party', amount: '$2.2M', type: 'Party Committee' },
      { name: 'Sierra Club PAC', amount: '$780K', type: 'PAC' },
      { name: 'Tech industry individuals', amount: '$1.6M', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$920K', type: 'Small Donors' },
    ],
  },
  {
    id: 'ca-sen-2',
    name: 'Thomas Garrett',
    party: 'Republican',
    office: 'U.S. Senate',
    state: 'California',
    stateCode: 'CA',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThomasGarrett&backgroundColor=fee2e2',
    bannerColor: '#fee2e2',
    bio: 'San Diego county supervisor and Navy veteran promoting fiscal responsibility and deregulation for economic growth.',
    incumbent: false,
    yearsExperience: 8,
    website: 'https://example.com',
    keyIssues: ['Fiscal Responsibility', 'Deregulation', 'National Defense', 'Border Security', 'Crime Reduction'],
    funders: [
      { name: 'California Republican Party', amount: '$1.1M', type: 'Party Committee' },
      { name: 'National Association of Realtors PAC', amount: '$640K', type: 'PAC' },
      { name: 'Defense contractor executives', amount: '$520K', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$430K', type: 'Small Donors' },
    ],
  },
  {
    id: 'ca-sen-3',
    name: 'Mei Lin Zhang',
    party: 'Independent',
    office: 'U.S. Senate',
    state: 'California',
    stateCode: 'CA',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MeiLinZhang&backgroundColor=ede9fe',
    bannerColor: '#ede9fe',
    bio: 'Climate scientist and Stanford professor running on a platform of evidence-based policymaking and government transparency.',
    incumbent: false,
    yearsExperience: 3,
    website: 'https://example.com',
    keyIssues: ['Climate Science Policy', 'Government Transparency', 'STEM Education', 'Campaign Finance Reform', 'Public Health'],
    funders: [
      { name: 'Self-funded', amount: '$600K', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$1.1M', type: 'Small Donors' },
      { name: 'Academic & research community', amount: '$310K', type: 'Individual' },
    ],
  },

  // ── New York ──
  {
    id: 'ny-sen-1',
    name: 'Marcus J. Washington',
    party: 'Democrat',
    office: 'U.S. Senate',
    state: 'New York',
    stateCode: 'NY',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusWashington&backgroundColor=b6e3f4',
    bannerColor: '#dbeafe',
    bio: 'Brooklyn congressman and union organizer with a strong record on workers rights, childcare, and affordable housing.',
    incumbent: true,
    yearsExperience: 11,
    website: 'https://example.com',
    keyIssues: ["Workers' Rights", 'Childcare', 'Affordable Housing', 'Universal Healthcare', 'Tax Fairness'],
    funders: [
      { name: 'AFL-CIO COPE PAC', amount: '$1.5M', type: 'PAC' },
      { name: 'New York Democratic Party', amount: '$1.8M', type: 'Party Committee' },
      { name: 'Small-dollar donors (under $200)', amount: '$2.1M', type: 'Small Donors' },
      { name: 'Healthcare workers union PAC', amount: '$710K', type: 'PAC' },
    ],
  },
  {
    id: 'ny-sen-2',
    name: 'Patricia Vance',
    party: 'Republican',
    office: 'U.S. Senate',
    state: 'New York',
    stateCode: 'NY',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PatriciaVance&backgroundColor=fee2e2',
    bannerColor: '#fee2e2',
    bio: 'Former NYPD chief and crime policy advisor, running on public safety, tax relief, and cutting federal spending.',
    incumbent: false,
    yearsExperience: 7,
    website: 'https://example.com',
    keyIssues: ['Public Safety', 'Tax Relief', 'Reducing Federal Spending', 'School Choice', 'Anti-Crime Legislation'],
    funders: [
      { name: 'New York Republican Party', amount: '$980K', type: 'Party Committee' },
      { name: 'Police Benevolent Association PAC', amount: '$560K', type: 'PAC' },
      { name: 'Wall Street financial donors', amount: '$1.3M', type: 'Individual' },
      { name: 'Small-dollar donors (under $200)', amount: '$410K', type: 'Small Donors' },
    ],
  },
]

// ─── Races per state ─────────────────────────────────────────────────────────

export const RACES_BY_STATE: Record<string, Race[]> = {
  FL: [
    { id: 'fl-sen', office: 'U.S. Senate', stateCode: 'FL', label: 'Senate' },
    { id: 'fl-house-7', office: 'U.S. House of Representatives', stateCode: 'FL', district: 'District 7', label: 'House-7' },
  ],
  TX: [
    { id: 'tx-sen', office: 'U.S. Senate', stateCode: 'TX', label: 'Senate' },
  ],
  CA: [
    { id: 'ca-sen', office: 'U.S. Senate', stateCode: 'CA', label: 'Senate' },
  ],
  NY: [
    { id: 'ny-sen', office: 'U.S. Senate', stateCode: 'NY', label: 'Senate' },
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
  'Native American',
  'Multiracial',
  'Prefer not to say',
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
  'Prefer not to say',
]
export const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
export const INCOME_OPTIONS = [
  'Under $30,000',
  '$30,000–$60,000',
  '$60,000–$100,000',
  '$100,000–$150,000',
  '$150,000+',
  'Prefer not to say',
]
export const EDUCATION_OPTIONS = [
  'Some High School',
  'High School Diploma / GED',
  'Some College',
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  'Doctoral / Professional Degree',
  'Prefer not to say',
]

// ─── Propositions ────────────────────────────────────────────────────────────

export interface Proposition {
  id: string
  stateCode: string
  state: string
  number: string          // e.g. "Prop 4" or "Amendment 2"
  title: string
  summary: string
  fiscalImpact: string
  proArgument: string
  conArgument: string
  category: 'Education' | 'Environment' | 'Healthcare' | 'Economy' | 'Criminal Justice' | 'Infrastructure' | 'Housing' | 'Election Administration' | 'Government Reform' | 'Taxes'
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
  // ── California — Officially Qualified for November 3, 2026 Ballot ──
  {
    id: 'ca-prop-1',
    stateCode: 'CA',
    state: 'California',
    number: 'CA Measure 1',
    title: 'Allow Public Financing of Election Campaigns',
    summary: 'This legislatively referred state statute would allow the California state government and local governments to create public campaign financing programs. Under such programs, candidates who agree to spending limits and meet certain eligibility requirements would receive public funds to pay for their campaigns instead of relying primarily on private donations. The measure would change current California law, which prohibits the use of public money to fund political campaigns. Supporters argue this would reduce the influence of wealthy donors and special interest groups on elections. The measure passed the state legislature with strong Democratic support and was referred to voters for final approval.',
    fiscalImpact: 'Fiscal impact depends on how individual programs are designed by the state and local governments. A statewide program could cost tens of millions to hundreds of millions of dollars per election cycle depending on the number of participating candidates and the size of the public grants provided.',
    proArgument: 'Supporters, including the League of Women Voters and California Common Cause, argue that public campaign financing reduces the outsized influence of wealthy special interest donors on elections and elected officials. They say it encourages more diverse candidates to run for office without needing personal wealth or connections to large donors. They contend that when politicians are funded by small contributions from ordinary citizens rather than large checks from corporations and PACs, they are more likely to represent the interests of their constituents.',
    conArgument: 'Opponents argue that public financing uses taxpayer dollars to fund political campaigns for candidates that many taxpayers may strongly disagree with or oppose. Critics raise concerns about the cost to government budgets at a time when many public services are already underfunded. Some argue that existing campaign finance laws and disclosure requirements are sufficient and that public financing is an inefficient use of public resources.',
    category: 'Election Administration',
  },
  {
    id: 'ca-prop-2',
    stateCode: 'CA',
    state: 'California',
    number: 'CA Measure 2',
    title: 'Eliminate Successor Election at Recall',
    summary: 'This legislatively referred constitutional amendment would change California\'s recall election process by eliminating the simultaneous successor election that currently appears on the same ballot as the recall question. Under current California law, if voters choose to recall a state officer, a replacement candidate is chosen at the same election — meaning a recall can succeed and a new officer can be installed with as little as a small plurality of votes. This amendment would instead leave the office vacant after a successful recall and fill it according to state law and the constitution. For the governor specifically, the lieutenant governor would assume the role, with a special election triggered only if the recall occurs in the first two years of the term.',
    fiscalImpact: 'Minimal direct fiscal impact. Eliminating the successor election portion of a recall ballot could reduce election administration costs modestly. Any savings would depend on whether a separate special election is subsequently required to fill the vacancy.',
    proArgument: 'Supporters including the League of Women Voters, California Common Cause, and the amendment\'s legislative sponsors argue the current system is undemocratic because a replacement governor can be installed with a small plurality of votes — far less support than was required to win the original election. They say the reform closes a loophole that allows political opponents to use a recall as a way to replace a popular elected official with someone who would never win a regular majority-vote election.',
    conArgument: 'Opponents including the Election Integrity Project California argue that the current system preserves the public\'s right not only to remove a failed elected official but also to immediately choose a replacement. They contend that allowing the lieutenant governor — who is almost always from the same party as the recalled officer — to automatically assume the governorship effectively defeats the purpose of a recall, turning it into a "frying pan vs. fire" situation where voters have no real choice about who governs them.',
    category: 'Government Reform',
  },
  {
    id: 'ca-prop-3',
    stateCode: 'CA',
    state: 'California',
    number: 'CA Measure 3',
    title: 'Supermajority Vote for Initiatives Raising Vote Thresholds',
    summary: 'This legislatively referred constitutional amendment would require that any ballot initiative seeking to raise an existing vote threshold to a supermajority must itself pass by that same supermajority vote. Under current rules, a simple majority of voters can pass an initiative that then requires future measures to achieve a two-thirds or other supermajority vote. This measure closes what critics call a loophole that allows a simple majority to permanently raise the bar for future voters. For example, if an initiative proposes requiring a two-thirds vote to raise taxes, this amendment would require that the initiative itself receive a two-thirds vote before it can take effect.',
    fiscalImpact: 'No direct fiscal impact. The measure changes procedural voting rules rather than spending, taxes, or government programs. Indirect effects are difficult to estimate and would depend on which future initiatives are affected by the new requirement.',
    proArgument: 'Supporters argue this measure prevents a simple majority of voters from permanently restricting the ability of future majorities to govern. They contend it is fundamentally unfair for 50.1% of voters to impose a two-thirds requirement that then ties the hands of future voters, making certain policies nearly impossible to change. The reform ensures that any measure raising the bar for democracy itself must meet the same high standard it proposes to create.',
    conArgument: 'Critics argue the measure limits the right of citizens to set the rules of their own government through the initiative process. Some fiscal conservatives argue that existing supermajority requirements for tax increases protect taxpayers from runaway government spending, and that this measure makes those protections harder to enact and easier to remove in the future.',
    category: 'Government Reform',
  },
  // ── California — Citizen Initiative with 1.3M Signatures Submitted (Pending Qualification) ──
  {
    id: 'ca-prop-4',
    stateCode: 'CA',
    state: 'California',
    number: 'CA Initiative #25-0007',
    title: 'Voter Identification Requirements',
    summary: 'This citizen-initiated constitutional amendment would require all California voters to present government-issued photo identification each time they vote in person. For voters casting mail-in ballots, it would require them to provide the last four digits of a government-issued identification number on their ballot envelope. The state would be required to provide free voter ID cards to any eligible voter who requests one. The measure would also require the secretary of state and county election officials to maintain accurate voter rolls, verify citizenship of registered voters using government data, and annually report the percentage of voters whose citizenship has been verified. As of March 2026, proponents submitted over 1.3 million signatures — well above the 874,641 required — and the measure is pending ballot qualification.',
    fiscalImpact: 'The state would incur one-time and ongoing costs to issue free voter ID cards to eligible residents who do not currently have qualifying identification. County election officials would need to update their systems and train poll workers to verify identification at the polls. Analysts estimate implementation costs in the tens of millions of dollars initially, with smaller ongoing administrative costs each election cycle.',
    proArgument: 'Supporters, led by State Assemblymember Carl DeMaio (R) and the Californians for Voter ID committee, argue that voter ID is a common-sense measure used in 36 states and nearly every major democracy in the world. They contend it adds a crucial layer of security against voter fraud and ensures that only eligible U.S. citizens cast ballots. Proponents point out that the measure includes a free voter ID card provision to ensure no eligible voter is disenfranchised by a lack of documentation.',
    conArgument: 'Opponents including the ACLU, the League of Women Voters, and Disability Rights California argue that voter fraud in California is extremely rare and that voter ID requirements create unnecessary barriers that disproportionately burden low-income voters, elderly voters, voters with disabilities, and communities of color who are less likely to have current government-issued photo identification. They argue that adding an ID number to mail ballot envelopes exposes sensitive personal data and that the existing multi-step voter registration and signature verification process already provides strong election security.',
    category: 'Election Administration',
  },
  // ── California — Competing Wealth Tax Measures (Props 40, 41, 42) ──
  {
    id: 'ca-prop-40',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 40',
    title: 'Billionaire Wealth Tax Act',
    summary: 'This citizen-initiated measure would impose a one-time 5% tax on the total net worth of California residents whose assets exceed $1 billion, valued as of December 31, 2026, and applying only to individuals who were California residents as of January 1, 2026. The tax applies to all assets worldwide — including stocks, real estate, business interests, and cash — minus liabilities such as mortgages and debts. A phase-in provision applies a reduced rate for individuals with net worth between $1 billion and $1.1 billion to avoid a sharp cliff effect. Proponents estimate the tax would raise approximately $100 billion over five years. Of the revenue collected, 90% would be directed to healthcare programs — particularly to offset cuts to Medicaid and other federal health funding — and the remaining 10% would fund K-14 education and food assistance programs. The measure was placed on the ballot through a citizen initiative drive and is part of a broader effort by progressives to fund state services in response to anticipated reductions in federal funding under the current administration. Note: Propositions 41 and 42 are competing measures that would nullify this tax if either receives more votes than Proposition 40.',
    fiscalImpact: 'The state Legislative Analyst\'s Office estimates the tax could generate approximately $18 billion to $22 billion in the first year of collection, with significant uncertainty in subsequent years as billionaires may change their residency, restructure their assets, or pursue legal challenges. California already derives an unusually large share of its income tax revenue from a small number of high-income residents, and any large-scale departure of billionaires from the state could result in a net long-term decline in overall tax revenue that offsets the initial gains.',
    proArgument: 'Supporters argue that California\'s wealthiest residents have accumulated extraordinary fortunes in part due to the state\'s infrastructure, workforce, and legal system, and that a one-time contribution is a reasonable ask to help fund healthcare and education during a period of deep federal cuts. They point out that the measure targets fewer than 200 individuals statewide and that the revenue would directly fund Medi-Cal, food assistance, and public schools that serve millions of low-income Californians who have no other safety net. Proponents also argue that a one-time tax on existing wealth — rather than income — is an innovative and legally defensible approach that other states and countries are increasingly exploring.',
    conArgument: 'Opponents, notably including Governor Gavin Newsom and major business groups such as the California Business Roundtable, argue the tax would prompt California\'s wealthiest residents to relocate to no-income-tax states such as Texas, Nevada, or Florida, ultimately costing the state far more in long-term income tax revenue than the one-time wealth tax generates. Critics also raise significant constitutional concerns about whether California can tax assets that are located outside the state and whether the measure\'s retroactive application to wealth accumulated before the law\'s passage is legally permissible. Some economists warn that the practical difficulty of valuing illiquid assets like private business interests and art could lead to costly litigation, administrative chaos, and a chilling effect on investment and business formation in the state.',
    category: 'Taxes',
  },
  {
    id: 'ca-prop-41',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 41',
    title: 'Audit Requirement and Spending Cap for New Tax Revenue',
    summary: 'Proposition 41 is a competing measure specifically designed to neutralize Proposition 40 if it passes. If both measures appear on the ballot and Proposition 41 receives more votes than Proposition 40, the wealth tax would not take effect. Proposition 41 would amend the California Constitution to require an independent state audit of any government program funded by new tax revenue before that revenue can be spent. Additionally, it would require that all revenue raised by new taxes count against California\'s constitutional spending limit — a cap established by Proposition 4 (1979) that restricts how much of its budget the state can spend in any given year. Because the wealth tax would raise tens of billions of dollars, forcing that revenue to count against the spending limit would effectively prevent the state from spending most of the new funds, making the wealth tax functionally meaningless even if it were collected. Proponents of Proposition 41 argue it is about fiscal accountability; critics argue it is a deliberate mechanism to kill the wealth tax.',
    fiscalImpact: 'The fiscal impact depends on whether Proposition 40 also passes and which measure receives more votes. If Proposition 41 prevails over Proposition 40, the wealth tax does not take effect and there is no revenue impact. Independently of the wealth tax, requiring all new tax revenues to count toward the state spending limit could significantly constrain California\'s ability to fund new programs from any future tax increases, potentially requiring cuts to existing services if future tax revenues push the state above its spending cap.',
    proArgument: 'Supporters argue that Proposition 41 is a good-government measure that promotes fiscal accountability and transparency regardless of the wealth tax fight. They contend that requiring independent audits before new tax money is spent protects taxpayers from waste, fraud, and abuse. They also argue that requiring new taxes to count against the spending limit prevents the legislature from using one-time windfalls to create permanent spending obligations that future budgets cannot sustain.',
    conArgument: 'Opponents including progressive advocacy groups and many Democrats in the state legislature argue that Proposition 41 is a cynical and deceptive measure whose only real purpose is to block the wealth tax by making its revenues unspendable. They contend that the spending cap provision would have far-reaching consequences beyond the wealth tax, effectively blocking the use of any future new tax revenue for critical public services including healthcare, housing, and education. Critics also argue the audit requirement adds unnecessary bureaucratic delay that would prevent the state from responding quickly to funding emergencies.',
    category: 'Taxes',
  },
  {
    id: 'ca-prop-42',
    stateCode: 'CA',
    state: 'California',
    number: 'Proposition 42',
    title: 'Prohibit New Taxes on Personal Property and Retroactive Taxes',
    summary: 'Proposition 42 is the second competing measure designed to neutralize Proposition 40. Like Proposition 41, if Proposition 42 passes and receives more votes than Proposition 40, the wealth tax would not take effect. Proposition 42 would amend the California Constitution to prohibit the state from levying new taxes directly on personal property — which includes assets such as stocks, bonds, and bank accounts — and to prohibit any retroactive taxes that apply to income, assets, or activity that occurred before the tax law was enacted. Because Proposition 40 taxes the value of assets (personal property) accumulated before the law takes effect, Proposition 42 would make it unconstitutional on two separate grounds: it taxes personal property, and it applies retroactively to wealth that already exists. The measure would effectively make California\'s wealth tax impossible to implement without a future constitutional amendment.',
    fiscalImpact: 'If Proposition 42 prevails over Proposition 40, the wealth tax does not take effect and there is no new revenue. Independently, the constitutional prohibition on taxing personal property and on retroactive taxes could limit the legislature\'s ability to design certain future tax policies, though most conventional taxes on income and transactions would not be affected. The longer-term fiscal impact depends on which types of tax structures future legislatures attempt to enact.',
    proArgument: 'Supporters including the California Chamber of Commerce and major technology and finance industry groups argue that prohibiting taxes on personal property and retroactive taxes are fundamental protections that provide certainty and predictability for residents, businesses, and investors. They contend that the ability to retroactively tax existing wealth is a dangerous precedent that undermines property rights and could be expanded in the future to affect ordinary Californians, not just billionaires. Proponents argue the measure simply codifies longstanding constitutional principles that already exist in federal law and in many state constitutions.',
    conArgument: 'Opponents argue that Proposition 42, like Proposition 41, is a special-interest measure funded by California\'s wealthiest residents to protect their own fortunes from taxation. Critics point out that the retroactivity argument against Proposition 40 is legally contested — courts have upheld some retroactive taxes in the past — and that this measure preemptively resolves a legal question in favor of billionaires before any court has ruled. Opponents also warn that broadly prohibiting taxes on personal property could unintentionally limit future tax options during economic emergencies when the state may need new revenue sources to fund public services.',
    category: 'Taxes',
  },
]

// ─── Race results mock data ───────────────────────────────────────────────────

export const RACE_RESULTS: RaceResult[] = [
  // ── FL Senate ──
  {
    raceId: 'fl-sen',
    raceLabel: 'Senate',
    office: 'Senate',
    stateCode: 'FL',
    totalResponses: 4620,
    candidates: [
      { candidateId: 'fl-sen-1', name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat',     count: 1983, percent: 43 },
      { candidateId: 'fl-sen-2', name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', count: 2637, percent: 57 },
    ],
    byAge: [
      { label: '18–24', count: 870,  candidates: [{ name: 'Maria E. Reyes',     lastName: 'Reyes',    party: 'Democrat',    percent: 59 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 41 }] },
      { label: '25–34', count: 940,  candidates: [{ name: 'Maria E. Reyes',     lastName: 'Reyes',    party: 'Democrat',    percent: 54 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 46 }] },
      { label: '35–44', count: 810,  candidates: [{ name: 'Maria E. Reyes',     lastName: 'Reyes',    party: 'Democrat',    percent: 48 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 52 }] },
      { label: '45–54', count: 750,  candidates: [{ name: 'Maria E. Reyes',     lastName: 'Reyes',    party: 'Democrat',    percent: 41 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 59 }] },
      { label: '55–64', count: 620,  candidates: [{ name: 'Maria E. Reyes',     lastName: 'Reyes',    party: 'Democrat',    percent: 35 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 65 }] },
      { label: '65+',   count: 630,  candidates: [{ name: 'Maria E. Reyes',     lastName: 'Reyes',    party: 'Democrat',    percent: 31 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 69 }] },
    ],
    byRace: [
      { label: 'White',               count: 1820, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 37 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 63 }] },
      { label: 'Black / African Am.', count: 980,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 74 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 26 }] },
      { label: 'Hispanic / Latino',   count: 1100, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 52 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 48 }] },
      { label: 'Asian / Pacific Is.', count: 420,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 61 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 39 }] },
      { label: 'Multiracial',         count: 300,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 55 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 45 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 1680, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 34 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 66 }] },
      { label: 'Catholic',      count: 880,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 46 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 54 }] },
      { label: 'Jewish',        count: 310,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 62 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 38 }] },
      { label: 'Muslim',        count: 250,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 68 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 32 }] },
      { label: 'Non-religious', count: 1500, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 58 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 42 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2300, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 52 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 48 }] },
      { label: 'Male',               count: 2100, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 34 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 66 }] },
      { label: 'Non-binary / Other', count: 220,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 71 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 29 }] },
    ],
    byIncome: [
      { label: 'Under $30K',   count: 780,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 58 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 42 }] },
      { label: '$30K–$60K',    count: 1100, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 49 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 51 }] },
      { label: '$60K–$100K',   count: 1300, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 44 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 56 }] },
      { label: '$100K–$150K',  count: 880,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 38 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 62 }] },
      { label: '$150K+',       count: 560,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 35 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 65 }] },
    ],
    byEducation: [
      { label: 'High School',   count: 880,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 38 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 62 }] },
      { label: 'Some College',  count: 1200, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 43 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 57 }] },
      { label: "Bachelor's",    count: 1560, candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 50 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 50 }] },
      { label: "Master's+",     count: 980,  candidates: [{ name: 'Maria E. Reyes', lastName: 'Reyes', party: 'Democrat', percent: 57 }, { name: 'James T. Holbrook', lastName: 'Holbrook', party: 'Republican', percent: 43 }] },
    ],
  },

  // ── CA Senate ──
  {
    raceId: 'ca-sen',
    raceLabel: 'Senate',
    office: 'Senate',
    stateCode: 'CA',
    totalResponses: 5840,
    candidates: [
      { candidateId: 'ca-sen-1', name: 'Angela Tran',      lastName: 'Tran',    party: 'Democrat',    count: 3738, percent: 64 },
      { candidateId: 'ca-sen-2', name: 'Derek Calloway',   lastName: 'Calloway',party: 'Republican',  count: 2102, percent: 36 },
    ],
    byAge: [
      { label: '18–24', count: 1020, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 76 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 24 }] },
      { label: '25–34', count: 1180, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 71 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 29 }] },
      { label: '35–44', count: 1090, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 66 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 34 }] },
      { label: '45–54', count: 960,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 60 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 40 }] },
      { label: '55–64', count: 840,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 55 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 45 }] },
      { label: '65+',   count: 750,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 50 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 50 }] },
    ],
    byRace: [
      { label: 'White',               count: 1870, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 57 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 43 }] },
      { label: 'Hispanic / Latino',   count: 1540, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 67 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 33 }] },
      { label: 'Asian / Pacific Is.', count: 1220, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 71 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 29 }] },
      { label: 'Black / African Am.', count: 760,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 80 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 20 }] },
      { label: 'Multiracial',         count: 450,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 68 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 32 }] },
    ],
    byReligion: [
      { label: 'Non-religious', count: 1980, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 74 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 26 }] },
      { label: 'Catholic',      count: 1120, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 60 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 40 }] },
      { label: 'Christian',     count: 1310, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 51 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 49 }] },
      { label: 'Jewish',        count: 430,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 69 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 31 }] },
      { label: 'Muslim',        count: 390,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 72 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 28 }] },
      { label: 'Buddhist',      count: 610,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 77 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 23 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2980, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 69 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 31 }] },
      { label: 'Male',               count: 2620, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 58 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 42 }] },
      { label: 'Non-binary / Other', count: 240,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 84 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 16 }] },
    ],
    byIncome: [
      { label: 'Under $30K',   count: 840,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 71 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 29 }] },
      { label: '$30K–$60K',    count: 1260, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 66 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 34 }] },
      { label: '$60K–$100K',   count: 1480, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 63 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 37 }] },
      { label: '$100K–$150K',  count: 1290, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 60 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 40 }] },
      { label: '$150K+',       count: 970,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 55 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 45 }] },
    ],
    byEducation: [
      { label: 'High School',  count: 820,  candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 59 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 41 }] },
      { label: 'Some College', count: 1190, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 62 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 38 }] },
      { label: "Bachelor's",   count: 2020, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 67 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 33 }] },
      { label: "Master's+",    count: 1810, candidates: [{ name: 'Angela Tran', lastName: 'Tran', party: 'Democrat', percent: 72 }, { name: 'Derek Calloway', lastName: 'Calloway', party: 'Republican', percent: 28 }] },
    ],
  },

  // ── CA House District 33 ──
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
    byIncome: [
      { label: 'Under $30K',   count: 390,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 72 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 28 }] },
      { label: '$30K–$60K',    count: 620,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 68 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 32 }] },
      { label: '$60K–$100K',   count: 750,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 65 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 35 }] },
      { label: '$100K–$150K',  count: 680,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 63 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 37 }] },
      { label: '$150K+',       count: 520,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 59 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 41 }] },
    ],
    byEducation: [
      { label: 'High School',  count: 380,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 61 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 39 }] },
      { label: 'Some College', count: 570,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 64 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 36 }] },
      { label: "Bachelor's",   count: 1100, candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 69 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 31 }] },
      { label: "Master's+",    count: 910,  candidates: [{ name: 'Michelle Park', lastName: 'Park', party: 'Democrat', percent: 74 }, { name: 'Tom Whitfield', lastName: 'Whitfield', party: 'Republican', percent: 26 }] },
    ],
  },

  // ── TX Senate ──
  {
    raceId: 'tx-sen',
    raceLabel: 'Senate',
    office: 'Senate',
    stateCode: 'TX',
    totalResponses: 5120,
    candidates: [
      { candidateId: 'tx-sen-1', name: 'Robert "Bobby" Cruz', lastName: 'Cruz',    party: 'Republican', count: 3021, percent: 59 },
      { candidateId: 'tx-sen-2', name: 'Diane Morales',       lastName: 'Morales', party: 'Democrat',   count: 2099, percent: 41 },
    ],
    byAge: [
      { label: '18–24', count: 820,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 42 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 58 }] },
      { label: '25–34', count: 960,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 48 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 52 }] },
      { label: '35–44', count: 980,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 55 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 45 }] },
      { label: '45–54', count: 940,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 63 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 37 }] },
      { label: '55–64', count: 780,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 69 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 31 }] },
      { label: '65+',   count: 640,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 72 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 28 }] },
    ],
    byRace: [
      { label: 'White',               count: 2010, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 72 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 28 }] },
      { label: 'Hispanic / Latino',   count: 1760, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 48 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 52 }] },
      { label: 'Black / African Am.', count: 820,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 22 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 78 }] },
      { label: 'Asian / Pacific Is.', count: 340,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 43 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 57 }] },
      { label: 'Multiracial',         count: 190,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 50 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 50 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 2240, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 72 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 28 }] },
      { label: 'Catholic',      count: 1180, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 56 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 44 }] },
      { label: 'Non-religious', count: 980,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 38 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 62 }] },
      { label: 'Muslim',        count: 310,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 29 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 71 }] },
      { label: 'Jewish',        count: 410,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 34 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 66 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2530, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 51 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 49 }] },
      { label: 'Male',               count: 2460, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 67 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 33 }] },
      { label: 'Non-binary / Other', count: 130,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 31 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 69 }] },
    ],
    byIncome: [
      { label: 'Under $30K',   count: 690,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 47 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 53 }] },
      { label: '$30K–$60K',    count: 1080, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 55 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 45 }] },
      { label: '$60K–$100K',   count: 1380, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 61 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 39 }] },
      { label: '$100K–$150K',  count: 1140, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 64 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 36 }] },
      { label: '$150K+',       count: 830,  candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 62 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 38 }] },
    ],
    byEducation: [
      { label: 'High School',  count: 1040, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 65 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 35 }] },
      { label: 'Some College', count: 1290, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 62 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 38 }] },
      { label: "Bachelor's",   count: 1560, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 55 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 45 }] },
      { label: "Master's+",    count: 1230, candidates: [{ name: 'Robert Cruz', lastName: 'Cruz', party: 'Republican', percent: 48 }, { name: 'Diane Morales', lastName: 'Morales', party: 'Democrat', percent: 52 }] },
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
    byIncome: [
      { label: 'Under $30K',   count: 310,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 46 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 54 }] },
      { label: '$30K–$60K',    count: 520,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 55 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 45 }] },
      { label: '$60K–$100K',   count: 640,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 62 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 38 }] },
      { label: '$100K–$150K',  count: 530,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 65 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 35 }] },
      { label: '$150K+',       count: 380,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 63 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 37 }] },
    ],
    byEducation: [
      { label: 'High School',  count: 510,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 66 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 34 }] },
      { label: 'Some College', count: 640,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 62 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 38 }] },
      { label: "Bachelor's",   count: 730,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 56 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 44 }] },
      { label: "Master's+",    count: 500,  candidates: [{ name: 'Kyle Barnett', lastName: 'Barnett', party: 'Republican', percent: 49 }, { name: 'Rosa Gutierrez', lastName: 'Gutierrez', party: 'Democrat', percent: 51 }] },
    ],
  },

  // ── NY Senate ──
  {
    raceId: 'ny-sen',
    raceLabel: 'Senate',
    office: 'Senate',
    stateCode: 'NY',
    totalResponses: 4980,
    candidates: [
      { candidateId: 'ny-sen-1', name: 'Priya Kapoor',    lastName: 'Kapoor',   party: 'Democrat',   count: 3187, percent: 64 },
      { candidateId: 'ny-sen-2', name: 'Frank Deluca',    lastName: 'Deluca',   party: 'Republican', count: 1793, percent: 36 },
    ],
    byAge: [
      { label: '18–24', count: 890,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 75 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 25 }] },
      { label: '25–34', count: 1010, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 72 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 28 }] },
      { label: '35–44', count: 940,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 66 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 34 }] },
      { label: '45–54', count: 860,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 60 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 40 }] },
      { label: '55–64', count: 720,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 55 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 45 }] },
      { label: '65+',   count: 560,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 51 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 49 }] },
    ],
    byRace: [
      { label: 'White',               count: 1640, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 55 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 45 }] },
      { label: 'Black / African Am.', count: 1190, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 82 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 18 }] },
      { label: 'Hispanic / Latino',   count: 980,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 70 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 30 }] },
      { label: 'Asian / Pacific Is.', count: 740,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 73 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 27 }] },
      { label: 'Multiracial',         count: 430,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 67 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 33 }] },
    ],
    byReligion: [
      { label: 'Non-religious', count: 1490, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 76 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 24 }] },
      { label: 'Jewish',        count: 780,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 70 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 30 }] },
      { label: 'Catholic',      count: 1020, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 59 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 41 }] },
      { label: 'Christian',     count: 1090, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 52 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 48 }] },
      { label: 'Muslim',        count: 380,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 74 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 26 }] },
      { label: 'Hindu',         count: 220,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 78 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 22 }] },
    ],
    byGender: [
      { label: 'Female',             count: 2560, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 69 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 31 }] },
      { label: 'Male',               count: 2230, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 57 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 43 }] },
      { label: 'Non-binary / Other', count: 190,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 85 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 15 }] },
    ],
    byIncome: [
      { label: 'Under $30K',   count: 720,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 72 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 28 }] },
      { label: '$30K–$60K',    count: 1010, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 66 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 34 }] },
      { label: '$60K–$100K',   count: 1220, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 63 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 37 }] },
      { label: '$100K–$150K',  count: 1080, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 60 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 40 }] },
      { label: '$150K+',       count: 950,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 57 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 43 }] },
    ],
    byEducation: [
      { label: 'High School',  count: 760,  candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 57 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 43 }] },
      { label: 'Some College', count: 1050, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 61 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 39 }] },
      { label: "Bachelor's",   count: 1720, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 67 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 33 }] },
      { label: "Master's+",    count: 1450, candidates: [{ name: 'Priya Kapoor', lastName: 'Kapoor', party: 'Democrat', percent: 73 }, { name: 'Frank Deluca', lastName: 'Deluca', party: 'Republican', percent: 27 }] },
    ],
  },

  // ── NY House District 12 ──
  {
    raceId: 'ny-house-12',
    raceLabel: 'House – District 12',
    office: 'House',
    stateCode: 'NY',
    totalResponses: 2710,
    candidates: [
      { candidateId: 'ny-house-12-1', name: 'Marcus Webb',    lastName: 'Webb',    party: 'Democrat',   count: 1788, percent: 66 },
      { candidateId: 'ny-house-12-2', name: 'Irene Kowalski', lastName: 'Kowalski',party: 'Republican', count: 922,  percent: 34 },
    ],
    byAge: [
      { label: '18–24', count: 500,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 77 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 23 }] },
      { label: '25–34', count: 570,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 74 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 26 }] },
      { label: '35–44', count: 530,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 68 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 32 }] },
      { label: '45–54', count: 490,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 61 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 39 }] },
      { label: '55–64', count: 380,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 56 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 44 }] },
      { label: '65+',   count: 240,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 52 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 48 }] },
    ],
    byRace: [
      { label: 'White',               count: 790,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 57 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 43 }] },
      { label: 'Black / African Am.', count: 760,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 84 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 16 }] },
      { label: 'Hispanic / Latino',   count: 580,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 72 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 28 }] },
      { label: 'Asian / Pacific Is.', count: 420,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 70 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 30 }] },
      { label: 'Multiracial',         count: 160,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 67 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 33 }] },
    ],
    byReligion: [
      { label: 'Non-religious', count: 860,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 78 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 22 }] },
      { label: 'Jewish',        count: 430,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 72 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 28 }] },
      { label: 'Catholic',      count: 540,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 60 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 40 }] },
      { label: 'Christian',     count: 560,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 53 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 47 }] },
      { label: 'Muslim',        count: 320,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 76 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 24 }] },
    ],
    byGender: [
      { label: 'Female',             count: 1400, candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 70 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 30 }] },
      { label: 'Male',               count: 1200, candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 60 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 40 }] },
      { label: 'Non-binary / Other', count: 110,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 86 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 14 }] },
    ],
    byIncome: [
      { label: 'Under $30K',   count: 380,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 73 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 27 }] },
      { label: '$30K–$60K',    count: 560,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 68 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 32 }] },
      { label: '$60K–$100K',   count: 670,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 65 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 35 }] },
      { label: '$100K–$150K',  count: 580,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 62 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 38 }] },
      { label: '$150K+',       count: 520,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 59 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 41 }] },
    ],
    byEducation: [
      { label: 'High School',  count: 420,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 59 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 41 }] },
      { label: 'Some College', count: 590,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 63 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 37 }] },
      { label: "Bachelor's",   count: 960,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 69 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 31 }] },
      { label: "Master's+",    count: 740,  candidates: [{ name: 'Marcus Webb', lastName: 'Webb', party: 'Democrat', percent: 75 }, { name: 'Irene Kowalski', lastName: 'Kowalski', party: 'Republican', percent: 25 }] },
    ],
  },

  // ── FL House District 7 ──
  {
    raceId: 'fl-house-7',
    raceLabel: 'House – District 7',
    stateCode: 'FL',
    office: 'House',
    totalResponses: 2140,
    candidates: [
      { candidateId: 'fl-house-7-1', name: 'Sandra Wiley',  lastName: 'Wiley',  party: 'Democrat',    count: 1113, percent: 52 },
      { candidateId: 'fl-house-7-2', name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican',  count: 1027, percent: 48 },
    ],
    byAge: [
      { label: '18–24', count: 410, candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 61 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 39 }] },
      { label: '25–34', count: 480, candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 57 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 43 }] },
      { label: '35–44', count: 390, candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 52 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 48 }] },
      { label: '45–54', count: 340, candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 46 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 54 }] },
      { label: '55–64', count: 290, candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 42 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 58 }] },
      { label: '65+',   count: 230, candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 38 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 62 }] },
    ],
    byRace: [
      { label: 'White',               count: 890,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 44 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 56 }] },
      { label: 'Black / African Am.', count: 510,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 72 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 28 }] },
      { label: 'Hispanic / Latino',   count: 490,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 55 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 45 }] },
      { label: 'Asian / Pacific Is.', count: 180,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 59 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 41 }] },
      { label: 'Multiracial',         count: 70,   candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 53 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 47 }] },
    ],
    byReligion: [
      { label: 'Christian',     count: 780,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 41 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 59 }] },
      { label: 'Catholic',      count: 390,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 49 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 51 }] },
      { label: 'Non-religious', count: 640,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 65 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 35 }] },
      { label: 'Jewish',        count: 180,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 60 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 40 }] },
      { label: 'Muslim',        count: 150,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 67 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 33 }] },
    ],
    byGender: [
      { label: 'Female',             count: 1100, candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 58 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 42 }] },
      { label: 'Male',               count: 980,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 45 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 55 }] },
      { label: 'Non-binary / Other', count: 60,   candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 73 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 27 }] },
    ],
    byIncome: [
      { label: 'Under $30K',  count: 380,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 60 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 40 }] },
      { label: '$30K–$60K',   count: 560,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 54 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 46 }] },
      { label: '$60K–$100K',  count: 620,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 50 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 50 }] },
      { label: '$100K–$150K', count: 380,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 44 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 56 }] },
      { label: '$150K+',      count: 200,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 39 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 61 }] },
    ],
    byEducation: [
      { label: 'High School',  count: 390,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 44 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 56 }] },
      { label: 'Some College', count: 560,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 49 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 51 }] },
      { label: "Bachelor's",   count: 730,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 55 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 45 }] },
      { label: "Master's+",    count: 460,  candidates: [{ name: 'Sandra Wiley', lastName: 'Wiley', party: 'Democrat', percent: 61 }, { name: 'Carlos Mendez', lastName: 'Mendez', party: 'Republican', percent: 39 }] },
    ],
  },
]

// ─── Party helpers ────────────────────────────────────────────────────────────

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
