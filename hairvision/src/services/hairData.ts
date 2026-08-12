import type { BangsOption, HaircutOption } from '../types'

// NOTE: the original wireframe used real stock/celebrity photos as visual
// reference for each option. Those are not appropriate to ship in the
// product (licensing + likeness rights), so the MVP renders lightweight
// line-art silhouettes instead (see components/HairSilhouette). Swap this
// data source for real photography once the salon has a photo library.

export const HAIRCUT_TYPES: HaircutOption[] = [
  { id: 'corte-recto', label: 'Corte Recto', silhouette: 'recto' },
  { id: 'corte-capas', label: 'Corte a Capas', silhouette: 'capas' },
  { id: 'corte-bob', label: 'Corte Bob', silhouette: 'bob' },
  { id: 'corte-pixie', label: 'Corte Pixie', silhouette: 'pixie' },
  { id: 'corte-shag', label: 'Corte Shag', silhouette: 'shag' },
  { id: 'corte-degradado', label: 'Corte Degradado', silhouette: 'degradado' },
  { id: 'corte-asimetrico', label: 'Corte Asimétrico', silhouette: 'asimetrico' },
]

export const BANGS_TYPES: BangsOption[] = [
  { id: 'flequillo-recto', label: 'Flequillo Recto', silhouette: 'flequillo-recto' },
  { id: 'flequillo-cortina', label: 'Flequillo Cortina', silhouette: 'flequillo-cortina' },
  { id: 'flequillo-lateral', label: 'Flequillo Lateral', silhouette: 'flequillo-lateral' },
]

export const SUGGESTION_OPTIONS: { id: 'x' | 'y'; label: string; silhouette: string }[] = [
  { id: 'x', label: 'Opción X', silhouette: 'sugerencia-x' },
  { id: 'y', label: 'Opción Y', silhouette: 'sugerencia-y' },
]
