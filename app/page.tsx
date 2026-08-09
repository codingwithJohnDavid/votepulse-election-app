'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Vote, Users, FileText, BarChart3, ChevronRight } from 'lucide-react'

import PageShell from '@/components/page-shell'

const FEATURES = [
  {
    Icon: Vote,
    title: 'Cast your vote, then compare',
    desc: 'Record your pick privately, then see how it stacks up against live results and what the media is reporting.',
  },
  {
    Icon: Users,
    title: 'Know every candidate',
    desc: 'Look up any candidate, in any state or race, and get a clear read on their record and positions.',
  },
  {
    Icon: FileText,
    title: 'Propositions, in plain English',
    desc: "AI breaks down your state's ballot measures so you always know exactly what you're voting on.",
  },
  {
    Icon: BarChart3,
    title: 'See how America is voting',
    desc: 'Live breakdowns of how different demographics are leaning — by age, region, and more — updated in real time.',
  },
]

export default function LandingPage() {
  return (
    <PageShell withNav={false} showLogo={false}>
      <div className="flex flex-col min-h-svh bg-background">
        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-16 pb-10">
          <div className="mx-auto w-full max-w-sm flex flex-col min-h-[calc(100svh-6.5rem)]">

            {/* ── Hero ── */}
            <motion.header
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              <p className="text-[13px] font-bold tracking-[0.18em] text-primary uppercase">
                VoterAI
              </p>
              <h1 className="mt-3 text-[30px] font-black text-foreground leading-[1.15] text-balance">
                Vote. Compare. Understand.
              </h1>
              <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed text-pretty max-w-[300px] mx-auto">
                Your personal political analyst — cast your ballot, then see how it holds up against real results, real candidates, and real people.
              </p>
            </motion.header>

            {/* ── Feature list ── */}
            <div className="mt-10 flex-1 divide-y divide-border border-y border-border">
              {FEATURES.map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 * i + 0.15 }}
                  className="flex items-start gap-4 py-5"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                    <Icon size={18} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-bold text-[15px] text-foreground leading-tight">{title}</p>
                    <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-10 flex flex-col gap-3"
            >
              <Link
                href="/auth/signup"
                className="group relative flex items-center justify-center gap-2 w-full py-4 pr-3 pl-6 rounded-full font-bold text-[15px] text-primary-foreground overflow-hidden transition-transform active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(135deg, var(--primary), oklch(0.52 0.19 300))',
                  boxShadow: '0 8px 24px -8px var(--primary)',
                }}
              >
                <span>Get Started Free</span>
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                  <ChevronRight size={15} aria-hidden="true" />
                </span>
              </Link>
              <Link
                href="/auth/signin"
                className="flex items-center justify-center w-full py-4 rounded-full text-foreground font-semibold text-[15px] transition-colors active:scale-[0.98] hover:bg-muted"
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
      </div>
    </PageShell>
  )
}
