import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const ACTIVE_STATES = [
  { code: 'CA', query: 'California+politics+election+legislature' },
  { code: 'FL', query: 'Florida+politics+election+legislature' },
  { code: 'TX', query: 'Texas+politics+election+legislature' },
  { code: 'NY', query: 'New+York+politics+election+legislature' },
]

// ── Simple XML field extractor ────────────────────────────────────────────────
function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'))
  return (match?.[1] ?? match?.[2] ?? '').trim()
}

function parseRSSItems(xml: string) {
  const items: { title: string; url: string; published_at: string; source_name: string; description: string }[] = []
  const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)]

  for (const match of itemMatches) {
    const block = match[1]
    const title = extractTag(block, 'title')
    const link = extractTag(block, 'link') || block.match(/<link\s*\/>[\s\S]*?<([^>]+)>/i)?.[0] || ''
    // Google RSS puts the real URL in <link> but it may be wrapped — also try guid
    const url = extractTag(block, 'guid') || extractTag(block, 'link') || link
    const pubDate = extractTag(block, 'pubDate')
    const source = extractTag(block, 'source')
    const description = extractTag(block, 'description')

    if (!title || !url || url.includes('news.google.com/rss')) continue

    items.push({
      title,
      url,
      published_at: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      source_name: source || 'Google News',
      description: description.replace(/<[^>]+>/g, '').slice(0, 300),
    })
  }

  return items
}

export async function GET(request: Request) {
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

  // ── Purge articles older than 7 days ──────────────────────────────────────
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  await supabase.from('news_articles').delete().lt('published_at', sevenDaysAgo)

  const results: { state: string; count: number; error?: string }[] = []

  for (const state of ACTIVE_STATES) {
    try {
      const rssUrl = `https://news.google.com/rss/search?q=${state.query}&hl=en-US&gl=US&ceid=US:en`
      const res = await fetch(rssUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; VotePulse/1.0)' },
        next: { revalidate: 0 },
      })

      if (!res.ok) {
        results.push({ state: state.code, count: 0, error: `HTTP ${res.status}` })
        continue
      }

      const xml = await res.text()
      const parsed = parseRSSItems(xml)

      // Google RSS <link> tags point to a google redirect — extract the real URL from guid
      const articles = parsed
        .filter(a => a.title && a.url)
        .slice(0, 15)
        .map(a => ({
          state_code: state.code,
          title: a.title,
          description: a.description || null,
          url: a.url,
          image_url: null,
          source_name: a.source_name,
          published_at: a.published_at,
        }))

      if (articles.length === 0) {
        results.push({ state: state.code, count: 0, error: 'No articles parsed' })
        continue
      }

      const { error } = await supabase
        .from('news_articles')
        .upsert(articles, { onConflict: 'url', ignoreDuplicates: true })

      results.push({ state: state.code, count: articles.length, error: error?.message })
    } catch (err: any) {
      results.push({ state: state.code, count: 0, error: err.message })
    }
  }

  const total = results.reduce((sum, r) => sum + r.count, 0)
  return NextResponse.json({ ok: true, mode: 'google-rss', total, results })
}
