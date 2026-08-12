// Composition root for services. Screens/context import from here, never
// from a concrete implementation directly — this is the single place to
// swap a mock for a real backend or AI integration later.
import { LocalStorageProfileRepository, type ProfileRepository } from './profileRepository'
import { MockHairPreviewService, type HairPreviewService } from './hairPreviewService'

export const profileRepository: ProfileRepository = new LocalStorageProfileRepository()
export const hairPreviewService: HairPreviewService = new MockHairPreviewService()

export type { ProfileRepository } from './profileRepository'
export type { HairPreviewService, PreviewResult } from './hairPreviewService'
