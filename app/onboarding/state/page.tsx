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
import { STATE_SHAPES } from '@/lib/state-shapes'
import { useFloatingAction } from '@/lib/floating-action-context'

// ── State silhouette — dark shape on light card ───────────────────────────────
function StateShape({ code, selected }: { code: string; selected: boolean }) {
  const path = STATE_SHAPES[code]
  if (!path) {
    return (
      <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
        <circle cx="100" cy="100" r="80" fill="currentColor" opacity={0.15} />
      </svg>
    )
  }
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d={path}
        fill={selected ? 'oklch(0.42 0.19 285)' : 'oklch(0.175 0.04 270)'}
        opacity={selected ? 1 : 0.75}
      />
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
          scale: isCenter ? 1 : 0.86,
          opacity: isCenter ? 1 : 0.45,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="w-full relative rounded-[32px] flex flex-col items-center justify-center overflow-hidden transition-all duration-200"
        style={{
          height: '62vw',
          maxHeight: 290,
          background: '#ffffff',
          border: isSelected
            ? '1.5px solid rgba(100, 60, 200, 0.4)'
            : '1.5px solid rgba(0, 0, 0, 0.07)',
          boxShadow: isSelected
            ? '0 6px 32px rgba(100, 60, 200, 0.22), 0 1px 4px rgba(0,0,0,0.04)'
            : '0 2px 12px rgba(0,0,0,0.05)',
        }}
        aria-label={`Select ${name}`}
        aria-pressed={isSelected}
      >
        {/* State SVG silhouette */}
        <div className="w-[64%] h-[64%] flex items-center justify-center">
          <StateShape code={code} selected={isSelected} />
        </div>

        {/* Selected checkmark */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'oklch(0.42 0.19 285)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Labels below card */}
      <motion.div
        className="mt-4 flex flex-col items-center gap-1 text-center"
        animate={{ opacity: isCenter ? 1 : 0.35 }}
        transition={{ duration: 0.25 }}
      >
        <span className="text-foreground font-black text-2xl tracking-tight leading-none">
          {code}
        </span>
        <span className="text-muted-foreground text-[13px] font-medium leading-tight">
          {name}
        </span>
        <span
          className={cn(
            'mt-1 px-3 py-0.5 rounded-full text-[11px] font-bold tracking-wide',
            hasRaces
              ? 'bg-primary/10 text-primary'
              : 'bg-muted text-muted-foreground',
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
  const filteredRef = useRef(US_STATES)

  // Filter states by query
  const filtered = US_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.code.toLowerCase().includes(query.toLowerCase()),
  )

  // Keep a ref so scrollend closure always sees fresh filtered list
  filteredRef.current = filtered

  const getRaceCount = (code: string) => RACES_BY_STATE[code]?.length ?? 0

  // ── Scroll to index ────────────────────────────────────────────────────────
  const scrollToIndex = useCallback((index: number, animated = true) => {
    const container = scrollRef.current
    if (!container) return
    const slides = container.querySelectorAll<HTMLElement>('.carousel-slide')
    const slide = slides[index]
    if (!slide) return
    // Trigger a layout flush so offsetLeft is never stale
    void container.getBoundingClientRect()
    const containerCenter = container.offsetWidth / 2
    const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
    const target = slideCenter - containerCenter
    container.scrollTo({ left: Math.max(0, target), behavior: animated ? 'smooth' : 'instant' })
  }, [])

  // ── Detect centered slide — only called from scrollend, never during scroll ─
  const detectCenter = useCallback(() => {
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
    setCenterIndex(closest)
    const code = filteredRef.current[closest]?.code
    if (code) setSelected(code)
  }, [])

  // scrollend — fires once after native snap settles, no mid-scroll interference
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    // scrollend not supported in all browsers — debounced scroll as fallback
    let timer: ReturnType<typeof setTimeout>
    const onScroll = () => {
      clearTimeout(timer)
      timer = setTimeout(detectCenter, 80)
    }

    container.addEventListener('scrollend', detectCenter, { passive: true })
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      container.removeEventListener('scrollend', detectCenter)
      container.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [detectCenter])

  // When query changes, jump instantly to index 0 (no animation fighting snap)
  useEffect(() => {
    setCenterIndex(0)
    // rAF ensures DOM has updated with filtered slides before we scroll
    requestAnimationFrame(() => scrollToIndex(0, false))
    if (filtered.length > 0) setSelected(filtered[0].code)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  // On mount, jump to previously active state — double rAF ensures layout is complete
  useEffect(() => {
    const idx = filtered.findIndex((s) => s.code === activeState.code)
    if (idx < 0) return
    setCenterIndex(idx)
    // First rAF: React has committed. Second rAF: browser has painted & measured layout.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToIndex(idx, false))
    })
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
      <div className="flex flex-col min-h-svh bg-background justify-center">

        {/* ── Title ── */}
        <div className="pb-0 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <p className="text-muted-foreground text-[11px] font-bold tracking-[0.2em] uppercase mb-2">
              2026 Midterms
            </p>
            <h1 className="text-foreground text-[28px] font-black leading-tight tracking-tight">
              Explore Any State
            </h1>
          </motion.div>
        </div>

        {/* ── Floating Search Bar ── */}
        <div className="px-5 pt-5 pb-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <div
              className="flex items-center gap-3 px-4 rounded-full h-14"
              style={{
                background: '#ffffff',
                border: '1.5px solid rgba(0,0,0,0.08)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <Search size={18} className="text-muted-foreground shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search states…"
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground text-[15px] font-medium outline-none border-none min-w-0"
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
                    className="shrink-0 w-6 h-6 rounded-full bg-foreground/10 flex items-center justify-center"
                    aria-label="Clear search"
                  >
                    <X size={12} className="text-foreground/60" aria-hidden="true" />
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
              <p className="text-muted-foreground text-base font-medium">No states found for</p>
              <p className="text-foreground font-black text-xl mt-1">&ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <div
              ref={scrollRef}
              className="flex items-center overflow-x-auto no-scrollbar py-6"
              style={{
                scrollSnapType: 'x mandatory',
                scrollPadding: '0 calc(50% - 36vw)',
                WebkitOverflowScrolling: 'touch',
                gap: '16px',
              }}
              role="listbox"
              aria-label="Select a state"
            >
              {/* Leading sentinel — gives first card room to snap to center */}
              <div aria-hidden="true" className="flex-shrink-0" style={{ width: 'calc(50vw - 36vw - 8px)' }} />

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

              {/* Trailing sentinel — gives last card room to snap to center */}
              <div aria-hidden="true" className="flex-shrink-0" style={{ width: 'calc(50vw - 36vw - 8px)' }} />
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
                      ? 'w-5 h-1.5 bg-foreground'
                      : 'w-1.5 h-1.5 bg-foreground/20',
                  )}
                  aria-label={`Go to ${filtered[i]?.name}`}
                />
              ))}
              {filtered.length > 9 && (
                <span className="text-muted-foreground text-[10px] font-bold ml-1">
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
        <div style={{ height: 'calc(env(safe-area-inset-bottom, 0px) + 6rem)' }} />
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
      style={{
        background: '#ffffff',
        border: '1.5px solid rgba(100, 60, 200, 0.25)',
        boxShadow: '0 4px 20px rgba(100, 60, 200, 0.12), 0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div>
        <p className="text-foreground font-black text-[17px] leading-tight">{name}</p>
        <p className="text-muted-foreground text-[12px] font-medium mt-0.5">
          {hasRaces ? `${raceCount} active race${raceCount !== 1 ? 's' : ''} on your ballot` : 'No active races yet'}
        </p>
      </div>
      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <span className="text-primary text-[11px] font-black">{code}</span>
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
          className="text-center text-muted-foreground/60 text-[12px] font-medium pb-2"
          aria-hidden="true"
        >
          Swipe to explore all 51 states
        </motion.p>
      )}
    </AnimatePresence>
  )
}
