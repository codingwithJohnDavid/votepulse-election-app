'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import PageShell from '@/components/page-shell'
import FloatingHomeButton from '@/components/floating-home-button'
import { cn } from '@/lib/utils'
import { US_STATES, RACES_BY_STATE } from '@/lib/mock-data'
import { useActiveState } from '@/lib/state-context'
import { STATE_SVG_DATA } from '@/lib/state-svg-data'

// ── Pastel tile colours cycling per index ──────────────────────────────────────
const TILE_PALETTES = [
  { bg: '#EEF2FF', icon: '#6366F1' }, // indigo
  { bg: '#FEF3C7', icon: '#D97706' }, // amber
  { bg: '#ECFDF5', icon: '#10B981' }, // emerald
  { bg: '#FEE2E2', icon: '#EF4444' }, // red
  { bg: '#F0F9FF', icon: '#0EA5E9' }, // sky
  { bg: '#FDF4FF', icon: '#A855F7' }, // purple
]

// ── State shape component — uses real geographic paths from @svg-maps/usa ──────
// Each state has a precisely computed viewBox so the shape fills the icon area

function StateShape({ code, color }: { code: string; color: string }) {
  const data = STATE_SVG_DATA[code]
  if (!data) {
    // Fallback circle for unknown codes
    return (
      <svg viewBox="0 0 100 100" width="40" height="40" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill={color} fillOpacity={0.9} />
      </svg>
    )
  }
  return (
    <svg
      viewBox={data.vb}
      width="40"
      height="40"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={data.path} fill={color} fillOpacity={0.9} />
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
    <PageShell withNav={false}>
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
      <FloatingHomeButton />
    </PageShell>
  )
}
