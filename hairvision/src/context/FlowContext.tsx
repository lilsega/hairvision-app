import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { FLOW_STEPS, type FlowStep } from '../types'

interface FlowContextValue {
  step: FlowStep
  stepIndex: number
  isFirst: boolean
  isLast: boolean
  goNext: () => void
  goBack: () => void
  goHome: () => void
  /**
   * Lets the screen currently on stage intercept the "atrás" gesture —
   * e.g. Ajustes de Corte closes an open sub-panel (Flequillo/Largada)
   * on the first back-tap instead of leaving the whole screen.
   * Return true to consume the gesture, false to fall through to the
   * normal step-back behaviour.
   */
  setBackInterceptor: (fn: (() => boolean) | null) => void
  /**
   * Lets a screen block "siguiente" until it's valid (e.g. nombre requerido).
   */
  setNextGuard: (fn: (() => boolean) | null) => void
}

const FlowContext = createContext<FlowContextValue | null>(null)

export function FlowProvider({ children }: { children: ReactNode }) {
  const [stepIndex, setStepIndex] = useState(0)
  const backInterceptor = useRef<(() => boolean) | null>(null)
  const nextGuard = useRef<(() => boolean) | null>(null)

  const goNext = useCallback(() => {
    if (nextGuard.current && !nextGuard.current()) return
    setStepIndex((i) => Math.min(i + 1, FLOW_STEPS.length - 1))
  }, [])

  const goBack = useCallback(() => {
    if (backInterceptor.current && backInterceptor.current()) return
    setStepIndex((i) => Math.max(i - 1, 0))
  }, [])

  const goHome = useCallback(() => {
    setStepIndex(0)
  }, [])

  const setBackInterceptor = useCallback((fn: (() => boolean) | null) => {
    backInterceptor.current = fn
  }, [])

  const setNextGuard = useCallback((fn: (() => boolean) | null) => {
    nextGuard.current = fn
  }, [])

  const value = useMemo<FlowContextValue>(
    () => ({
      step: FLOW_STEPS[stepIndex],
      stepIndex,
      isFirst: stepIndex === 0,
      isLast: stepIndex === FLOW_STEPS.length - 1,
      goNext,
      goBack,
      goHome,
      setBackInterceptor,
      setNextGuard,
    }),
    [stepIndex, goNext, goBack, goHome, setBackInterceptor, setNextGuard],
  )

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export function useFlow() {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow must be used within a FlowProvider')
  return ctx
}
