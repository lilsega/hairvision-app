import { useEffect, useRef, useState } from 'react'
import { useAppData } from '../../context/AppDataContext'
import { SteppedSlider, ContinuousSlider } from '../../components/RangeSlider/RangeSlider'
import { ToggleGroup } from '../../components/ToggleGroup/ToggleGroup'
import { GrowthDirectionHelp } from './GrowthDirectionHelp'
import type {
  Elasticity,
  GrowthDirection,
  HairDensity,
  HairThickness,
  HairType,
  NaturalVolume,
} from '../../types'
import styles from './ClientProfile.module.css'

const HAIR_TYPES: HairType[] = ['liso', 'ondulado', 'rizado', 'afro']
const THICKNESS: HairThickness[] = ['fino', 'medio', 'grueso']
const DENSITY: HairDensity[] = ['baja', 'media', 'alta']
const VOLUME: NaturalVolume[] = ['bajo', 'medio', 'alto']
const ELASTICITY: Elasticity[] = ['baja', 'media', 'alta']

const GROWTH_OPTIONS: { id: GrowthDirection; label: string }[] = [
  { id: 'frontal', label: 'Frontal' },
  { id: 'lateral', label: 'Lateral' },
  { id: 'remolino', label: 'Remolino' },
  { id: 'mixto', label: 'Mixto' },
]

const CONDITION_OPTIONS: { id: 'teñido' | 'decolorado'; label: string }[] = [
  { id: 'teñido', label: 'Teñido' },
  { id: 'decolorado', label: 'Decolorado' },
]

export function ClientProfile() {
  const { profile, updateProfile, updateHairStructure, updateBehavior, updateCondition } = useAppData()
  const [showHelp, setShowHelp] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [captured, setCaptured] = useState(Boolean(profile.capturedPhoto))
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (isRecording) {
      timerRef.current = window.setInterval(() => setElapsed((s) => s + 1), 1000)
    } else if (timerRef.current) {
      window.clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [isRecording])

  function toggleRecording() {
    if (isRecording) {
      setIsRecording(false)
      setCaptured(true)
      updateProfile({ capturedPhoto: 'mock-capture' })
    } else {
      setCaptured(false)
      setElapsed(0)
      setIsRecording(true)
    }
  }

  const conditionValue: ('teñido' | 'decolorado')[] = [
    ...(profile.condition.teñido ? (['teñido'] as const) : []),
    ...(profile.condition.decolorado ? (['decolorado'] as const) : []),
  ]

  function toggleCondition(id: 'teñido' | 'decolorado') {
    updateCondition({ [id]: !profile.condition[id] })
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0')
  const ss = String(elapsed % 60).padStart(2, '0')

  return (
    <div className={`screen ${styles.screen}`}>
      <div className={styles.layout}>
        {/* Left: capture + identity */}
        <div className={styles.left}>
          <button type="button" className={styles.recordBox} onClick={toggleRecording}>
            {captured && !isRecording ? (
              <>
                <CheckGlyph />
                <span className={styles.recordLabel}>Vídeo Capturado</span>
                <span className={styles.recordHint}>Toca para regrabar</span>
              </>
            ) : (
              <>
                <CameraGlyph pulsing={isRecording} />
                <span className={styles.recordLabel}>{isRecording ? 'Grabando…' : 'Grabar Vídeo'}</span>
                {isRecording && (
                  <span className={styles.recordTimer}>
                    <span className={styles.dot} /> {mm}:{ss}
                  </span>
                )}
              </>
            )}
          </button>

          <div className={styles.identity}>
            <input
              className={styles.input}
              placeholder="Nombre"
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder="Rango de edad (ej. 25-34)"
              value={profile.ageRange}
              onChange={(e) => updateProfile({ ageRange: e.target.value })}
            />
          </div>
        </div>

        {/* Right: structured profile */}
        <div className={styles.right}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Estructura de Pelo</h2>
            <SteppedSlider
              label="Tipo de Cabello"
              ticks={['Liso', 'Ondulado', 'Rizado', 'Afro']}
              valueIndex={HAIR_TYPES.indexOf(profile.hairStructure.type)}
              onChange={(i) => updateHairStructure({ type: HAIR_TYPES[i] })}
            />
            <SteppedSlider
              label="Grosor del Cabello"
              ticks={['Fino', 'Medio', 'Grueso']}
              valueIndex={THICKNESS.indexOf(profile.hairStructure.thickness)}
              onChange={(i) => updateHairStructure({ thickness: THICKNESS[i] })}
            />
            <SteppedSlider
              label="Densidad del Cabello"
              ticks={['Baja', 'Media', 'Alta']}
              valueIndex={DENSITY.indexOf(profile.hairStructure.density)}
              onChange={(i) => updateHairStructure({ density: DENSITY[i] })}
            />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Comportamiento</h2>
            <SteppedSlider
              label="Volumen Natural"
              ticks={['Bajo', 'Medio', 'Alto']}
              valueIndex={VOLUME.indexOf(profile.behavior.naturalVolume)}
              onChange={(i) => updateBehavior({ naturalVolume: VOLUME[i] })}
            />
            <SteppedSlider
              label="Elasticidad"
              ticks={['Baja', 'Media', 'Alta']}
              valueIndex={ELASTICITY.indexOf(profile.behavior.elasticity)}
              onChange={(i) => updateBehavior({ elasticity: ELASTICITY[i] })}
            />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Estado del Cabello</h2>
            <ContinuousSlider
              leftLabel="Natural"
              rightLabel="Dañado"
              value={profile.condition.damageLevel}
              onChange={(v) => updateCondition({ damageLevel: v })}
            />
            <ToggleGroup options={CONDITION_OPTIONS} value={conditionValue} onToggle={toggleCondition} columns={2} />
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Dirección del Crecimiento</h2>
              <button type="button" className={styles.helpButton} onClick={() => setShowHelp(true)} aria-label="Ver referencia">
                ?
              </button>
            </div>
            <ToggleGroup
              options={GROWTH_OPTIONS}
              value={profile.growthDirection ? [profile.growthDirection] : []}
              onToggle={(id) => updateProfile({ growthDirection: id })}
              columns={2}
            />
          </section>
        </div>
      </div>

      {showHelp && <GrowthDirectionHelp onClose={() => setShowHelp(false)} />}
    </div>
  )
}

function CameraGlyph({ pulsing }: { pulsing: boolean }) {
  return (
    <svg viewBox="0 0 64 52" className={[styles.camera, pulsing ? styles.cameraPulsing : ''].join(' ')} aria-hidden="true">
      <rect x="2" y="12" width="60" height="36" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 12 24 4h16l4 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="32" cy="30" r="12" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="32" cy="30" r="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="10" cy="19" r="1.6" fill="currentColor" />
    </svg>
  )
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 64 52" className={styles.camera} aria-hidden="true">
      <circle cx="32" cy="26" r="20" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M22 27 29 34 43 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
