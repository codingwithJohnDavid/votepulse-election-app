import { streamText } from 'ai'
import { createGateway } from '@ai-sdk/gateway'

export const runtime = 'nodejs'
export const maxDuration = 60

// Use AI_GATEWAY_API_KEY (injected by v0 proxy in sandbox, set via Vercel AI Gateway integration on deployment)
const gateway = createGateway()

const TOPICS: Record<string, { label: string; prompt: string }> = {
  policy: {
    label: 'Policy',
    prompt: 'key policy issues, legislation, and government decisions',
  },
  voters: {
    label: 'Voters',
    prompt: 'voter registration, turnout, demographics, and voting rights',
  },
  propositions: {
    label: 'Propositions',
    prompt: 'ballot measures, propositions, and referendums',
  },
  updates: {
    label: 'Election Updates',
    prompt: 'election news, campaign updates, and political developments',
  },
}

export async function POST(req: Request) {
  try {
    const { stateCode, stateName, topicKey } = await req.json()

    const topic = TOPICS[topicKey]
    if (!topic) {
      return new Response(JSON.stringify({ error: 'Invalid topic' }), { status: 400 })
    }

    const result = await streamText({
      model: gateway('google/gemini-2.5-flash'),
      prompt: `You are a nonpartisan political analyst. Write a concise 3-paragraph news briefing about ${topic.prompt} in ${stateName} (${stateCode}). 
    
Focus on factual, current information. Be balanced and objective. Each paragraph should cover a distinct aspect.
Format as plain prose — no headers, bullets, or markdown. Keep total length under 300 words.`,
      maxTokens: 500,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('[v0] news-brief error:', error)
    return new Response(JSON.stringify({ error: String(error) }), { status: 500 })
  }
}
