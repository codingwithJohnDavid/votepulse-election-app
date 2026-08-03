'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronUp, Shield, BarChart3, Users } from 'lucide-react'
import PageShell from '@/components/page-shell'

const FEATURES = [
  {
    Icon: Shield,
    title: 'Your Privacy First',
    desc: 'All data is anonymized. Your identity is never tied to your selections.',
  },
  {
    Icon: BarChart3,
    title: 'Real-Time Results',
    desc: 'See how your community votes across demographics instantly.',
  },
  {
    Icon: Users,
    title: 'Candidate Intel',
    desc: 'Explore candidate backgrounds, issues, and track records — all in one place.',
  },
]

export default function LandingPage() {
  return (
    <PageShell withNav={false}>
      <div className="flex flex-col min-h-svh">
        {/* Hero */}
        <div
          className="relative flex flex-col items-center justify-center flex-1 px-6 pt-16 pb-16 overflow-hidden"
          style={{
            background:
              'linear-gradient(165deg, oklch(0.36 0.22 285) 0%, oklch(0.46 0.2 275) 55%, oklch(0.54 0.16 260) 100%)',
          }}
        >
          {/* Soft radial glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            style={{
              width: 480,
              height: 480,
              background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="flex flex-col items-center text-center z-10"
          >
            <div className="w-20 h-20 rounded-3xl bg-white/15 border border-white/25 flex items-center justify-center mb-6 shadow-xl">
              <span className="text-4xl font-black text-white tracking-tight select-none">VP</span>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tight text-balance mb-3 leading-tight">
              VotePulse
            </h1>
            <p className="text-white/75 text-[15px] leading-relaxed text-balance max-w-[280px]">
              Your voice. Your candidates. Your community&apos;s pulse — all in one place.
            </p>
          </motion.div>

          {/* Animated bounce cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-full bg-white/20 border border-white/30 flex items-center justify-center"
              aria-hidden="true"
            >
              <ChevronUp size={20} className="text-white" />
            </motion.div>
            <span className="text-white/50 text-xs tracking-wide">Scroll to start</span>
          </motion.div>
        </div>

        {/* Lower card section */}
        <div className="bg-card px-6 pt-8 pb-10">
          <div className="flex flex-col gap-5 mb-8">
            {FEATURES.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.05 * i + 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-brand-subtle flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground mb-0.5">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/auth/signup"
              className="block w-full text-center py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-[15px] transition-opacity hover:opacity-90 active:scale-95"
            >
              Create Account
            </Link>
            <Link
              href="/auth/signin"
              className="block w-full text-center py-4 rounded-2xl border border-border text-foreground font-semibold text-[15px] transition-colors hover:bg-muted active:scale-95"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground leading-relaxed">
            By continuing you agree to our{' '}
            <span className="text-primary font-medium cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-primary font-medium cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
