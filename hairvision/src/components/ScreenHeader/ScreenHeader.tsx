import type { ReactNode } from 'react'
import { CartBadge } from '../CartBadge/CartBadge'
import styles from './ScreenHeader.module.css'

interface ScreenHeaderProps {
  title: string
  cartCount?: number
  right?: ReactNode
}

export function ScreenHeader({ title, cartCount, right }: ScreenHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.right}>
        {right}
        {typeof cartCount === 'number' && <CartBadge count={cartCount} />}
      </div>
    </header>
  )
}
