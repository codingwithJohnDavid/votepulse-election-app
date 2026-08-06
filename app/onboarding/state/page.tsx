'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import PageShell from '@/components/page-shell'
import FloatingHomeButton from '@/components/floating-home-button'
import { cn } from '@/lib/utils'
import { US_STATES, RACES_BY_STATE } from '@/lib/mock-data'
import { useActiveState } from '@/lib/state-context'
import { STATE_SVG_DATA } from '@/lib/state-svg-data'
import { useFloatingAction } from '@/lib/floating-action-context'

// ── Large state silhouette — white on dark card ────────────────────────────────
function StateShape({ code }: { code: string }) {
  const data = STATE_SVG_DATA[code]
  if (!data) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="white" fillOpacity={0.9} />
      </svg>
    )
  }
  return (
    <svg
      viewBox={data.vb}
      className="w-full h-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={data.path} fill="white" fillOpacity={0.92} />
    </svg>
  )
}

// ── Single carousel card ───────────────────────────────────────────────────────
function StateCard({
  code,
  name,
  raceCount,
  isSelected,
  isCenter,
  onClick,
}: {
  code: string
  name: string
  raceCount: number
  isSelected: boolean
  isCenter: boolean
  onClick: () => void
}) {
  const hasRaces = raceCount > 0

  return (
    <div
      className="carousel-slide flex-shrink-0 flex flex-col items-center justify-center"
      style={{ width: '72vw', maxWidth: 320, scrollSnapAlign: 'center' }}
    >
      <motion.button
        type="button"
        onClick={onClick}
        animate={{
          scale: isCenter ? 1 : 0.88,
          opacity: isCenter ? 1 : 0.55,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'w-full relative rounded-[32px] flex flex-col items-center justify-center gap-0 overflow-hidden border transition-all duration-200',
          isSelected
            ? 'border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.12)]'
            : 'border-white/8',
        )}
        style={{
          height: '62vw',
          maxHeight: 290,
          background: isSelected
            ? 'linear-gradient(145deg, #252840 0%, #1a1d30 100%)'
            : 'linear-gradient(145deg, #1e2035 0%, #161828 100%)',
        }}
        aria-label={`Select ${name}`}
        aria-pressed={isSelected}
      >
        {/* Selected ring glow */}
        {isSelected && (
          <div
            className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.25)' }}
          />
        )}

        {/* State SVG silhouette */}
        <div className="w-[62%] h-[62%] flex items-center justify-center">
          <StateShape code={code} />
        </div>

        {/* Selected checkmark */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6L5 9L10 3" stroke="#0F1117" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Labels below card */}
      <motion.div
        className="mt-4 flex flex-col items-center gap-1 text-center"
        animate={{ opacity: isCenter ? 1 : 0.4 }}
        transition={{ duration: 0.25 }}
      >
        <span className="text-white font-black text-2xl tracking-tight leading-none">
          {code}
        </span>
        <span className="text-white/60 text-[13px] font-medium leading-tight">
          {name}
        </span>
        <span
          className={cn(
            'mt-1 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide',
            hasRaces
              ? 'bg-white/10 text-white/80'
              : 'bg-white/5 text-white/30',
          )}
        >
          {hasRaces ? `${raceCount} race${raceCount !== 1 ? 's' : ''}` : 'Coming soon'}
        </span>
      </motion.div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function StateSelectionPage() {
  const router = useRouter()
  const { activeState, setActiveState } = useActiveState()
  const { setAction, clearAction } = useFloatingAction()

  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(activeState.code)
  const [centerIndex, setCenterIndex] = useState(0)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter states by query
  const filtered = US_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.code.toLowerCase().includes(query.toLowerCase()),
  )

  const getRaceCount = (code: string) => RACES_BY_STATE[code]?.length ?? 0

  // ── Scroll to a specific index ─────────────────────────────────────────────
  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const slides = container.querySelectorAll<HTMLElement>('.carousel-slide')
    const slide = slides[index]
    if (!slide) return
    const containerCenter = container.offsetWidth / 2
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
    container.scrollTo({ left: slideCenter - containerCenter, behavior: 'smooth' })
  }, [])

  // ── Detect which slide is centered via scroll ──────────────────────────────
  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const slides = container.querySelectorAll<HTMLElement>('.carousel-slide')
    const containerCenter = container.scrollLeft + container.offsetWidth / 2
    let closest = 0
    let minDist = Infinity
    slides.forEach((slide, i) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
      const dist = Math.abs(slideCenter - containerCenter)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    if (closest !== centerIndex) {
      setCenterIndex(closest)
      const code = filtered[closest]?.code
      if (code) setSelected(code)
    }
  }, [centerIndex, filtered])

  // When query changes, reset scroll to index 0 and select first result
  useEffect(() => {
    setCenterIndex(0)
    setTimeout(() => scrollToIndex(0), 50)
    if (filtered.length > 0) setSelected(filtered[0].code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // When initial mount, scroll to active state
  useEffect(() => {
    const idx = filtered.findIndex((s) => s.code === activeState.code)
    if (idx >= 0) {
      setCenterIndex(idx)
      setTimeout(() => scrollToIndex(idx), 120)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCardClick(code: string, index: number) {
    setSelected(code)
    setCenterIndex(index)
    scrollToIndex(index)
  }

  function handleConfirm() {
    if (!selected) return
    setActiveState(selected)
    router.push('/home')
  }

  // Register floating submit
  useEffect(() => {
    const stateName = US_STATES.find((s) => s.code === selected)?.name
    setAction({
      label: stateName ? `Confirm ${stateName}` : 'Select a State',
      onSubmit: handleConfirm,
      disabled: !selected,
    })
    return () => clearAction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <PageShell withNav={false} className="overflow-hidden">
      {/* Full-bleed dark background */}
      <div
        className="flex flex-col min-h-svh relative"
        style={{
          background: 'radial-gradient(ellipse 120% 60% at 50% 0%, #1e2140 0%, #0f1117 55%)',
        }}
      >

        {/* ── Title ── */}
        <div className="pt-14 pb-0 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <p className="text-white/40 text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
              2026 Midterms
            </p>
            <h1 className="text-white text-[28px] font-black leading-tight tracking-tight">
              Explore Any State
            </h1>
          </motion.div>
        </div>

        {/* ── Floating Search Bar ── */}
        <div className="px-5 pt-4 pb-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="relative"
          >
            <div
              className="flex items-center gap-3 px-4 rounded-full border border-white/12 h-14"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <Search size={18} className="text-white/40 shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search states…"
                className="flex-1 bg-transparent text-white placeholder-white/30 text-[15px] font-medium outline-none border-none min-w-0"
                aria-label="Search states"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              <AnimatePresence>
                {query.length > 0 && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    type="button"
                    onClick={() => { setQuery(''); inputRef.current?.focus() }}
                    className="shrink-0 w-6 h-6 rounded-full bg-white/15 flex items-center justify-center"
                    aria-label="Clear search"
                  >
                    <X size={12} className="text-white/70" aria-hidden="true" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── Carousel ── */}
        <div className="flex flex-col justify-start pt-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <p className="text-white/50 text-base font-medium">No states found for</p>
              <p className="text-white font-black text-xl mt-1">&ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex items-center gap-4 overflow-x-auto no-scrollbar py-6"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                paddingLeft: 'calc(50vw - 36vw)',
                paddingRight: 'calc(50vw - 36vw)',
              }}
              role="listbox"
              aria-label="Select a state"
            >
              {filtered.map((state, i) => (
                <StateCard
                  key={state.code}
                  code={state.code}
                  name={state.name}
                  raceCount={getRaceCount(state.code)}
                  isSelected={selected === state.code}
                  isCenter={i === centerIndex}
                  onClick={() => handleCardClick(state.code, i)}
                />
              ))}
            </div>
          )}

          {/* Dot indicators */}
          {filtered.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-2 mb-4">
              {filtered.slice(0, Math.min(filtered.length, 9)).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setCenterIndex(i)
                    scrollToIndex(i)
                    if (filtered[i]) setSelected(filtered[i].code)
                  }}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    i === centerIndex
                      ? 'w-5 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/25',
                  )}
                  aria-label={`Go to ${filtered[i]?.name}`}
                />
              ))}
              {filtered.length > 9 && (
                <span className="text-white/30 text-[10px] font-bold ml-1">
                  +{filtered.length - 9}
                </span>
              )}
            </div>
          )}

          {/* Swipe hint — fades out after 3 seconds */}
          <SwipeHint show={query.length === 0} />

          {/* Selected state info strip */}
          {selected && (
            <SelectedStateInfo
              code={selected}
              name={US_STATES.find((s) => s.code === selected)?.name ?? ''}
              raceCount={getRaceCount(selected)}
            />
          )}
        </div>

        {/* Bottom spacer for floating buttons */}
        <div style={{ height: 'calc(env(safe-area-inset-bottom, 0px) + 7rem)' }} />
      </div>

      <FloatingHomeButton />
    </PageShell>
  )
}

// ── Selected state info strip ──────────────────────────────────────────────────
function SelectedStateInfo({ code, name, raceCount }: { code: string; name: string; raceCount: number }) {
  const hasRaces = raceCount > 0
  return (
    <motion.div
      key={code}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-6 mt-4 mb-2 rounded-2xl px-5 py-4 flex items-center justify-between"
      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div>
        <p className="text-white font-black text-[17px] leading-tight">{name}</p>
        <p className="text-white/40 text-[12px] font-medium mt-0.5">
          {hasRaces ? `${raceCount} active race${raceCount !== 1 ? 's' : ''} on your ballot` : 'No active races yet'}
        </p>
      </div>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'rgba(255,255,255,0.08)' }}
      >
        <span className="text-white text-[11px] font-black">{code}</span>
      </div>
    </motion.div>
  )
}

// ── Swipe hint ─────────────────────────────────────────────────────────────────
function SwipeHint({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setVisible(false), 3000)
    return () => clearTimeout(t)
  }, [show])

  return (
    <AnimatePresence>
      {show && visible && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-white/30 text-[12px] font-medium pb-2"
          aria-hidden="true"
        >
          Swipe to explore all 51 states
        </motion.p>
      )}
    </AnimatePresence>
  )
}
