import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV = [
  { to: '/',           label: 'About'      },
  { to: '/projects',   label: 'Research'   },
  { to: '/experience', label: 'Experience' },
  { to: '/awards',     label: 'Awards'     },
  { to: '/interests',  label: 'Interests'  },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const cv = `${import.meta.env.BASE_URL}resume.pdf`

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-xs transition-colors ${isActive ? 'text-gold' : 'text-ink-muted hover:text-gold'}`

  return (
    <header
      className="sticky top-0 z-50 bg-paper"
      style={{ borderBottom: '1px solid var(--rule)' }}
    >
      <nav className="max-w-paper mx-auto px-6 min-h-[72px] flex items-center justify-between gap-7">

        {/* Brand */}
        <NavLink to="/" className="shrink-0 leading-tight">
          <span className="block font-display font-bold text-[15px] text-ink">
            Silvanius Brian Mulu
          </span>
          <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-ink-faint mt-1">
            Economics · Mathematics
          </span>
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} className={linkClass}>
              {label}
            </NavLink>
          ))}
          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gold px-3 py-1.5 transition-colors hover:bg-paper-darker"
            style={{ border: '1px solid #a6b9af' }}
          >
            CV ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden w-9 h-9 grid place-items-center text-ink"
          style={{ border: '1px solid var(--rule)' }}
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X size={17} /> : <Menu size={17} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-paper" style={{ borderTop: '1px solid var(--rule)' }}>
          <div className="max-w-paper mx-auto px-6 py-4 flex flex-col gap-3.5">
            {NAV.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {label}
              </NavLink>
            ))}
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gold self-start px-3 py-1.5"
              style={{ border: '1px solid #a6b9af' }}
            >
              CV ↗
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
