'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Clock, Newspaper } from 'lucide-react'
import PageShell from '@/components/page-shell'
import FloatingHomeButton from '@/components/floating-home-button'
import { useActiveState } from '@/lib/state-context'
import { createClient } from '@/lib/supabase/client'

type Article = {
  id: string
  title: string
  description: string | null
  url: string
  image_url: string | null
  source_name: string | null
  published_at: string
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

function ArticleSkeleton() {
  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-3xl animate-pulse"
      style={{ background: '#ffffff', border: '1.5px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      <div className="h-4 bg-muted rounded-full w-3/4" />
      <div className="h-3 bg-muted rounded-full w-full" />
      <div className="h-3 bg-muted rounded-full w-2/3" />
      <div className="flex gap-2 mt-1">
        <div className="h-3 bg-muted rounded-full w-16" />
        <div className="h-3 bg-muted rounded-full w-10" />
      </div>
    </div>
  )
}

export default function NewsPage() {
  const { activeState } = useActiveState()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const supabase = createClient()
    supabase
      .from('news_articles')
      .select('id, title, description, url, image_url, source_name, published_at')
      .eq('state_code', activeState.code)
      .order('published_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        setArticles(data ?? [])
        setLoading(false)
      })
  }, [activeState.code])

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh" style={{ background: '#ffffff' }}>

        {/* Header */}
        <header className="px-5 pt-14 pb-4 flex flex-col items-center text-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
            style={{ backgroundColor: 'oklch(0.93 0.05 200)' }}
          >
            <Newspaper size={22} style={{ color: 'oklch(0.40 0.14 200)' }} aria-hidden="true" />
          </div>
          <h1 className="text-[28px] font-black text-foreground leading-tight">News</h1>
          <p className="text-[14px] text-muted-foreground mt-0.5">
            Latest headlines for {activeState.name}
          </p>
        </header>

        {/* Articles */}
        <main className="px-4 pb-28 flex flex-col gap-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <ArticleSkeleton key={i} />)
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground font-medium text-sm">No headlines yet</p>
              <p className="text-muted-foreground text-xs mt-1">
                Check back soon — articles refresh every 30 minutes
              </p>
            </div>
          ) : (
            articles.map((article, i) => (
              <motion.a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="flex flex-col gap-2.5 p-4 rounded-3xl active:scale-[0.99] transition-all"
                style={{
                  background: '#ffffff',
                  border: '1.5px solid rgba(20, 160, 180, 0.25)',
                  boxShadow: '0 4px 20px rgba(20, 160, 180, 0.10), 0 1px 4px rgba(0,0,0,0.04)',
                }}
              >
                {/* Image */}
                {article.image_url && (
                  <div className="w-full h-36 rounded-2xl overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image_url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Title */}
                <p className="font-bold text-[14px] text-foreground leading-snug line-clamp-3">
                  {article.title}
                </p>

                {/* Description */}
                {article.description && (
                  <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-0.5">
                  <div className="flex items-center gap-1.5">
                    {article.source_name && (
                      <span className="text-[11px] font-semibold text-foreground">
                        {article.source_name}
                      </span>
                    )}
                    <span className="text-muted-foreground text-[11px]">·</span>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock size={10} aria-hidden="true" />
                      {timeAgo(article.published_at)}
                    </span>
                  </div>
                  <ExternalLink size={13} className="text-muted-foreground shrink-0" aria-hidden="true" />
                </div>
              </motion.a>
            ))
          )}
        </main>

        <FloatingHomeButton />
      </div>
    </PageShell>
  )
}
