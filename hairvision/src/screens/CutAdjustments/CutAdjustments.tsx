import { useEffect, useRef, useState } from 'react'
import { useFlow } from '../../context/FlowContext'
import { useAppData } from '../../context/AppDataContext'
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader'
import { BangsPanel } from './BangsPanel'
import { LengthPanel } from './LengthPanel'
import styles from './CutAdjustments.module.css'

type Subview = 'none' | 'bangs' | 'length'

export function CutAdjustments() {
  const { setBackInterceptor } = useFlow()
  const { selections, updateSelections, cartCount } = useAppData()
  const [subview, setSubview] = useState<Subview>('none')
  const subviewRef = useRef<Subview>('none')

  useEffect(() => {
    subviewRef.current = subview
  }, [subview])

  useEffect(() => {
    setBackInterceptor(() => {
      if (subviewRef.current !== 'none') {
        setSubview('none')
        return true
      }
      return false
    })
    return () => setBackInterceptor(null)
    // Intentionally empty deps: the interceptor reads subview via subviewRef,
    // so it never needs to be re-registered when subview changes.
  }, [])

  if (subview === 'bangs') return <BangsPanel />
  if (subview === 'length') return <LengthPanel />

  return (
    <div className={`screen ${styles.screen}`}>
      <ScreenHeader title="Ajustes de Corte" cartCount={cartCount} />
      <div className={styles.grid}>
        <button type="button" className={styles.tile} onClick={() => setSubview('bangs')}>
          Flequillo
          {selections.bangs && <span className={styles.tileTag}>{selections.bangs.replace('flequillo-', '')}</span>}
        </button>
        <button type="button" className={styles.tile} onClick={() => setSubview('length')}>
          Largada de Corte
        </button>
        <button
          type="button"
          className={[styles.tile, styles.tileWide, selections.volumeReduction ? styles.tileActive : ''].join(' ')}
          onClick={() => updateSelections({ volumeReduction: !selections.volumeReduction })}
        >
          Reducción de Volumen
        </button>
      </div>
    </div>
  )
}
