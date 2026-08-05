'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, Search, SlidersHorizontal } from 'lucide-react'
import FloatingHomeButton from '@/components/floating-home-button'
import PageShell from '@/components/page-shell'
import { CANDIDATES, US_STATES, partyColor, type Party, type Candidate } from '@/lib/mock-data'
import { useActiveState } from '@/lib/state-context'

const PARTY_FILTERS: { label: string; value: Party | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'DEM', value: 'Democrat' },
  { label: 'REP', value: 'Republican' },
  { label: 'IND', value: 'Independent' },
]

// Skeleton row component
function CandidateSkeleton() {
  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5 bg-card rounded-3xl border border-border animate-pulse">
      <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <div className="h-3.5 bg-muted rounded-full w-2/3" />
        <div className="h-3 bg-muted rounded-full w-1/2" />
      </div>
      <div className="w-10 h-6 rounded-full bg-muted shrink-0" />
    </div>
  )
}

export default function CandidatesPage() {
  const { activeState } = useActiveState()
  const [query, setQuery] = useState('')
  const [partyFilter, setPartyFilter] = useState<Party | 'All'>('All')

  // Live FEC data state
  const [liveCandidates, setLiveCandidates] = useState<Candidate[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [isFallback, setIsFallback] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchLiveData = useCallback(async (stateCode: string) => {
    setLoading(true)
    setLiveCandidates(null)
    try {
      const res = await fetch(`/api/fec-candidates?state=${stateCode}`)
      const data = await res.json()
      if (data.candidates?.length > 0) {
        setLiveCandidates(data.candidates)
        setIsFallback(false)
        setLastUpdated(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
      } else {
        setLiveCandidates(null)
        setIsFallback(true)
      }
    } catch {
      setLiveCandidates(null)
      setIsFallback(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLiveData(activeState.code)
  }, [activeState.code, fetchLiveData])

  // Use live data if available, otherwise mock
  const sourceData = liveCandidates ?? CANDIDATES

  const filtered = sourceData.filter((c) => {
    const matchState = c.stateCode === activeState.code
    const matchParty = partyFilter === 'All' || c.party === partyFilter
    const matchQuery =
      query.trim() === '' ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.office.toLowerCase().includes(query.toLowerCase())
    return matchState && matchParty && matchQuery
  })

  const stateName = US_STATES.find((s) => s.code === activeState.code)?.name ?? activeState.code

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">
        {/* ── Header ── */}
        <header className="bg-card px-5 pt-14 pb-4 border-b border-border">
          <div className="flex items-center gap-2 mb-3">
            <Link
              href="/home"
              className="flex items-center gap-1 text-primary font-semibold text-sm -ml-1 px-1 py-0.5 rounded-xl hover:bg-brand-subtle transition-colors"
              aria-label="Back to home"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Home
            </Link>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-black text-foreground">Candidates</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {stateName}
                {!loading && ` · ${filtered.length} candidate${filtered.length !== 1 ? 's' : ''}`}
              </p>
            </div>
            {/* Only show Live badge when FEC data actually loaded */}
            {!isFallback && lastUpdated && (
              <span className="text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                Live · FEC
              </span>
            )}
          </div>
        </header>

        {/* ── Search + filters ── */}
        <div className="bg-card px-5 pt-3 pb-4 border-b border-border flex flex-col gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by name or office..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-muted rounded-2xl text-sm text-foreground placeholder:text-muted-foreground border border-transparent focus:border-primary/40 focus:outline-none transition-colors"
            />
          </div>

          {/* Party filter row */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" aria-hidden="true" />
            {PARTY_FILTERS.map(({ label, value }) => {
              const active = partyFilter === value
              return (
                <button
                  key={value}
                  onClick={() => setPartyFilter(value)}
                  className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                    active
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Candidate list ── */}
        <div
          className="flex-1 overflow-y-auto px-5 py-4"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}
        >
          {loading ? (
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <CandidateSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground font-medium text-sm">No candidates found</p>
              <p className="text-muted-foreground text-xs mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {filtered.map((c, i) => {
                const { ring, bg, badge } = partyColor(c.party)
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                  >
                    <Link
                      href={`/candidates/${c.id}`}
                      className="flex items-center gap-3.5 px-4 py-3.5 bg-card rounded-3xl border border-border hover:border-primary/30 transition-all active:scale-[0.99]"
                    >
                      {/* Avatar */}
                      <div
                        className="w-12 h-12 rounded-full overflow-hidden shrink-0"
                        style={{ backgroundColor: bg, boxShadow: `0 0 0 2.5px ${ring}40` }}
                      >
                        <Image
                          src={c.imageUrl}
                          alt={`Photo of ${c.name}`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Name + office */}
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[14px] text-foreground leading-tight">{c.name}</p>
                        <p className="text-[12px] text-muted-foreground mt-0.5 truncate">
                          {c.office}{c.district ? ` · ${c.district}` : ''}
                        </p>
                      </div>

                      {/* Party badge */}
                      <span className={`shrink-0 text-[11px] font-black px-2.5 py-1 rounded-full ${badge}`}>
                        {c.party === 'Democrat' ? 'DEM' : c.party === 'Republican' ? 'REP' : 'IND'}
                      </span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>

        <FloatingHomeButton />
      </div>
    </PageShell>
  )
}
