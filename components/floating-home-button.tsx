'use client'

import Link from 'next/link'
import { Home, ArrowRight, Loader2 } from 'lucide-react'
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

        {/* Submit button — slides in when action is set */}
        <AnimatePresence>
          {action && (
            <motion.button
              key="submit-btn"
              initial={{ opacity: 0, scale: 0.75, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.75, x: -8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              type="button"
              onClick={action.disabled || action.loading ? undefined : action.onSubmit}
              disabled={action.disabled || action.loading}
              className={cn(
                'h-14 px-5 rounded-full flex items-center gap-2.5 shadow-xl font-bold text-[14px] transition-colors',
                action.disabled
                  ? 'bg-foreground/30 text-background/50 cursor-not-allowed'
                  : 'bg-primary text-white active:scale-95',
              )}
              aria-label={action.label}
            >
              {action.loading ? (
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              ) : (
                <>
                  <span>{action.label}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </>
              )}
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
