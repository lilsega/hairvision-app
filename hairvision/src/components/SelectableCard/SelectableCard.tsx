import type { ReactNode } from 'react'
import styles from './SelectableCard.module.css'

interface SelectableCardProps {
  label: string
  selected: boolean
  onSelect: () => void
  media?: ReactNode
  compact?: boolean
}

export function SelectableCard({ label, selected, onSelect, media, compact }: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[styles.card, selected ? styles.selected : '', compact ? styles.compact : '']
        .filter(Boolean)
        .join(' ')}
      aria-pressed={selected}
    >
      {media && <div className={styles.media}>{media}</div>}
      <span className={styles.label}>{label}</span>
    </button>
  )
}
