'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { ChevronDown, Users2, Lock, Share2 } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import { RESULTS_DATA, type DemographicBreakdown } from '@/lib/mock-data'

// ─── Demographic bar row ──────────────────────────────────────────────────────
function DemoRow({ item, index }: { item: DemographicBreakdown; index: number }) {
  const masked = item.count < 30

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: index * 0.035 }}
      className="py-3.5 border-b border-border last:border-0"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-foreground">{item.label}</span>
        {masked ? (
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Lock size={10} aria-hidden="true" />
            <span>{'<'}30 responses</span>
          </div>
        ) : (
          <span className="text-[11px] text-muted-foreground tabular-nums">
            {item.count.toLocaleString()} responses
          </span>
        )}
      </div>
      {masked ? (
        <div className="h-2.5 rounded-full bg-muted" aria-label="Data hidden for privacy" />
      ) : (
        <>
          <div
            className="flex h-2.5 rounded-full overflow-hidden"
            role="img"
            aria-label={`Yes ${item.yesPercent}%, No ${item.noPercent}%`}
          >
            <motion.div
              style={{ backgroundColor: 'oklch(0.42 0.19 285)', width: `${item.yesPercent}%` }}
              className="h-full"
              initial={{ width: 0 }}
              animate={{ width: `${item.yesPercent}%` }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: index * 0.03 }}
            />
            <div className="flex-1 h-full" style={{ backgroundColor: 'oklch(0.88 0.06 285)' }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[11px] font-bold" style={{ color: 'oklch(0.42 0.19 285)' }}>
              Yes {item.yesPercent}%
            </span>
            <span className="text-[11px] font-medium text-muted-foreground">
              No {item.noPercent}%
            </span>
          </div>
        </>
      )}
    </motion.div>
  )
}

// ─── Accordion section ────────────────────────────────────────────────────────
function AccordionSection({ title, items }: { title: string; items: DemographicBreakdown[] }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className="font-bold text-[15px] text-foreground">{title}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
          className="w-7 h-7 rounded-full bg-muted group-hover:bg-brand-subtle flex items-center justify-center transition-colors"
          aria-hidden="true"
        >
          <ChevronDown size={15} className="text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-2">
              {items.map((item, i) => (
                <DemoRow key={item.label} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ResultsPage() {
  const data = RESULTS_DATA
  const yesPercent = Math.round((data.yesCount / data.totalResponses) * 100)
  const noPercent = 100 - yesPercent

  const chartData = [
    { name: 'Yes', value: data.yesCount },
    { name: 'No', value: data.noCount },
  ]
  const YES_COLOR = 'oklch(0.42 0.19 285)'
  const NO_COLOR = 'oklch(0.86 0.06 285)'

  const DEMOGRAPHICS = [
    { title: 'Age', items: data.byAge },
    { title: 'Race or Ethnicity', items: data.byRace },
    { title: 'Religious Affiliation', items: data.byReligion },
    { title: 'Gender', items: data.byGender },
    { title: 'Household Income', items: data.byIncome },
    { title: 'Education Level', items: data.byEducation },
  ]

  return (
    <PageShell>
      <div className="flex flex-col min-h-svh bg-background">
        {/* ── Header ── */}
        <header className="bg-card px-5 pt-14 pb-4 border-b border-border">
          <h1 className="text-2xl font-black text-foreground mb-1">Overall Results</h1>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {data.question}
          </p>
        </header>

        <div className="flex-1 overflow-y-auto pb-24">
          {/* ── Donut chart ── */}
          <div className="bg-card px-5 py-7">
            {/* Chart with flanking stats — matches the reference image layout */}
            <div className="flex items-center justify-between gap-2">
              {/* Yes stat — left */}
              <div className="flex flex-col items-center min-w-[72px]">
                <p className="text-4xl font-black" style={{ color: YES_COLOR }}>
                  {yesPercent}%
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: YES_COLOR }} aria-hidden="true" />
                  <span className="text-sm font-semibold text-foreground">Yes</span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums mt-0.5">
                  {data.yesCount.toLocaleString()}
                </span>
              </div>

              {/* Donut — center */}
              <div className="relative flex-1 max-w-[200px]">
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={90}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={3}
                      dataKey="value"
                      animationDuration={900}
                      aria-label={`${yesPercent}% Yes, ${noPercent}% No`}
                    >
                      {chartData.map((_, i) => (
                        <Cell key={i} fill={i === 0 ? YES_COLOR : NO_COLOR} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none gap-0.5">
                  <Users2 size={22} style={{ color: YES_COLOR }} aria-hidden="true" />
                  <span className="text-[10px] text-muted-foreground font-medium leading-none mt-1">
                    Total Responses
                  </span>
                  <span className="text-xl font-black text-foreground leading-none">
                    {data.totalResponses.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* No stat — right */}
              <div className="flex flex-col items-center min-w-[72px]">
                <p className="text-4xl font-black" style={{ color: 'oklch(0.62 0.09 285)' }}>
                  {noPercent}%
                </p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: NO_COLOR }} aria-hidden="true" />
                  <span className="text-sm font-semibold text-foreground">No</span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums mt-0.5">
                  {data.noCount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* ── Demographics accordion ── */}
          <div className="bg-card mt-3 px-5 pb-2">
            <div className="pt-5 pb-3 border-b border-border">
              <h2 className="font-black text-[17px] text-foreground">Results by Demographics</h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Groups with fewer than 30 responses are hidden to protect anonymity.
              </p>
            </div>
            {DEMOGRAPHICS.map(({ title, items }) => (
              <AccordionSection key={title} title={title} items={items} />
            ))}
          </div>

          {/* ── Share nudge ── */}
          <div className="mx-5 mt-4 mb-2 p-4 rounded-3xl overflow-hidden relative"
            style={{ background: 'linear-gradient(135deg, oklch(0.40 0.19 285) 0%, oklch(0.55 0.16 265) 100%)' }}>
            <p className="text-sm font-black text-white mb-1">Your voice was counted.</p>
            <p className="text-xs text-white/75 leading-relaxed mb-3">
              Share VotePulse with a friend and help grow the data set — every response makes results more representative.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white text-primary text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <Share2 size={12} aria-hidden="true" />
              Share VotePulse
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </PageShell>
  )
}
