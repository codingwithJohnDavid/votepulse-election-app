'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, CheckCircle2, Info, MapPin } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import CandidateCard from '@/components/candidate-card'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import {
  RACES_BY_STATE,
  getCandidatesForRace,
  US_STATES,
  type Race,
} from '@/lib/mock-data'

// ─── Inner component that reads searchParams ─────────────────────────────────
function VoteInner() {
  const router = useRouter()
  const params = useSearchParams()
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
    setTimeout(() => router.push('/results'), 1800)
  }

  // Auto-advance to next unselected race after pick
  useEffect(() => {
    if (!selections[activeRaceId]) return
    const next = races.find((r) => !selections[r.id] && r.id !== activeRaceId)
    if (next) {
      const t = setTimeout(() => switchRace(next.id), 600)
      return () => clearTimeout(t)
    }
  }, [selections, activeRaceId]) // eslint-disable-line react-hooks/exhaustive-deps

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
      <header className="bg-card px-5 pt-14 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <MapPin size={13} className="text-primary" aria-hidden="true" />
            <span className="text-xs font-semibold text-primary">{stateName}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            {completedCount}/{races.length} races completed
          </span>
        </div>
        <h1 className="text-xl font-black text-foreground leading-tight">Your Ballot</h1>

        {/* Progress bar */}
        <div className="mt-3 h-1.5 rounded-full bg-border overflow-hidden">
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
        className="bg-card border-b border-border px-5 py-3 overflow-x-auto"
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

      {/* ── Submit footer ── */}
      <div className="px-5 py-4 bg-card border-t border-border" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 4.5rem)' }}>
        <AnimatePresence>
          {submitted ? (
            <motion.div
              key="submitted"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 py-4 rounded-2xl bg-green-100 text-green-700"
            >
              <CheckCircle2 size={18} aria-hidden="true" />
              <span className="font-bold">Submitted! Redirecting to results…</span>
            </motion.div>
          ) : (
            <motion.button
              key="submit"
              type="button"
              onClick={handleSubmit}
              disabled={!allRacesSelected || submitting}
              className={cn(
                'w-full py-4 rounded-2xl font-bold text-[15px] transition-all duration-200',
                allRacesSelected
                  ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-95'
                  : 'bg-muted text-muted-foreground cursor-not-allowed',
              )}
              aria-disabled={!allRacesSelected}
            >
              {submitting
                ? 'Submitting…'
                : allRacesSelected
                ? 'Submit My Ballot'
                : `${races.length - completedCount} race${races.length - completedCount !== 1 ? 's' : ''} remaining`}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
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
        <BottomNav />
      </div>
    </PageShell>
  )
}
