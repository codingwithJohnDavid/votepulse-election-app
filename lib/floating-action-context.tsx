'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

interface FloatingAction {
  label: string
  onSubmit: () => void
  disabled?: boolean
  loading?: boolean
}

interface FloatingActionContextValue {
  action: FloatingAction | null
  setAction: (action: FloatingAction | null) => void
  clearAction: () => void
}

const FloatingActionContext = createContext<FloatingActionContextValue>({
  action: null,
  setAction: () => {},
  clearAction: () => {},
})

export function FloatingActionProvider({ children }: { children: ReactNode }) {
  const [action, setActionState] = useState<FloatingAction | null>(null)

  const setAction = useCallback((a: FloatingAction | null) => {
    setActionState(a)
  }, [])

  const clearAction = useCallback(() => {
    setActionState(null)
  }, [])

  return (
    <FloatingActionContext.Provider value={{ action, setAction, clearAction }}>
      {children}
    </FloatingActionContext.Provider>
  )
}

export function useFloatingAction() {
  return useContext(FloatingActionContext)
}
