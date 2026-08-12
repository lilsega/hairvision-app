import type { ClientProfile, Selections } from '../types'

export interface PreviewResult {
  beforeSilhouette: string
  afterSilhouette: string
  /** Short, human copy describing what was "generated" — placeholder for a real model's summary. */
  note: string
}

/**
 * Generates the "before / after" preview shown on the result screen.
 *
 * There is no real AI model yet. `MockHairPreviewService` fakes network
 * latency and derives a plausible-looking result from the client's
 * selections so the demo feels alive. Replace with a real implementation
 * (e.g. calling an image-generation API) without touching ResultPreview.
 */
export interface HairPreviewService {
  generate(profile: ClientProfile, selections: Selections): Promise<PreviewResult>
}

export class MockHairPreviewService implements HairPreviewService {
  async generate(profile: ClientProfile, selections: Selections): Promise<PreviewResult> {
    // Simulated processing delay so the loading state has something to show.
    await new Promise((resolve) => setTimeout(resolve, 1600))

    const cut = selections.haircutType ?? 'corte-recto'
    const bangs = selections.bangs ?? 'none'

    return {
      beforeSilhouette: 'base',
      afterSilhouette: `${cut}__${bangs}`,
      note: `Simulación generada para ${profile.name || 'la clienta'} según el corte y ajustes seleccionados.`,
    }
  }
}
