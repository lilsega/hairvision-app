import styles from './GrowthDirectionHelp.module.css'

/** Reference diagram for locating the crown / growth whorl, shown on demand. */
export function GrowthDirectionHelp({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Referencia: dirección del crecimiento</h2>
        <svg viewBox="0 0 420 260" className={styles.diagram} aria-hidden="true">
          {/* profile head */}
          <path
            d="M60 40 C20 55 10 100 20 140 C26 165 40 185 55 200 L55 230 L95 230 L95 205 C110 200 118 195 120 185 L118 150 C130 148 138 140 136 128 L120 95 C112 60 90 42 60 40 Z"
            className={styles.line}
          />
          <circle cx="112" cy="55" r="10" className={styles.marker} />
          <circle cx="47" cy="125" r="10" className={styles.marker} />

          {/* rear head */}
          <ellipse cx="300" cy="120" rx="70" ry="88" className={styles.line} />
          <path d="M282 34 Q300 20 318 34" className={styles.line} />
          <circle cx="335" cy="185" r="10" className={styles.marker} />

          <line x1="112" y1="55" x2="325" y2="180" className={styles.arrow} markerEnd="url(#arrow)" />
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" className={styles.arrowHead} />
            </marker>
          </defs>
        </svg>
        <p className={styles.caption}>
          Localiza el remolino y el nacimiento del cabello antes de elegir la dirección de crecimiento.
        </p>
        <button type="button" className={styles.close} onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  )
}
