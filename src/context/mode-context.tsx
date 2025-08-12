"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type Mode = "businesses" | "customers"

interface ModeContextType {
  mode: Mode
  setMode: (mode: Mode) => void
  toggleMode: () => void
}

const ModeContext = createContext<ModeContextType | undefined>(undefined)

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("businesses") // Default to businesses as per requirements

  // Persist mode to localStorage and sync across tabs
  useEffect(() => {
    const savedMode = localStorage.getItem("partners-points-mode") as Mode
    if (savedMode && (savedMode === "businesses" || savedMode === "customers")) {
      setModeState(savedMode)
    }
  }, [])

  const setMode = (newMode: Mode) => {
    setModeState(newMode)
    localStorage.setItem("partners-points-mode", newMode)
    
    // Dispatch custom event to sync across components
    window.dispatchEvent(new CustomEvent("mode-change", { detail: newMode }))
  }

  const toggleMode = () => {
    const newMode = mode === "businesses" ? "customers" : "businesses"
    setMode(newMode)
  }

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const context = useContext(ModeContext)
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider")
  }
  return context
}