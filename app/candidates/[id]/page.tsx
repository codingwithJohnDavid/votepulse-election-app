'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Globe, AtSign, Link2, Award, ExternalLink, Sparkles, Loader2, DollarSign, ChevronDown } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { CANDIDATES, partyColor, type CandidateFunder } from '@/lib/mock-data'

interface AIBio {
  background: string
  politicalCareer: string
  keyIssues: { issue: string; detail: string }[]
  whyRunning: string
  implementationPlan: string
}

const FUNDER_TYPE_COLORS: Record<CandidateFunder['type'], string> = {
  'PAC':             'bg-amber-50 border-amber-200 text-amber-700',
  'Individual':      'bg-blue-50 border-blue-200 text-blue-700',
  'Small Donors':    'bg-emerald-50 border-emerald-200 text-emerald-700',
  'Party Committee': 'bg-violet-50 border-violet-200 text-violet-700',
  'Corporate':       'bg-slate-50 border-slate-200 text-slate-600',
}

export default function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const candidate = CANDIDATES.find((c) => c.id === id)

  const [aiBio, setAiBio] = useState<AIBio | null>(null)
  const [loadingBio, setLoadingBio] = useState(false)
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null)

  if (!candidate) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center min-h-svh bg-background gap-4">
          <p className="text-muted-foreground font-medium">Candidate not found.</p>
          <Link href="/candidates" className="text-primary font-semibold text-sm hover:underline">
            Back to Candidates
          </Link>
        </div>
      </PageShell>
    )
  }

  const { ring, bg, badge } = partyColor(candidate.party)
  const partyLabel = candidate.party === 'Democrat' ? 'DEM' : candidate.party === 'Republican' ? 'REP' : 'IND'

  async function fetchAIBio() {
    if (aiBio || loadingBio) return
    setLoadingBio(true)
    try {
      const candidateInfo = [
        `Name: ${candidate!.name}`,
        `Party: ${candidate!.party}`,
        `Office Sought: ${candidate!.office}${candidate!.district ? `, ${candidate!.district}` : ''}`,
        `State: ${candidate!.state}`,
        `Incumbent: ${candidate!.incumbent ? 'Yes' : 'No'}`,

        `Current Bio: ${candidate!.bio}`,
        `Key Issues: ${candidate!.keyIssues.join(', ')}`,
      ].join('\n')

      const res = await fetch('/api/candidate-bio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateInfo }),
      })
      const data = await res.json()
      if (data.bio) setAiBio(data.bio)
    } catch (err) {
      console.error('[v0] AI bio fetch error:', err)
    } finally {
      setLoadingBio(false)
    }
  }

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">
        {/* ── Header bar ── */}
        <header className="bg-card px-5 pt-14 pb-4 border-b border-border flex items-center gap-2">
          <Link
            href="/candidates"
            className="flex items-center gap-1 text-primary font-semibold text-sm -ml-1 px-1 py-0.5 rounded-xl hover:bg-brand-subtle transition-colors"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Candidates
          </Link>
        </header>

        <div
          className="flex-1 overflow-y-auto"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}
        >
          {/* ── Profile hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="mx-5 mt-5 bg-card rounded-3xl border border-border p-5 flex flex-col items-center text-center"
          >
            <div
              className="w-20 h-20 rounded-full overflow-hidden mb-3"
              style={{ backgroundColor: bg, boxShadow: `0 0 0 3px ${ring}50` }}
            >
              <Image
                src={candidate.imageUrl}
                alt={`Photo of ${candidate.name}`}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>

            <span className={`text-[11px] font-black px-2.5 py-1 rounded-full mb-2 ${badge}`}>
              {partyLabel} · {candidate.party}
            </span>

            <h1 className="text-xl font-black text-foreground text-balance">{candidate.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {candidate.office}{candidate.district ? ` · ${candidate.district}` : ''}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{candidate.state}</p>

            {candidate.incumbent && (
              <div className="flex items-center gap-1 mt-3">
                <Award size={13} className="text-amber-500" aria-hidden="true" />
                <span className="text-[11px] text-muted-foreground font-medium">Incumbent</span>
              </div>
            )}
          </motion.div>

          {/* ── Get Bio with AI ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.08 }}
            className="mx-5 mt-4 bg-card rounded-3xl border border-border p-5"
          >
            <h2 className="font-black text-[14px] text-foreground mb-3">About</h2>

            {!aiBio ? (
              <button
                onClick={fetchAIBio}
                disabled={loadingBio}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary/10 hover:bg-primary/15 text-primary font-bold text-sm transition-colors disabled:opacity-60"
              >
                {loadingBio ? (
                  <>
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                    Generating Bio...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} aria-hidden="true" />
                    Get Bio with AI
                  </>
                )}
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {/* AI badge */}
                <div className="flex items-center gap-2">
                  <Sparkles size={13} className="text-primary" aria-hidden="true" />
                  <span className="text-[11px] font-black text-primary uppercase tracking-wide">AI-Generated Biography</span>
                </div>

                {[
                  { label: 'Background', value: aiBio.background, bg: 'bg-slate-50', border: 'border-slate-200', title: 'text-slate-600', body: 'text-slate-800' },
                  { label: 'Political Career', value: aiBio.politicalCareer, bg: 'bg-violet-50', border: 'border-violet-200', title: 'text-violet-700', body: 'text-violet-900' },
                  { label: 'Why They Are Running',     value: aiBio.whyRunning,          bg: 'bg-blue-50',   border: 'border-blue-200',   title: 'text-blue-700',   body: 'text-blue-900' },
                  { label: 'How They Plan to Implement', value: aiBio.implementationPlan, bg: 'bg-emerald-50', border: 'border-emerald-200', title: 'text-emerald-700', body: 'text-emerald-900' },
                ].map(({ label, value, bg: cardBg, border, title, body }) => (
                  <div key={label} className={`${cardBg} ${border} border rounded-2xl px-4 py-3`}>
                    <p className={`text-[11px] font-black uppercase tracking-wide mb-1.5 ${title}`}>{label}</p>
                    <p className={`text-xs leading-relaxed ${body}`}>{value}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>

          {/* ── Key Issues ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12 }}
            className="mx-5 mt-4 bg-card rounded-3xl border border-border p-5"
          >
            <h2 className="font-black text-[14px] text-foreground mb-3">Key Issues</h2>

            {!aiBio ? (
              <button
                onClick={fetchAIBio}
                disabled={loadingBio}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary/10 hover:bg-primary/15 text-primary font-bold text-sm transition-colors disabled:opacity-60"
              >
                {loadingBio ? (
                  <>
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={15} aria-hidden="true" />
                    Get Key Issues with AI
                  </>
                )}
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col -mx-5 -mb-5"
              >
                <div className="flex items-center gap-2 px-5 pb-3">
                  <Sparkles size={13} className="text-primary" aria-hidden="true" />
                  <span className="text-[11px] font-black text-primary uppercase tracking-wide">AI-Generated</span>
                </div>
                {aiBio.keyIssues.map((item, i) => (
                  <div key={i} className="border-t border-border">
                    <button
                      onClick={() => setExpandedIssue(expandedIssue === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-muted/50"
                      aria-expanded={expandedIssue === i}
                    >
                      <span className="font-bold text-sm text-foreground">{item.issue}</span>
                      <ChevronDown
                        size={15}
                        className={`text-muted-foreground shrink-0 transition-transform duration-200 ${expandedIssue === i ? 'rotate-180' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {expandedIssue === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-4 text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <div className="pb-1" />
              </motion.div>
            )}
          </motion.div>

          {/* ── Funded By ── */}
          {candidate.funders && candidate.funders.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.16 }}
              className="mx-5 mt-4 bg-card rounded-3xl border border-border overflow-hidden"
            >
              <div className="flex items-center gap-2 px-5 pt-5 pb-3">
                <DollarSign size={14} className="text-muted-foreground" aria-hidden="true" />
                <h2 className="font-black text-[14px] text-foreground">Funded By</h2>
              </div>

              <div className="flex flex-col">
                {candidate.funders.map((funder, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-5 py-3.5 border-t border-border"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="text-sm font-semibold text-foreground leading-tight">{funder.name}</p>
                      <span className={`inline-block mt-1 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full border ${FUNDER_TYPE_COLORS[funder.type]}`}>
                        {funder.type}
                      </span>
                    </div>
                    <p className="text-sm font-black text-foreground shrink-0">{funder.amount}</p>
                  </div>
                ))}
              </div>
              <p className="px-5 pb-4 pt-2 text-[11px] text-muted-foreground">
                Source: FEC filings · Data reflects most recent reporting period
              </p>
            </motion.div>
          )}

          {/* ── Links ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mx-5 mt-4 bg-card rounded-3xl border border-border overflow-hidden"
          >
            <h2 className="font-black text-[14px] text-foreground px-5 pt-5 pb-3">Links</h2>

            <a
              href={candidate.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3.5 border-t border-border hover:bg-muted transition-colors"
            >
              <Globe size={16} className="text-primary shrink-0" aria-hidden="true" />
              <span className="flex-1 text-sm font-medium text-foreground">Official Website</span>
              <ExternalLink size={13} className="text-muted-foreground" aria-hidden="true" />
            </a>

            {candidate.twitter && (
              <a
                href={`https://twitter.com/${candidate.twitter.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 border-t border-border hover:bg-muted transition-colors"
              >
                <AtSign size={16} className="text-primary shrink-0" aria-hidden="true" />
                <span className="flex-1 text-sm font-medium text-foreground">{candidate.twitter}</span>
                <ExternalLink size={13} className="text-muted-foreground" aria-hidden="true" />
              </a>
            )}

            {candidate.instagram && (
              <a
                href={`https://instagram.com/${candidate.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-3.5 border-t border-border hover:bg-muted transition-colors"
              >
                <Link2 size={16} className="text-primary shrink-0" aria-hidden="true" />
                <span className="flex-1 text-sm font-medium text-foreground">{candidate.instagram}</span>
                <ExternalLink size={13} className="text-muted-foreground" aria-hidden="true" />
              </a>
            )}
          </motion.div>

          {/* ── Vote CTA ── */}
          <div className="mx-5 mt-4">
            <Link
              href={`/vote?state=${candidate.stateCode}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-3xl font-bold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, oklch(0.38 0.20 285) 0%, oklch(0.52 0.17 265) 100%)' }}
            >
              Vote in {candidate.state}
            </Link>
          </div>
        </div>

        <BottomNav />
      </div>
    </PageShell>
  )
}
