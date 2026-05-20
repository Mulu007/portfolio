import { NavLink } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Home, FolderGit2, BookOpen, Sparkles } from 'lucide-react'

const TABS = [
  { to: '/',          label: 'Home',      icon: Home,       c1: '#f59e0b', c2: '#00d4ff', c3: '#00ff88' },
  { to: '/projects',  label: 'Projects',  icon: FolderGit2, c1: '#00d4ff', c2: '#a78bfa', c3: '#f59e0b' },
  { to: '/courses',   label: 'Courses',   icon: BookOpen,   c1: '#00ff88', c2: '#00d4ff', c3: '#a78bfa' },
  { to: '/interests', label: 'Interests', icon: Sparkles,   c1: '#a78bfa', c2: '#fb7185', c3: '#f59e0b' },
]

function DockButton({
  to, label, icon: Icon, c1, c2, c3,
}: (typeof TABS)[number]) {
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const rotateX = useTransform(my, [0, 100], [2, -2])
  const rotateY = useTransform(mx, [0, 100], [-3, 3])

  return (
    <NavLink to={to} end={to === '/'}>
      {({ isActive }) => (
        <motion.div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            mx.set(((e.clientX - r.left) / r.width) * 100)
            my.set(((e.clientY - r.top) / r.height) * 100)
          }}
          onMouseLeave={() => { mx.set(50); my.set(50) }}
          whileHover={{ y: -3, scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="relative overflow-hidden rounded-2xl cursor-pointer select-none"
          style={{
            // Framer motion values (3D tilt)
            rotateX, 
            rotateY, 
            transformPerspective: 600,
            
            // Layout & Static styles
            minWidth: 'max(110px, 10ch)',
            padding: '10px 16px',
            border: isActive
              ? `1px solid ${c1}55`
              : '1px solid rgba(255,255,255,0.1)',
            boxShadow: isActive
              ? `0 0 24px ${c1}30, inset 0 0 0 1px ${c1}30`
              : '0 8px 24px rgba(0,0,0,0.3)',
            isolation: 'isolate',
          }}
        >
          {/* Animated conic background */}
          <motion.div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: '-40% -10%',
              background: `conic-gradient(from 0deg at 50% 50%, ${c1}, ${c2}, ${c3}, ${c1})`,
              opacity: isActive ? 0.28 : 0.16,
              animation: 'spin 9s linear infinite',
              zIndex: 0,
            }}
          />

          {/* Liquid flux blobs */}
          <div
            aria-hidden
            className="absolute pointer-events-none mix-blend-screen"
            style={{
              inset: '-20% -10%',
              background: `
                radial-gradient(130% 200% at 0% 50%, ${c1} 0%, transparent 60%),
                radial-gradient(130% 200% at 100% 50%, ${c2} 0%, transparent 60%),
                radial-gradient(160% 240% at 50% 120%, ${c3} 0%, transparent 60%)
              `,
              opacity: isActive ? 0.55 : 0.35,
              animation: 'fluxShift 6.6s ease-in-out infinite alternate',
              zIndex: 1,
            }}
          />

          {/* Label + Icon */}
          <div className="relative z-10 flex items-center justify-center gap-2">
            <Icon
              size={16}
              style={{
                color: '#fff',
                filter: `drop-shadow(0 0 6px ${c1}cc) drop-shadow(0 0 14px ${c2}88)`,
              }}
            />
            <span
              className="text-sm font-bold text-white"
              style={{
                textShadow: `0 0 8px rgba(255,255,255,0.5), 0 0 18px ${c1}80`,
              }}
            >
              {label}
            </span>
          </div>

          {/* Keyframes (Moved spin keyframe inside or ensure it's in your global CSS) */}
          <style>{`
            @keyframes fluxShift {
              0%   { background-position: 0% 50%, 100% 50%, 50% 100%; }
              50%  { background-position: 50% 0%, 50% 100%, 0% 50%; }
              100% { background-position: 100% 50%, 0% 50%, 50% 0%; }
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      )}
    </NavLink>
  )
}

export default function DockNav() {
  return (
    <footer
      className="fixed left-0 right-0 bottom-0 z-40 flex justify-center items-center"
      style={{
        height: 76,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 -16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {/* Ambient glow behind dock */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: '-40% -10%',
          background: `
            radial-gradient(40% 30% at 25% 60%, rgba(245,158,11,0.12), transparent 60%),
            radial-gradient(30% 30% at 80% 40%, rgba(0,212,255,0.12), transparent 60%)
          `,
          filter: 'blur(40px)',
        }}
      />

      <nav className="flex gap-2.5 relative z-10 overflow-auto" style={{ scrollbarWidth: 'none' }}>
        {TABS.map((tab) => (
          <DockButton key={tab.to} {...tab} />
        ))}
      </nav>
    </footer>
  )
}
