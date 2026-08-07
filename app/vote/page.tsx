'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle2, Info, MapPin, ChevronLeft } from 'lucide-react'
import FloatingHomeButton from '@/components/floating-home-button'
import CandidateCard from '@/components/candidate-card'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import {
  RACES_BY_STATE,
  getCandidatesForRace,
  US_STATES,
  type Race,
} from '@/lib/mock-data'
import { useFloatingAction } from '@/lib/floating-action-context'

// ─── Inner component that reads searchParams ─────────────────────────────────
function VoteInner() {
  const router = useRouter()
  const params = useSearchParams()
  const { setAction, clearAction } = useFloatingAction()
  const stateCode = params.get('state') || 'FL'
  const races: Race[] = RACES_BY_STATE[stateCode] ?? []
  const stateName = US_STATES.find((s) => s.code === stateCode)?.name ?? stateCode

  const [activeRaceId, setActiveRaceId] = useState<string>(races[0]?.id ?? '')
  const [selections, setSelections] = useState<Record<string, string>>({}) // raceId → candidateId
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const activeCandidates = getCandidatesForRace(activeRaceId)
  const allRacesSelected = races.every((r) => selections[r.id])
  const completedCount = Object.keys(selections).length

  function handleSelect(candidateId: string) {
    setSelections((prev) => ({
      ...prev,
      [activeRaceId]: prev[activeRaceId] === candidateId ? '' : candidateId,
    }))
  }

  function switchRace(raceId: string) {
    setActiveRaceId(raceId)
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit() {
    if (!allRacesSelected || submitting) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    const votesParam = Object.entries(selections)
      .map(([raceId, candidateId]) => `${raceId}:${candidateId}`)
      .join(',')
    setTimeout(() => router.push(`/results?votes=${encodeURIComponent(votesParam)}&state=${stateCode}`), 1800)
  }

  // Register floating submit — updates whenever ballot selections or submitting state changes
  useEffect(() => {
    setAction({
      label: submitting ? 'Submitting…' : allRacesSelected ? 'Submit Ballot' : `${completedCount}/${races.length} Selected`,
      onSubmit: handleSubmit,
      disabled: !allRacesSelected || submitted,
      loading: submitting,
    })
    return () => clearAction()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRacesSelected, completedCount, submitting, submitted, races.length])

  if (races.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-3xl bg-brand-subtle flex items-center justify-center mb-4">
          <Info size={24} className="text-primary" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-black text-foreground mb-2">No Races Available Yet</h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
          We&apos;re still adding candidate data for {stateName}. Check back soon!
        </p>
        <button
          onClick={() => router.push('/onboarding/state')}
          className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm"
        >
          Choose Another State
        </button>
      </div>
    )
  }

  return (
    <>
      {/* ── Header ── */}
      <header className="bg-background px-5 pt-6 pb-4">
        {/* Top row: state chip */}
        <div className="flex items-center justify-end mb-4">
          <div
            className="inline-flex items-center gap-1.5 bg-muted/60 border border-border rounded-full px-3 py-1.5"
          >
            <MapPin size={11} className="text-primary" aria-hidden="true" />
            <span className="text-foreground text-xs font-semibold">{stateName}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground font-medium">
              {completedCount}/{races.length} completed
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-[22px] font-black text-foreground leading-tight mb-3">Cast Your Ballot</h1>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: races.length > 0 ? `${(completedCount / races.length) * 100}%` : '0%' }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </header>

      {/* ── Race toolbar ── */}
      <div
        className="bg-background px-5 py-3 overflow-x-auto border-b border-border/40"
        style={{ scrollbarWidth: 'none' }}
        role="tablist"
        aria-label="Races"
      >
        <div className="flex gap-2 w-max">
          {races.map((race) => {
            const done = !!selections[race.id]
            const active = activeRaceId === race.id
            return (
              <button
                key={race.id}
                role="tab"
                aria-selected={active}
                aria-controls={`race-panel-${race.id}`}
                onClick={() => switchRace(race.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200',
                  active
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : done
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-muted text-muted-foreground hover:bg-brand-subtle hover:text-primary',
                )}
              >
                {done && <CheckCircle2 size={12} aria-hidden="true" />}
                {race.label}
                {!done && !active && <ChevronRight size={12} aria-hidden="true" />}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Candidate list ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-5"
        id={`race-panel-${activeRaceId}`}
        role="tabpanel"
      >
        {/* Race title */}
        <div className="mb-4">
          <h2 className="font-black text-lg text-foreground">
            {races.find((r) => r.id === activeRaceId)?.office}
            {races.find((r) => r.id === activeRaceId)?.district
              ? ` — ${races.find((r) => r.id === activeRaceId)?.district}`
              : ''}
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select one candidate to record your preference.
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeRaceId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4"
          >
            {activeCandidates.map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                selected={selections[activeRaceId] === c.id}
                onSelect={handleSelect}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Submitted confirmation banner */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            key="submitted-banner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-5 mb-4 flex items-center justify-center gap-2 py-4 rounded-2xl bg-green-100 text-green-700"
          >
            <CheckCircle2 size={18} aria-hidden="true" />
            <span className="font-bold text-sm">Submitted! Redirecting to results…</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom spacer to clear floating buttons */}
      <div style={{ height: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }} />
    </>
  )
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────
export default function VotePage() {
  return (
    <PageShell withNav={false}>
      <div className="flex flex-col min-h-svh bg-background">
        <Suspense fallback={<div className="flex-1 flex items-center justify-center"><p className="text-muted-foreground text-sm">Loading ballot…</p></div>}>
          <VoteInner />
        </Suspense>
        <FloatingHomeButton />
      </div>
    </PageShell>
  )
}
