'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Search, SlidersHorizontal, RefreshCw } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { CANDIDATES, US_STATES, partyColor, type Party, type Candidate } from '@/lib/mock-data'

const PARTY_FILTERS: { label: string; value: Party | 'All' }[] = [
  { label: 'All', value: 'All' },
  { label: 'DEM', value: 'Democrat' },
  { label: 'REP', value: 'Republican' },
  { label: 'IND', value: 'Independent' },
]

const AVAILABLE_STATES = ['FL', 'TX', 'CA', 'NY']

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
  const [query, setQuery] = useState('')
  const [partyFilter, setPartyFilter] = useState<Party | 'All'>('All')
  const [stateFilter, setStateFilter] = useState('FL')

  // Live FEC data state
  const [liveCandidates, setLiveCandidates] = useState<Candidate[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [isFallback, setIsFallback] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  const fetchLiveData = useCallback(async (state: string) => {
    setLoading(true)
    setLiveCandidates(null)
    try {
      const res = await fetch(`/api/fec-candidates?state=${state}`)
      const data = await res.json()
      if (data.candidates?.length > 0) {
        setLiveCandidates(data.candidates)
        setIsFallback(false)
        setLastUpdated(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }))
      } else {
        // FEC returned nothing — fall back to mock data
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
    fetchLiveData(stateFilter)
  }, [stateFilter, fetchLiveData])

  // Use live data if available, otherwise mock
  const sourceData = liveCandidates ?? CANDIDATES

  const filtered = sourceData.filter((c) => {
    const matchState = c.stateCode === stateFilter
    const matchParty = partyFilter === 'All' || c.party === partyFilter
    const matchQuery =
      query.trim() === '' ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.office.toLowerCase().includes(query.toLowerCase())
    return matchState && matchParty && matchQuery
  })

  const stateName = US_STATES.find((s) => s.code === stateFilter)?.name ?? stateFilter

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
            {/* Live / fallback badge */}
            <div className="flex flex-col items-end gap-1 mt-0.5">
              <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${
                isFallback
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {isFallback ? 'Sample Data' : 'Live · FEC'}
              </span>
              {lastUpdated && !isFallback && (
                <span className="text-[10px] text-muted-foreground">Updated {lastUpdated}</span>
              )}
            </div>
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

          {/* State + party filter row */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" aria-hidden="true" />
            {AVAILABLE_STATES.map((code) => {
              const active = stateFilter === code
              return (
                <button
                  key={code}
                  onClick={() => setStateFilter(code)}
                  className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                    active
                      ? 'bg-primary text-white'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {code}
                </button>
              )
            })}
            <div className="w-px h-4 bg-border shrink-0" />
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

        {/* ── Fallback notice ── */}
        <AnimatePresence>
          {isFallback && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mx-5 mt-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5"
            >
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-800">FEC data unavailable</p>
                <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                  Showing sample candidates. Live FEC data will appear once available for 2026 races.
                </p>
              </div>
              <button
                onClick={() => fetchLiveData(stateFilter)}
                className="shrink-0 mt-0.5 text-amber-700 hover:text-amber-900 transition-colors"
                aria-label="Retry FEC data fetch"
              >
                <RefreshCw size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

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

        <BottomNav />
      </div>
    </PageShell>
  )
}
