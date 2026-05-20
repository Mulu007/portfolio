import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import CursorTrail from '../cursor/CursorTrail'
import Header from './Header'
import ScrollProgress from '../ui/ScrollProgress'

interface Props { children: ReactNode }

export default function Layout({ children }: Props) {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spotlightRef.current
    if (!el) return
    const fn = (e: MouseEvent) => {
      el.style.setProperty('--gx', `${e.clientX}px`)
      el.style.setProperty('--gy', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  return (
    <div className="min-h-screen relative">
      {/* Very subtle mouse spotlight */}
      <div
        ref={spotlightRef}
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[-2]"
        style={{
          background: 'radial-gradient(500px circle at var(--gx,50%) var(--gy,50%), rgba(56,189,248,0.04) 0%, transparent 70%)',
        }}
      />

      <ScrollProgress />
      <CursorTrail />
      <Header />

      <main className="max-w-paper mx-auto px-6 py-12">
        {children}
      </main>

      <footer
        className="max-w-paper mx-auto px-6 py-8 mt-8 flex items-center justify-between text-xs font-mono text-ink-faint"
        style={{ borderTop: '1px solid var(--rule)' }}
      >
        <span>© {new Date().getFullYear()} Silvanius Brian Mulu</span>
        <span>Built with React · Tailwind · Framer Motion</span>
      </footer>
    </div>
  )
}
