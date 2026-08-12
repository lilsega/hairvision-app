import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  createEmptyProfile,
  emptySelections,
  type ClientProfile,
  type HairBehavior,
  type HairCondition,
  type HairStructure,
  type Selections,
} from '../types'
import { profileRepository } from '../services'

interface AppDataContextValue {
  profile: ClientProfile
  selections: Selections
  cartCount: number
  updateProfile: (patch: Partial<ClientProfile>) => void
  updateHairStructure: (patch: Partial<HairStructure>) => void
  updateBehavior: (patch: Partial<HairBehavior>) => void
  updateCondition: (patch: Partial<HairCondition>) => void
  updateSelections: (patch: Partial<Selections>) => void
  loadProfile: (profile: ClientProfile) => void
  resetAll: () => void
  persistProfile: () => Promise<ClientProfile>
}

const AppDataContext = createContext<AppDataContextValue | null>(null)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ClientProfile>(() => createEmptyProfile())
  const [selections, setSelections] = useState<Selections>(emptySelections)

  const updateProfile = useCallback((patch: Partial<ClientProfile>) => {
    setProfile((p) => ({ ...p, ...patch }))
  }, [])

  const updateHairStructure = useCallback((patch: Partial<HairStructure>) => {
    setProfile((p) => ({ ...p, hairStructure: { ...p.hairStructure, ...patch } }))
  }, [])

  const updateBehavior = useCallback((patch: Partial<HairBehavior>) => {
    setProfile((p) => ({ ...p, behavior: { ...p.behavior, ...patch } }))
  }, [])

  const updateCondition = useCallback((patch: Partial<HairCondition>) => {
    setProfile((p) => ({ ...p, condition: { ...p.condition, ...patch } }))
  }, [])

  const updateSelections = useCallback((patch: Partial<Selections>) => {
    setSelections((s) => ({ ...s, ...patch }))
  }, [])

  const loadProfile = useCallback((loaded: ClientProfile) => {
    setProfile(loaded)
    setSelections(emptySelections)
  }, [])

  const resetAll = useCallback(() => {
    setProfile(createEmptyProfile())
    setSelections(emptySelections)
  }, [])

  const persistProfile = useCallback(async () => {
    return profileRepository.save(profile)
  }, [profile])

  const cartCount = useMemo(
    () => [selections.suggestion, selections.haircutType, selections.bangs].filter(Boolean).length,
    [selections.suggestion, selections.haircutType, selections.bangs],
  )

  const value = useMemo<AppDataContextValue>(
    () => ({
      profile,
      selections,
      cartCount,
      updateProfile,
      updateHairStructure,
      updateBehavior,
      updateCondition,
      updateSelections,
      loadProfile,
      resetAll,
      persistProfile,
    }),
    [
      profile,
      selections,
      cartCount,
      updateProfile,
      updateHairStructure,
      updateBehavior,
      updateCondition,
      updateSelections,
      loadProfile,
      resetAll,
      persistProfile,
    ],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider')
  return ctx
}
