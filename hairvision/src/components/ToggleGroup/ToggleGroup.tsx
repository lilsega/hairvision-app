import styles from './ToggleGroup.module.css'

export interface ToggleOption<T extends string> {
  id: T
  label: string
}

interface ToggleGroupProps<T extends string> {
  options: ToggleOption<T>[]
  value: T[]
  onToggle: (id: T) => void
  columns?: number
}

/** A row/grid of pill buttons. Works for both single- and multi-select — caller controls semantics via `value`. */
export function ToggleGroup<T extends string>({ options, value, onToggle, columns = 2 }: ToggleGroupProps<T>) {
  return (
    <div className={styles.grid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {options.map((opt) => {
        const active = value.includes(opt.id)
        return (
          <button
            key={opt.id}
            type="button"
            className={active ? styles.optionActive : styles.option}
            onClick={() => onToggle(opt.id)}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
