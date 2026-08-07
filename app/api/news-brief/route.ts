import { streamText } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

const STATE_CONTEXT: Record<string, string> = {
  CA: `California — the most populous U.S. state with 39 million residents and a Democratic supermajority legislature.
Governor: Gavin Newsom (D). U.S. Senators: Alex Padilla (D) and Laphonza Butler (D).
Key dynamics: Deep blue statewide but suburban and inland areas trend Republican. Homelessness, housing costs, and water scarcity dominate public discourse.
Recent ballot activity: Prop 1 (mental health and homelessness bonds, 2024), criminal justice reform measures, and several tax-related initiatives.
Top voter concerns: housing affordability, homelessness, water and drought, fentanyl epidemic, high taxes, crime, wildfire costs, immigration at the southern border.
Districts in play: Multiple House seats in Orange County, Central Valley, and the Inland Empire are competitive.`,

  FL: `Florida — 22 million residents, now decisively Republican statewide after years as a swing state.
Governor: Ron DeSantis (R). U.S. Senators: Marco Rubio (R) and Rick Scott (R).
Key dynamics: Miami-Dade shifted toward Republicans in 2020-2022. Democrats struggle to find a statewide message.
Recent ballot activity: Amendment 4 (abortion access, 2024 — narrowly failed to reach 60% threshold), homestead exemption expansions.
Top voter concerns: homeowners insurance crisis, hurricane preparedness and FEMA funding, abortion access, immigration policy, cost of living, school curriculum debates.
Districts in play: Several Central Florida House seats and statewide constitutional amendment races.`,

  TX: `Texas — 30 million residents and the second largest U.S. economy, solidly Republican statewide but urban areas trend blue.
Governor: Greg Abbott (R). U.S. Senators: John Cornyn (R) and Ted Cruz (R).
Key dynamics: Austin, Houston, Dallas, and San Antonio are Democratic strongholds. Ted Cruz faces increasingly competitive races.
Recent ballot activity: Property tax relief measures, water infrastructure bonds, and school choice amendments have appeared on recent ballots.
Top voter concerns: border security, immigration, power grid reliability after 2021 winter storm, abortion ban enforcement, water access, rapid population growth.
Districts in play: Several suburban Dallas-Fort Worth and Houston House seats are competitive.`,

  NY: `New York — 20 million residents, dominated by New York City politics but with competitive suburban districts.
Governor: Kathy Hochul (D). U.S. Senators: Chuck Schumer (D, Majority Leader) and Kirsten Gillibrand (D).
Key dynamics: Long Island and Hudson Valley flipped Republican in 2022. NYC migrant crisis has dominated state politics.
Recent ballot activity: Clean Air, Clean Water, and Green Future Amendment, bail reform-related measures, housing density proposals in NYC.
Top voter concerns: NYC crime and subway safety, housing shortage and rent costs, migrant arrivals overwhelming shelter systems, congestion pricing, school performance, fentanyl.
Districts in play: Long Island, Hudson Valley, and western NY House seats are key battlegrounds.`,

  AZ: `Arizona — 7.4 million residents, one of the most closely contested swing states in recent elections.
Governor: Katie Hobbs (D), won by less than 0.6% in 2022. U.S. Senators: Mark Kelly (D) and Kyrsten Sinema (I, not seeking reelection).
Key dynamics: Maricopa County is the critical battleground. Former President Trump's claims about 2020 election continue to shape state politics.
Recent ballot activity: Prop 139 (abortion rights enshrined in constitution, 2024 — passed), water conservation measures, election integrity proposals.
Top voter concerns: water scarcity and Colorado River access, immigration at the southern border, abortion access, election integrity concerns, housing costs, copper mining policy.`,

  GA: `Georgia — 11 million residents, a recently flipped purple state that gave Democrats two U.S. Senate seats in 2021.
Governor: Brian Kemp (R). U.S. Senators: Jon Ossoff (D) and Raphael Warnock (D).
Key dynamics: Atlanta metro suburbs drove Democratic gains. Rural Georgia remains deeply Republican. Election administration remains contentious.
Recent ballot activity: Voting access and election administration measures, criminal justice reform proposals.
Top voter concerns: economic development, voting rights and election administration, abortion access, public safety in Atlanta, education funding, immigration.`,

  PA: `Pennsylvania — 13 million residents and perennially one of the most pivotal swing states in presidential elections.
Governor: Josh Shapiro (D). U.S. Senators: Bob Casey (D) and John Fetterman (D).
Key dynamics: Philadelphia and Pittsburgh drive Democratic votes; rural and Rust Belt areas trend Republican. Steel and energy industries shape economic debate.
Recent ballot activity: Constitutional amendments on crime victims rights, judicial retention elections.
Top voter concerns: economic security and manufacturing jobs, abortion access, energy policy (fracking and natural gas), public safety, gun violence, election integrity.`,

  OH: `Ohio — 11.8 million residents, once a bellwether state that has shifted toward Republicans in federal races.
Governor: Mike DeWine (R). U.S. Senators: Sherrod Brown (D, one of the most vulnerable Senate incumbents) and JD Vance (R).
Key dynamics: Cleveland, Columbus, and Cincinnati are Democratic but shrinking in relative influence. Appalachian Ohio is deeply red.
Recent ballot activity: Issue 1 (abortion rights enshrined in constitution, 2023 — passed despite Republican opposition), marijuana legalization.
Top voter concerns: manufacturing job loss, opioid crisis, abortion rights, agricultural policy, inflation, energy costs.`,

  MI: `Michigan — 10 million residents, a critical Rust Belt swing state that flipped blue in 2018 and 2020.
Governor: Gretchen Whitmer (D). U.S. Senators: Debbie Stabenow (D, retiring) and Gary Peters (D).
Key dynamics: Detroit metro and college towns drive Democratic votes. Auto industry is central to economic identity. Arab-American community in Dearborn is a notable political force.
Recent ballot activity: Prop 3 (abortion rights enshrined in constitution, 2022 — passed), voting access expansion measures.
Top voter concerns: auto industry and EV transition jobs, abortion rights, water quality (Flint legacy), gun safety, energy costs, Middle East foreign policy among Dearborn voters.`,

  WI: `Wisconsin — 5.9 million residents, one of the closest swing states in recent presidential elections.
Governor: Tony Evers (D). U.S. Senators: Tammy Baldwin (D) and Ron Johnson (R).
Key dynamics: Milwaukee and Madison are Democratic strongholds; the rest of the state leans Republican. Supreme Court races have become nationalized.
Recent ballot activity: Multiple Wisconsin Supreme Court elections (abortion rights, redistricting implications), election administration proposals.
Top voter concerns: abortion access, dairy farm economics, redistricting and voting maps, gun policy, manufacturing jobs, college student debt.`,
}

// Fallback for states not in the detailed context above
function getStateContext(code: string, name: string): string {
  return STATE_CONTEXT[code] ?? `${name} — a U.S. state with its own distinct political landscape, voter concerns, and upcoming election races.
Use your knowledge of this state's governor, U.S. senators, congressional delegation, recent ballot measures, top policy issues, and political dynamics as of 2024-2026.
Focus on what is most relevant and specific to ${name} voters heading into the next election cycle.`
}

const TOPICS: Record<string, { label: string; prompt: string }> = {
  policy: {
    label: 'Policy & Issues',
    prompt: `Identify and explain the five most important policy issues currently shaping this state's election landscape.

For each issue:
- Describe the current state of the problem in plain terms — what is actually happening on the ground
- Explain why this issue matters specifically to voters in this state (not generically to "Americans")
- Summarize where the two parties stand and what each side is proposing
- Note any recent developments — a new law, court ruling, budget decision, or news story — that has shifted the debate
- Be honest about which issues have clear solutions and which are genuinely hard to fix

Focus on the issues that are dominating campaign ads, town halls, and voter conversations in this state right now. Cover topics across this range as relevant: immigration, taxes, education, healthcare, crime, housing, transportation, environment, and energy. Prioritize whichever five are most live in this state.`,
  },

  voters: {
    label: "What Voters Are Saying",
    prompt: `Summarize the issues receiving the most public attention and emotional energy among voters in this state's current election cycle.

For each topic:
- Explain what voters are actually saying — not what politicians say voters care about, but what is showing up in town halls, social media, local news, and polling
- Describe who cares most about this issue and why it affects their daily life
- Explain what has made this issue flare up recently — a specific event, a price spike, a crime story, a court ruling
- Be honest about frustration levels — are voters angry, worried, hopeful, or resigned?
- Note any surprising shifts — issues that unexpectedly moved up or down in importance

Give a real street-level picture of voter sentiment in this specific state. Avoid generic national talking points.`,
  },

  propositions: {
    label: 'Proposition & Ballot Updates',
    prompt: `Provide voters in this state with a clear, up-to-date briefing on ballot measures and propositions they will face or have recently decided on.

Cover the following:
- What are the most significant active, upcoming, or recently decided ballot measures? Explain each one in plain English — no legal jargon
- Have any new propositions been added, qualified, or removed from the ballot recently?
- Have any court rulings blocked, altered, or reinstated a measure voters expected to see?
- Who is funding the campaigns for and against each measure, and what does that money suggest about who really benefits?
- What are the strongest arguments from each side — not straw men, but the most persuasive versions of each case?
- What is the estimated fiscal impact — will taxes go up, will spending be cut, or is it cost-neutral?
- Are there any confusing aspects of how the measure is worded that voters have complained about?

Help voters walk into the booth understanding exactly what they are deciding and what each outcome means for their daily life.`,
  },

  updates: {
    label: 'Election Updates',
    prompt: `Deliver a focused briefing of the most important election developments in this state from the past 7 days.

Stick strictly to verified, newsworthy facts. Cover:
- Any candidates who have entered or exited a race since last week — and why it matters
- Debate announcements, schedule changes, or notable moments from recent debates
- Major endorsements from elected officials, unions, business groups, newspapers, or celebrities — and whether they are likely to move votes
- Significant campaign announcements: new policy positions, ad campaigns, fundraising numbers, or strategy shifts
- Any lawsuits, legal challenges, or court rulings affecting the election — ballot access, districting, voting rules
- Polling shifts: if any race has moved more than 3 points in recent surveys, explain what drove it
- Any candidate controversy, gaffe, or scandal that broke this week

Be precise. If something happened, say when and what the consequences are. If a race was considered safe and is now competitive, say so directly.`,
  },
}

export async function POST(req: Request) {
  const { stateCode, stateName, topicKey } = await req.json()

  const stateContext = getStateContext(stateCode, stateName ?? stateCode)
  const topic = TOPICS[topicKey]

  if (!topic) {
    return new Response('Invalid topic', { status: 400 })
  }

  const today = new Date()
  const cutoff = new Date(today)
  cutoff.setDate(cutoff.getDate() - 180)
  const todayStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const cutoffStr = cutoff.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  const result = streamText({
    model: 'google/gemini-2.5-flash',
    system: `You are a veteran political journalist with 25 years covering U.S. state elections. You write for an educated general audience — people who want real, actionable information, not spin from either party.

Today's date is ${todayStr}. The 180-day cutoff date is ${cutoffStr}.

Your rules:
- HARD TIME CONSTRAINT: You may ONLY reference events, developments, rulings, polls, candidates, and news that occurred ON OR AFTER ${cutoffStr}. Any item that predates ${cutoffStr} must be completely excluded. If all you know about a topic is older than ${cutoffStr}, say "No significant developments in this area since ${cutoffStr}" rather than surfacing outdated information.
- Be specific. Use real names, real numbers, and real events. Vague generalities are useless to voters.
- Be state-specific. Everything you say must be grounded in this particular state's politics, not a generic national overview.
- Be balanced. Present what each side actually believes with equal seriousness. No caricatures.
- Be honest about complexity. If an issue has no easy answer, say so.
- Be concise. 5 to 7 short paragraphs maximum. Every sentence must earn its place.
- Write in plain conversational prose. No markdown headers, no bullet points, no bold text — flowing paragraphs only.
- Treat the reader as an intelligent adult who can handle nuance and contradiction.
- If there is something voters are genuinely not being told by either campaign, surface it.`,
    prompt: `Today is ${todayStr}. Only include items from ${cutoffStr} or later.\n\nState: ${stateName ?? stateCode}\n\nState context:\n${stateContext}\n\n---\n\n${topic.prompt}`,
  })

  return result.toTextStreamResponse()
}
