import { useState } from 'react'
import { useFlow } from '../../context/FlowContext'
import { useAppData } from '../../context/AppDataContext'
import { profileRepository } from '../../services'
import { Button } from '../../components/Button/Button'
import type { ClientProfile } from '../../types'
import styles from './Home.module.css'

export function Home() {
  const { goNext } = useFlow()
  const { resetAll, loadProfile } = useAppData()
  const [profiles, setProfiles] = useState<ClientProfile[] | null>(null)
  const [loading, setLoading] = useState(false)

  function handleNewClient() {
    resetAll()
    goNext()
  }

  async function handleOpenPicker() {
    setLoading(true)
    const list = await profileRepository.list()
    setProfiles(list)
    setLoading(false)
  }

  function handlePick(p: ClientProfile) {
    loadProfile(p)
    setProfiles(null)
    goNext()
  }

  return (
    <div className={`screen ${styles.screen}`}>
      <div className={styles.center}>
        <h1 className={styles.logo}>
          Hair Visi<CameraGlyph />n
        </h1>

        <div className={styles.actions}>
          <Button variant="outline" icon="+" onClick={handleNewClient}>
            Nuevo Cliente
          </Button>
          <Button variant="outline" onClick={handleOpenPicker} disabled={loading}>
            Cargar Perfil
          </Button>
        </div>
      </div>

      {profiles && (
        <div className={styles.overlay} onClick={() => setProfiles(null)}>
          <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.sheetTitle}>Perfiles guardados</h2>
            {profiles.length === 0 && <p className={styles.empty}>Todavía no hay perfiles guardados.</p>}
            <div className={styles.list}>
              {profiles.map((p) => (
                <button key={p.id} type="button" className={styles.profileItem} onClick={() => handlePick(p)}>
                  <span className={styles.profileName}>{p.name || 'Sin nombre'}</span>
                  <span className={styles.profileMeta}>{p.ageRange || '—'}</span>
                </button>
              ))}
            </div>
            <Button variant="ghost" onClick={() => setProfiles(null)}>
              Cerrar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function CameraGlyph() {
  return (
    <svg viewBox="0 0 40 32" className={styles.camera} aria-hidden="true">
      <rect x="1" y="7" width="38" height="23" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7 15 2h10l3 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="20" cy="19" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="19" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="12" r="1.2" fill="currentColor" />
    </svg>
  )
}
