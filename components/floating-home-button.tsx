'use client'

import Link from 'next/link'
import { Home, ChevronRight, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFloatingAction } from '@/lib/floating-action-context'
import { cn } from '@/lib/utils'

export default function FloatingHomeButton() {
  const { action } = useFloatingAction()

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] flex justify-center pointer-events-none z-50"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
    >
      <div className="flex items-center gap-3 pointer-events-auto">

        {/* Home button — always visible */}
        <Link
          href="/home"
          className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center shadow-xl active:scale-95 transition-transform"
          aria-label="Go to dashboard"
        >
          <Home size={22} className="text-background" aria-hidden="true" />
        </Link>

        {/* Submit button — circular, slides in when action is set */}
        <AnimatePresence>
          {action && (
            <motion.button
              key="submit-btn"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              type="button"
              onClick={action.disabled || action.loading ? undefined : action.onSubmit}
              disabled={action.disabled || action.loading}
              aria-label={action.label}
              className={cn(
                'w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform',
                action.loading
                  ? 'bg-foreground cursor-default'
                  : action.disabled
                    ? 'bg-foreground/25 cursor-not-allowed'
                    : 'bg-foreground active:scale-95 cursor-pointer',
              )}
            >
              {action.loading ? (
                <Loader2 size={22} className="text-background animate-spin" aria-hidden="true" />
              ) : (
                <ChevronRight
                  size={26}
                  strokeWidth={2.5}
                  className={cn(
                    action.disabled ? 'text-background/40' : 'text-background',
                  )}
                  aria-hidden="true"
                />
              )}
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
