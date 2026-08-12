import { useEffect, useRef, useState } from 'react'
import { useAppData } from '../../context/AppDataContext'
import { useFlow } from '../../context/FlowContext'
import { hairPreviewService, type PreviewResult } from '../../services'
import { ScreenHeader } from '../../components/ScreenHeader/ScreenHeader'
import { BeforeAfterView } from '../../components/BeforeAfterView/BeforeAfterView'
import { HairSilhouette } from '../../components/HairSilhouette/HairSilhouette'
import styles from './ResultPreview.module.css'

export function ResultPreview() {
  const { profile, selections } = useAppData()
  const { setNextGuard } = useFlow()
  const [status, setStatus] = useState<'loading' | 'ready'>('loading')
  const [result, setResult] = useState<PreviewResult | null>(null)
  const resultRef = useRef<PreviewResult | null>(null)

  useEffect(() => {
    setStatus('loading')
    hairPreviewService.generate(profile, selections).then((r) => {
      resultRef.current = r
      setResult(r)
      setStatus('ready')
    })
    // Re-generate whenever the client profile or any selection changes,
    // e.g. after going back to tweak a choice and returning here.
  }, [profile, selections])

  useEffect(() => {
    setNextGuard(() => resultRef.current !== null)
    return () => setNextGuard(null)
  }, [setNextGuard])

  return (
    <div className={`screen ${styles.screen}`}>
      <ScreenHeader title="Resultado Final Aproximado" />

      <div className={styles.stage}>
        {status === 'loading' ? (
          <div className={styles.loading}>
            <span className={styles.spinner} />
            <p>Generando simulación…</p>
          </div>
        ) : (
          <BeforeAfterView
            before={<HairSilhouette variant="base" />}
            after={<HairSilhouette variant={result?.afterSilhouette ?? 'base'} />}
          />
        )}
      </div>

      <p className={styles.caption}>
        Toca una de las dos fotos para verla en grande y mantén pulsado para comparar el antes y el después.
      </p>
      {status === 'ready' && <p className={styles.note}>{result?.note}</p>}
      <p className={styles.disclaimer}>Simulación orientativa — no sustituye el resultado real del corte.</p>
    </div>
  )
}
