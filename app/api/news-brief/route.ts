import { streamText } from 'ai'

export const runtime = 'edge'
export const maxDuration = 30

const STATE_CONTEXT: Record<string, string> = {
  CA: 'California (Governor: Gavin Newsom, Democratic-leaning state, key issues: housing, homelessness, water, tech economy, immigration)',
  FL: 'Florida (Governor: Ron DeSantis, Republican-leaning state, key issues: insurance costs, immigration, education policy, tourism economy)',
  TX: 'Texas (Governor: Greg Abbott, Republican-leaning state, key issues: border security, energy, immigration, tech growth)',
  NY: 'New York (Governor: Kathy Hochul, Democratic-leaning state, key issues: housing costs, crime, transit, financial sector)',
}

const TOPICS: Record<string, { label: string; prompt: string }> = {
  overview:       { label: 'Political Overview',      prompt: 'Give a concise political overview of this state right now. Cover the current political climate, key power players, and the most pressing issues voters care about. Be direct and factual.' },
  senate:         { label: 'Senate & Congress',       prompt: 'Summarize the current U.S. Senate seats and key Congressional races for this state. Who holds power? Any notable upcoming races or recent changes?' },
  governor:       { label: 'Governor & State Gov',    prompt: 'Summarize the current governor\'s agenda, recent major policy decisions, and any significant controversies or achievements.' },
  republican:     { label: 'Republican Perspective',  prompt: 'What are Republicans in this state saying about the current political issues? What are their main talking points, criticisms of Democrats, and key policy positions?' },
  democrat:       { label: 'Democrat Perspective',    prompt: 'What are Democrats in this state saying about the current political issues? What are their main talking points, criticisms of Republicans, and key policy positions?' },
  ballot:         { label: 'Ballot & Propositions',   prompt: 'What are the most significant ballot measures, propositions, or referendums that voters in this state have recently decided on or are coming up? Summarize what they mean for residents.' },
  controversy:    { label: 'Controversies',           prompt: 'What are the biggest political controversies currently in this state? What is each side saying? Be balanced and factual.' },
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
    system: `You are a nonpartisan political analyst providing clear, factual briefings about U.S. state politics. 
You present multiple perspectives fairly without editorial bias. 
Keep responses concise — 3 to 5 short paragraphs maximum. 
Use plain language, no jargon. Do not use markdown headers or bullet points — write in flowing prose.`,
    prompt: `State: ${stateContext}\n\nTopic: ${topic.prompt}`,
  })

  return result.toTextStreamResponse()
}
