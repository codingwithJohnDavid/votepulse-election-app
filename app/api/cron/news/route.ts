import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Only the 4 active states
const ACTIVE_STATES = [
  { code: 'CA', name: 'California' },
  { code: 'FL', name: 'Florida' },
  { code: 'TX', name: 'Texas' },
  { code: 'NY', name: 'New York' },
]

// Seed articles used when NEWS_API_KEY is not set
const SEED_ARTICLES = [
  {
    state_code: 'FL',
    title: 'Florida Senate race heats up as candidates trade attacks',
    description: 'With November approaching, both parties are ramping up campaign spending across the state.',
    url: 'https://example.com/fl-senate-1',
    image_url: null,
    source_name: 'Demo News',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    state_code: 'FL',
    title: 'Governor signs new election integrity bill into law',
    description: 'The legislation updates voter ID requirements and expands early voting hours in select counties.',
    url: 'https://example.com/fl-election-2',
    image_url: null,
    source_name: 'Demo News',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
  },
  {
    state_code: 'CA',
    title: 'California ballot measure on housing draws national attention',
    description: 'Proposition 33 would significantly expand rent control across the state, dividing economists.',
    url: 'https://example.com/ca-housing-1',
    image_url: null,
    source_name: 'Demo News',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    state_code: 'CA',
    title: 'Los Angeles mayoral race enters final stretch',
    description: 'Polling shows a tight race with both candidates within the margin of error weeks before election day.',
    url: 'https://example.com/ca-mayor-2',
    image_url: null,
    source_name: 'Demo News',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    state_code: 'TX',
    title: 'Texas congressional redistricting faces new legal challenge',
    description: 'A federal court agreed to hear arguments over whether new district maps dilute minority voting power.',
    url: 'https://example.com/tx-redistrict-1',
    image_url: null,
    source_name: 'Demo News',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    state_code: 'TX',
    title: 'Texas Senate candidate raises record $12M in latest quarter',
    description: 'The fundraising haul signals a competitive general election as both parties invest heavily in the state.',
    url: 'https://example.com/tx-senate-2',
    image_url: null,
    source_name: 'Demo News',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
  },
  {
    state_code: 'NY',
    title: 'New York governor announces major infrastructure initiative',
    description: 'The $4 billion plan targets bridges, transit, and broadband across upstate counties.',
    url: 'https://example.com/ny-infra-1',
    image_url: null,
    source_name: 'Demo News',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    state_code: 'NY',
    title: 'NYC mayoral primary sees record early voting turnout',
    description: 'Election officials report a 34% increase over the last primary cycle, driven by younger voters.',
    url: 'https://example.com/ny-primary-2',
    image_url: null,
    source_name: 'Demo News',
    published_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
]

export async function GET(request: Request) {
  // Protect the cron route — Vercel sends this header automatically
  const authHeader = request.headers.get('authorization')
  if (
    process.env.NODE_ENV === 'production' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const apiKey = process.env.NEWS_API_KEY

  // ── Purge articles older than 7 days ─────────────────────────────────────
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  await supabase
    .from('news_articles')
    .delete()
    .lt('published_at', sevenDaysAgo)

  // ── No API key — upsert seed data for UI testing ──────────────────────────
  if (!apiKey) {
    const { error } = await supabase
      .from('news_articles')
      .upsert(SEED_ARTICLES, { onConflict: 'url', ignoreDuplicates: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      ok: true,
      mode: 'seed',
      message: 'No NEWS_API_KEY — seeded demo articles',
      count: SEED_ARTICLES.length,
    })
  }

  // ── Live fetch from NewsAPI ───────────────────────────────────────────────
  const results: { state: string; count: number; error?: string }[] = []

  for (const state of ACTIVE_STATES) {
    try {
      const query = encodeURIComponent(`${state.name} election politics`)
      const url = `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`
      const res = await fetch(url, { next: { revalidate: 0 } })
      const data = await res.json()

      if (data.status !== 'ok') {
        results.push({ state: state.code, count: 0, error: data.message })
        continue
      }

      const articles = (data.articles as any[])
        .filter((a) => a.title && a.url && a.publishedAt)
        .map((a) => ({
          state_code: state.code,
          title: a.title,
          description: a.description ?? null,
          url: a.url,
          image_url: a.urlToImage ?? null,
          source_name: a.source?.name ?? null,
          published_at: a.publishedAt,
        }))

      const { error } = await supabase
        .from('news_articles')
        .upsert(articles, { onConflict: 'url', ignoreDuplicates: true })

      results.push({ state: state.code, count: articles.length, error: error?.message })
    } catch (err: any) {
      results.push({ state: state.code, count: 0, error: err.message })
    }
  }

  return NextResponse.json({ ok: true, mode: 'live', results })
}
