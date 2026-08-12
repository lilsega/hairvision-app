import { useAppData } from '../../context/AppDataContext'
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader'
import { SelectableCard } from '../../components/SelectableCard/SelectableCard'
import { HairSilhouette } from '../../components/HairSilhouette/HairSilhouette'
import { BANGS_TYPES } from '../../services/hairData'
import styles from './CutAdjustments.module.css'

export function BangsPanel() {
  const { selections, updateSelections, cartCount } = useAppData()

  return (
    <div className={styles.subscreen}>
      <ScreenHeader title="Flequillo" cartCount={cartCount} />
      <div className={styles.bangsGrid}>
        {BANGS_TYPES.map((opt) => (
          <SelectableCard
            key={opt.id}
            label={opt.label}
            selected={selections.bangs === opt.id}
            onSelect={() => updateSelections({ bangs: opt.id })}
            media={<HairSilhouette variant={opt.silhouette} />}
          />
        ))}
      </div>
    </div>
  )
}
