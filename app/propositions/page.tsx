'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, FileText, Sparkles, Loader2, BookOpen, Landmark, Heart, DollarSign, Scale, Building2, Home, Vote, Settings, ReceiptText, Activity, Megaphone, MapPin } from 'lucide-react'
import FloatingHomeButton from '@/components/floating-home-button'
import PageShell from '@/components/page-shell'
import { PROPOSITIONS, US_STATES } from '@/lib/mock-data'
import { useActiveState } from '@/lib/state-context'

interface AISummary {
  whatItDoes: string
  ifItPasses: string
  ifItFails: string
  fiscalImpact: string
  keyConcernFor: string
  keyConcernAgainst: string
}

const CATEGORY_STYLES: Record<string, { iconBg: string; iconColor: string; border: string; glow: string; Icon: React.ElementType }> = {
  Education:                { iconBg: 'oklch(0.92 0.07 245)', iconColor: 'oklch(0.40 0.15 245)', border: 'rgba(56, 120, 220, 0.35)',  glow: 'rgba(56, 120, 220, 0.18)',  Icon: BookOpen },
  Environment:              { iconBg: 'oklch(0.92 0.07 160)', iconColor: 'oklch(0.38 0.13 160)', border: 'rgba(32, 178, 120, 0.35)',  glow: 'rgba(32, 178, 120, 0.18)',  Icon: Landmark },
  Healthcare:               { iconBg: 'oklch(0.93 0.06 10)',  iconColor: 'oklch(0.45 0.18 10)',  border: 'rgba(220, 60, 80, 0.35)',   glow: 'rgba(220, 60, 80, 0.18)',   Icon: Heart },
  Economy:                  { iconBg: 'oklch(0.94 0.06 60)',  iconColor: 'oklch(0.45 0.14 60)',  border: 'rgba(210, 140, 30, 0.35)',  glow: 'rgba(210, 140, 30, 0.18)',  Icon: DollarSign },
  'Criminal Justice':       { iconBg: 'oklch(0.93 0.06 38)',  iconColor: 'oklch(0.46 0.17 38)',  border: 'rgba(225, 110, 20, 0.35)',  glow: 'rgba(225, 110, 20, 0.18)',  Icon: Scale },
  Infrastructure:           { iconBg: 'oklch(0.93 0.06 300)', iconColor: 'oklch(0.42 0.14 300)', border: 'rgba(148, 60, 210, 0.35)',  glow: 'rgba(148, 60, 210, 0.18)',  Icon: Building2 },
  Housing:                  { iconBg: 'oklch(0.93 0.05 200)', iconColor: 'oklch(0.40 0.14 200)', border: 'rgba(20, 160, 180, 0.35)',  glow: 'rgba(20, 160, 180, 0.18)',  Icon: Home },
  'Election Administration':{ iconBg: 'oklch(0.92 0.06 270)', iconColor: 'oklch(0.42 0.15 270)', border: 'rgba(90, 90, 220, 0.35)',   glow: 'rgba(90, 90, 220, 0.18)',   Icon: Vote },
  'Government Reform':      { iconBg: 'oklch(0.93 0.05 180)', iconColor: 'oklch(0.40 0.12 180)', border: 'rgba(20, 160, 140, 0.35)',  glow: 'rgba(20, 160, 140, 0.18)',  Icon: Settings },
  Taxes:                    { iconBg: 'oklch(0.94 0.06 60)',  iconColor: 'oklch(0.45 0.14 60)',  border: 'rgba(210, 140, 30, 0.35)',  glow: 'rgba(210, 140, 30, 0.18)',  Icon: ReceiptText },
  'Public Health':          { iconBg: 'oklch(0.93 0.06 330)', iconColor: 'oklch(0.44 0.16 330)', border: 'rgba(210, 60, 140, 0.35)',  glow: 'rgba(210, 60, 140, 0.18)',  Icon: Activity },
  'Campaign Finance':       { iconBg: 'oklch(0.93 0.06 300)', iconColor: 'oklch(0.42 0.14 300)', border: 'rgba(148, 60, 210, 0.35)',  glow: 'rgba(148, 60, 210, 0.18)',  Icon: Megaphone },
  'Local Government':       { iconBg: 'oklch(0.92 0.05 200)', iconColor: 'oklch(0.40 0.14 200)', border: 'rgba(20, 140, 180, 0.35)',  glow: 'rgba(20, 140, 180, 0.18)',  Icon: MapPin },
}

const DEFAULT_STYLE = { iconBg: 'oklch(0.93 0.04 0)', iconColor: 'oklch(0.46 0.10 0)', border: 'rgba(120,120,120,0.3)', glow: 'rgba(120,120,120,0.12)', Icon: FileText }

export default function PropositionsPage() {
  const { activeState } = useActiveState()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [aiSummaries, setAiSummaries] = useState<Record<string, AISummary>>({})
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function fetchAISummary(prop: typeof PROPOSITIONS[0]) {
    if (aiSummaries[prop.id] || loadingId) return
    setLoadingId(prop.id)
    try {
      const text = `${prop.number}: ${prop.title}\n\n${prop.summary}\n\nFiscal Impact: ${prop.fiscalImpact}\n\nArgument For: ${prop.proArgument}\n\nArgument Against: ${prop.conArgument}`
      const res = await fetch('/api/summarize-proposition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propositionText: text }),
      })
      const data = await res.json()
      if (data.summary) {
        setAiSummaries((prev) => ({ ...prev, [prop.id]: data.summary }))
      }
    } catch (err) {
      console.error('[v0] AI summary fetch error:', err)
    } finally {
      setLoadingId(null)
    }
  }

  const filtered = PROPOSITIONS.filter((p) => p.stateCode === activeState.code)
  const stateName = US_STATES.find((s) => s.code === activeState.code)?.name ?? activeState.code

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">

        {/* ── Header ── */}
        <header className="px-5 pt-6 pb-4 flex flex-col items-center text-center">
          <h1 className="text-[28px] font-black text-foreground leading-tight">Propositions</h1>
          <p className="text-[14px] text-muted-foreground mt-0.5">
            {stateName} · {filtered.length} measure{filtered.length !== 1 ? 's' : ''}
          </p>
        </header>

        {/* ── Cards ── */}
        <div className="flex-1 overflow-y-auto px-5 pb-28 no-scrollbar flex flex-col gap-3 mt-2">

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: 'oklch(0.93 0.06 300)', boxShadow: '0 4px 20px rgba(148,60,210,0.18)' }}
              >
                <FileText size={28} style={{ color: 'oklch(0.42 0.14 300)' }} aria-hidden="true" />
              </div>
              <p className="font-bold text-sm text-foreground mb-2">No statewide measures on the 2026 ballot</p>
              {activeState.code === 'TX' && (
                <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
                  Texas held its constitutional amendment election in November 2025. The 89th Legislature&apos;s next regular session begins January 2027, so no new amendments have been referred for November 2026.
                </p>
              )}
              {activeState.code === 'NY' && (
                <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
                  New York does not allow citizen initiatives. No measures completed the required two-session process for 2026.
                </p>
              )}
              {activeState.code !== 'TX' && activeState.code !== 'NY' && (
                <p className="text-muted-foreground text-xs mt-1">No statewide ballot measures have been certified for {activeState.name} yet.</p>
              )}
            </div>
          ) : (
            filtered.map((prop, i) => {
              const isOpen = expanded === prop.id
              const style = CATEGORY_STYLES[prop.category] ?? DEFAULT_STYLE
              const { Icon, iconBg, iconColor, border, glow } = style

              return (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: i * 0.05 }}
                  className="rounded-3xl overflow-hidden"
                  style={{
                    background: '#ffffff',
                    border: `1.5px solid ${border}`,
                    boxShadow: `0 4px 20px ${glow}, 0 1px 4px rgba(0,0,0,0.04)`,
                  }}
                >
                  {/* Card header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : prop.id)}
                    className="w-full px-5 py-4 flex items-start gap-4 text-left hover:bg-muted/30 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: iconBg }}
                    >
                      <Icon size={20} style={{ color: iconColor }} aria-hidden="true" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wide">
                          {prop.number}
                        </span>
                        {prop.ballotType && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground tracking-tight">
                            {prop.ballotType}
                          </span>
                        )}
                      </div>
                      <p className="font-bold text-[14px] text-foreground leading-snug text-balance">
                        {prop.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">{prop.category}</p>
                    </div>

                    <ChevronDown
                      size={16}
                      className={`text-muted-foreground shrink-0 mt-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 flex flex-col gap-4 border-t border-border pt-4">
                          {/* Summary */}
                          <div>
                            <p className="text-[11px] font-black text-muted-foreground uppercase tracking-wide mb-1.5">Summary</p>
                            <p className="text-sm text-foreground leading-relaxed">{prop.summary}</p>
                          </div>

                          {/* Fiscal impact */}
                          <div
                            className="rounded-2xl px-4 py-3"
                            style={{ background: 'oklch(0.98 0.04 60)', border: '1.5px solid rgba(210,140,30,0.3)' }}
                          >
                            <p className="text-[11px] font-black uppercase tracking-wide mb-1" style={{ color: 'oklch(0.45 0.14 60)' }}>Fiscal Impact</p>
                            <p className="text-xs leading-relaxed" style={{ color: 'oklch(0.35 0.10 60)' }}>{prop.fiscalImpact}</p>
                          </div>

                          {/* Pro / Con */}
                          <div className="grid grid-cols-1 gap-2.5">
                            <div
                              className="rounded-2xl px-4 py-3"
                              style={{ background: 'oklch(0.97 0.05 160)', border: '1.5px solid rgba(32,178,120,0.3)' }}
                            >
                              <p className="text-[11px] font-black uppercase tracking-wide mb-1" style={{ color: 'oklch(0.38 0.13 160)' }}>For</p>
                              <p className="text-xs leading-relaxed" style={{ color: 'oklch(0.28 0.10 160)' }}>{prop.proArgument}</p>
                            </div>
                            <div
                              className="rounded-2xl px-4 py-3"
                              style={{ background: 'oklch(0.98 0.04 10)', border: '1.5px solid rgba(220,60,80,0.3)' }}
                            >
                              <p className="text-[11px] font-black uppercase tracking-wide mb-1" style={{ color: 'oklch(0.45 0.18 10)' }}>Against</p>
                              <p className="text-xs leading-relaxed" style={{ color: 'oklch(0.35 0.14 10)' }}>{prop.conArgument}</p>
                            </div>
                          </div>

                          {/* AI Summary */}
                          <div className="border-t border-border pt-4">
                            {!aiSummaries[prop.id] ? (
                              <button
                                onClick={() => fetchAISummary(prop)}
                                disabled={loadingId === prop.id}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm transition-colors disabled:opacity-60"
                                style={{ background: 'oklch(0.94 0.05 285)', color: 'oklch(0.42 0.19 285)' }}
                              >
                                {loadingId === prop.id ? (
                                  <>
                                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                                    Generating AI Summary...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles size={15} aria-hidden="true" />
                                    Explain this simply with AI
                                  </>
                                )}
                              </button>
                            ) : (
                              <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col gap-3"
                              >
                                <div className="flex items-center gap-2">
                                  <Sparkles size={13} className="text-primary" aria-hidden="true" />
                                  <span className="text-[11px] font-black text-primary uppercase tracking-wide">AI Plain-Language Summary</span>
                                </div>

                                {[
                                  { key: 'whatItDoes',        label: 'What It Does',        bg: 'oklch(0.96 0.05 285)', border: 'rgba(148,60,210,0.25)',  color: 'oklch(0.42 0.14 300)' },
                                  { key: 'ifItPasses',        label: 'If It Passes',        bg: 'oklch(0.97 0.05 160)', border: 'rgba(32,178,120,0.25)', color: 'oklch(0.38 0.13 160)' },
                                  { key: 'ifItFails',         label: 'If It Fails',         bg: 'oklch(0.96 0.01 0)',   border: 'rgba(120,120,120,0.2)', color: 'oklch(0.40 0.01 0)' },
                                  { key: 'fiscalImpact',      label: 'Fiscal Impact',       bg: 'oklch(0.98 0.04 60)',  border: 'rgba(210,140,30,0.25)', color: 'oklch(0.45 0.14 60)' },
                                  { key: 'keyConcernFor',     label: 'Key Concern For',     bg: 'oklch(0.97 0.05 160)', border: 'rgba(32,178,120,0.25)', color: 'oklch(0.38 0.13 160)' },
                                  { key: 'keyConcernAgainst', label: 'Key Concern Against', bg: 'oklch(0.98 0.04 10)',  border: 'rgba(220,60,80,0.25)',  color: 'oklch(0.45 0.18 10)' },
                                ].map(({ key, label, bg, border: b, color }) => (
                                  <div key={key} className="rounded-2xl px-4 py-3" style={{ background: bg, border: `1.5px solid ${b}` }}>
                                    <p className="text-[11px] font-black uppercase tracking-wide mb-1.5" style={{ color }}>{label}</p>
                                    <p className="text-xs leading-relaxed text-foreground">
                                      {aiSummaries[prop.id][key as keyof AISummary]}
                                    </p>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })
          )}
        </div>

        <FloatingHomeButton />
      </div>
    </PageShell>
  )
}
