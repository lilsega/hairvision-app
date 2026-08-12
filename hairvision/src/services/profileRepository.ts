import type { ClientProfile } from '../types'

/**
 * Storage abstraction for client profiles.
 *
 * The MVP has no backend, so `LocalStorageProfileRepository` persists to the
 * browser via localStorage. When a real API exists, implement this same
 * interface (e.g. `ApiProfileRepository`) and swap it in `services/index.ts`
 * — no screen or component needs to change.
 */
export interface ProfileRepository {
  list(): Promise<ClientProfile[]>
  get(id: string): Promise<ClientProfile | null>
  save(profile: ClientProfile): Promise<ClientProfile>
  remove(id: string): Promise<void>
}

const STORAGE_KEY = 'hairvision.profiles'

function readAll(): ClientProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ClientProfile[]) : []
  } catch {
    return []
  }
}

function writeAll(profiles: ClientProfile[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles))
}

export class LocalStorageProfileRepository implements ProfileRepository {
  async list(): Promise<ClientProfile[]> {
    return readAll().sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
  }

  async get(id: string): Promise<ClientProfile | null> {
    return readAll().find((p) => p.id === id) ?? null
  }

  async save(profile: ClientProfile): Promise<ClientProfile> {
    const all = readAll()
    const idx = all.findIndex((p) => p.id === profile.id)
    const updated: ClientProfile = { ...profile, updatedAt: new Date().toISOString() }
    if (idx >= 0) {
      all[idx] = updated
    } else {
      all.push(updated)
    }
    writeAll(all)
    return updated
  }

  async remove(id: string): Promise<void> {
    writeAll(readAll().filter((p) => p.id !== id))
  }
}
