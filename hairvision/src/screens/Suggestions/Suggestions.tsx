import { useAppData } from '../../context/AppDataContext'
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader'
import { SelectableCard } from '../../components/SelectableCard/SelectableCard'
import { HairSilhouette } from '../../components/HairSilhouette/HairSilhouette'
import { SUGGESTION_OPTIONS } from '../../services/hairData'
import styles from './Suggestions.module.css'

export function Suggestions() {
  const { selections, updateSelections, cartCount } = useAppData()

  return (
    <div className={`screen ${styles.screen}`}>
      <ScreenHeader title="Sugerencias Según el Tipo de Cabello" cartCount={cartCount} />
      <div className={styles.grid}>
        {SUGGESTION_OPTIONS.map((opt) => (
          <SelectableCard
            key={opt.id}
            label={opt.label}
            selected={selections.suggestion === opt.id}
            onSelect={() => updateSelections({ suggestion: opt.id })}
            media={<HairSilhouette variant={opt.silhouette} />}
          />
        ))}
        <SelectableCard
          label="No me convence ninguno"
          selected={selections.suggestion === 'none'}
          onSelect={() => updateSelections({ suggestion: 'none' })}
        />
      </div>
    </div>
  )
}
