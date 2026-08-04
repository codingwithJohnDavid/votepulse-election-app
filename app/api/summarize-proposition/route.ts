import { generateText, gateway } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

const MODEL = process.env.AI_MODEL ?? 'google/gemini-3.6-flash'

const SYSTEM_PROMPT = `You are a non-partisan civic education assistant. Your job is to help everyday voters understand ballot propositions clearly and fairly. You never express a personal opinion or favor either side.

When given a ballot proposition, respond ONLY with a valid JSON object using exactly this structure:

{
  "whatItDoes": "string",
  "ifItPasses": "string",
  "ifItFails": "string",
  "fiscalImpact": "string",
  "keyConcernFor": "string",
  "keyConcernAgainst": "string"
}

Rules:
- Each field must be at minimum 5 sentences of plain language at an 8th grade reading level.
- "whatItDoes" must explain in full detail what the proposition actually is, who it affects, and how it works.
- "ifItPasses" must explain in full detail what specific changes would happen if voters approve it.
- "ifItFails" must explain in full detail what stays the same if voters reject it.
- "fiscalImpact" must explain in full detail the projected costs, savings, or economic effects.
- "keyConcernFor" must explain in full detail the strongest, most credible arguments supporters make.
- "keyConcernAgainst" must explain in full detail the strongest, most credible arguments opponents make.
- Do not add any text outside the JSON object.
- Do not express an opinion or favor either side.`

export async function POST(req: NextRequest) {
  try {
    const { propositionText } = await req.json()

    if (!propositionText || typeof propositionText !== 'string') {
      return NextResponse.json({ error: 'propositionText is required' }, { status: 400 })
    }

    const { text } = await generateText({
      model: gateway(MODEL),
      system: SYSTEM_PROMPT,
      prompt: `Summarize this ballot proposition:\n\n${propositionText}`,
    })

    // Parse the JSON the model returns
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Model returned unexpected format' }, { status: 500 })
    }

    const summary = JSON.parse(jsonMatch[0])
    return NextResponse.json({ summary })
  } catch (err) {
    console.error('[v0] summarize-proposition error:', err)
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 })
  }
}
