'use client'

import Link from 'next/link'
import { Home } from 'lucide-react'

export default function FloatingHomeButton() {
  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] flex justify-center pointer-events-none z-50"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.5rem)' }}
    >
      <Link
        href="/home"
        className="pointer-events-auto w-14 h-14 rounded-full bg-foreground flex items-center justify-center shadow-xl active:scale-95 transition-transform"
        aria-label="Home"
      >
        <Home size={22} className="text-background" aria-hidden="true" />
      </Link>
    </div>
  )
}
