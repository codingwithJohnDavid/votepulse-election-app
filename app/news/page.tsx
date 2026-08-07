'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Newspaper, ChevronLeft, Sparkles, Loader2, FileText, MessageSquarePlus, Users, BarChart3, Megaphone } from 'lucide-react'
import PageShell from '@/components/page-shell'
import FloatingHomeButton from '@/components/floating-home-button'
import { useActiveState } from '@/lib/state-context'

const TOPICS = [
  {
    key: 'policy',
    label: 'Policy & Issues',
    sub: 'What this election is really about',
    Icon: BarChart3,
    iconBg: 'oklch(0.92 0.06 245)',
    iconColor: 'oklch(0.40 0.15 245)',
    border: 'rgba(56, 120, 220, 0.35)',
    glow: 'rgba(56, 120, 220, 0.14)',
  },
  {
    key: 'voters',
    label: "What Voters Are Saying",
    sub: 'Street-level sentiment',
    Icon: Users,
    iconBg: 'oklch(0.92 0.07 160)',
    iconColor: 'oklch(0.38 0.13 160)',
    border: 'rgba(32, 178, 120, 0.35)',
    glow: 'rgba(32, 178, 120, 0.14)',
  },
  {
    key: 'propositions',
    label: 'Proposition & Ballot Updates',
    sub: 'Plain English breakdown',
    Icon: FileText,
    iconBg: 'oklch(0.94 0.06 60)',
    iconColor: 'oklch(0.45 0.14 60)',
    border: 'rgba(210, 140, 30, 0.35)',
    glow: 'rgba(210, 140, 30, 0.14)',
  },
  {
    key: 'updates',
    label: 'Election Updates',
    sub: 'Last 7 days, verified facts only',
    Icon: Megaphone,
    iconBg: 'oklch(0.93 0.06 300)',
    iconColor: 'oklch(0.42 0.14 300)',
    border: 'rgba(148, 60, 210, 0.35)',
    glow: 'rgba(148, 60, 210, 0.14)',
  },
]

export default function NewsPage() {
  const { activeState } = useActiveState()
  const [activeTopic, setActiveTopic] = useState<typeof TOPICS[0] | null>(null)
  const [briefing, setBriefing] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchBriefing(topic: typeof TOPICS[0]) {
    setActiveTopic(topic)
    setBriefing('')
    setLoading(true)

    try {
      const res = await fetch('/api/news-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stateCode: activeState.code,
          stateName: activeState.name,
          topicKey: topic.key,
        }),
      })

      if (!res.ok || !res.body) throw new Error('Failed to fetch briefing')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let text = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        text += decoder.decode(value, { stream: true })
        setBriefing(text)
      }
    } catch {
      setBriefing('Unable to load briefing right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleRequestHeadline() {
    const subject = encodeURIComponent(`Headline Request — ${activeState.name}`)
    const body = encodeURIComponent(
      `Hi,\n\nI'd like to see the following topic covered in the ${activeState.name} news section:\n\n[Describe your topic or question here]\n\nThanks!`
    )
    window.location.href = `mailto:hello@voterai.app?subject=${subject}&body=${body}`
  }

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh" style={{ background: '#ffffff' }}>

        <AnimatePresence mode="wait">
          {!activeTopic ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <header className="px-5 pt-8 pb-4 flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: 'oklch(0.93 0.05 200)' }}
                >
                  <Newspaper size={22} style={{ color: 'oklch(0.40 0.14 200)' }} aria-hidden="true" />
                </div>
                <h1 className="text-[28px] font-black text-foreground leading-tight">AI News Digest</h1>
                <p className="text-[13px] text-muted-foreground mt-1">
                  AI-powered briefings for <span className="font-semibold text-foreground">{activeState.name}</span>
                </p>
              </header>

              <main className="px-4 pb-28">
                {/* 2x2 topic grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  {TOPICS.map((topic, i) => {
                    const { Icon } = topic
                    return (
                      <motion.button
                        key={topic.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: i * 0.06 }}
                        onClick={() => fetchBriefing(topic)}
                        className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl transition-all active:scale-[0.97] min-h-[150px]"
                        style={{
                          background: '#ffffff',
                          border: `1.5px solid ${topic.border}`,
                          boxShadow: `0 4px 16px ${topic.glow}, 0 1px 4px rgba(0,0,0,0.04)`,
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: topic.iconBg }}
                        >
                          <Icon size={22} style={{ color: topic.iconColor }} aria-hidden="true" />
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <p className="font-bold text-[13px] text-foreground leading-tight">{topic.label}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{topic.sub}</p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Request a Headline — full width */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22, delay: 0.28 }}
                  onClick={handleRequestHeadline}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-3xl transition-all active:scale-[0.98]"
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid rgba(148, 60, 210, 0.30)',
                    boxShadow: '0 4px 16px rgba(148, 60, 210, 0.10), 0 1px 4px rgba(0,0,0,0.04)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'oklch(0.94 0.05 290)' }}
                  >
                    <MessageSquarePlus size={22} style={{ color: 'oklch(0.45 0.18 290)' }} aria-hidden="true" />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <p className="font-bold text-[14px] text-foreground leading-tight">Request a Headline</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">Tell us what you want covered</p>
                  </div>
                  <ChevronLeft size={18} className="text-muted-foreground ml-auto rotate-180 shrink-0" aria-hidden="true" />
                </motion.button>
              </main>
            </motion.div>

          ) : (
            // Briefing View
            <motion.div
              key="briefing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col min-h-svh"
            >
              {/* Back header */}
              <header className="px-4 pt-8 pb-4 flex items-center gap-3">
                <button
                  onClick={() => { setActiveTopic(null); setBriefing('') }}
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(0,0,0,0.05)' }}
                  aria-label="Back to topics"
                >
                  <ChevronLeft size={20} className="text-foreground" />
                </button>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: activeTopic.iconBg }}
                  >
                    <activeTopic.Icon size={18} style={{ color: activeTopic.iconColor }} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[15px] text-foreground leading-tight truncate">{activeTopic.label}</p>
                    <p className="text-[11px] text-muted-foreground">{activeState.name}</p>
                  </div>
                </div>
              </header>

              {/* Content */}
              <main className="flex-1 px-5 pb-28">
                {loading && !briefing ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: activeTopic.iconBg }}
                    >
                      <Sparkles size={24} style={{ color: activeTopic.iconColor }} />
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Loader2 size={14} className="animate-spin" />
                      <span>Generating briefing for {activeState.name}...</span>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-4"
                  >
                    <div
                      className="p-5 rounded-3xl"
                      style={{
                        background: '#ffffff',
                        border: `1.5px solid ${activeTopic.border}`,
                        boxShadow: `0 4px 20px ${activeTopic.glow}`,
                      }}
                    >
                      <p className="text-[14px] text-foreground leading-relaxed whitespace-pre-wrap">
                        {briefing}
                        {loading && (
                          <span className="inline-block w-1.5 h-4 bg-foreground/40 ml-0.5 animate-pulse rounded-sm" />
                        )}
                      </p>
                    </div>

                    {!loading && briefing && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[11px] text-muted-foreground text-center px-4 pb-4"
                      >
                        AI-generated briefing based on verified political knowledge through early 2026. Always cross-reference with current local news sources.
                      </motion.p>
                    )}
                  </motion.div>
                )}
              </main>
            </motion.div>
          )}
        </AnimatePresence>

        <FloatingHomeButton />
      </div>
    </PageShell>
  )
}
