'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { US_STATES } from '@/lib/mock-data'

interface ActiveState {
  code: string
  name: string
}

interface StateContextValue {
  activeState: ActiveState
  setActiveState: (code: string) => void
}

const DEFAULT_STATE: ActiveState = { code: 'FL', name: 'Florida' }

const StateContext = createContext<StateContextValue>({
  activeState: DEFAULT_STATE,
  setActiveState: () => {},
})

export function StateProvider({ children }: { children: ReactNode }) {
  const [activeState, setActiveStateRaw] = useState<ActiveState>(DEFAULT_STATE)
  const [hydrated, setHydrated] = useState(false)

  // Rehydrate from localStorage after mount
  useEffect(() => {
    const stored = localStorage.getItem('votepulse-active-state')
    if (stored) {
      const found = US_STATES.find((s) => s.code === stored)
      if (found) setActiveStateRaw({ code: found.code, name: found.name })
    }
    setHydrated(true)
  }, [])

  function setActiveState(code: string) {
    const found = US_STATES.find((s) => s.code === code)
    if (!found) return
    const next = { code: found.code, name: found.name }
    setActiveStateRaw(next)
    localStorage.setItem('votepulse-active-state', code)
  }

  // Avoid flash of wrong state during SSR hydration
  if (!hydrated) return null

  return (
    <StateContext.Provider value={{ activeState, setActiveState }}>
      {children}
    </StateContext.Provider>
  )
}

export function useActiveState() {
  return useContext(StateContext)
}
