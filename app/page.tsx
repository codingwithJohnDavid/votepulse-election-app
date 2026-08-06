'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, BarChart3, Users, Vote, Flame, Newspaper, MapPin, ChevronRight } from 'lucide-react'
import PageShell from '@/components/page-shell'

const FEATURE_TILES = [
  {
    Icon: Vote,
    label: 'Cast Your Vote',
    sub: 'Your ballot, your voice',
    iconBg: 'oklch(0.94 0.06 20)',
    iconColor: 'oklch(0.46 0.18 20)',
    glow: 'rgba(220, 70, 40, 0.18)',
    border: 'rgba(220, 70, 40, 0.30)',
  },
  {
    Icon: Users,
    label: 'Candidates',
    sub: 'Know who you elect',
    iconBg: 'oklch(0.92 0.06 245)',
    iconColor: 'oklch(0.40 0.15 245)',
    glow: 'rgba(56, 120, 220, 0.18)',
    border: 'rgba(56, 120, 220, 0.30)',
  },
  {
    Icon: BarChart3,
    label: 'Live Results',
    sub: 'Real-time community data',
    iconBg: 'oklch(0.93 0.06 300)',
    iconColor: 'oklch(0.42 0.14 300)',
    glow: 'rgba(148, 60, 210, 0.18)',
    border: 'rgba(148, 60, 210, 0.30)',
  },
  {
    Icon: Newspaper,
    label: 'AI Briefings',
    sub: 'Politics explained clearly',
    iconBg: 'oklch(0.93 0.05 200)',
    iconColor: 'oklch(0.40 0.14 200)',
    glow: 'rgba(20, 160, 180, 0.18)',
    border: 'rgba(20, 160, 180, 0.30)',
  },
  {
    Icon: Flame,
    label: 'Controversies',
    sub: 'The unfiltered truth',
    iconBg: 'oklch(0.94 0.06 38)',
    iconColor: 'oklch(0.46 0.17 38)',
    glow: 'rgba(225, 110, 20, 0.18)',
    border: 'rgba(225, 110, 20, 0.30)',
  },
  {
    Icon: Shield,
    label: 'Privacy First',
    sub: 'Your data stays yours',
    iconBg: 'oklch(0.92 0.07 160)',
    iconColor: 'oklch(0.38 0.13 160)',
    glow: 'rgba(32, 178, 120, 0.18)',
    border: 'rgba(32, 178, 120, 0.30)',
  },
]

const STATS = [
  { value: '50', label: 'States' },
  { value: '6.8K+', label: 'Votes cast' },
  { value: '100%', label: 'Anonymous' },
]

export default function LandingPage() {
  return (
    <PageShell withNav={false}>
      <div className="flex flex-col min-h-svh bg-background">

        {/* ── Hero ── */}
        <div
          className="relative flex flex-col items-center justify-center px-6 pt-20 pb-20 overflow-hidden"
          style={{
            background: 'linear-gradient(165deg, oklch(0.36 0.22 285) 0%, oklch(0.46 0.2 275) 55%, oklch(0.54 0.16 260) 100%)',
          }}
        >
          {/* Soft radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.10) 0%, transparent 80%)',
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center z-10 w-full"
          >
            {/* Logo mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-20 h-20 rounded-[22px] flex items-center justify-center mb-6 shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1.5px solid rgba(255,255,255,0.28)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span className="text-[32px] font-black text-white tracking-tight select-none">VP</span>
            </motion.div>

            <h1 className="text-[42px] font-black text-white tracking-tight text-balance leading-[1.1] mb-3">
              VotePulse
            </h1>
            <p className="text-white/70 text-[15px] leading-relaxed text-balance max-w-[260px] mb-8">
              Your voice. Your candidates. Your community&apos;s pulse — all in one place.
            </p>

            {/* Stat row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-0 rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1.5px solid rgba(255,255,255,0.20)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {STATS.map(({ value, label }, i) => (
                <div
                  key={label}
                  className="flex flex-col items-center px-5 py-3"
                  style={{
                    borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  }}
                >
                  <span className="text-white font-black text-[18px] leading-tight">{value}</span>
                  <span className="text-white/60 text-[10px] font-medium mt-0.5 uppercase tracking-wide">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* ── White section ── */}
        <div className="flex-1 bg-background px-5 pt-8 pb-12">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-col items-center text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 bg-muted/60 border border-border rounded-full px-3 py-1 mb-3">
              <MapPin size={10} className="text-primary" aria-hidden="true" />
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Available in all 50 states</span>
            </div>
            <h2 className="text-[22px] font-black text-foreground text-balance leading-tight">
              Everything you need<br />to vote with confidence
            </h2>
          </motion.div>

          {/* Feature tile grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {FEATURE_TILES.map(({ Icon, label, sub, iconBg, iconColor, glow, border }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i + 0.2 }}
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
              className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-[15px] transition-all active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, oklch(0.40 0.20 280), oklch(0.50 0.18 265))',
                color: '#ffffff',
                boxShadow: '0 4px 20px rgba(80, 60, 200, 0.30)',
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
