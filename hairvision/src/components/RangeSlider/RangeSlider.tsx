import styles from './RangeSlider.module.css'

interface SteppedSliderProps {
  label: string
  ticks: string[]
  valueIndex: number
  onChange: (index: number) => void
}

/** A slider whose value snaps to one of a small set of named ticks, e.g. Liso/Ondulado/Rizado/Afro. */
export function SteppedSlider({ label, ticks, valueIndex, onChange }: SteppedSliderProps) {
  return (
    <div className={styles.block}>
      <p className={styles.label}>{label}</p>
      <div className={styles.trackWrap}>
        <input
          type="range"
          min={0}
          max={ticks.length - 1}
          step={1}
          value={valueIndex}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.input}
          aria-label={label}
        />
      </div>
      <div className={styles.ticks}>
        {ticks.map((tick, i) => (
          <span key={tick} className={i === valueIndex ? styles.tickActive : styles.tick}>
            {tick}
          </span>
        ))}
      </div>
    </div>
  )
}

interface ContinuousSliderProps {
  label?: string
  leftLabel?: string
  rightLabel?: string
  value: number
  min?: number
  max?: number
  onChange: (value: number) => void
  orientation?: 'horizontal' | 'vertical'
}

/** A free-value slider (0-100 by default) with optional end labels instead of discrete ticks. */
export function ContinuousSlider({
  label,
  leftLabel,
  rightLabel,
  value,
  min = 0,
  max = 100,
  onChange,
  orientation = 'horizontal',
}: ContinuousSliderProps) {
  const vertical = orientation === 'vertical'
  return (
    <div className={[styles.block, vertical ? styles.vertical : ''].filter(Boolean).join(' ')}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={vertical ? styles.trackWrapVertical : styles.trackWrap}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={[styles.input, vertical ? styles.inputVertical : ''].filter(Boolean).join(' ')}
          aria-label={label ?? 'valor'}
        />
      </div>
      {(leftLabel || rightLabel) && (
        <div className={styles.ticks}>
          <span className={styles.tick}>{leftLabel}</span>
          <span className={styles.tick}>{rightLabel}</span>
        </div>
      )}
    </div>
  )
}
