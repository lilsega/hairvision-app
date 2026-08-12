import { useRef, useState, type PointerEvent, type ReactNode } from 'react'
import styles from './BeforeAfterView.module.css'

interface BeforeAfterViewProps {
  before: ReactNode
  after: ReactNode
  beforeLabel?: string
  afterLabel?: string
}

/**
 * Antes/Después viewer.
 * - Tap a panel to open it full screen.
 * - Press and hold while expanded to reveal a before/after compare slider
 *   (same idea as the iOS Photos edit-compare gesture).
 * - Release, or tap the backdrop, to go back.
 */
export function BeforeAfterView({ before, after, beforeLabel = 'Antes', afterLabel = 'Después' }: BeforeAfterViewProps) {
  const [expanded, setExpanded] = useState<'before' | 'after' | null>(null)
  const [comparePos, setComparePos] = useState<number | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (comparePos === null) return
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    const pct = ((e.clientX - rect.left) / rect.width) * 100
    setComparePos(Math.min(100, Math.max(0, pct)))
  }

  if (!expanded) {
    return (
      <div className={styles.grid}>
        <button type="button" className={styles.panel} onClick={() => setExpanded('before')}>
          <div className={styles.panelMedia}>{before}</div>
          <span className={styles.panelLabel}>{beforeLabel}</span>
        </button>
        <button type="button" className={styles.panel} onClick={() => setExpanded('after')}>
          <div className={styles.panelMedia}>{after}</div>
          <span className={styles.panelLabel}>{afterLabel}</span>
        </button>
      </div>
    )
  }

  return (
    <div className={styles.overlay} onClick={() => comparePos === null && setExpanded(null)}>
      <div
        ref={stageRef}
        className={styles.stage}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={() => setComparePos(50)}
        onPointerMove={handlePointerMove}
        onPointerUp={() => setComparePos(null)}
        onPointerLeave={() => setComparePos(null)}
      >
        <div className={styles.stageMedia}>{expanded === 'before' ? before : after}</div>

        {comparePos !== null && (
          <>
            <div className={styles.compareClip} style={{ clipPath: `inset(0 ${100 - comparePos}% 0 0)` }}>
              <div className={styles.stageMedia}>{expanded === 'before' ? after : before}</div>
            </div>
            <div className={styles.divider} style={{ left: `${comparePos}%` }} />
            <span className={[styles.hint, styles.hintLeft].join(' ')}>
              {expanded === 'before' ? afterLabel : beforeLabel}
            </span>
            <span className={[styles.hint, styles.hintRight].join(' ')}>
              {expanded === 'before' ? beforeLabel : afterLabel}
            </span>
          </>
        )}

        {comparePos === null && <span className={styles.holdHint}>Mantén pulsado para comparar</span>}
      </div>
      <button type="button" className={styles.close} onClick={() => setExpanded(null)} aria-label="Cerrar">
        ×
      </button>
    </div>
  )
}
