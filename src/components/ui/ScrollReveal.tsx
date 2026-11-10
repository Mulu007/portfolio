import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Retained for API compatibility — the paper style renders without motion. */
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right'
}

export default function ScrollReveal({ children, className }: Props) {
  return <div className={className}>{children}</div>
}
