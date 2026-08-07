'use client'

import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import PageShell from '@/components/page-shell'
import FloatingHomeButton from '@/components/floating-home-button'

export default function ControversiesPage() {
  return (
    <PageShell>
      <div className="flex flex-col min-h-svh items-center justify-center px-8 text-center" style={{ background: '#ffffff' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-5"
        >
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{
              background: '#ffffff',
              border: '1.5px solid rgba(230, 50, 40, 0.35)',
              boxShadow: '0 4px 24px rgba(230, 50, 40, 0.14), 0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <Flame size={36} style={{ color: 'oklch(0.46 0.20 25)' }} aria-hidden="true" />
          </div>

          {/* Text */}
          <div>
            <h1 className="text-[26px] font-black text-foreground leading-tight mb-2">Coming Soon</h1>
            <p className="text-[15px] font-bold text-foreground mb-1">AI Controversy Radar</p>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[280px]">
              We&apos;re fine-tuning this feature to ensure accurate, balanced, and up-to-date coverage for every state. Check back soon.
            </p>
          </div>

          {/* Status pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(230, 50, 40, 0.07)',
              border: '1px solid rgba(230, 50, 40, 0.20)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[12px] font-semibold text-foreground">In development</span>
          </div>
        </motion.div>

        <FloatingHomeButton />
      </div>
    </PageShell>
  )
}
