import { streamText } from 'ai'
import { createGoogleGenerativeAI } from '@ai-sdk/google'

export const runtime = 'nodejs'
export const maxDuration = 60

const TOPICS: Record<string, string> = {
  policy: 'Policy & Issues',
  voters: 'What Voters Are Saying',
  propositions: 'Proposition & Ballot Updates',
  updates: 'Election Updates',
}

export async function POST(req: Request) {
  try {
    const { stateCode, stateName, topicKey } = await req.json()

    if (!stateCode || !stateName || !topicKey || !TOPICS[topicKey]) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 })
    }

    const google = createGoogleGenerativeAI({
      apiKey: process.env.API_KEY,
    })

    const topicLabel = TOPICS[topicKey]

    const prompts: Record<string, string> = {
      policy: `Write a concise 250-word political briefing about the key policy issues and ballot measures in ${stateName} (${stateCode}) for the upcoming election. Cover the top 3-4 issues voters care about most. Be factual, nonpartisan, and informative.`,
      voters: `Write a concise 250-word briefing about voter sentiment in ${stateName} (${stateCode}). What are everyday voters concerned about? What issues are energizing different communities? Be factual, balanced, and grounded in real political dynamics.`,
      propositions: `Write a concise 250-word plain-English breakdown of the key ballot propositions and measures voters in ${stateName} (${stateCode}) will be deciding on. Explain what each measure does in simple terms. Be factual and nonpartisan.`,
      updates: `Write a concise 250-word briefing covering the most important election news and developments from ${stateName} (${stateCode}) over the past 7 days. Focus on verified facts, candidate developments, and key race updates. Be factual and nonpartisan.`,
    }

    const result = streamText({
      model: google('gemini-2.5-flash'),
      prompt: prompts[topicKey],
      maxTokens: 500,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('[v0] News API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 })
  }
}
