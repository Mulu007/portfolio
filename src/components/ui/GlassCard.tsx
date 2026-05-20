import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  tilt?: boolean
  accent?: string
}

const BRACKET = 'rgba(56,189,248,0.55)'

export default function PaperCard({ children, className = '', tilt = true, accent }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [2, -2])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-2, 2])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      style={tilt ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      whileHover={tilt ? { scale: 1.012 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`paper-card overflow-hidden ${className}`}
    >
      {/* Top accent glow line */}
      {accent && (
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ background: `linear-gradient(90deg, ${accent}, transparent 70%)`, boxShadow: `0 0 8px ${accent}` }}
        />
      )}
      {/* Corner brackets */}
      <span aria-hidden className="absolute top-0 left-0 w-3 h-3 border-t border-l pointer-events-none" style={{ borderColor: BRACKET }} />
      <span aria-hidden className="absolute top-0 right-0 w-3 h-3 border-t border-r pointer-events-none" style={{ borderColor: BRACKET }} />
      <span aria-hidden className="absolute bottom-0 left-0 w-3 h-3 border-b border-l pointer-events-none" style={{ borderColor: BRACKET }} />
      <span aria-hidden className="absolute bottom-0 right-0 w-3 h-3 border-b border-r pointer-events-none" style={{ borderColor: BRACKET }} />
      {children}
    </motion.div>
  )
}
