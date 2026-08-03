'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, ArrowLeft, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import PageShell from '@/components/page-shell'
import { cn } from '@/lib/utils'
import { US_STATES, RACES_BY_STATE } from '@/lib/mock-data'

export default function StateSelectionPage() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  const filtered = US_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.code.toLowerCase().includes(query.toLowerCase()),
  )

  const hasRaces = (code: string) => !!RACES_BY_STATE[code]

  function handleSelect(code: string) {
    setSelected(code)
  }

  function handleConfirm() {
    if (!selected) return
    router.push(`/vote?state=${selected}`)
  }

  return (
    <PageShell withNav={false}>
      <div className="flex flex-col min-h-svh bg-background">
        {/* Header */}
        <div className="px-5 pt-14 pb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm mb-5 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back
          </button>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <h1 className="text-2xl font-black text-foreground mb-1 text-balance">Select Your State</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We&apos;ll show you the races on your ballot.
            </p>
          </motion.div>
        </div>

        {/* Search */}
        <div className="px-5 mb-4">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search states…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 rounded-2xl h-11 bg-card border-border focus-visible:ring-2 focus-visible:ring-primary text-sm"
              aria-label="Search states"
            />
          </div>
        </div>

        {/* Selected banner */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-5 mb-4 px-4 py-3 rounded-2xl bg-brand-subtle border border-primary/20 flex items-center gap-3"
          >
            <MapPin size={16} className="text-primary shrink-0" aria-hidden="true" />
            <p className="text-sm font-semibold text-primary flex-1">
              {US_STATES.find((s) => s.code === selected)?.name} selected
            </p>
            {hasRaces(selected) ? (
              <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                Races available
              </span>
            ) : (
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">
                Coming soon
              </span>
            )}
          </motion.div>
        )}

        {/* Legend */}
        <div className="px-5 mb-3 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-primary" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">Races available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-border" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">Coming soon</span>
          </div>
        </div>

        {/* State grid */}
        <div
          className="flex-1 px-5 overflow-y-auto"
          style={{ maxHeight: 'calc(100svh - 340px)' }}
        >
          {filtered.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-10">No states found.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2.5 pb-4" role="listbox" aria-label="Select your state">
              {filtered.map(({ code, name }, i) => {
                const live = hasRaces(code)
                const isSelected = selected === code
                return (
                  <motion.button
                    key={code}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.012 }}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(code)}
                    className={cn(
                      'flex flex-col items-center justify-center py-3 px-2 rounded-2xl border-2 transition-all duration-200',
                      isSelected
                        ? 'border-primary bg-brand-subtle shadow-md scale-105'
                        : live
                        ? 'border-border bg-card hover:border-primary/50 hover:bg-brand-subtle/40'
                        : 'border-border bg-card opacity-60',
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm font-black tracking-tight',
                        isSelected ? 'text-primary' : live ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {code}
                    </span>
                    <span
                      className={cn(
                        'text-[9px] font-medium mt-0.5 text-center leading-tight',
                        isSelected ? 'text-primary' : 'text-muted-foreground',
                      )}
                    >
                      {name.length > 10 ? name.slice(0, 9) + '…' : name}
                    </span>
                    {live && (
                      <div
                        className={cn(
                          'w-1.5 h-1.5 rounded-full mt-1.5',
                          isSelected ? 'bg-primary' : 'bg-primary/60',
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </motion.button>
                )
              })}
            </div>
          )}
        </div>

        {/* Confirm button */}
        <div className="px-5 py-6 bg-background border-t border-border">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!selected}
            className={cn(
              'w-full py-4 rounded-2xl font-bold text-[15px] transition-all',
              selected
                ? 'bg-primary text-primary-foreground hover:opacity-90 active:scale-95'
                : 'bg-muted text-muted-foreground cursor-not-allowed',
            )}
          >
            {selected
              ? `View ${US_STATES.find((s) => s.code === selected)?.name} Races`
              : 'Select a State to Continue'}
          </button>
        </div>
      </div>
    </PageShell>
  )
}
