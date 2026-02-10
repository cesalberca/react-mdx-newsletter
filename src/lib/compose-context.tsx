"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface ComposeContextValue {
  isComposeOpen: boolean
  setComposeOpen: (open: boolean) => void
}

const ComposeContext = createContext<ComposeContextValue | null>(null)

export function ComposeProvider({ children }: { children: ReactNode }) {
  const [isComposeOpen, setComposeOpen] = useState(false)
  return (
    <ComposeContext.Provider value={{ isComposeOpen, setComposeOpen }}>
      {children}
    </ComposeContext.Provider>
  )
}

export function useCompose() {
  const ctx = useContext(ComposeContext)
  if (!ctx) throw new Error("useCompose must be used within ComposeProvider")
  return ctx
}
