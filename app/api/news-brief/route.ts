import { streamText } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

const STATE_CONTEXT: Record<string, string> = {
  CA: `California — the most populous state in the U.S. with 39 million residents and a Democratic supermajority in the legislature.
Governor: Gavin Newsom (D), term runs through 2026, nationally known and widely seen as a potential future presidential candidate.
U.S. Senators: Alex Padilla (D) and Laphonza Butler (D, appointed 2023 after Dianne Feinstein's death).
Top voter issues: housing unaffordability and homelessness crisis in cities like LA and SF, water scarcity and drought, the fentanyl and drug epidemic, high cost of living, wildfires and climate policy, public school performance, illegal immigration at the southern border.
Political tension: Despite Democratic dominance statewide, suburban and inland areas trend Republican. Business groups and moderates increasingly clash with progressive wing over crime, housing density, and business regulations.`,

  FL: `Florida — a key swing-turned-Republican state of 22 million people, now the third most populous in the U.S.
Governor: Ron DeSantis (R), reelected in 2022 by nearly 20 points. Running in 2024 presidential primary. A national conservative leader.
U.S. Senators: Marco Rubio (R) and Rick Scott (R) — both staunchly conservative.
Top voter issues: soaring homeowners insurance costs (many insurers have exited the state), hurricane preparedness and FEMA funding, immigration and the Florida-Mexico border policy, cost of living inflation, Disney/DeSantis culture war fallout, abortion access after the 6-week ban, public school curriculum battles.
Political tension: Miami-Dade County shifted sharply toward Republicans in 2020-2022, fueled by Latino voters. Democrats are struggling to find a statewide message.`,

  TX: `Texas — the second largest state by population (30 million) and economy. Solidly Republican statewide but increasingly competitive in major cities.
Governor: Greg Abbott (R), reelected 2022. Known for hardline immigration policies including busing migrants to Democratic cities.
U.S. Senators: John Cornyn (R) and Ted Cruz (R), who faces a tight reelection battle in 2024 against Rep. Colin Allred (D).
Top voter issues: border security and illegal immigration (Texas shares the longest stretch of U.S.-Mexico border), energy independence and the Texas power grid (ERCOT failure in 2021 killed hundreds), abortion ban with no exceptions for rape or incest, water access and drought, rapid population growth from California and other blue states.
Political tension: Austin, Houston, Dallas, and San Antonio are Democratic strongholds. The Ted Cruz vs. Colin Allred 2024 Senate race is one of the most watched in the country.`,

  NY: `New York — 20 million residents, home to New York City which drives much of the state's politics, economy, and culture.
Governor: Kathy Hochul (D), first woman to serve as NY governor after replacing Andrew Cuomo who resigned in 2021. Won a narrow 2022 election.
U.S. Senators: Chuck Schumer (D, Senate Majority Leader) and Kirsten Gillibrand (D).
Top voter issues: NYC crime and subway safety, the catastrophic housing shortage and rent crisis, rising cost of living, congestion pricing controversy in Manhattan, illegal migrant arrivals overwhelming the shelter system, fentanyl crisis, declining public school enrollment.
Political tension: Suburban Long Island and Hudson Valley districts flipped Republican in 2022, costing Democrats their House majority. Hochul's 2022 near-loss exposed Democratic vulnerability outside NYC.`,
}

const TOPICS: Record<string, { label: string; prompt: string }> = {
  overview: {
    label: 'Political Overview',
    prompt: `Give a sharp, honest political briefing of this state as of 2024-2026. Answer these questions directly:
- Who is really in control — the governor, the legislature, or neither?
- What is the single biggest issue driving voters right now?
- How has the political landscape shifted in the last two years?
- What does the average resident actually feel about their state government?
Write like a seasoned political reporter briefing a first-time voter. Be blunt, fair, and specific.`,
  },

  senate: {
    label: 'Senate & Congress',
    prompt: `Break down this state's representation in Washington D.C. as of 2024-2026:
- Who are the two U.S. Senators — what do they stand for, and are they effective?
- How many House seats does this state have, and which party controls them?
- Are there any upcoming Senate or House races that could shift power?
- What legislation has this state's delegation recently pushed or blocked?
Be specific with names and tell voters what their federal representatives have actually done, not just what they say.`,
  },

  governor: {
    label: 'Governor & State Gov',
    prompt: `Give voters a frank assessment of this state's governor and state government right now:
- What is the governor's biggest policy win in the last two years?
- What is their most criticized failure or controversy?
- What is the governor's top priority heading into 2025-2026?
- How is the relationship between the governor and the state legislature?
- Is the governor seen as a rising national figure, a lame duck, or somewhere in between?
Be direct. Voters want to know if their governor is actually getting things done.`,
  },

  republican: {
    label: 'Republican View',
    prompt: `Explain the Republican perspective in this state as of 2024-2026 from the inside looking out:
- What do Republican voters and politicians in this state say is the single biggest problem the Democrats have caused?
- What are their top three policy priorities and why do they believe these matter to everyday residents?
- Who are the most prominent Republican voices in this state right now?
- What is the Republican Party's strategy to gain or hold power here?
- What do they say to swing voters who are frustrated with both parties?
Write this from the perspective of a Republican making their best case. Be fair and specific.`,
  },

  democrat: {
    label: 'Democrat View',
    prompt: `Explain the Democratic perspective in this state as of 2024-2026 from the inside looking out:
- What do Democratic voters and politicians in this state say is the single biggest threat Republicans pose to residents?
- What are their top three policy priorities and why do they believe these matter to everyday people?
- Who are the most prominent Democratic voices in this state right now?
- What is the Democratic Party's strategy to gain or hold power here?
- What do they say to swing voters who are frustrated with both parties?
Write this from the perspective of a Democrat making their best case. Be fair and specific.`,
  },

  ballot: {
    label: 'Ballot & Propositions',
    prompt: `Explain ballot measures and voter propositions in this state as of 2024-2026:
- What were the most significant measures voters recently decided on? What did they mean in plain English?
- Are there any major upcoming propositions voters should know about?
- Which measures were controversial — and what did each side argue?
- Did any recent ballot results surprise political analysts?
Skip the legal language. Explain each measure like you are telling a neighbor what they are actually voting on and why it matters to their daily life.`,
  },

  controversy: {
    label: 'Controversies',
    prompt: `Give a no-holds-barred breakdown of the biggest political controversies in this state right now:
- What is the single most heated political fight happening in this state today?
- What are the two sides each saying — in their own words, not filtered?
- Is there a scandal involving an elected official that voters are talking about?
- What controversy has most divided the state along party, racial, or economic lines?
- Which controversy is most likely to affect the next election?
Be direct and balanced. Do not soften anything — voters deserve the unfiltered version.`,
  },
}

export async function POST(req: Request) {
  const { stateCode, topicKey } = await req.json()

  const stateContext = STATE_CONTEXT[stateCode]
  const topic = TOPICS[topicKey]

  if (!stateContext || !topic) {
    return new Response('Invalid state or topic', { status: 400 })
  }

  const result = streamText({
    model: 'google/gemini-2.5-flash',
    system: `You are a veteran political journalist who has covered U.S. state politics for 20 years. You write for an educated general audience — people who want real information, not spin.

Your rules:
- Be specific. Use real names, real numbers, real events. Never be vague.
- Be balanced. Present what each side actually believes, not a caricature.
- Be concise. 4 to 6 short paragraphs max. No fluff.
- Write in plain conversational prose. No markdown headers, no bullet points, no bold text.
- Treat the reader as an intelligent adult who can handle complexity.
- If something is genuinely controversial or unclear, say so honestly.`,
    prompt: `State context:\n${stateContext}\n\n---\n\n${topic.prompt}`,
  })

  return result.toTextStreamResponse()
}
