import { useAppData } from '../../context/AppDataContext'
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader'
import { ContinuousSlider } from '../../components/RangeSlider/RangeSlider'
import { HairSilhouette } from '../../components/HairSilhouette/HairSilhouette'
import styles from './CutAdjustments.module.css'

export function LengthPanel() {
  const { selections, updateSelections } = useAppData()

  return (
    <div className={styles.subscreen}>
      <ScreenHeader title="Largada de Corte" />
      <div className={styles.lengthLayout}>
        <div className={styles.lengthPreview}>
          <HairSilhouette variant="recto" />
        </div>
        <ContinuousSlider
          orientation="vertical"
          leftLabel="Largo"
          rightLabel="Corto"
          value={selections.lengthValue}
          onChange={(v) => updateSelections({ lengthValue: v })}
        />
      </div>
    </div>
  )
}
