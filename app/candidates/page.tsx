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

// Party → card glow/border colors matching dashboard style
const PARTY_CARD: Record<string, { glow: string; border: string; iconBg: string; iconColor: string }> = {
  Democrat:    { glow: 'rgba(56, 120, 220, 0.22)',  border: 'rgba(56, 120, 220, 0.30)',  iconBg: 'rgba(219, 234, 254, 0.9)', iconColor: 'rgba(29, 78, 216, 0.9)' },
  Republican:  { glow: 'rgba(220, 60, 60, 0.22)',   border: 'rgba(220, 60, 60, 0.30)',   iconBg: 'rgba(254, 226, 226, 0.9)', iconColor: 'rgba(185, 28, 28, 0.9)' },
  Independent: { glow: 'rgba(148, 60, 210, 0.22)',  border: 'rgba(148, 60, 210, 0.30)',  iconBg: 'rgba(243, 232, 255, 0.9)', iconColor: 'rgba(109, 40, 217, 0.9)' },
}

function CandidateSkeleton({ wide }: { wide?: boolean }) {
  return (
    <div
      className={`flex animate-pulse rounded-3xl p-5 ${wide ? 'flex-row items-center gap-4' : 'flex-col items-center justify-center gap-3 aspect-square'}`}
      style={{ background: '#ffffff', border: '1.5px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
      <div className={`flex flex-col gap-2 ${wide ? 'flex-1' : 'items-center w-full'}`}>
        <div className="h-3.5 bg-muted rounded-full w-2/3" />
        <div className="h-3 bg-muted rounded-full w-1/2" />
        <div className="h-5 bg-muted rounded-full w-12 mt-1" />
      </div>
    </div>
  )
}

export default function CandidatesPage() {
  const { activeState } = useActiveState()
  const [query, setQuery] = useState('')
  const [partyFilter, setPartyFilter] = useState<Party | 'All'>('All')

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
      <div className="flex flex-col min-h-svh" style={{ background: '#ffffff' }}>

        {/* ── Header ── */}
        <header className="px-5 pt-14 pb-4 flex flex-col items-center text-center" style={{ background: '#ffffff' }}>
          <div className="w-full flex items-center mb-4">
            <Link
              href="/home"
              className="flex items-center gap-1 text-primary font-semibold text-sm -ml-1 px-1 py-0.5 rounded-xl hover:bg-primary/10 transition-colors"
              aria-label="Back to home"
            >
              <ChevronLeft size={16} aria-hidden="true" />
              Home
            </Link>
          </div>

          <h1 className="text-[28px] font-black text-foreground leading-tight">Candidates</h1>
          <p className="text-[14px] text-muted-foreground mt-0.5">{stateName}</p>

          {!isFallback && lastUpdated && (
            <span className="mt-2 text-[10px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
              Live · FEC
            </span>
          )}
        </header>

        {/* ── Search + filters ── */}
        <div className="px-5 pt-2 pb-4 flex flex-col gap-3">
          {/* Search bar */}
          <div
            className="flex items-center gap-3 px-4 rounded-full h-12"
            style={{ background: '#ffffff', border: '1.5px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}
          >
            <Search size={15} className="text-muted-foreground shrink-0" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by name or office..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          {/* Party filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <SlidersHorizontal size={14} className="text-muted-foreground shrink-0" aria-hidden="true" />
            {PARTY_FILTERS.map(({ label, value }) => {
              const active = partyFilter === value
              return (
                <button
                  key={value}
                  onClick={() => setPartyFilter(value)}
                  className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-all"
                  style={active ? {
                    background: 'rgba(56, 120, 220, 1)',
                    color: '#ffffff',
                    boxShadow: '0 2px 10px rgba(56,120,220,0.30)',
                  } : {
                    background: '#ffffff',
                    color: 'rgba(0,0,0,0.5)',
                    border: '1.5px solid rgba(0,0,0,0.08)',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Candidate list ── */}
        <div
          className="flex-1 overflow-y-auto px-5 pb-8"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}
        >
          {/* Count line */}
          {!loading && (
            <p className="text-[13px] font-black text-foreground mb-3">
              Your Dashboard{' '}
              <span className="font-medium text-muted-foreground">
                · {filtered.length} candidate{filtered.length !== 1 ? 's' : ''}
              </span>
            </p>
          )}

          {loading ? (
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={i === 5 ? 'col-span-2' : ''}>
                  <CandidateSkeleton wide={i === 5} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-muted-foreground font-medium text-sm">No candidates found</p>
              <p className="text-muted-foreground text-xs mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((c, i) => {
                const isOddLast = filtered.length % 2 !== 0 && i === filtered.length - 1
                const { badge } = partyColor(c.party)
                const pc = PARTY_CARD[c.party] ?? PARTY_CARD.Independent
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className={isOddLast ? 'col-span-2' : ''}
                  >
                    <Link
                      href={`/candidates/${c.id}`}
                      className={`flex gap-3 p-4 rounded-3xl transition-all active:scale-[0.97] h-full ${isOddLast ? 'flex-row items-center' : 'flex-col items-center justify-center min-h-[160px]'}`}
                      style={{
                        background: '#ffffff',
                        border: `1.5px solid ${pc.border}`,
                        boxShadow: `0 4px 16px ${pc.glow}, 0 1px 4px rgba(0,0,0,0.04)`,
                      }}
                    >
                      {/* Avatar */}
                      <div
                        className="w-12 h-12 rounded-full overflow-hidden shrink-0"
                        style={{ backgroundColor: pc.iconBg, boxShadow: `0 0 0 2px ${pc.border}` }}
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

                      {/* Name + office + badge */}
                      <div className={`min-w-0 flex flex-col ${isOddLast ? 'flex-1' : 'items-center text-center'}`}>
                        <p className="font-bold text-[13px] text-foreground leading-tight line-clamp-2">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight">
                          {c.office}{c.district ? ` · ${c.district}` : ''}
                        </p>
                        <span className={`mt-2 self-start text-[10px] font-black px-2 py-0.5 rounded-full ${badge} ${isOddLast ? '' : 'self-center'}`}>
                          {c.party === 'Democrat' ? 'DEM' : c.party === 'Republican' ? 'REP' : 'IND'}
                        </span>
                      </div>
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
