import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'

interface Props { children: ReactNode }

export default function Layout({ children }: Props) {
  const { pathname } = useLocation()

  // Start each page at the top on navigation.
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-paper w-full mx-auto px-6 flex-1">
        {children}
      </main>

      <footer
        className="max-w-paper w-full mx-auto px-6 py-9 mt-16 flex flex-wrap justify-between gap-3 text-[11px] text-ink-faint"
        style={{ borderTop: '1px solid var(--rule)' }}
      >
        <span>© {new Date().getFullYear()} Silvanius Brian Mulu</span>
        <span className="flex gap-4">
          <a className="text-gold hover:underline" href="https://github.com/Mulu007" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="text-gold hover:underline" href="https://www.linkedin.com/in/silvanius/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <a className="text-gold hover:underline" href="mailto:uvb20@txstate.edu">Email ↗</a>
        </span>
      </footer>
    </div>
  )
}
