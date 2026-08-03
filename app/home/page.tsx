'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, ChevronRight, BarChart3, Vote, TrendingUp, Bell } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { CANDIDATES, partyColor } from '@/lib/mock-data'
import Image from 'next/image'

const FEATURED = CANDIDATES.slice(0, 4)

const QUICK_LINKS = [
  { href: '/vote?state=FL', label: 'Florida Ballot', sub: '2 races open', Icon: Vote, color: 'bg-violet-100 text-violet-700' },
  { href: '/results', label: 'Live Results', sub: '6,803 responses', Icon: BarChart3, color: 'bg-blue-100 text-blue-700' },
  { href: '/vote?state=TX', label: 'Texas Ballot', sub: '1 race open', Icon: Vote, color: 'bg-rose-100 text-rose-700' },
  { href: '/vote?state=CA', label: 'California', sub: '1 race open', Icon: TrendingUp, color: 'bg-amber-100 text-amber-700' },
]

export default function HomePage() {
  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">
        {/* ── Header ── */}
        <header
          className="px-5 pt-14 pb-6"
          style={{ background: 'linear-gradient(160deg, oklch(0.36 0.22 285) 0%, oklch(0.50 0.18 275) 100%)' }}
        >
          <div className="flex items-start justify-between mb-3">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <p className="text-white/65 text-sm font-medium">Good morning,</p>
              <h1 className="text-2xl font-black text-white tracking-tight">Voter</h1>
            </motion.div>
            <button
              className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell size={16} className="text-white" aria-hidden="true" />
            </button>
          </div>

          {/* Location chip */}
          <div className="flex items-center gap-1.5 bg-white/15 border border-white/20 rounded-2xl px-3 py-2 w-fit">
            <MapPin size={13} className="text-white/80" aria-hidden="true" />
            <span className="text-white/90 text-xs font-medium">Florida, District 7</span>
            <ChevronRight size={12} className="text-white/60" aria-hidden="true" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* ── CTA banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mx-5 mt-5 rounded-3xl overflow-hidden"
            style={{ background: 'linear-gradient(135deg, oklch(0.40 0.19 285) 0%, oklch(0.55 0.16 265) 100%)' }}
          >
            <div className="px-5 py-5">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-1">2026 Midterm Elections</p>
              <h2 className="text-xl font-black text-white mb-3 text-balance">Ready to make your voice heard?</h2>
              <Link
                href="/vote?state=FL"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold text-sm px-4 py-2.5 rounded-2xl transition-opacity hover:opacity-90"
              >
                <Vote size={15} aria-hidden="true" />
                View Your Ballot
              </Link>
            </div>
          </motion.div>

          {/* ── Quick links ── */}
          <div className="px-5 mt-6">
            <h2 className="font-black text-base text-foreground mb-3">Your Races</h2>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_LINKS.map(({ href, label, sub, Icon, color }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * i + 0.15 }}
                >
                  <Link
                    href={href}
                    className="flex flex-col gap-3 p-4 bg-card rounded-3xl border border-border hover:border-primary/30 hover:shadow-sm transition-all"
                  >
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center ${color}`}>
                      <Icon size={17} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground leading-tight">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Featured candidates ── */}
          <div className="px-5 mt-6 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-black text-base text-foreground">Featured Candidates</h2>
              <Link href="/vote?state=FL" className="text-xs text-primary font-semibold hover:underline">
                See all
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {FEATURED.map((c, i) => {
                const { ring, bg, text, badge } = partyColor(c.party)
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.06 * i + 0.2 }}
                  >
                    <Link
                      href="/vote?state=FL"
                      className="flex items-center gap-3 p-3.5 bg-card rounded-3xl border border-border hover:border-primary/30 transition-all"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl overflow-hidden shrink-0"
                        style={{ backgroundColor: bg, boxShadow: `0 0 0 2px ${ring}30` }}
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
                        <p className="font-bold text-sm text-foreground truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{c.office}</p>
                      </div>
                      <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${badge}`}>
                        {c.party.slice(0, 3).toUpperCase()}
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
