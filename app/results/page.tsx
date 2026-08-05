'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell } from 'recharts'
import { ChevronDown, Lock, Share2, Info, BarChart3, CheckCircle2, ChevronRight } from 'lucide-react'
import FloatingHomeButton from '@/components/floating-home-button'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import {
  RACE_RESULTS, partyColor, CANDIDATES, RACES_BY_STATE, getCandidatesForRace,
  type RaceResult, type DemographicBreakdown,
} from '@/lib/mock-data'
import { useActiveState } from '@/lib/state-context'
import { useFloatingAction } from '@/lib/floating-action-context'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  const parts = name.trim().split(' ')
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : name.slice(0, 2).toUpperCase()
}



// ─── Demographic candidate row ────────────────────────────────────────────────

function DemoGroup({ item, index }: { item: DemographicBreakdown; index: number }) {
  const masked = item.count < 30

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.04 }}
      className="py-3.5 border-b border-border last:border-0"
    >
      {/* Group header */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-sm font-bold text-foreground">{item.label}</span>
        {masked ? (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Lock size={10} aria-hidden="true" />
            <span>{'<'}30 resp.</span>
          </div>
        ) : (
          <span className="text-[11px] text-muted-foreground tabular-nums">
            {item.count.toLocaleString()} resp.
          </span>
        )}
      </div>

      {masked ? (
        <div className="h-2 rounded-full bg-muted" aria-label="Data hidden for privacy" />
      ) : (
        <div className="space-y-2.5">
          {item.candidates.map((c, ci) => {
            const colors = partyColor(c.party)
            return (
              <div key={ci} className="flex items-center gap-3">
                {/* Bar + name column */}
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] font-semibold text-foreground block mb-1 truncate">
                    {c.lastName}
                  </span>
                  <div className="h-[6px] rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: colors.ring }}
                      initial={{ width: 0 }}
                      animate={{ width: `${c.percent}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.03 + ci * 0.06 }}
                    />
                  </div>
                </div>
                {/* Percentage — fixed width so bar never clips it */}
                <span
                  className="text-[13px] font-black tabular-nums shrink-0 w-9 text-right"
                  style={{ color: colors.ring }}
                >
                  {c.percent}%
                </span>
              </div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

// ─── Accordion section ────────────────────────────────────────────────────────

function AccordionSection({ title, items }: { title: string; items: DemographicBreakdown[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-bold text-[15px] text-foreground">{title}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
          aria-hidden="true"
        >
          <ChevronDown size={15} className="text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-2">
              {items.map((item, i) => (
                <DemoGroup key={item.label} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Your Ballot section ──────────────────────────────────────────────────────

interface BallotPick {
  raceId: string
  raceLabel: string
  office: string
  candidateId: string
  candidateName: string
  party: string
  crowdPercent: number | null
  isLeading: boolean | null
}

function YourBallot({ picks }: { picks: BallotPick[] }) {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 300)
    return () => clearTimeout(t)
  }, [])

  if (picks.length === 0) return null

  return (
    <div className="mx-5 mb-3 bg-card rounded-3xl overflow-hidden shadow-sm">
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center gap-2 mb-0.5">
          <CheckCircle2 size={16} className="text-emerald-500" aria-hidden="true" />
          <h2 className="font-black text-[17px] text-foreground">Your Ballot</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Your selections — see how they compare to other participants.
        </p>
      </div>

      <div className="divide-y divide-border">
        {picks.map((pick, i) => {
          const colors = partyColor(pick.party as any)
          return (
            <motion.div
              key={pick.raceId}
              initial={{ opacity: 0, x: -12 }}
              animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.35, delay: i * 0.12, ease: 'easeOut' }}
              className="px-5 py-4"
            >
              <p className="text-[11px] font-bold tracking-wider uppercase text-muted-foreground mb-2">
                {pick.office}
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-xs font-black"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                  aria-hidden="true"
                >
                  {pick.candidateName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[14px] text-foreground leading-tight truncate">
                      {pick.candidateName}
                    </span>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={revealed ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.12 + 0.2, type: 'spring', stiffness: 300 }}
                      className="shrink-0"
                    >
                      <CheckCircle2 size={18} className="text-emerald-500" aria-label="Your pick" />
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] font-semibold" style={{ color: colors.ring }}>
                      {pick.party}
                    </span>
                    {pick.crowdPercent !== null && (
                      <span className="text-[11px] text-muted-foreground tabular-nums">
                        {pick.crowdPercent}% of participants
                      </span>
                    )}
                  </div>
                  {pick.crowdPercent !== null && (
                    <div className="mt-2 h-[5px] rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: colors.ring }}
                        initial={{ width: 0 }}
                        animate={revealed ? { width: `${pick.crowdPercent}%` } : { width: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.12 + 0.25 }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {pick.isLeading !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                  transition={{ duration: 0.3, delay: i * 0.12 + 0.45 }}
                  className={cn(
                    'mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold',
                    pick.isLeading
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700',
                  )}
                >
                  <ChevronRight size={11} aria-hidden="true" />
                  {pick.isLeading
                    ? 'Currently leading among participants'
                    : 'Currently trailing among participants'}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Inner component (reads searchParams) ────────────────────────────────────

function ResultsInner() {
  const { activeState } = useActiveState()
  const searchParams = useSearchParams()
  const { setAction, clearAction } = useFloatingAction()

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: 'VotePulse Results', url: window.location.href })
      } else {
        await navigator.clipboard.writeText(window.location.href)
      }
    } catch { /* user cancelled */ }
  }, [])

  useEffect(() => {
    setAction({ label: 'Share Results', onSubmit: handleShare })
    return () => clearAction()
  }, [setAction, clearAction, handleShare])

  // Parse ?votes= param → map of raceId → candidateId
  const votesParam = searchParams.get('votes') ?? ''
  const userSelections: Record<string, string> = {}
  if (votesParam) {
    votesParam.split(',').forEach((pair) => {
      const [raceId, candidateId] = pair.split(':')
      if (raceId && candidateId) userSelections[raceId] = candidateId
    })
  }

  // Determine which state to show: prefer ?state= param, else context
  const stateParam = searchParams.get('state')
  const stateCode = stateParam || activeState.code

  const stateRaces = RACE_RESULTS.filter((r) => r.stateCode === stateCode)
  const senateResult = stateRaces.find((r) => r.office === 'Senate') ?? stateRaces[0]

  const [activeRace, setActiveRace] = useState<RaceResult | undefined>(senateResult)

  useEffect(() => {
    const races = RACE_RESULTS.filter((r) => r.stateCode === stateCode)
    const first = races.find((r) => r.office === 'Senate') ?? races[0]
    setActiveRace(first)
  }, [stateCode])

  // Build YourBallot picks from userSelections
  const ballotPicks: BallotPick[] = Object.entries(userSelections).map(([raceId, candidateId]) => {
    const candidate = CANDIDATES.find((c) => c.id === candidateId)
    const race = Object.values(RACES_BY_STATE).flat().find((r) => r.id === raceId)
    const raceResult = RACE_RESULTS.find((r) => r.raceId === raceId)
    const resultCandidate = raceResult?.candidates.find((c) => c.candidateId === candidateId)
    const maxPercent = raceResult ? Math.max(...raceResult.candidates.map((c) => c.percent)) : null

    return {
      raceId,
      raceLabel: race?.label ?? raceId,
      office: race?.office ?? '',
      candidateId,
      candidateName: candidate?.name ?? candidateId,
      party: candidate?.party ?? '',
      crowdPercent: resultCandidate?.percent ?? null,
      isLeading:
        resultCandidate && maxPercent !== null
          ? resultCandidate.percent === maxPercent
          : null,
    }
  })

  const race = activeRace

  // All derived values are guarded — only computed when a race exists
  const chartData = race ? race.candidates.map((c) => ({
    name: c.lastName,
    value: c.count,
    color: partyColor(c.party).ring,
  })) : []

  const DEMOGRAPHICS = race ? [
    { title: 'Age Range',             items: race.byAge },
    { title: 'Race or Ethnicity',     items: race.byRace },
    { title: 'Religious Affiliation', items: race.byReligion },
    { title: 'Gender',                items: race.byGender },
    { title: 'Political Affiliation', items: race.byPolitical },
  ] : []

  const [c0, c1] = race ? race.candidates : []
  const col0 = c0 ? partyColor(c0.party) : null
  const col1 = c1 ? partyColor(c1.party) : null

  const stateName = activeState.code === stateCode
    ? activeState.name
    : (stateCode ?? activeState.name)

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-[#f0f0f5]">

        {/* ── Header ── */}
        <header className="bg-card px-5 pt-14 pb-4 border-b border-border">
          <h1 className="text-2xl font-black text-foreground mb-1">Live Results</h1>
          <p className="text-sm text-muted-foreground">{stateName} · 2026 Midterms</p>
        </header>

        <div className="flex-1 overflow-y-auto pb-24">

          {/* ── Your Ballot reveal ── */}
          {ballotPicks.length > 0 && (
            <div className="pt-5">
              <YourBallot picks={ballotPicks} />
            </div>
          )}

          {/* ── Empty state for states with no results data yet ── */}
          {stateRaces.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
                <BarChart3 size={24} className="text-muted-foreground" aria-hidden="true" />
              </div>
              <p className="font-bold text-foreground text-sm mb-1">No results available yet</p>
              <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
                Results for {stateName} will appear here once participants in this state cast their selections.
              </p>
            </div>
          )}

          {/* ── Race toggle — dynamic for all races in active state ── */}
          {stateRaces.length > 0 && race && (<>
          <div className="px-5 pt-5 pb-3">
            <div className="flex gap-2 overflow-x-auto scrollbar-none">
              {stateRaces.map((r) => (
                <button
                  key={r.raceId}
                  type="button"
                  onClick={() => setActiveRace(r)}
                  className={cn(
                    'shrink-0 px-5 py-2 rounded-full text-sm font-bold transition-all duration-200',
                    activeRace?.raceId === r.raceId
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-card text-muted-foreground border border-border hover:border-primary/40'
                  )}
                >
                  {r.raceLabel}
                </button>
              ))}
            </div>
          </div>

          {/* ── Donut card ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={race.raceId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mx-5 mb-3 bg-card rounded-3xl px-3 py-4 shadow-sm"
            >
              {/* Flanking stats + donut */}
              <div className="flex items-center justify-between gap-1">

                {/* Candidate 0 — left */}
                {c0 && col0 && (
                  <div className="flex flex-col items-center w-[76px] shrink-0 gap-0.5 text-center">
                    <p
                      className="text-2xl font-black leading-none tabular-nums"
                      style={{ color: col0.ring }}
                    >
                      {c0.percent}%
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: col0.ring }} aria-hidden="true" />
                      <span className="text-[11px] font-bold text-foreground truncate leading-none">{c0.lastName}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium leading-none mt-0.5">
                      {c0.party === 'Democrat' ? 'DEM' : c0.party === 'Republican' ? 'REP' : 'IND'} · {c0.count.toLocaleString()}
                    </span>
                  </div>
                )}

                {/* Donut — center, fixed 180×180 */}
                <div className="shrink-0 w-[180px] h-[180px]">
                  <PieChart width={180} height={180}>
                    <Pie
                      data={chartData}
                      cx={90}
                      cy={90}
                      innerRadius={54}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={0}
                      dataKey="value"
                      animationDuration={800}
                      aria-label={`${race.candidates.map((c) => `${c.lastName} ${c.percent}%`).join(', ')}`}
                    >
                      {chartData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </div>

                {/* Candidate 1 — right */}
                {c1 && col1 && (
                  <div className="flex flex-col items-center w-[76px] shrink-0 gap-0.5 text-center">
                    <p
                      className="text-2xl font-black leading-none tabular-nums"
                      style={{ color: col1.ring }}
                    >
                      {c1.percent}%
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: col1.ring }} aria-hidden="true" />
                      <span className="text-[11px] font-bold text-foreground truncate leading-none">{c1.lastName}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium leading-none mt-0.5">
                      {c1.party === 'Democrat' ? 'DEM' : c1.party === 'Republican' ? 'REP' : 'IND'} · {c1.count.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Total responses row */}
              <div className="mt-4 pt-4 border-t border-border text-center">
                <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  Total Participant Responses
                </p>
                <p className="text-[32px] font-black text-foreground leading-tight">
                  {race.totalResponses.toLocaleString()}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="mt-3 flex gap-2 items-start bg-primary/8 rounded-2xl px-3.5 py-3">
                <Info size={13} className="text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Results represent voluntary selections by app participants and are not official election results.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── Results by Candidate ── */}
          <div className="mx-5 mb-3 bg-card rounded-3xl px-5 py-5 shadow-sm">
            <h2 className="font-black text-[17px] text-foreground mb-4">Results by Candidate</h2>
            <div className="space-y-0 divide-y divide-border">
              {race.candidates.map((c, i) => {
                const colors = partyColor(c.party)
                const initials = getInitials(c.name)
                return (
                  <div key={c.candidateId} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-2.5">
                      {/* Initials avatar */}
                      <div
                        className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-sm font-black"
                        style={{ backgroundColor: colors.bg, color: colors.text }}
                        aria-hidden="true"
                      >
                        {initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-[14px] text-foreground leading-tight">{c.name}</span>
                          <span
                            className="text-[20px] font-black leading-none shrink-0"
                            style={{ color: colors.ring }}
                          >
                            {c.percent}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-[12px] text-muted-foreground">{c.party}</span>
                          <span className="text-[12px] text-muted-foreground tabular-nums">
                            {c.count.toLocaleString()} resp.
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-[6px] rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: colors.ring }}
                        initial={{ width: 0 }}
                        animate={{ width: `${c.percent}%` }}
                        transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Demographics accordion ── */}
          <div className="mx-5 mb-3 bg-card rounded-3xl px-5 shadow-sm">
            <div className="pt-5 pb-3 border-b border-border">
              <h2 className="font-black text-[17px] text-foreground">Results by Demographics</h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Groups with fewer than 30 responses are hidden to protect anonymity.
              </p>
            </div>
            {DEMOGRAPHICS.map(({ title, items }) => (
              <AccordionSection key={title} title={title} items={items} />
            ))}
          </div>

          {/* ── Share nudge ── */}
          <div
            className="mx-5 mt-1 mb-2 p-4 rounded-3xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, oklch(0.40 0.19 285) 0%, oklch(0.55 0.16 265) 100%)' }}
          >
            <p className="text-sm font-black text-white mb-1">Your voice was counted.</p>
            <p className="text-xs text-white/75 leading-relaxed mb-3">
              Share VotePulse with a friend and help grow the data set.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-primary text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <Share2 size={12} aria-hidden="true" />
              Share VotePulse
            </button>
          </div>
          {/* end stateRaces.length > 0 */}
          </>)}

        </div>

        <FloatingHomeButton />
      </div>
    </PageShell>
  )
}

// ─── Page export ──────────────────────────────────────────────────────────────

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center min-h-svh">
        <p className="text-muted-foreground text-sm">Loading results…</p>
      </div>
    }>
      <ResultsInner />
    </Suspense>
  )
}
