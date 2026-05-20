import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right'
}

export default function ScrollReveal({ children, delay = 0, className, direction = 'up' }: Props) {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  const initial =
    direction === 'up'    ? { opacity: 0, y: 24 }  :
    direction === 'left'  ? { opacity: 0, x: -24 } :
                            { opacity: 0, x: 24 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
