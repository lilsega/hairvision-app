// Core domain types for HairVision.
// Kept framework-agnostic so they can be reused if a backend / real API
// is introduced later without touching UI code.

export type HairType = 'liso' | 'ondulado' | 'rizado' | 'afro'
export type HairThickness = 'fino' | 'medio' | 'grueso'
export type HairDensity = 'baja' | 'media' | 'alta'
export type NaturalVolume = 'bajo' | 'medio' | 'alto'
export type Elasticity = 'baja' | 'media' | 'alta'
export type GrowthDirection = 'frontal' | 'lateral' | 'remolino' | 'mixto'

export interface HairStructure {
  type: HairType
  thickness: HairThickness
  density: HairDensity
}

export interface HairBehavior {
  naturalVolume: NaturalVolume
  elasticity: Elasticity
}

export interface HairCondition {
  /** 0 = natural, 100 = dañado */
  damageLevel: number
  teñido: boolean
  decolorado: boolean
}

export interface ClientProfile {
  id: string
  name: string
  ageRange: string
  /** data URL of the still captured from the mock camera step, if any */
  capturedPhoto: string | null
  hairStructure: HairStructure
  behavior: HairBehavior
  condition: HairCondition
  growthDirection: GrowthDirection | null
  createdAt: string
  updatedAt: string
}

export type SuggestionChoice = 'x' | 'y' | 'none'

export interface HaircutOption {
  id: string
  label: string
  /** identifier used to pick an illustration in <HairSilhouette /> */
  silhouette: string
}

export interface BangsOption {
  id: string
  label: string
  silhouette: string
}

export interface Selections {
  suggestion: SuggestionChoice | null
  haircutType: string | null
  bangs: string | null
  /** 0-100, continuous */
  lengthValue: number
  volumeReduction: boolean
}

export const emptySelections: Selections = {
  suggestion: null,
  haircutType: null,
  bangs: null,
  lengthValue: 60,
  volumeReduction: false,
}

export function createEmptyProfile(): ClientProfile {
  const now = new Date().toISOString()
  return {
    id: crypto.randomUUID(),
    name: '',
    ageRange: '',
    capturedPhoto: null,
    hairStructure: { type: 'ondulado', thickness: 'medio', density: 'media' },
    behavior: { naturalVolume: 'medio', elasticity: 'media' },
    condition: { damageLevel: 20, teñido: false, decolorado: false },
    growthDirection: null,
    createdAt: now,
    updatedAt: now,
  }
}

/** Global step order for the main "siguiente / atrás" flow. */
export const FLOW_STEPS = [
  'home',
  'clientProfile',
  'suggestions',
  'haircutTypes',
  'cutAdjustments',
  'summaryReview',
  'resultPreview',
  'saveProfile',
] as const

export type FlowStep = (typeof FLOW_STEPS)[number]
