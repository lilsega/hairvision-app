import { useAppData } from '../../context/AppDataContext'
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader'
import { SelectableCard } from '../../components/SelectableCard/SelectableCard'
import { HairSilhouette } from '../../components/HairSilhouette/HairSilhouette'
import { HAIRCUT_TYPES } from '../../services/hairData'
import styles from './HaircutTypes.module.css'

export function HaircutTypes() {
  const { selections, updateSelections, cartCount } = useAppData()

  return (
    <div className={`screen ${styles.screen}`}>
      <ScreenHeader title="Tipos de Cortes" cartCount={cartCount} />
      <div className={styles.grid}>
        {HAIRCUT_TYPES.map((opt) => (
          <SelectableCard
            key={opt.id}
            label={opt.label}
            selected={selections.haircutType === opt.id}
            onSelect={() => updateSelections({ haircutType: opt.id })}
            media={<HairSilhouette variant={opt.silhouette} />}
            compact
          />
        ))}
      </div>
    </div>
  )
}
