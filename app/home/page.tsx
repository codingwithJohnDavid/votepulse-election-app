'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, ChevronRight, BarChart3, Vote, FileText, Users, User } from 'lucide-react'
import PageShell from '@/components/page-shell'
import FloatingHomeButton from '@/components/floating-home-button'
import { useActiveState } from '@/lib/state-context'
import { useProfile } from '@/lib/profile-context'

const TILES = [
  {
    href: '/onboarding/state',
    label: 'States',
    sub: '50 available',
    Icon: MapPin,
    iconBg: 'oklch(0.92 0.07 160)',   // teal-green
    iconColor: 'oklch(0.38 0.13 160)',
  },
  {
    href: '/propositions',
    label: 'Propositions',
    sub: '3 in your state',
    Icon: FileText,
    iconBg: 'oklch(0.94 0.06 60)',    // warm amber
    iconColor: 'oklch(0.45 0.14 60)',
  },
  {
    href: '/candidates',
    label: 'Candidates',
    sub: '5 in your state',
    Icon: Users,
    iconBg: 'oklch(0.92 0.06 245)',   // blue
    iconColor: 'oklch(0.40 0.15 245)',
  },
  {
    href: '/results',
    label: 'Live Results',
    sub: '6,803 responses',
    Icon: BarChart3,
    iconBg: 'oklch(0.93 0.06 300)',   // purple
    iconColor: 'oklch(0.42 0.14 300)',
  },
  {
    href: '/vote',
    label: 'Vote',
    sub: 'Cast your ballot',
    Icon: Vote,
    iconBg: 'oklch(0.94 0.06 20)',    // red-orange
    iconColor: 'oklch(0.46 0.18 20)',
  },
  {
    href: '/profile',
    label: 'Profile',
    sub: 'Your account',
    Icon: User,
    iconBg: 'oklch(0.93 0.05 285)',   // violet (brand)
    iconColor: 'oklch(0.42 0.19 285)',
  },
]

export default function HomePage() {
  const { activeState } = useActiveState()
  const { profile } = useProfile()

  const firstName = profile?.firstName ?? 'there'

  return (
    <PageShell withNav={false}>
      <div className="flex flex-col min-h-svh bg-background">

        {/* ── Header ── */}
        <header className="px-5 pt-14 pb-4 flex flex-col items-center text-center">
          <h1 className="text-[28px] font-black text-foreground leading-tight">
            Hi, {firstName}
          </h1>
          <p className="text-[14px] text-muted-foreground mt-0.5">
            Welcome to VotePulse.
          </p>

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
            <h2 className="font-black text-[17px] text-foreground">Your Dashboard</h2>
          </div>

          {/* ── 2-column tile grid ── */}
          <div className="grid grid-cols-2 gap-3">
            {TILES.map(({ href, label, sub, Icon, iconBg, iconColor }, i) => (
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
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: iconBg }}
                  >
                    <Icon size={22} style={{ color: iconColor }} aria-hidden="true" />
                  </div>

                  <div className="text-center">
                    <p className="font-bold text-[13px] text-foreground leading-tight">{label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{sub}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>


        </div>

        <FloatingHomeButton />

      </div>
    </PageShell>
  )
}
