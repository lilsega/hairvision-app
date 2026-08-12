import styles from './CartBadge.module.css'

export function CartBadge({ count }: { count: number }) {
  return (
    <div className={styles.badge} aria-label={`${count} selecciones`}>
      <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
        <path
          d="M3 5h2l1.6 9.6a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 2-1.6L20 8H6.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="20" r="1.3" fill="currentColor" />
        <circle cx="16.5" cy="20" r="1.3" fill="currentColor" />
      </svg>
      <span className={styles.count}>{count}</span>
    </div>
  )
}
