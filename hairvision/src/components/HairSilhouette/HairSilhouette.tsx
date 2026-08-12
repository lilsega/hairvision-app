/**
 * Lightweight line-art placeholder illustrations.
 *
 * The original wireframe referenced real stock/celebrity photography for
 * each haircut option. Shipping real likenesses isn't appropriate, and a
 * kiosk tablet app benefits from not depending on external image hosts —
 * so each option is rendered as a small procedural SVG silhouette in the
 * same hand-drawn line style as the wireframe's camera/head icons.
 *
 * Swap this for a real photo library per-salon once available; the
 * `variant` prop is the only thing screens need to know about.
 */
import styles from './HairSilhouette.module.css'

interface SilhouetteConfig {
  hairDrop: number // how far hair falls below the shoulder line
  width: number // hair mass width relative to head
  asymmetric: boolean
  layered: boolean
  bangs: 'recto' | 'cortina' | 'lateral' | null
  pixie: boolean
}

const CONFIGS: Record<string, SilhouetteConfig> = {
  recto: { hairDrop: 70, width: 1, asymmetric: false, layered: false, bangs: null, pixie: false },
  capas: { hairDrop: 78, width: 1.05, asymmetric: false, layered: true, bangs: null, pixie: false },
  bob: { hairDrop: 28, width: 1, asymmetric: false, layered: false, bangs: null, pixie: false },
  pixie: { hairDrop: 6, width: 0.85, asymmetric: false, layered: false, bangs: null, pixie: true },
  shag: { hairDrop: 55, width: 1.15, asymmetric: false, layered: true, bangs: 'cortina', pixie: false },
  degradado: { hairDrop: 40, width: 0.95, asymmetric: false, layered: true, bangs: null, pixie: false },
  asimetrico: { hairDrop: 50, width: 1, asymmetric: true, layered: false, bangs: null, pixie: false },
  'flequillo-recto': { hairDrop: 80, width: 1, asymmetric: false, layered: false, bangs: 'recto', pixie: false },
  'flequillo-cortina': { hairDrop: 80, width: 1, asymmetric: false, layered: false, bangs: 'cortina', pixie: false },
  'flequillo-lateral': { hairDrop: 80, width: 1, asymmetric: false, layered: false, bangs: 'lateral', pixie: false },
  'sugerencia-x': { hairDrop: 62, width: 1, asymmetric: false, layered: true, bangs: null, pixie: false },
  'sugerencia-y': { hairDrop: 44, width: 1.05, asymmetric: false, layered: false, bangs: 'cortina', pixie: false },
  base: { hairDrop: 60, width: 1, asymmetric: false, layered: false, bangs: null, pixie: false },
}

function resolveConfig(variant: string): SilhouetteConfig {
  const key = variant.includes('__') ? variant.split('__')[0] : variant
  return CONFIGS[key] ?? CONFIGS[variant.split('-')[0]] ?? CONFIGS.base
}

export function HairSilhouette({ variant, className }: { variant: string; className?: string }) {
  const cfg = resolveConfig(variant)
  const headCx = 60
  const headCy = 52
  const headRx = 26
  const headRy = 32
  const hairW = headRx * (1 + 0.5 * cfg.width)
  const dropL = cfg.hairDrop * (cfg.asymmetric ? 0.55 : 1)
  const dropR = cfg.hairDrop

  const shoulderY = headCy + headRy - 4
  const leftBottomY = cfg.pixie ? shoulderY - 18 : shoulderY + dropL
  const rightBottomY = cfg.pixie ? shoulderY - 14 : shoulderY + dropR

  const hairPath = `
    M ${headCx - headRx + 4} ${headCy - headRy + 10}
    C ${headCx - hairW} ${headCy - 10}, ${headCx - hairW} ${headCy + 20}, ${headCx - hairW + 6} ${leftBottomY}
    M ${headCx + headRx - 4} ${headCy - headRy + 10}
    C ${headCx + hairW} ${headCy - 10}, ${headCx + hairW} ${headCy + 20}, ${headCx + hairW - 6} ${rightBottomY}
  `

  return (
    <svg
      viewBox="0 0 120 150"
      className={[styles.svg, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      {/* head + neck */}
      <path
        d={`M ${headCx - 10} ${headCy + headRy} L ${headCx - 10} ${headCy + headRy + 16} L ${headCx + 10} ${headCy + headRy + 16} L ${headCx + 10} ${headCy + headRy}`}
        className={styles.line}
      />
      <ellipse cx={headCx} cy={headCy} rx={headRx} ry={headRy} className={styles.line} />

      {/* hairline top */}
      <path
        d={`M ${headCx - headRx + 6} ${headCy - headRy + 14} Q ${headCx} ${headCy - headRy - (cfg.pixie ? 2 : 10)} ${headCx + headRx - 6} ${headCy - headRy + 14}`}
        className={styles.line}
      />

      {/* hair mass */}
      <path d={hairPath} className={styles.line} />

      {/* layered accents */}
      {cfg.layered && (
        <>
          <path
            d={`M ${headCx - hairW + 12} ${leftBottomY - 24} q 8 10 0 20`}
            className={styles.accent}
          />
          <path
            d={`M ${headCx + hairW - 12} ${rightBottomY - 30} q -8 10 0 20`}
            className={styles.accent}
          />
        </>
      )}

      {/* bangs */}
      {cfg.bangs === 'recto' && (
        <line
          x1={headCx - headRx + 8}
          y1={headCy - headRy + 20}
          x2={headCx + headRx - 8}
          y2={headCy - headRy + 20}
          className={styles.line}
        />
      )}
      {cfg.bangs === 'cortina' && (
        <path
          d={`M ${headCx - headRx + 8} ${headCy - headRy + 16} Q ${headCx - 14} ${headCy - headRy + 30} ${headCx - 22} ${headCy - 2} M ${headCx + headRx - 8} ${headCy - headRy + 16} Q ${headCx + 14} ${headCy - headRy + 30} ${headCx + 22} ${headCy - 2}`}
          className={styles.line}
        />
      )}
      {cfg.bangs === 'lateral' && (
        <path
          d={`M ${headCx - headRx + 10} ${headCy - headRy + 18} Q ${headCx} ${headCy - headRy + 8} ${headCx + headRx - 10} ${headCy - headRy + 26}`}
          className={styles.line}
        />
      )}

      {/* asymmetric accent tick */}
      {cfg.asymmetric && (
        <line
          x1={headCx + hairW - 14}
          y1={rightBottomY - 6}
          x2={headCx + hairW + 2}
          y2={rightBottomY + 6}
          className={styles.accent}
        />
      )}
    </svg>
  )
}
