import type { ReactNode } from 'react'
import { useAppData } from '../../context/AppDataContext'
import { useFlow } from '../../context/FlowContext'
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader'
import { HairSilhouette } from '../../components/HairSilhouette/HairSilhouette'
import { HAIRCUT_TYPES, BANGS_TYPES, SUGGESTION_OPTIONS } from '../../services/hairData'
import styles from './SummaryReview.module.css'

/**
 * Added beyond the original wireframe (agreed with Sega): a quick,
 * editable checkpoint before generating the result, so nothing goes to
 * the "IA" step by accident. Each row jumps back to the screen where
 * that choice was made.
 */
export function SummaryReview() {
  const { profile, selections, cartCount } = useAppData()
  const { goBack } = useFlow()

  const suggestion = SUGGESTION_OPTIONS.find((o) => o.id === selections.suggestion)
  const haircut = HAIRCUT_TYPES.find((o) => o.id === selections.haircutType)
  const bangs = BANGS_TYPES.find((o) => o.id === selections.bangs)

  return (
    <div className={`screen ${styles.screen}`}>
      <ScreenHeader title="Resumen de la Sesión" cartCount={cartCount} />

      <div className={styles.list}>
        <Row label="Clienta" value={`${profile.name || 'Sin nombre'} · ${profile.ageRange || 'sin rango de edad'}`} />
        <Row
          label="Sugerencia"
          value={selections.suggestion === 'none' ? 'Ninguna convenció' : suggestion?.label ?? 'Sin elegir'}
          media={suggestion && <HairSilhouette variant={suggestion.silhouette} />}
        />
        <Row
          label="Tipo de corte"
          value={haircut?.label ?? 'Sin elegir'}
          media={haircut && <HairSilhouette variant={haircut.silhouette} />}
        />
        <Row
          label="Flequillo"
          value={bangs?.label ?? 'Sin flequillo'}
          media={bangs && <HairSilhouette variant={bangs.silhouette} />}
        />
        <Row label="Largada de corte" value={`${selections.lengthValue}%`} />
        <Row label="Reducción de volumen" value={selections.volumeReduction ? 'Sí' : 'No'} />
      </div>

      <p className={styles.hint}>Toca “atrás” para ajustar cualquier elección antes de generar el resultado.</p>
      <button type="button" className={styles.editLink} onClick={goBack}>
        ← Editar ajustes de corte
      </button>
    </div>
  )
}

function Row({ label, value, media }: { label: string; value: string; media?: ReactNode }) {
  return (
    <div className={styles.row}>
      {media && <div className={styles.rowMedia}>{media}</div>}
      <div className={styles.rowText}>
        <span className={styles.rowLabel}>{label}</span>
        <span className={styles.rowValue}>{value}</span>
      </div>
    </div>
  )
}
