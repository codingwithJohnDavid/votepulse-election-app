'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, ChevronLeft, Sparkles, Loader2, Zap, ShieldAlert, Swords, Tv, Users, AlertTriangle } from 'lucide-react'
import PageShell from '@/components/page-shell'
import FloatingHomeButton from '@/components/floating-home-button'
import { useActiveState } from '@/lib/state-context'

const TOPICS = [
  {
    key: 'hot_fight',
    label: 'The Hottest Fight',
    sub: 'The #1 battle right now',
    Icon: Zap,
    iconBg: 'oklch(0.93 0.06 25)',
    iconColor: 'oklch(0.46 0.20 25)',
    border: 'rgba(230, 50, 40, 0.40)',
    glow: 'rgba(230, 50, 40, 0.15)',
  },
  {
    key: 'scandal',
    label: 'Scandals & Corruption',
    sub: 'Who got caught doing what',
    Icon: ShieldAlert,
    iconBg: 'oklch(0.93 0.05 290)',
    iconColor: 'oklch(0.44 0.16 290)',
    border: 'rgba(150, 50, 200, 0.40)',
    glow: 'rgba(150, 50, 200, 0.15)',
  },
  {
    key: 'vs_fight',
    label: 'Republicans vs Democrats',
    sub: 'The core disagreement',
    Icon: Swords,
    iconBg: 'oklch(0.93 0.04 220)',
    iconColor: 'oklch(0.42 0.14 220)',
    border: 'rgba(40, 120, 220, 0.40)',
    glow: 'rgba(40, 120, 220, 0.15)',
  },
  {
    key: 'media_war',
    label: 'Media War',
    sub: 'What they say about each other',
    Icon: Tv,
    iconBg: 'oklch(0.93 0.05 160)',
    iconColor: 'oklch(0.42 0.14 160)',
    border: 'rgba(20, 160, 110, 0.40)',
    glow: 'rgba(20, 160, 110, 0.15)',
  },
  {
    key: 'social_divide',
    label: 'Social Divides',
    sub: 'Race, class & culture wars',
    Icon: Users,
    iconBg: 'oklch(0.93 0.05 60)',
    iconColor: 'oklch(0.44 0.14 60)',
    border: 'rgba(180, 140, 20, 0.40)',
    glow: 'rgba(180, 140, 20, 0.15)',
  },
  {
    key: 'broken_promise',
    label: 'Broken Promises',
    sub: 'Said vs. what happened',
    Icon: AlertTriangle,
    iconBg: 'oklch(0.94 0.06 38)',
    iconColor: 'oklch(0.46 0.17 38)',
    border: 'rgba(225, 110, 20, 0.40)',
    glow: 'rgba(225, 110, 20, 0.15)',
  },
]

export default function ControversiesPage() {
  const { activeState } = useActiveState()
  const [activeTopic, setActiveTopic] = useState<typeof TOPICS[0] | null>(null)
  const [briefing, setBriefing] = useState('')
  const [loading, setLoading] = useState(false)

  async function fetchBriefing(topic: typeof TOPICS[0]) {
    setActiveTopic(topic)
    setBriefing('')
    setLoading(true)

    try {
      const res = await fetch('/api/controversy-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stateCode: activeState.code, topicKey: topic.key }),
      })

      if (!res.ok || !res.body) throw new Error('Failed')

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

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh" style={{ background: '#ffffff' }}>
        <AnimatePresence mode="wait">
          {!activeTopic ? (

            // ── Topic Grid ──────────────────────────────────────────────────
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <header className="px-5 pt-14 pb-4 flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: 'oklch(0.93 0.06 25)' }}
                >
                  <Flame size={22} style={{ color: 'oklch(0.46 0.20 25)' }} aria-hidden="true" />
                </div>
                <h1 className="text-[28px] font-black text-foreground leading-tight">Controversies</h1>
                <p className="text-[14px] text-muted-foreground mt-0.5">
                  AI briefings for {activeState.name}
                </p>
              </header>

              <main className="px-4 pb-28">
                <div className="grid grid-cols-2 gap-3">
                  {TOPICS.map((topic, i) => {
                    const { Icon } = topic
                    const isOddLast = TOPICS.length % 2 !== 0 && i === TOPICS.length - 1
                    return (
                      <motion.button
                        key={topic.key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.22, delay: i * 0.05 }}
                        onClick={() => fetchBriefing(topic)}
                        className={`flex flex-col items-center justify-center gap-3 p-4 rounded-3xl transition-all active:scale-[0.97] min-h-[150px] text-left ${isOddLast ? 'col-span-2 flex-row min-h-[72px]' : ''}`}
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
                        <div className={`flex flex-col ${isOddLast ? 'items-start flex-1' : 'items-center text-center'}`}>
                          <p className="font-bold text-[13px] text-foreground leading-tight">{topic.label}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{topic.sub}</p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </main>
            </motion.div>

          ) : (

            // ── Briefing View ────────────────────────────────────────────────
            <motion.div
              key="briefing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col min-h-svh"
            >
              <header className="px-4 pt-14 pb-4 flex items-center gap-3">
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
                      <span>Generating briefing...</span>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-4"
                  >
                    <div
                      className="p-4 rounded-3xl"
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
                        className="text-[11px] text-muted-foreground text-center px-4"
                      >
                        AI-generated briefing based on political knowledge up to training cutoff. Always verify with current sources.
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
