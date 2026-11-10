import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** Retained for API compatibility — the flat paper style uses no accent bar. */
  tilt?: boolean
  accent?: string
}

export default function PaperCard({ children, className = '' }: Props) {
  return (
    <div className={`paper-card ${className}`}>
      {children}
    </div>
  )
}
