'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight, BarChart3, Vote, FileText, Users, User } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { CANDIDATES, partyColor, type Candidate } from '@/lib/mock-data'
import { useActiveState } from '@/lib/state-context'
import { useProfile } from '@/lib/profile-context'

const SHELL_CARDS = [
  {
    href: '/onboarding/state',
    label: 'States',
    sub: '50 states available',
    Icon: MapPin,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    href: '/propositions',
    label: 'Propositions',
    sub: '3 in your state',
    Icon: FileText,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    href: '/candidates',
    label: 'Candidates',
    sub: '5 in your state',
    Icon: Users,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    href: '/results',
    label: 'Live Results',
    sub: '6,803 responses',
    Icon: BarChart3,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
]

// Skeleton for candidate rows
function CandidateRowSkeleton() {
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

export default function HomePage() {
  const { activeState } = useActiveState()
  const { profile } = useProfile()

  // Derive initials from profile or fall back to null
  const initials = (() => {
    const parts = [profile?.firstName, profile?.lastName].filter(Boolean)
    if (parts.length === 2) return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase()
    if (parts.length === 1) return parts[0]![0].toUpperCase()
    return null
  })()

  const mockFeatured = CANDIDATES.filter((c) => c.stateCode === activeState.code).slice(0, 4)
  const [featured, setFeatured] = useState<Candidate[]>(mockFeatured)
  const [loadingCandidates, setLoadingCandidates] = useState(true)

  useEffect(() => {
    setFeatured(CANDIDATES.filter((c) => c.stateCode === activeState.code).slice(0, 4))
    setLoadingCandidates(true)
    async function fetchFeatured() {
      try {
        const res = await fetch(`/api/fec-candidates?state=${activeState.code}`)
        const data = await res.json()
        if (data.candidates?.length > 0) {
          const senate = data.candidates.filter((c: Candidate) => c.office === 'U.S. Senate')
          const house = data.candidates.filter((c: Candidate) => c.office === 'U.S. House of Representatives')
          setFeatured([...senate, ...house].slice(0, 4))
        }
      } catch {
        // silently keep mock data
      } finally {
        setLoadingCandidates(false)
      }
    }
    fetchFeatured()
  }, [activeState.code])

  return (
    <PageShell>
      <div
        className="flex flex-col min-h-svh"
        style={{ background: 'linear-gradient(180deg, oklch(0.56 0.29 300) 0%, oklch(0.72 0.18 295) 18%, oklch(0.87 0.07 285) 36%, oklch(0.980 0.005 260) 52%, oklch(0.980 0.005 260) 100%)' }}
      >
        {/* ── Header — Apple Health style ── */}
        <header className="px-5 pt-14 pb-6 bg-transparent">
          <div className="flex items-start justify-between">
            {/* Title block */}
            <div>
              <p className="text-white/60 text-[11px] font-semibold uppercase tracking-widest mb-1">
                2026 Midterms
              </p>
              <h1 className="text-[34px] font-black text-white leading-none tracking-tight">
                VotePulse
              </h1>
              {/* State chip */}
              <Link
                href="/onboarding/state"
                className="mt-3 inline-flex items-center gap-1.5 bg-white/20 border border-white/30 rounded-2xl px-3 py-1.5"
              >
                <MapPin size={11} className="text-white/80" aria-hidden="true" />
                <span className="text-white text-xs font-semibold">{activeState.name}</span>
                <ChevronRight size={10} className="text-white/50" aria-hidden="true" />
              </Link>
            </div>

            {/* Avatar */}
            <Link href="/profile" aria-label="Your profile">
              <div className="w-11 h-11 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mt-1">
                {initials ? (
                  <span className="text-white font-black text-[15px] leading-none">{initials}</span>
                ) : (
                  <User size={18} className="text-white/80" aria-hidden="true" />
                )}
              </div>
            </Link>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}>

          {/* ── Ballot CTA strip ── */}
          <div className="px-5 mt-5">
            <Link
              href={`/vote?state=${activeState.code}`}
              className="flex items-center justify-between px-5 py-4 bg-card rounded-3xl border border-border hover:border-primary/30 hover:shadow-sm transition-all active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-brand-subtle flex items-center justify-center">
                  <Vote size={17} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-[14px] text-foreground leading-tight">View Your Ballot</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">See all races for {activeState.name}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" aria-hidden="true" />
            </Link>
          </div>

          {/* ── Shell cards 2×2 ── */}
          <div className="px-5 mt-6">
            <h2 className="font-black text-[15px] text-foreground mb-3">Your Races</h2>
            <div className="grid grid-cols-2 gap-3">
              {SHELL_CARDS.map(({ href, label, sub, Icon, iconBg, iconColor }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.07 * i + 0.1 }}
                >
                  <Link
                    href={href}
                    className="flex flex-col gap-3 p-4 bg-card rounded-3xl border border-border hover:border-primary/30 hover:shadow-sm transition-all active:scale-[0.98]"
                  >
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${iconBg}`}>
                      <Icon size={18} className={iconColor} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-[13px] text-foreground leading-tight">{label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Featured Candidates ── */}
          <div className="px-5 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-[15px] text-foreground">Featured Candidates</h2>
              <Link
                href="/candidates"
                className="text-xs text-primary font-semibold hover:underline"
              >
                See all
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {loadingCandidates
                ? Array.from({ length: 4 }).map((_, i) => <CandidateRowSkeleton key={i} />)
                : featured.map((c, i) => {
                    const { ring, bg, badge } = partyColor(c.party)
                    return (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.06 * i + 0.25 }}
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
                            <p className="font-bold text-[14px] text-foreground leading-tight truncate">{c.name}</p>
                            <p className="text-[12px] text-muted-foreground mt-0.5 truncate">{c.office}</p>
                          </div>

                          {/* Party badge */}
                          <span className={`shrink-0 text-[11px] font-black px-2.5 py-1 rounded-full ${badge}`}>
                            {c.party === 'Democrat' ? 'DEM' : c.party === 'Republican' ? 'REP' : 'IND'}
                          </span>
                        </Link>
                      </motion.div>
                    )
                  })
              }
            </div>
          </div>

        </div>

        <BottomNav />
      </div>
    </PageShell>
  )
}
