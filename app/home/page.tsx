'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight, BarChart3, Vote, FileText, Users, Bell } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { CANDIDATES, partyColor } from '@/lib/mock-data'

// Simulated geo-detected state (would come from browser geolocation + reverse geocode in production)
const GEO_STATE = { code: 'FL', name: 'Florida', district: 'District 7' }

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

// Florida candidates for "Featured Candidates"
const FEATURED = CANDIDATES.filter((c) => c.stateCode === GEO_STATE.code)

export default function HomePage() {
  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">
        {/* ── Header ── */}
        <header className="px-5 pt-14 pb-5 bg-card border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-0.5">2026 Midterm Elections</p>
              <h1 className="text-xl font-black text-foreground">VotePulse</h1>
            </div>
            <button
              className="w-9 h-9 rounded-full bg-muted flex items-center justify-center relative"
              aria-label="Notifications"
            >
              <Bell size={17} className="text-muted-foreground" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
            </button>
          </div>

          {/* Geo location chip */}
          <Link
            href="/onboarding/state"
            className="mt-3 inline-flex items-center gap-1.5 bg-brand-subtle border border-primary/20 rounded-2xl px-3 py-1.5"
          >
            <MapPin size={12} className="text-primary" aria-hidden="true" />
            <span className="text-primary text-xs font-semibold">
              {GEO_STATE.name}, {GEO_STATE.district}
            </span>
            <ChevronRight size={11} className="text-primary/60" aria-hidden="true" />
          </Link>
        </header>

        <div className="flex-1 overflow-y-auto" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}>

          {/* ── Hero CTA banner ── */}
          <div className="px-5 mt-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl overflow-hidden px-5 py-6"
              style={{ background: 'linear-gradient(135deg, oklch(0.38 0.20 285) 0%, oklch(0.52 0.17 265) 100%)' }}
            >
              <p className="text-white/65 text-[11px] font-bold uppercase tracking-widest mb-1.5">
                2026 Midterm Elections
              </p>
              <h2 className="text-[22px] font-black text-white leading-tight text-balance mb-4">
                Ready to make your voice heard?
              </h2>
              <Link
                href={`/vote?state=${GEO_STATE.code}`}
                className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-5 py-2.5 rounded-2xl hover:opacity-90 transition-opacity"
              >
                <Vote size={15} aria-hidden="true" />
                View Your Ballot
              </Link>
            </motion.div>
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
              {FEATURED.map((c, i) => {
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
              })}
            </div>
          </div>

        </div>

        <BottomNav />
      </div>
    </PageShell>
  )
}
