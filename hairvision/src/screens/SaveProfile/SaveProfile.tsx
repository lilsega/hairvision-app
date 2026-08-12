import { useState } from 'react'
import { useAppData } from '../../context/AppDataContext'
import { useFlow } from '../../context/FlowContext'
import { Button } from '../../components/Button/Button'
import styles from './SaveProfile.module.css'

export function SaveProfile() {
  const { resetAll, persistProfile } = useAppData()
  const { goHome } = useFlow()
  const [saved, setSaved] = useState(false)

  function handleNew() {
    resetAll()
    goHome()
  }

  async function handleSave() {
    await persistProfile()
    setSaved(true)
  }

  return (
    <div className={`screen ${styles.screen}`}>
      <div className={styles.center}>
        <div className={styles.actions}>
          <Button variant="outline" icon="+" onClick={handleNew}>
            Nuevo
          </Button>
          <Button variant={saved ? 'primary' : 'outline'} onClick={handleSave} disabled={saved}>
            {saved ? 'Perfil Guardado' : 'Guardar Perfil'}
          </Button>
        </div>
        {saved && <p className={styles.confirmation}>El perfil de la clienta quedó guardado para la próxima visita.</p>}
      </div>
    </div>
  )
}
