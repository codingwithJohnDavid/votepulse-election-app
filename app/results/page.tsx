'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { ChevronDown, Users, Lock } from 'lucide-react'
import BottomNav from '@/components/bottom-nav'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import { RESULTS_DATA, type DemographicBreakdown } from '@/lib/mock-data'

// ─── Donut chart center label ─────────────────────────────────────────────────
function DonutCenter({ total }: { total: number }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Users size={28} className="text-primary mb-1" aria-hidden="true" />
      <p className="text-xs text-muted-foreground font-medium">Total Responses</p>
      <p className="text-2xl font-black text-foreground">{total.toLocaleString()}</p>
    </div>
  )
}

// ─── Demographic row in accordion ─────────────────────────────────────────────
function DemoRow({ item, index }: { item: DemographicBreakdown; index: number }) {
  const PRIVACY_THRESHOLD = 30
  const masked = item.count < PRIVACY_THRESHOLD

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="py-3"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-foreground">{item.label}</span>
        {masked ? (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lock size={11} aria-hidden="true" />
            <span>Hidden ({'<'}30 responses)</span>
          </div>
        ) : (
          <span className="text-xs text-muted-foreground">{item.count.toLocaleString()} responses</span>
        )}
      </div>
      {masked ? (
        <div className="h-2 rounded-full bg-muted" aria-label="Data hidden for privacy" />
      ) : (
        <div className="flex h-2 rounded-full overflow-hidden gap-px" role="img" aria-label={`Yes ${item.yesPercent}%, No ${item.noPercent}%`}>
          <motion.div
            className="rounded-l-full"
            style={{ backgroundColor: 'oklch(0.42 0.19 285)' }}
            initial={{ width: 0 }}
            animate={{ width: `${item.yesPercent}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <motion.div
            className="rounded-r-full flex-1"
            style={{ backgroundColor: 'oklch(0.88 0.06 285)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />
        </div>
      )}
      {!masked && (
        <div className="flex justify-between mt-1">
          <span className="text-[11px] font-semibold text-primary">Yes {item.yesPercent}%</span>
          <span className="text-[11px] font-medium text-muted-foreground">No {item.noPercent}%</span>
        </div>
      )}
    </motion.div>
  )
}

// ─── Accordion section ────────────────────────────────────────────────────────
interface AccordionSectionProps {
  title: string
  items: DemographicBreakdown[]
}
function AccordionSection({ title, items }: AccordionSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-bold text-[15px] text-foreground">{title}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden="true"
        >
          <ChevronDown size={18} className="text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-border pb-2">
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
  const COLORS = ['oklch(0.42 0.19 285)', 'oklch(0.88 0.06 285)']

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
        {/* Header */}
        <header className="bg-card px-5 pt-14 pb-5 border-b border-border">
          <h1 className="text-2xl font-black text-foreground mb-1">Overall Results</h1>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {data.question}
          </p>
        </header>

        <div className="flex-1 overflow-y-auto">
          {/* Donut chart section */}
          <div className="bg-card px-5 py-6 flex flex-col items-center">
            <div className="relative w-full max-w-[280px]">
              {/* Donut chart */}
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={72}
                    outerRadius={105}
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={900}
                    aria-label={`${yesPercent}% Yes, ${noPercent}% No`}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center label — absolutely positioned over chart */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <DonutCenter total={data.totalResponses} />
              </div>
            </div>

            {/* Yes / No stats */}
            <div className="flex items-center gap-8 mt-2">
              <div className="flex flex-col items-center">
                <p className="text-4xl font-black" style={{ color: 'oklch(0.42 0.19 285)' }}>
                  {yesPercent}%
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'oklch(0.42 0.19 285)' }} aria-hidden="true" />
                  <span className="text-sm font-semibold text-foreground">Yes</span>
                </div>
                <span className="text-xs text-muted-foreground">{data.yesCount.toLocaleString()}</span>
              </div>

              <div className="w-px h-14 bg-border" aria-hidden="true" />

              <div className="flex flex-col items-center">
                <p className="text-4xl font-black" style={{ color: 'oklch(0.62 0.08 285)' }}>
                  {noPercent}%
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'oklch(0.88 0.06 285)' }} aria-hidden="true" />
                  <span className="text-sm font-semibold text-foreground">No</span>
                </div>
                <span className="text-xs text-muted-foreground">{data.noCount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Demographics accordion */}
          <div className="bg-card mt-3 mx-0 px-5">
            <h2 className="font-black text-[17px] text-foreground pt-5 pb-2">
              Results by Demographics
            </h2>
            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              Groups with fewer than 30 responses are hidden to protect anonymity.
            </p>
            <div className="rounded-2xl border border-border overflow-hidden mb-6">
              {DEMOGRAPHICS.map(({ title, items }) => (
                <AccordionSection key={title} title={title} items={items} />
              ))}
            </div>
          </div>

          {/* Share nudge */}
          <div className="mx-5 mb-6 p-4 rounded-2xl bg-brand-subtle border border-primary/20 flex flex-col gap-2">
            <p className="text-sm font-bold text-primary">Your voice was counted.</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Share VotePulse with a friend and help grow the data set — every response makes the results more representative.
            </p>
            <button
              type="button"
              className="mt-1 self-start px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity"
            >
              Share VotePulse
            </button>
          </div>
        </div>

        <BottomNav />
      </div>
    </PageShell>
  )
}
