import { streamText } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

const STATE_CONTEXT: Record<string, string> = {
  CA: `California — Democratic supermajority state, 39 million residents. Governor Gavin Newsom (D). Key political figures: AG Rob Bonta, Lt. Gov. Eleni Kounalakis. Current fault lines: homelessness and fentanyl crisis in LA and SF, shoplifting and retail crime surge after Prop 47, high cost of living driving out-migration, water and wildfire policy failures, housing shortage, Newsom's national political ambitions, public school performance decline, and immigration enforcement conflict with federal policy.`,

  FL: `Florida — Republican-dominated state, 22 million residents. Governor Ron DeSantis (R). Key figures: AG Ashley Moody, CFO Jimmy Patronis. Current fault lines: DeSantis's post-presidential-run political standing, 6-week abortion ban enforcement, education culture war legislation, skyrocketing homeowners insurance market collapse, immigration enforcement operations, property insurance fraud, and the 2026 governor's race taking shape.`,

  TX: `Texas — Solidly Republican state, 30 million residents. Governor Greg Abbott (R). Key figures: AG Ken Paxton, Lt. Gov. Dan Patrick. Current fault lines: border and immigration enforcement operations, abortion ban with medical exception fights, ERCOT power grid reliability after 2021 failure, school voucher program battles, AG Paxton's post-impeachment political rehabilitation, gun policy after Uvalde, and the 2026 Senate race.`,

  NY: `New York — Democratic-dominated state, 20 million residents. Governor Kathy Hochul (D). Key figures: Mayor Eric Adams (federal indictment), AG Letitia James. Current fault lines: migrant crisis overwhelming city shelters, NYC subway crime and safety, Adams corruption case outcome, Hochul's congestion pricing reversal, housing density battles, progressive vs. moderate Democratic civil war, and the 2026 governor's primary.`,

  AZ: `Arizona — Battleground state, 7.5 million residents. Governor Katie Hobbs (D), facing a Republican-controlled legislature. Key figures: AG Kris Mayes, Senators Mark Kelly and Kyrsten Sinema. Current fault lines: water scarcity and Colorado River compact, border and migration policy, abortion rights after the 1864 law revival, election integrity disputes, copper mining on sacred land, and 2026 Senate and governor's races already in motion.`,

  GA: `Georgia — Competitive state, 11 million residents. Governor Brian Kemp (R). Key figures: AG Chris Carr, Secretary of State Brad Raffensperger, Senator Jon Ossoff (D) up for re-election. Current fault lines: the 2020 election interference prosecution of Trump and co-defendants in Fulton County, voting rights and election law battles, economic development vs. environmental concerns, abortion access after the heartbeat bill, and the 2026 Senate race.`,

  PA: `Pennsylvania — Critical battleground state, 13 million residents. Governor Josh Shapiro (D), divided legislature. Key figures: AG Michelle Henry. Current fault lines: Shapiro's vice-presidential-run fallout and national ambitions, Philadelphia crime and gun violence, school funding equity lawsuit outcomes, natural gas fracking policy, election administration disputes, and the 2026 Senate race to replace Bob Casey.`,

  OH: `Ohio — Lean-Republican state, 12 million residents. Governor Mike DeWine (R). Key figures: AG Dave Yost, Senator Sherrod Brown (D). Current fault lines: the East Palestine train derailment accountability, reproductive rights after voters enshrined abortion access in the constitution, prescription drug pricing, rural economic decline, and Senator Brown's 2026 re-election fight in a state Trump won twice.`,

  MI: `Michigan — Democratic trifecta state, 10 million residents. Governor Gretchen Whitmer (D). Key figures: AG Dana Nessel, Secretary of State Jocelyn Benson. Current fault lines: Whitmer's 2028 presidential positioning, auto industry transition to EVs and UAW labor tensions, Arab-American voter anger over Gaza policy, abortion rights implementation after Prop 3 passed, education funding, and water quality policy.`,

  NV: `Nevada — Competitive swing state, 3.2 million residents. Governor Joe Lombardo (R), Democratic-controlled legislature. Current fault lines: housing affordability and homelessness in Las Vegas, water rights and Colorado River allocation, gaming industry regulation and expansion, immigration and sanctuary city tensions, Lombardo's vetoes vs. legislative agenda, and the 2026 Senate race.`,
}

const CONTROVERSIES: Record<string, {
  label: string
  sub: string
  prompt: string
  iconBg: string
  iconColor: string
  border: string
  glow: string
}> = {
  fact_check: {
    label: 'Fact Check & Context',
    sub: 'What is actually true?',
    iconBg: 'oklch(0.93 0.06 160)',
    iconColor: 'oklch(0.40 0.16 160)',
    border: 'rgba(20, 160, 110, 0.40)',
    glow: 'rgba(20, 160, 110, 0.15)',
    prompt: `Identify the three to five most significant election claims currently circulating in this state — from candidates, campaigns, advocacy groups, or media — and evaluate each one honestly.

For each claim, answer all of the following:
- State the claim in plain language exactly as it is being made. Who is making it and against whom?
- What does the available evidence actually show? Cite specific data, studies, court records, or official reports.
- Is the claim supported, partially true, missing critical context, misleading, or false?
- What do independent experts, fact-checkers, or nonpartisan analysts say about it?
- What crucial context is being left out that changes how the claim should be understood?
- Has the claim caused real-world harm to voters' understanding of the issues?

Only cover claims from the last 180 days. Do not cover claims that have already been resolved or retracted. Prioritize claims that are actively influencing how voters understand the election. Be ruthlessly fair — fact-check both parties equally with no favoritism.`,
  },

  accusations: {
    label: 'Accusations',
    sub: 'Allegations, lawsuits & investigations',
    iconBg: 'oklch(0.93 0.05 290)',
    iconColor: 'oklch(0.44 0.16 290)',
    border: 'rgba(150, 50, 200, 0.40)',
    glow: 'rgba(150, 50, 200, 0.15)',
    prompt: `IMPORTANT: Every single item you include MUST have occurred or been actively updated within the last 180 days from today. Do not include any accusation, lawsuit, investigation, or ethics complaint that is older than 180 days or has been fully resolved and closed. If you cannot confirm a case is currently active and recent, omit it entirely.

Identify the most serious accusations, legal cases, ethics complaints, and formal investigations involving candidates or elected officials in this state that are currently active within the last 180 days.

For each accusation, answer all of the following:
- What exactly is the accusation? Describe it with full factual specificity — not vague characterizations.
- Who made the accusation and in what formal or public venue — lawsuit, ethics board, press conference, investigation?
- What concrete evidence has been publicly presented to support it? What evidence is still missing or disputed?
- Has the accused candidate or official formally responded? What did they say, specifically?
- What is the current legal or procedural status — ongoing investigation, dismissed, indicted, under appeal?
- What consequences could the accused face if the accusations are proven true?
- How has this accusation affected the race — have polls shifted, donors pulled out, or endorsements been withdrawn?

Prioritize active cases with real stakes. Do not include accusations that have been fully dismissed or resolved. Include lawsuits, ethics complaints, federal or state investigations, and credible public accusations with documented evidence.`,
  },

  public_criticism: {
    label: 'Public Criticism',
    sub: 'Who is under fire and why',
    iconBg: 'oklch(0.94 0.06 25)',
    iconColor: 'oklch(0.46 0.20 25)',
    border: 'rgba(230, 50, 40, 0.40)',
    glow: 'rgba(230, 50, 40, 0.15)',
    prompt: `Identify the most significant public criticism facing the major candidates and elected officials in this state from the last 180 days. This is not about legal cases — it is about criticism from peers, institutions, and the public.

For each major criticism, answer all of the following:
- Who is being criticized and for what specific action, statement, vote, or policy?
- Who is doing the criticizing — an opposing candidate, a party leader, a newspaper editorial board, an advocacy group, community organizations, or members of their own party?
- What specifically are they saying? Quote the criticism directly if possible.
- Is the criticism fair, and what is the evidence on both sides?
- How has the candidate or official responded to the criticism?
- Has the criticism gained traction — is it changing public opinion, generating media coverage, or influencing the race?
- Is there criticism coming from within their own party or coalition? That is often the most damaging.

Include criticism from all directions — left, right, and nonpartisan. Give particular weight to criticism from unexpected sources, such as former allies or members of the same party.`,
  },

  past_actions: {
    label: 'Past Actions',
    sub: "Their record vs. what they claim",
    iconBg: 'oklch(0.93 0.05 50)',
    iconColor: 'oklch(0.44 0.16 50)',
    border: 'rgba(200, 130, 20, 0.40)',
    glow: 'rgba(200, 130, 20, 0.15)',
    prompt: `Examine the actual record of the major candidates in this state — what they have done in office or in their careers — and compare it to what they are currently claiming on the campaign trail.

For each major candidate worth covering, answer all of the following:
- What are the three most important votes, decisions, or actions they have taken in their political or professional career that voters may not fully understand?
- Where does their actual record contradict or complicate what they are currently saying on the campaign trail?
- What did they say or do five to ten years ago that conflicts with their current positions — and have they explained the change?
- What legislation or policy did they author, support, or block that had direct consequences for residents of this state?
- Are there patterns in their record — recurring votes, donor relationships, or policy positions — that tell a deeper story about who they actually are?
- What do their opponents say about their record, and is that criticism accurate?

Focus on documented actions — votes, signed legislation, public statements on record, court filings, donor disclosures, and official decisions. Do not speculate. The goal is to give voters the context they need to evaluate claims against documented reality.`,
  },
}

export async function POST(req: Request) {
  const { stateCode, topicKey } = await req.json()

  const stateContext = STATE_CONTEXT[stateCode] ?? `${stateCode} — a U.S. state with active races in the 2026 election cycle. Provide a thorough, state-specific briefing based on the best available political information for this state.`
  const topic = CONTROVERSIES[topicKey]

  if (!topic) {
    return new Response('Invalid topic', { status: 400 })
  }

  const result = streamText({
    model: 'google/gemini-2.5-flash',
    system: `You are a nonpartisan investigative political journalist specializing in U.S. state politics. You are known for rigorous sourcing, holding all sides accountable equally, and giving voters the honest context they cannot get from partisan media.

Your rules:
- TIME CONSTRAINT: Only reference events, claims, cases, and developments from the last 180 days. Do not surface outdated accusations, resolved cases, or superseded claims. If something is older than 180 days and no longer active, skip it.
- Be specific. Use real names, real offices, real legislation, and real dates. Vague generalities waste voters' time.
- Be genuinely balanced. Hold Democrats and Republicans accountable with identical rigor. No partisan framing.
- Be honest about uncertainty. If evidence is incomplete or disputed, say so explicitly — do not pretend certainty where none exists.
- Be concise but complete. 5 to 7 short paragraphs. Every sentence must serve the voter.
- Write in clear, direct prose. No markdown headers, no bullet points, no bold text — flowing paragraphs only.
- Treat readers as intelligent adults. Do not condescend, moralize, or editorialize.
- Surface what is being underreported. If the major media is missing something voters need to know, include it.`,
    prompt: `State context:\n${stateContext}\n\n---\n\n${topic.prompt}`,
  })

  return result.toTextStreamResponse()
}
