'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Shield, BarChart3, Users, Vote, Flame, Newspaper, MapPin, ChevronRight, FileText } from 'lucide-react'

import PageShell from '@/components/page-shell'

const FEATURE_TILES = [
  {
    Icon: Vote,
    label: 'Cast Your Vote',
    sub: 'Your ballot, your voice',
    iconBg: 'oklch(0.94 0.06 20)',
    iconColor: 'oklch(0.46 0.18 20)',
    glow: 'rgba(220, 70, 40, 0.28)',
    border: 'rgba(220, 70, 40, 0.35)',
  },
  {
    Icon: Users,
    label: 'Candidates',
    sub: 'Know who you elect',
    iconBg: 'oklch(0.92 0.06 245)',
    iconColor: 'oklch(0.40 0.15 245)',
    glow: 'rgba(56, 120, 220, 0.28)',
    border: 'rgba(56, 120, 220, 0.35)',
  },
  {
    Icon: BarChart3,
    label: 'Live Results',
    sub: 'Real-time community data',
    iconBg: 'oklch(0.93 0.06 300)',
    iconColor: 'oklch(0.42 0.14 300)',
    glow: 'rgba(148, 60, 210, 0.28)',
    border: 'rgba(148, 60, 210, 0.35)',
  },
  {
    Icon: Newspaper,
    label: 'AI Briefings',
    sub: 'Politics explained clearly',
    iconBg: 'oklch(0.93 0.05 200)',
    iconColor: 'oklch(0.40 0.14 200)',
    glow: 'rgba(20, 160, 180, 0.28)',
    border: 'rgba(20, 160, 180, 0.35)',
  },
  {
    Icon: Flame,
    label: 'Controversies',
    sub: 'The unfiltered truth',
    iconBg: 'oklch(0.94 0.06 38)',
    iconColor: 'oklch(0.46 0.17 38)',
    glow: 'rgba(225, 110, 20, 0.28)',
    border: 'rgba(225, 110, 20, 0.35)',
  },
  {
    Icon: FileText,
    label: 'Propositions',
    sub: 'Plain English breakdown',
    iconBg: 'oklch(0.94 0.06 60)',
    iconColor: 'oklch(0.45 0.14 60)',
    glow: 'rgba(210, 140, 30, 0.28)',
    border: 'rgba(210, 140, 30, 0.35)',
  },
  {
    Icon: MapPin,
    label: '50 States',
    sub: 'Your state, your races',
    iconBg: 'oklch(0.92 0.07 160)',
    iconColor: 'oklch(0.38 0.13 160)',
    glow: 'rgba(32, 178, 120, 0.28)',
    border: 'rgba(32, 178, 120, 0.35)',
  },
  {
    Icon: Shield,
    label: 'Privacy First',
    sub: 'Your data stays yours',
    iconBg: 'oklch(0.93 0.05 0)',
    iconColor: 'oklch(0.48 0.18 0)',
    glow: 'rgba(220, 60, 100, 0.28)',
    border: 'rgba(220, 60, 100, 0.35)',
  },
]

const STATS = [
  { value: '50', label: 'States' },
  { value: '6.8K+', label: 'Votes cast' },
  { value: '100%', label: 'Anonymous' },
]

export default function LandingPage() {
  return (
    <PageShell withNav={false} showLogo={false}>
      <div className="flex flex-col min-h-svh bg-background">

        {/* ── Header ── */}
        <header className="px-5 pt-14 pb-4 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="mb-2"
          >
            <Image
              src="/images/logo.png"
              alt="VoterAI logo"
              width={140}
              height={140}
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <h1 className="text-[28px] font-black text-foreground leading-tight">
              VoterAI
            </h1>
            <p className="text-[14px] text-muted-foreground mt-1 text-balance max-w-[240px] mx-auto">
              Your personal political analyst, powered by AI.
            </p>
          </motion.div>

          {/* Stats chip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="mt-4 flex items-center rounded-2xl overflow-hidden border border-border bg-muted/40"
          >
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className="flex flex-col items-center px-5 py-2.5"
                style={{
                  borderRight: i < STATS.length - 1 ? '1px solid var(--border)' : 'none',
                }}
              >
                <span className="text-foreground font-black text-[17px] leading-tight">{value}</span>
                <span className="text-muted-foreground text-[10px] font-medium mt-0.5 uppercase tracking-wide">{label}</span>
              </div>
            ))}
          </motion.div>
        </header>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto px-5 pb-10 no-scrollbar">

          {/* Section label */}
          <div className="flex items-center justify-between mt-2 mb-3">
            <h2 className="font-black text-[17px] text-foreground">What&apos;s inside</h2>
          </div>

          {/* Feature tile grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {FEATURE_TILES.map(({ Icon, label, sub, iconBg, iconColor, glow, border }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.05 * i + 0.2 }}
                className="flex flex-col items-center justify-center gap-3 p-5 rounded-3xl aspect-square"
                style={{
                  background: '#ffffff',
                  border: `1.5px solid ${border}`,
                  boxShadow: `0 4px 20px ${glow}, 0 1px 4px rgba(0,0,0,0.04)`,
                }}
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
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex flex-col gap-3"
          >
            <Link
              href="/auth/signup"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-[15px] text-white transition-all active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, oklch(0.40 0.20 280), oklch(0.50 0.18 265))',
                boxShadow: '0 4px 20px rgba(80, 60, 200, 0.28)',
              }}
            >
              Get Started Free
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/auth/signin"
              className="flex items-center justify-center w-full py-4 rounded-2xl border border-border text-foreground font-semibold text-[15px] transition-all active:scale-[0.98] bg-background hover:bg-muted"
            >
              Sign In
            </Link>
          </motion.div>

          <p className="mt-5 text-center text-[11px] text-muted-foreground leading-relaxed">
            By continuing you agree to our{' '}
            <span className="text-primary font-medium cursor-pointer">Terms of Service</span>
            {' '}and{' '}
            <span className="text-primary font-medium cursor-pointer">Privacy Policy</span>.
          </p>
        </div>

      </div>
    </PageShell>
  )
}
