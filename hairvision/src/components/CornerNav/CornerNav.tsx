import { useFlow } from '../../context/FlowContext'
import styles from './CornerNav.module.css'

/**
 * Tablet-first navigation: taps in the three corners drive the flow,
 * matching the original design (esquina arriba-izq = pantalla nueva,
 * abajo-izq = atrás, abajo-der = siguiente). Each zone shows a small,
 * translucent icon as an affordance — enough for a stylist meeting the
 * app for the first time in a live demo, without turning it into a
 * conventional toolbar.
 */
export function CornerNav() {
  const { goNext, goBack, goHome, isFirst, isLast, step } = useFlow()

  return (
    <>
      {step !== 'home' && (
        <button
          type="button"
          className={[styles.zone, styles.topLeft].join(' ')}
          onClick={goHome}
          aria-label="Nueva pantalla de inicio"
        >
          <HomeIcon />
        </button>
      )}

      {!isFirst && (
        <button
          type="button"
          className={[styles.zone, styles.bottomLeft].join(' ')}
          onClick={goBack}
          aria-label="Volver atrás"
        >
          <BackIcon />
        </button>
      )}

      {!isLast && step !== 'home' && (
        <button
          type="button"
          className={[styles.zone, styles.bottomRight].join(' ')}
          onClick={goNext}
          aria-label="Siguiente"
        >
          <NextIcon />
        </button>
      )}
    </>
  )
}

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path
        d="M4 11.5 12 5l8 6.5M6 10v8h12v-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
