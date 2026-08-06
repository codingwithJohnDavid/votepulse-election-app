import { streamText } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

const STATE_CONTEXT: Record<string, string> = {
  CA: `California — Democratic supermajority state, 39 million residents. Governor Gavin Newsom (D). Key fault lines: homelessness crisis in LA and SF, crime and shoplifting surge, high taxes driving business and residents out, water policy, public school decline, immigration, housing crisis, and Newsom's national political ambitions vs. his record at home.`,

  FL: `Florida — Republican-dominated state, 22 million residents. Governor Ron DeSantis (R). Key fault lines: DeSantis vs. Disney corporate war, 6-week abortion ban with no rape/incest exceptions, "Don't Say Gay" education law, book banning in schools, soaring homeowners insurance crisis, immigration policy, and DeSantis's failed 2024 presidential run.`,

  TX: `Texas — Solidly Republican state, 30 million residents. Governor Greg Abbott (R). Key fault lines: Abbott's Operation Lone Star border policy, abortion ban with no exceptions, ERCOT power grid failure killing hundreds, trans youth healthcare ban, gun laws after mass shootings in Uvalde and El Paso, AG Ken Paxton's impeachment trial, and the Ted Cruz vs. Colin Allred Senate race.`,

  NY: `New York — Democratic-dominated state, 20 million residents. Governor Kathy Hochul (D). Key fault lines: the migrant shelter crisis overwhelming NYC, rising subway crime and violent attacks, congestion pricing reversal, housing density battles in suburbs, Hochul's perceived weakness, the Adams federal indictment, and progressive vs. moderate Democrats tearing the party apart.`,
}

const CONTROVERSIES: Record<string, { label: string; sub: string; prompt: string; iconBg: string; iconColor: string; border: string; glow: string }> = {
  hot_fight: {
    label: 'The Hottest Fight',
    sub: 'The #1 battle right now',
    iconBg: 'oklch(0.93 0.06 25)',
    iconColor: 'oklch(0.46 0.20 25)',
    border: 'rgba(230, 50, 40, 0.40)',
    glow: 'rgba(230, 50, 40, 0.15)',
    prompt: `What is the single most explosive political controversy in this state right now?
- Name it directly — do not be vague.
- What exactly are the two sides fighting about, in plain language?
- Who are the key players on each side — name them?
- Why does this particular fight matter to ordinary residents?
- How is this likely to end — who has the upper hand?
Do not hedge. Pick the one controversy that has the most heat and break it down like a political insider.`,
  },

  scandal: {
    label: 'Scandals & Corruption',
    sub: 'Who got caught doing what',
    iconBg: 'oklch(0.93 0.05 290)',
    iconColor: 'oklch(0.44 0.16 290)',
    border: 'rgba(150, 50, 200, 0.40)',
    glow: 'rgba(150, 50, 200, 0.15)',
    prompt: `What are the most significant political scandals and corruption cases in this state right now?
- Who is accused of what, specifically?
- Is it a criminal case, ethics violation, or political controversy?
- What happened as a result — did anyone resign, get indicted, or face consequences?
- How has this damaged or changed the political landscape?
- Are there ongoing investigations voters should know about?
Be specific with names, charges, and outcomes. Voters deserve to know who is in trouble and why.`,
  },

  vs_fight: {
    label: 'Republicans vs Democrats',
    sub: 'The core disagreement',
    iconBg: 'oklch(0.93 0.04 220)',
    iconColor: 'oklch(0.42 0.14 220)',
    border: 'rgba(40, 120, 220, 0.40)',
    glow: 'rgba(40, 120, 220, 0.15)',
    prompt: `What is the defining battle between Republicans and Democrats in this state — the one that captures their core disagreement?
- What specific policy or law are they fighting over?
- What does each side say — quote their actual arguments, not paraphrases?
- Who has been winning this fight legislatively, legally, and in public opinion?
- How has this fight affected real people's lives in this state?
- Is there any chance of compromise, or is this a permanent divide?
Write this like a referee calling a boxing match — fair to both sides but honest about who is landing the harder punches.`,
  },

  media_war: {
    label: 'Media War',
    sub: 'What they say about each other',
    iconBg: 'oklch(0.93 0.05 160)',
    iconColor: 'oklch(0.42 0.14 160)',
    border: 'rgba(20, 160, 110, 0.40)',
    glow: 'rgba(20, 160, 110, 0.15)',
    prompt: `What are Republicans and Democrats in this state saying about each other in the press and on social media right now?
- What is the harshest thing Republicans are saying about the Democratic leadership — and is it fair?
- What is the harshest thing Democrats are saying about the Republican leadership — and is it fair?
- Which political attacks have landed and actually changed public opinion?
- Which attacks have backfired?
- Who controls the narrative in this state's media environment — left-leaning outlets, right-leaning outlets, or neither?
Be blunt and specific. Tell voters what the actual attacks are, word for word if possible.`,
  },

  social_divide: {
    label: 'Social Divides',
    sub: 'Race, class & culture wars',
    iconBg: 'oklch(0.93 0.05 60)',
    iconColor: 'oklch(0.44 0.14 60)',
    border: 'rgba(180, 140, 20, 0.40)',
    glow: 'rgba(180, 140, 20, 0.15)',
    prompt: `What are the deepest social and cultural controversies dividing this state's residents right now?
- What is the most divisive social or cultural issue — race, immigration, education, religion, LGBTQ rights, or something else?
- How does this divide break down — is it urban vs. rural, white vs. minority, young vs. old?
- What specific laws or policies have been passed or proposed that sparked outrage on one side?
- Who are the loudest voices on each side, and what are they saying?
- Is this divide getting wider or narrowing?
Do not sanitize this. Tell voters what the real cultural fault lines are and who is on each side.`,
  },

  broken_promise: {
    label: 'Broken Promises',
    sub: 'What they said vs. what happened',
    iconBg: 'oklch(0.94 0.06 38)',
    iconColor: 'oklch(0.46 0.17 38)',
    border: 'rgba(225, 110, 20, 0.40)',
    glow: 'rgba(225, 110, 20, 0.15)',
    prompt: `What major promises have politicians in this state made to voters that they have failed to keep?
- What did the governor or key legislators specifically promise — use their actual words if possible?
- What actually happened, and how far did the result fall short?
- How are voters and the opposing party calling them out on this?
- Which broken promise has caused the most political damage?
- Is there any politician who has actually delivered on what they promised?
Be tough here. Politicians get held accountable by informed voters. Name who promised what, when, and whether they delivered.`,
  },
}

export async function POST(req: Request) {
  const { stateCode, topicKey } = await req.json()

  const stateContext = STATE_CONTEXT[stateCode]
  const topic = CONTROVERSIES[topicKey]

  if (!stateContext || !topic) {
    return new Response('Invalid state or topic', { status: 400 })
  }

  const result = streamText({
    model: 'google/gemini-2.5-flash',
    system: `You are an investigative political journalist who covers U.S. state politics. You are known for calling out hypocrisy on both sides, naming names, and refusing to sanitize uncomfortable political realities.

Your rules:
- Be specific. Name the actual politicians, laws, events, and dates. Never be vague or generic.
- Be genuinely balanced — hold both parties accountable equally.
- Be concise but complete. 4 to 6 paragraphs. No fluff or filler.
- Write in direct, punchy prose. No markdown headers, no bullet points, no bold text.
- Do not moralize or editorialize. Report what is happening and let voters decide.
- If a controversy has a clear villain or clear failure, say so — but back it up with facts.`,
    prompt: `State context:\n${stateContext}\n\n---\n\n${topic.prompt}`,
  })

  return result.toTextStreamResponse()
}
