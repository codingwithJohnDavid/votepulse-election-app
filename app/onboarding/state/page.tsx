'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import PageShell from '@/components/page-shell'
import BottomNav from '@/components/bottom-nav'
import { cn } from '@/lib/utils'
import { US_STATES, RACES_BY_STATE } from '@/lib/mock-data'
import { useActiveState } from '@/lib/state-context'

// ── Pastel tile colours cycling per index ──────────────────────────────────────
const TILE_PALETTES = [
  { bg: '#EEF2FF', icon: '#6366F1' }, // indigo
  { bg: '#FEF3C7', icon: '#D97706' }, // amber
  { bg: '#ECFDF5', icon: '#10B981' }, // emerald
  { bg: '#FEE2E2', icon: '#EF4444' }, // red
  { bg: '#F0F9FF', icon: '#0EA5E9' }, // sky
  { bg: '#FDF4FF', icon: '#A855F7' }, // purple
]

// ── State shape SVG silhouettes ────────────────────────────────────────────────
// Simplified viewBox paths drawn to ~48×48 space
const STATE_SHAPES: Record<string, string> = {
  CA: 'M 8 2 L 12 4 L 14 8 L 16 10 L 17 14 L 15 18 L 16 22 L 14 28 L 12 32 L 10 38 L 8 44 L 6 46 L 4 42 L 3 36 L 4 30 L 5 24 L 4 18 L 5 12 L 6 8 Z',
  FL: 'M 6 4 L 32 4 L 34 6 L 36 10 L 38 14 L 40 20 L 42 26 L 40 32 L 36 38 L 30 44 L 24 46 L 20 44 L 16 40 L 14 34 L 12 28 L 8 22 L 6 16 Z',
  TX: 'M 4 4 L 34 4 L 36 8 L 38 14 L 36 18 L 38 24 L 34 28 L 30 34 L 24 40 L 18 44 L 12 42 L 8 38 L 6 32 L 4 26 L 2 18 L 2 10 Z',
  NY: 'M 8 6 L 24 4 L 34 8 L 38 12 L 36 16 L 40 20 L 36 24 L 32 22 L 26 26 L 22 30 L 18 28 L 14 32 L 10 30 L 8 24 L 6 18 L 6 12 Z',
  PA: 'M 4 10 L 42 8 L 44 12 L 44 34 L 40 38 L 8 40 L 4 36 L 4 14 Z',
  OH: 'M 8 6 L 36 6 L 40 12 L 42 20 L 40 30 L 36 38 L 28 44 L 20 42 L 12 40 L 6 32 L 4 22 L 6 12 Z',
  GA: 'M 8 4 L 38 4 L 40 8 L 40 30 L 36 36 L 30 42 L 24 44 L 18 40 L 12 34 L 8 26 L 6 16 L 6 8 Z',
  NC: 'M 4 14 L 44 10 L 46 16 L 44 22 L 40 26 L 32 28 L 24 30 L 16 30 L 8 28 L 4 22 Z',
  VA: 'M 4 10 L 38 8 L 44 14 L 44 24 L 40 30 L 34 36 L 26 38 L 18 36 L 10 30 L 6 22 L 4 16 Z',
  AZ: 'M 6 4 L 40 4 L 42 8 L 44 42 L 16 44 L 6 36 L 4 24 L 4 12 Z',
  CO: 'M 4 8 L 44 6 L 46 40 L 4 42 Z',
  WA: 'M 4 6 L 38 4 L 42 8 L 44 16 L 40 22 L 36 24 L 32 22 L 26 26 L 20 28 L 14 26 L 8 22 L 4 16 Z',
  OR: 'M 4 8 L 40 6 L 44 12 L 44 34 L 40 38 L 6 40 L 4 34 L 4 16 Z',
  IL: 'M 16 2 L 28 4 L 32 10 L 34 18 L 32 26 L 30 34 L 26 40 L 22 46 L 18 42 L 16 36 L 14 28 L 12 20 L 12 12 L 14 6 Z',
  MI: 'M 16 4 L 28 4 L 32 10 L 28 16 L 24 14 L 22 18 L 18 22 L 14 26 L 10 24 L 8 18 L 10 12 L 14 8 Z',
  MN: 'M 10 2 L 32 2 L 36 6 L 38 14 L 36 22 L 38 28 L 34 34 L 28 38 L 24 44 L 20 40 L 16 34 L 12 28 L 10 22 L 8 14 L 8 6 Z',
  WI: 'M 10 4 L 32 4 L 38 10 L 40 18 L 38 26 L 34 32 L 26 38 L 18 36 L 12 30 L 8 22 L 8 14 L 10 8 Z',
  MO: 'M 8 4 L 38 4 L 42 8 L 42 30 L 38 36 L 32 42 L 24 44 L 16 42 L 10 36 L 6 28 L 6 16 L 8 8 Z',
  TN: 'M 4 14 L 44 12 L 46 18 L 46 28 L 44 34 L 4 36 L 2 28 L 2 20 Z',
  AL: 'M 14 2 L 28 4 L 32 10 L 34 20 L 32 30 L 28 40 L 22 46 L 18 44 L 16 38 L 14 28 L 12 18 L 12 10 Z',
  IN: 'M 14 4 L 32 4 L 36 10 L 38 20 L 36 30 L 32 40 L 24 44 L 18 40 L 14 32 L 12 22 L 12 12 Z',
  KY: 'M 4 14 L 40 12 L 44 18 L 42 26 L 36 32 L 28 36 L 20 34 L 12 30 L 6 24 L 4 18 Z',
  LA: 'M 10 4 L 32 4 L 36 10 L 38 18 L 36 26 L 30 34 L 22 44 L 16 44 L 12 38 L 8 28 L 6 18 L 8 10 Z',
  SC: 'M 8 8 L 36 6 L 40 12 L 42 20 L 38 28 L 30 36 L 20 40 L 12 36 L 6 26 L 6 16 Z',
  MS: 'M 16 2 L 28 4 L 32 10 L 34 20 L 32 30 L 28 40 L 22 46 L 18 44 L 14 36 L 12 26 L 12 16 L 14 8 Z',
  AR: 'M 6 6 L 40 6 L 42 12 L 42 38 L 6 40 L 4 32 L 4 18 Z',
  OK: 'M 4 12 L 42 10 L 44 16 L 44 36 L 38 38 L 32 36 L 28 40 L 24 38 L 20 36 L 4 36 L 4 20 Z',
  KS: 'M 4 10 L 44 8 L 46 42 L 4 44 Z',
  NE: 'M 4 10 L 44 8 L 46 32 L 36 36 L 4 38 L 4 20 Z',
  SD: 'M 4 6 L 44 4 L 46 38 L 4 40 Z',
  ND: 'M 4 6 L 44 6 L 46 40 L 4 42 Z',
  MT: 'M 4 6 L 44 4 L 46 36 L 30 40 L 4 38 L 4 14 Z',
  ID: 'M 14 2 L 28 2 L 30 8 L 32 16 L 34 24 L 30 32 L 26 40 L 22 46 L 16 42 L 14 34 L 12 24 L 12 14 L 12 6 Z',
  WY: 'M 4 8 L 44 6 L 46 42 L 4 44 Z',
  NV: 'M 8 2 L 22 2 L 28 8 L 30 16 L 32 26 L 30 36 L 24 44 L 16 46 L 10 42 L 6 34 L 4 24 L 4 14 L 6 6 Z',
  UT: 'M 6 4 L 36 4 L 36 28 L 22 30 L 20 44 L 6 44 Z',
  NM: 'M 6 4 L 40 4 L 42 44 L 6 44 Z',
  HI: 'M 14 20 L 22 16 L 26 20 L 24 28 L 16 30 Z',
  AK: 'M 6 10 L 24 6 L 36 10 L 42 18 L 40 28 L 32 36 L 20 40 L 10 36 L 4 26 L 4 16 Z',
  ME: 'M 14 4 L 32 4 L 38 10 L 40 20 L 36 30 L 28 40 L 20 42 L 14 36 L 10 26 L 10 14 Z',
  VT: 'M 16 2 L 28 4 L 32 12 L 30 24 L 26 36 L 20 44 L 16 42 L 14 34 L 12 24 L 12 12 Z',
  NH: 'M 16 2 L 28 4 L 32 10 L 32 22 L 30 32 L 26 40 L 20 44 L 16 40 L 14 30 L 14 18 L 14 8 Z',
  MA: 'M 4 16 L 40 14 L 44 18 L 42 26 L 36 30 L 24 34 L 12 32 L 4 26 Z',
  RI: 'M 16 8 L 30 8 L 34 16 L 32 28 L 26 38 L 18 38 L 14 28 L 14 18 Z',
  CT: 'M 8 10 L 38 8 L 40 36 L 8 38 Z',
  NJ: 'M 14 4 L 30 4 L 36 10 L 38 20 L 34 30 L 26 40 L 18 38 L 12 28 L 10 18 L 12 10 Z',
  DE: 'M 16 4 L 28 4 L 34 12 L 34 28 L 28 38 L 18 38 L 14 28 L 12 16 L 14 8 Z',
  MD: 'M 4 14 L 42 12 L 44 20 L 36 26 L 28 24 L 20 28 L 12 28 L 4 24 Z',
  DC: 'M 18 10 L 30 10 L 34 18 L 32 28 L 24 34 L 16 30 L 14 22 Z',
  WV: 'M 8 10 L 28 8 L 38 14 L 42 22 L 36 30 L 28 38 L 18 36 L 10 28 L 6 20 L 8 14 Z',
  VA2: 'M 4 10 L 38 8 L 44 14 L 44 24 L 40 30 L 34 36 L 26 38 L 18 36 L 10 30 L 6 22 L 4 16 Z',
  PA2: 'M 4 10 L 42 8 L 44 12 L 44 34 L 40 38 L 8 40 L 4 36 L 4 14 Z',
  IA: 'M 6 8 L 38 6 L 42 12 L 42 32 L 36 38 L 10 40 L 6 32 L 4 22 L 4 14 Z',
}

// Fallback generic shape for states without a custom path
const GENERIC_SHAPE = 'M 10 6 L 38 6 L 42 12 L 44 22 L 42 34 L 36 42 L 24 44 L 12 42 L 6 34 L 4 22 L 6 12 Z'

function StateShape({ code, color }: { code: string; color: string }) {
  const path = STATE_SHAPES[code] ?? GENERIC_SHAPE
  return (
    <svg
      viewBox="0 0 48 48"
      width="34"
      height="34"
      aria-hidden="true"
      className="drop-shadow-sm"
    >
      <path d={path} fill={color} fillOpacity={0.85} />
    </svg>
  )
}

export default function StateSelectionPage() {
  const router = useRouter()
  const { activeState, setActiveState } = useActiveState()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(activeState.code)

  const filtered = US_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.code.toLowerCase().includes(query.toLowerCase()),
  )

  const hasRaces = (code: string) => !!RACES_BY_STATE[code]
  const raceCount = (code: string) => RACES_BY_STATE[code]?.length ?? 0

  function handleSelect(code: string) {
    setSelected(code)
  }

  function handleConfirm() {
    if (!selected) return
    setActiveState(selected)
    router.push('/home')
  }

  return (
    <PageShell withNav={true}>
      <BottomNav />
      <div className="flex flex-col min-h-svh bg-white">

        {/* ── Header ── */}
        <div className="px-5 pt-12 pb-4 bg-white">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">2026 Midterms</p>
            <h1 className="text-2xl font-black text-foreground leading-tight">Select Your State</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {"We'll show you the races on your ballot."}
            </p>
          </motion.div>
        </div>

        {/* ── Search ── */}
        <div className="px-5 pb-4 bg-white">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search states…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 rounded-2xl h-10 bg-[#F7F7FA] border-transparent focus-visible:ring-2 focus-visible:ring-primary text-sm"
              aria-label="Search states"
            />
          </div>
        </div>

        {/* ── State grid ── */}
        <div className="flex-1 px-4 overflow-y-auto bg-white" style={{ maxHeight: 'calc(100svh - 260px)' }}>
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-10">No states found.</p>
          ) : (
            <div className="grid grid-cols-3 gap-3 pb-4" role="listbox" aria-label="Select your state">
              {filtered.map(({ code, name }, i) => {
                const live = hasRaces(code)
                const count = raceCount(code)
                const isSelected = selected === code
                const palette = TILE_PALETTES[i % TILE_PALETTES.length]

                return (
                  <motion.button
                    key={code}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: i * 0.008 }}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(code)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-2 pt-4 pb-3 px-2 rounded-2xl transition-all duration-200 text-center relative',
                      isSelected
                        ? 'ring-2 ring-primary shadow-md scale-[1.03]'
                        : 'ring-0 hover:scale-[1.02]',
                      live ? '' : 'opacity-50',
                    )}
                    style={{ backgroundColor: isSelected ? palette.bg : palette.bg }}
                  >
                    {/* State shape icon */}
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${palette.icon}18` }}
                    >
                      <StateShape code={code} color={palette.icon} />
                    </div>

                    {/* State code */}
                    <span
                      className="text-[13px] font-black leading-tight"
                      style={{ color: isSelected ? palette.icon : '#1A1A2E' }}
                    >
                      {code}
                    </span>

                    {/* Race count or coming soon */}
                    <span className="text-[10px] font-medium leading-tight text-center"
                      style={{ color: live ? palette.icon : '#9CA3AF' }}>
                      {live ? `${count} race${count !== 1 ? 's' : ''}` : 'Coming soon'}
                    </span>

                    {/* Selected checkmark */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: palette.icon }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                          <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    )}
                  </motion.button>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Confirm button ── */}
        <div
          className="px-5 pt-3 bg-white border-t border-[#F0F0F5]"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 5rem)' }}
        >
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selected}
            className={cn(
              'w-full py-3.5 rounded-2xl font-bold text-[15px] transition-all flex items-center justify-center gap-2',
              selected
                ? 'bg-primary text-white hover:opacity-90 active:scale-95 shadow-sm'
                : 'bg-[#F0F0F5] text-[#9CA3AF] cursor-not-allowed',
            )}
          >
            {selected ? (
              <>
                {`Continue with ${US_STATES.find((s) => s.code === selected)?.name}`}
                <ChevronRight size={16} aria-hidden="true" />
              </>
            ) : (
              'Select a State to Continue'
            )}
          </button>
        </div>
      </div>
    </PageShell>
  )
}
