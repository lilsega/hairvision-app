import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  icon?: ReactNode
  children: ReactNode
}

export function Button({ variant = 'outline', icon, children, className, ...rest }: ButtonProps) {
  const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ')
  return (
    <button className={classes} {...rest}>
      <span className={styles.label}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  )
}
