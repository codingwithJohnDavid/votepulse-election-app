'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight, BarChart3, Vote, FileText, Users, User, Home } from 'lucide-react'
import PageShell from '@/components/page-shell'
import { CANDIDATES, partyColor, type Candidate } from '@/lib/mock-data'
import { useActiveState } from '@/lib/state-context'
import { useProfile } from '@/lib/profile-context'

const TILES = [
  {
    href: '/onboarding/state',
    label: 'States',
    sub: '50 available',
    Icon: MapPin,
  },
  {
    href: '/propositions',
    label: 'Propositions',
    sub: '3 in your state',
    Icon: FileText,
  },
  {
    href: '/candidates',
    label: 'Candidates',
    sub: '5 in your state',
    Icon: Users,
  },
  {
    href: '/results',
    label: 'Live Results',
    sub: '6,803 responses',
    Icon: BarChart3,
  },
  {
    href: '/vote',
    label: 'Vote',
    sub: 'Cast your ballot',
    Icon: Vote,
  },
  {
    href: '/profile',
    label: 'Profile',
    sub: 'Your account',
    Icon: User,
  },
]

export default function HomePage() {
  const { activeState } = useActiveState()
  const { profile } = useProfile()

  const initials = (() => {
    const parts = [profile?.firstName, profile?.lastName].filter(Boolean)
    if (parts.length === 2) return `${parts[0]![0]}${parts[1]![0]}`.toUpperCase()
    if (parts.length === 1) return parts[0]![0].toUpperCase()
    return null
  })()

  const firstName = profile?.firstName ?? 'there'

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
    <PageShell withNav={false}>
      <div className="flex flex-col min-h-svh bg-background">

        {/* ── Header ── */}
        <header className="px-5 pt-14 pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[28px] font-black text-foreground leading-tight">
                Hi {firstName}
              </h1>
              <p className="text-[14px] text-muted-foreground mt-0.5">
                Welcome to VotePulse.
              </p>
            </div>

            {/* Avatar */}
            <Link href="/profile" aria-label="Your profile">
              <div className="w-11 h-11 rounded-full bg-muted border border-border flex items-center justify-center mt-1 shadow-sm">
                {initials ? (
                  <span className="text-foreground font-black text-[15px] leading-none">{initials}</span>
                ) : (
                  <User size={18} className="text-muted-foreground" aria-hidden="true" />
                )}
              </div>
            </Link>
          </div>

          {/* State chip */}
          <Link
            href="/onboarding/state"
            className="mt-3 inline-flex items-center gap-1.5 bg-muted/60 border border-border rounded-full px-3 py-1.5"
          >
            <MapPin size={11} className="text-primary" aria-hidden="true" />
            <span className="text-foreground text-xs font-semibold">{activeState.name}</span>
            <ChevronRight size={10} className="text-muted-foreground" aria-hidden="true" />
          </Link>
        </header>

        {/* ── Scrollable content ── */}
        <div
          className="flex-1 overflow-y-auto px-5 pb-28 no-scrollbar"
        >

          {/* ── Your Races heading ── */}
          <div className="flex items-center justify-between mt-2 mb-3">
            <h2 className="font-black text-[17px] text-foreground">Your Races</h2>
          </div>

          {/* ── 2-column tile grid ── */}
          <div className="grid grid-cols-2 gap-3">
            {TILES.map(({ href, label, sub, Icon }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.05 * i }}
              >
                <Link
                  href={href}
                  className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl border border-border bg-[oklch(0.965_0.004_265)] hover:bg-[oklch(0.955_0.006_265)] hover:border-border/80 transition-all active:scale-[0.97] aspect-square"
                >
                  {/* Icon container — no color tint, just a slightly darker grey circle */}
                  <div className="w-12 h-12 rounded-full bg-[oklch(0.92_0.006_265)] flex items-center justify-center">
                    <Icon size={22} className="text-foreground" aria-hidden="true" />
                  </div>

                  {/* Text — centered */}
                  <div className="text-center">
                    <p className="font-bold text-[13px] text-foreground leading-tight">{label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{sub}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* ── Featured Candidates ── */}
          <div className="mt-7">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-[17px] text-foreground">Featured Candidates</h2>
              <Link href="/candidates" className="text-xs text-primary font-semibold hover:underline">
                See all
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              {loadingCandidates
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3.5 px-4 py-3.5 bg-[oklch(0.965_0.004_265)] rounded-3xl border border-border animate-pulse"
                    >
                      <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="h-3.5 bg-muted rounded-full w-2/3" />
                        <div className="h-3 bg-muted rounded-full w-1/2" />
                      </div>
                      <div className="w-10 h-6 rounded-full bg-muted shrink-0" />
                    </div>
                  ))
                : featured.map((c, i) => {
                    const { ring, bg, badge } = partyColor(c.party)
                    return (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.28, delay: 0.06 * i + 0.3 }}
                      >
                        <Link
                          href={`/candidates/${c.id}`}
                          className="flex items-center gap-3.5 px-4 py-3.5 bg-[oklch(0.965_0.004_265)] rounded-3xl border border-border hover:border-primary/20 transition-all active:scale-[0.99]"
                        >
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

                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-[14px] text-foreground leading-tight truncate">{c.name}</p>
                            <p className="text-[12px] text-muted-foreground mt-0.5 truncate">{c.office}</p>
                          </div>

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

        {/* ── Floating circular Home button ── */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] flex justify-center pointer-events-none z-50"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
        >
          <Link
            href="/home"
            className="pointer-events-auto w-14 h-14 rounded-full bg-foreground flex items-center justify-center shadow-xl active:scale-95 transition-transform"
            aria-label="Home"
          >
            <Home size={22} className="text-background" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </PageShell>
  )
}
