import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, FileText, Mail, Code2, Briefcase } from 'lucide-react'

const NAV = [
  { to: '/',           label: 'Home',       section: '§1' },
  { to: '/projects',   label: 'Projects',   section: '§2' },
  { to: '/awards',     label: 'Awards',     section: '§3' },
  { to: '/interests',  label: 'Interests',  section: '§4' },
  { to: '/experience', label: 'Experience', section: '§5' },
]

const LINKS = [
  { href: 'https://www.linkedin.com/in/silvanius/', icon: Briefcase, label: 'LinkedIn' },
  { href: 'https://github.com/Mulu007',     icon: Code2,     label: 'GitHub'   },
  { href: 'mailto:uvb20@txstate.edu',               icon: Mail,      label: 'Email'    },
  { href: '/resume.pdf',                         icon: FileText,  label: 'Resume'   },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 bg-paper/90 backdrop-blur-md transition-shadow duration-300"
      style={{
        borderBottom: '1px solid var(--rule)',
        boxShadow: scrolled ? '0 2px 16px rgba(28,25,23,0.08)' : 'none',
      }}
    >
      <div className="max-w-paper mx-auto px-6 h-14 flex items-center justify-between gap-6">

        {/* Logo / name */}
        <NavLink to="/" className="flex flex-col leading-none select-none shrink-0">
          <span className="font-display font-bold text-lg text-ink tracking-tight">
            Silvanius Brian Mulu
          </span>
          <span className="font-mono text-[10px] text-ink-faint tracking-widest uppercase">
            Econ × Math
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV.map(({ to, label, section }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1 px-3 py-1.5 rounded text-sm font-mono transition-all duration-150 ${
                  isActive
                    ? 'text-gold-dark bg-gold/10 border border-gold/30'
                    : 'text-ink-muted hover:text-ink hover:bg-paper-dark'
                }`
              }
            >
              <span className="text-gold opacity-70">{section}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Icon links + mobile toggle */}
        <div className="flex items-center gap-1">
          <div className="hidden sm:flex items-center gap-1">
            {LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                title={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="w-8 h-8 grid place-items-center rounded text-ink-faint hover:text-gold-dark hover:bg-paper-dark transition-all duration-150"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-8 h-8 grid place-items-center rounded text-ink-muted hover:text-ink hover:bg-paper-dark"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden border-t bg-paper"
          style={{ borderColor: 'var(--rule)' }}
        >
          <div className="max-w-paper mx-auto px-6 py-3 flex flex-col gap-1">
            {NAV.map(({ to, label, section }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded text-sm font-mono ${
                    isActive ? 'text-gold-dark bg-gold/10' : 'text-ink-muted'
                  }`
                }
              >
                <span className="text-gold">{section}</span> {label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-2 mt-1 border-t" style={{ borderColor: 'var(--rule)' }}>
              {LINKS.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} title={label} target="_blank" rel="noopener noreferrer"
                   className="w-8 h-8 grid place-items-center rounded text-ink-faint hover:text-gold-dark">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
