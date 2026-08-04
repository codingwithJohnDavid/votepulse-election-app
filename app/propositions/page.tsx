'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronDown, FileText, Sparkles, Loader2 } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { PROPOSITIONS, US_STATES } from '@/lib/mock-data'

interface AISummary {
  whatItDoes: string
  ifItPasses: string
  ifItFails: string
  fiscalImpact: string
  keyConcernFor: string
  keyConcernAgainst: string
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Education:         { bg: 'bg-blue-100',    text: 'text-blue-700' },
  Environment:       { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  Healthcare:        { bg: 'bg-rose-100',    text: 'text-rose-700' },
  Economy:           { bg: 'bg-amber-100',   text: 'text-amber-700' },
  'Criminal Justice':{ bg: 'bg-orange-100',  text: 'text-orange-700' },
  Infrastructure:    { bg: 'bg-violet-100',  text: 'text-violet-700' },
  Housing:           { bg: 'bg-cyan-100',    text: 'text-cyan-700' },
}

const AVAILABLE_STATES = ['All', 'FL', 'TX', 'CA', 'NY']

export default function PropositionsPage() {
  const [stateFilter, setStateFilter] = useState('FL')
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

  const filtered = PROPOSITIONS.filter(
    (p) => stateFilter === 'All' || p.stateCode === stateFilter,
  )

  const stateName =
    stateFilter === 'All'
      ? 'All States'
      : US_STATES.find((s) => s.code === stateFilter)?.name ?? stateFilter

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">
        {/* ── Header ── */}
        <header className="bg-card px-5 pt-14 pb-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <Link
              href="/home"
              className="flex items-center gap-1 text-primary font-semibold text-sm -ml-1 px-1 py-0.5 rounded-xl hover:bg-brand-subtle transition-colors"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Home
            </Link>
          </div>
          <h1 className="text-xl font-black text-foreground">Propositions</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {stateName} · {filtered.length} measure{filtered.length !== 1 ? 's' : ''}
          </p>
        </header>

        {/* ── State filter pills ── */}
        <div className="bg-card px-5 py-3 border-b border-border flex items-center gap-2 overflow-x-auto scrollbar-none">
          {AVAILABLE_STATES.map((code) => {
            const active = stateFilter === code
            return (
              <button
                key={code}
                onClick={() => setStateFilter(code)}
                className={`shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
                  active
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`}
              >
                {code}
              </button>
            )
          })}
        </div>

        {/* ── Proposition cards ── */}
        <div
          className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}
        >
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileText size={32} className="text-muted-foreground mb-3" />
              <p className="text-muted-foreground font-medium text-sm">No propositions available</p>
              <p className="text-muted-foreground text-xs mt-1">Select a different state</p>
            </div>
          ) : (
            filtered.map((prop, i) => {
              const isOpen = expanded === prop.id
              const colors = CATEGORY_COLORS[prop.category] ?? { bg: 'bg-gray-100', text: 'text-gray-700' }

              return (
                <motion.div
                  key={prop.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.05 }}
                  className="bg-card rounded-3xl border border-border overflow-hidden"
                >
                  {/* Card header — always visible */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : prop.id)}
                    className="w-full px-5 py-4 flex items-start gap-3 text-left hover:bg-muted/40 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${colors.bg}`}>
                      <FileText size={16} className={colors.text} aria-hidden="true" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[11px] font-black text-muted-foreground uppercase tracking-wide">
                          {prop.number}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                          {prop.category}
                        </span>
                      </div>
                      <p className="font-bold text-[14px] text-foreground leading-tight text-balance">
                        {prop.title}
                      </p>
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
                          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
                            <p className="text-[11px] font-black text-amber-700 uppercase tracking-wide mb-1">Fiscal Impact</p>
                            <p className="text-xs text-amber-900 leading-relaxed">{prop.fiscalImpact}</p>
                          </div>

                          {/* Pro / Con */}
                          <div className="grid grid-cols-1 gap-2.5">
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-3">
                              <p className="text-[11px] font-black text-emerald-700 uppercase tracking-wide mb-1">For</p>
                              <p className="text-xs text-emerald-900 leading-relaxed">{prop.proArgument}</p>
                            </div>
                            <div className="bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3">
                              <p className="text-[11px] font-black text-rose-700 uppercase tracking-wide mb-1">Against</p>
                              <p className="text-xs text-rose-900 leading-relaxed">{prop.conArgument}</p>
                            </div>
                          </div>

                          {/* ── AI Summary section ── */}
                          <div className="border-t border-border pt-4">
                            {!aiSummaries[prop.id] ? (
                              <button
                                onClick={() => fetchAISummary(prop)}
                                disabled={loadingId === prop.id}
                                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary/10 hover:bg-primary/15 text-primary font-bold text-sm transition-colors disabled:opacity-60"
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
                                {/* AI badge */}
                                <div className="flex items-center gap-2">
                                  <Sparkles size={13} className="text-primary" aria-hidden="true" />
                                  <span className="text-[11px] font-black text-primary uppercase tracking-wide">AI Plain-Language Summary</span>
                                </div>

                                {[
                                  { key: 'whatItDoes',        label: 'What It Does',       bg: 'bg-violet-50',  border: 'border-violet-200', title: 'text-violet-700', body: 'text-violet-900' },
                                  { key: 'ifItPasses',        label: 'If It Passes',       bg: 'bg-emerald-50', border: 'border-emerald-200', title: 'text-emerald-700', body: 'text-emerald-900' },
                                  { key: 'ifItFails',         label: 'If It Fails',        bg: 'bg-slate-50',   border: 'border-slate-200',  title: 'text-slate-600',   body: 'text-slate-800' },
                                  { key: 'fiscalImpact',      label: 'Fiscal Impact',      bg: 'bg-amber-50',   border: 'border-amber-200',  title: 'text-amber-700',   body: 'text-amber-900' },
                                  { key: 'keyConcernFor',     label: 'Key Concern For',    bg: 'bg-emerald-50', border: 'border-emerald-200', title: 'text-emerald-700', body: 'text-emerald-900' },
                                  { key: 'keyConcernAgainst', label: 'Key Concern Against',bg: 'bg-rose-50',    border: 'border-rose-200',   title: 'text-rose-700',    body: 'text-rose-900' },
                                ].map(({ key, label, bg, border, title, body }) => (
                                  <div key={key} className={`${bg} ${border} border rounded-2xl px-4 py-3`}>
                                    <p className={`text-[11px] font-black uppercase tracking-wide mb-1.5 ${title}`}>{label}</p>
                                    <p className={`text-xs leading-relaxed ${body}`}>
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

        <BottomNav />
      </div>
    </PageShell>
  )
}
