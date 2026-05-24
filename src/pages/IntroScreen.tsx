import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  baseVx: number; baseVy: number
  r: number; color: string; alpha: number
}
interface Ripple { x: number; y: number; radius: number; alpha: number }
interface Props   { onEnter: () => void }

const COLORS = ['#38bdf8','#67e8f9','#818cf8','#a5b4fc','#7dd3fc','#38bdf8','#38bdf8']
const N      = 350
const MAX_D  = 250
const SPD    = 0.24
const TILT   = 0.30

const CITIES = [
  { lat: 40.7, lon: -74.0 },
  { lat: 51.5, lon:  -0.1 },
  { lat: 35.7, lon: 139.7 },
  { lat: 22.3, lon: 114.2 },
  { lat:  1.3, lon: 103.8 },
  { lat: 47.4, lon:   8.5 },
  { lat: 41.9, lon: -87.6 },
  { lat:-33.9, lon:  18.4 },
]

const toRad = (d: number) => d * Math.PI / 180

function globePt(latDeg: number, lonDeg: number, rotY: number): [number, number, number] {
  const phi = toRad(latDeg)
  const lam = toRad(lonDeg) + rotY
  const x0  =  Math.cos(phi) * Math.sin(lam)
  const y0  =  Math.sin(phi)
  const z0  =  Math.cos(phi) * Math.cos(lam)
  const cosT = Math.cos(TILT), sinT = Math.sin(TILT)
  return [x0, y0 * cosT - z0 * sinT, y0 * sinT + z0 * cosT]
}

export default function IntroScreen({ onEnter }: Props) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const ripplesRef   = useRef<Ripple[]>([])
  const rotYRef      = useRef(0)
  const rafRef       = useRef(0)
  const enteredRef   = useRef(false)
  const mouseRef     = useRef({ x: -999, y: -999 })
  const dragRef      = useRef<Particle[]>([])
  const dragState    = useRef({ down: false, moved: false, sx: 0, sy: 0 })

  const initParticles = useCallback((w: number, h: number) => {
    particlesRef.current = Array.from({ length: N }, () => {
      const vx = (Math.random() - 0.5) * SPD * 2
      const vy = (Math.random() - 0.5) * SPD * 2
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx, vy, baseVx: vx, baseVy: vy,
        r: Math.random() * 1.8 + 0.9,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.4 + 0.5,
      }
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (dragState.current.down) {
        const dx = e.clientX - dragState.current.sx
        const dy = e.clientY - dragState.current.sy
        if (Math.sqrt(dx * dx + dy * dy) > 6) dragState.current.moved = true
      }
    }
    const onDown = (e: MouseEvent) => {
      dragState.current = { down: true, moved: false, sx: e.clientX, sy: e.clientY }
      dragRef.current = particlesRef.current.filter(p => {
        const dx = p.x - e.clientX, dy = p.y - e.clientY
        return Math.sqrt(dx * dx + dy * dy) < 75
      })
    }
    const onUp = () => { dragState.current.down = false; dragRef.current = [] }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    const draw = () => {
      const { width: W, height: H } = canvas
      ctx.clearRect(0, 0, W, H)
      const ps = particlesRef.current
      const { x: mx, y: my } = mouseRef.current
      const cx = W / 2, cy = H / 2
      rotYRef.current += 0.0022

      for (const p of ps) {
        const dx = mx - p.x, dy = my - p.y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < 140 && d > 0) {
          p.vx += (dx / d) * ((140 - d) / 140) * 0.044
          p.vy += (dy / d) * ((140 - d) / 140) * 0.044
        }
        p.vx += (p.baseVx - p.vx) * 0.02
        p.vy += (p.baseVy - p.vy) * 0.02
      }

      if (dragState.current.down) {
        for (const p of dragRef.current) {
          p.x += (mx - p.x) * 0.26; p.y += (my - p.y) * 0.26
          p.vx *= 0.35; p.vy *= 0.35
        }
      }

      for (const p of ps) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0)  { p.x = 0;  p.vx =  Math.abs(p.vx) }
        if (p.x > W)  { p.x = W;  p.vx = -Math.abs(p.vx) }
        if (p.y < 0)  { p.y = 0;  p.vy =  Math.abs(p.vy) }
        if (p.y > H)  { p.y = H;  p.vy = -Math.abs(p.vy) }
      }

      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < MAX_D) {
            ctx.beginPath()
            ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y)
            ctx.strokeStyle = `rgba(56,189,248,${(1 - d / MAX_D) * 0.30})`
            ctx.lineWidth = 0.7; ctx.stroke()
          }
        }
      }

      for (const p of ps) {
        const h16 = Math.round(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + h16
        ctx.shadowColor = p.color; ctx.shadowBlur = 8; ctx.fill(); ctx.shadowBlur = 0
      }

      const rot = rotYRef.current
      const R   = Math.min(W, H) * 0.21
      const t   = Date.now() * 0.001

      const ig = ctx.createRadialGradient(cx - R * 0.28, cy - R * 0.28, 0, cx, cy, R)
      ig.addColorStop(0, 'rgba(56,189,248,0.05)'); ig.addColorStop(1, 'rgba(11,23,40,0.07)')
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fillStyle = ig; ctx.fill()

      const halo = ctx.createRadialGradient(cx, cy, R * 0.7, cx, cy, R * 1.3)
      halo.addColorStop(0, 'rgba(56,189,248,0.07)'); halo.addColorStop(1, 'transparent')
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2); ctx.fillStyle = halo; ctx.fill()

      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(56,189,248,0.26)'; ctx.lineWidth = 1.2; ctx.stroke()

      for (let latDeg = -60; latDeg <= 60; latDeg += 20) {
        ctx.beginPath()
        for (let s = 0; s <= 72; s++) {
          const [x, y] = globePt(latDeg, (s / 72) * 360 - 180, rot)
          s === 0 ? ctx.moveTo(cx + x * R, cy - y * R) : ctx.lineTo(cx + x * R, cy - y * R)
        }
        ctx.strokeStyle = 'rgba(56,189,248,0.09)'; ctx.lineWidth = 0.55; ctx.stroke()
      }

      ctx.beginPath()
      for (let s = 0; s <= 72; s++) {
        const [x, y] = globePt(0, (s / 72) * 360 - 180, rot)
        s === 0 ? ctx.moveTo(cx + x * R, cy - y * R) : ctx.lineTo(cx + x * R, cy - y * R)
      }
      ctx.strokeStyle = 'rgba(56,189,248,0.24)'; ctx.lineWidth = 1.0; ctx.stroke()

      for (let lonDeg = 0; lonDeg < 360; lonDeg += 30) {
        const front = Math.cos(toRad(lonDeg) + rot) >= 0
        ctx.beginPath()
        for (let s = 0; s <= 60; s++) {
          const [x, y] = globePt((s / 60) * 180 - 90, lonDeg, rot)
          s === 0 ? ctx.moveTo(cx + x * R, cy - y * R) : ctx.lineTo(cx + x * R, cy - y * R)
        }
        ctx.strokeStyle = front ? 'rgba(56,189,248,0.20)' : 'rgba(56,189,248,0.05)'
        ctx.lineWidth   = front ? 0.75 : 0.45; ctx.stroke()
      }

      ctx.beginPath()
      for (let s = 0; s <= 60; s++) {
        const [x, y] = globePt((s / 60) * 180 - 90, 0, rot)
        s === 0 ? ctx.moveTo(cx + x * R, cy - y * R) : ctx.lineTo(cx + x * R, cy - y * R)
      }
      const [,, pmZ] = globePt(0, 0, rot)
      ctx.strokeStyle = pmZ >= 0 ? 'rgba(103,232,249,0.32)' : 'rgba(103,232,249,0.06)'
      ctx.lineWidth = 0.9; ctx.stroke()

      for (const city of CITIES) {
        const [x, y, z] = globePt(city.lat, city.lon, rot)
        if (z < 0.06) continue
        const sx = cx + x * R, sy = cy - y * R
        const pulse = Math.sin(t * 1.6 + city.lon * 0.04) * 0.5 + 0.5
        ctx.beginPath(); ctx.arc(sx, sy, 2.8, 0, Math.PI * 2)
        ctx.fillStyle = '#67e8f9'; ctx.shadowColor = '#67e8f9'; ctx.shadowBlur = 14
        ctx.fill(); ctx.shadowBlur = 0
        const pr = 4 + pulse * 8
        ctx.beginPath(); ctx.arc(sx, sy, pr, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(103,232,249,${Math.max(0, 0.5 - pr * 0.042)})`
        ctx.lineWidth = 0.9; ctx.stroke()
      }


      const rs = ripplesRef.current
      for (let i = rs.length - 1; i >= 0; i--) {
        const rp = rs[i]; rp.radius += 5; rp.alpha -= 0.013
        if (rp.alpha <= 0) { rs.splice(i, 1); continue }
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(56,189,248,${rp.alpha})`; ctx.lineWidth = 1.5; ctx.stroke()
        if (rp.radius > 32) {
          ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.radius - 30, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(165,243,252,${rp.alpha * 0.42})`; ctx.lineWidth = 0.8; ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
    }
  }, [initParticles])

  const handleClick = (e: React.MouseEvent) => {
    if (dragState.current.moved || enteredRef.current) return
    enteredRef.current = true
    for (let k = 0; k < 3; k++) {
      setTimeout(() => {
        ripplesRef.current.push({ x: e.clientX, y: e.clientY, radius: k * 26, alpha: 0.88 - k * 0.22 })
      }, k * 75)
    }
    for (const p of particlesRef.current) {
      const dx = p.x - e.clientX, dy = p.y - e.clientY
      const d  = Math.sqrt(dx * dx + dy * dy)
      if (d < 230 && d > 0) {
        const f = ((230 - d) / 230) * 4.8
        p.vx += (dx / d) * f; p.vy += (dy / d) * f
      }
    }
    setTimeout(onEnter, 430)
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      onClick={handleClick}
      style={{ cursor: 'crosshair' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 75% at 50% 50%, transparent 35%, rgba(11,23,40,0.70) 100%)' }}
      />
      <div className="relative z-10 flex flex-col items-center pointer-events-none select-none px-6 text-center">
        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.38em] text-ink-faint mb-10"
          initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Portfolio · 2026 · Econ × Math
        </motion.p>
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink mb-3 leading-tight"
          style={{ textShadow: '0 0 90px rgba(56,189,248,0.35), 0 2px 30px rgba(11,23,40,0.95)' }}
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          S. Brian M.
        </motion.h1>
        <motion.p
          className="font-serif italic text-ink-muted text-sm sm:text-base max-w-sm mb-10 leading-relaxed"
          style={{ textShadow: '0 1px 16px rgba(11,23,40,0.98)' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
        >
          "If you think of it ...
          <br />It's always been about numbers."
        </motion.p>
        <motion.div
          className="flex items-start gap-10 mb-12"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7 }}
        >
          {[
            { label: 'Interest', value: 'Research'       },
            { label: 'Degree',   value: 'B.A. Economics (Honors)' },
            { label: 'Minor',    value: 'Mathematics'    },
          ].map(s => (
            <div key={s.label}>
              <p className="font-mono text-xs font-bold"
                 style={{ color: '#38bdf8', textShadow: '0 0 12px rgba(56,189,248,0.65)' }}>
                {s.value}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-widest text-ink-faint mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ color: '#38bdf8', textShadow: '0 0 22px rgba(56,189,248,0.85)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.55, 1] }}
          transition={{ delay: 1.35, duration: 1.5, repeat: Infinity, repeatType: 'reverse', repeatDelay: 0.3 }}
        >
          <span style={{ opacity: 0.35 }}>────────</span>
          <span>{'>'} Enter My World</span>
          <span style={{ opacity: 0.35 }}>────────</span>
        </motion.div>
        <motion.p
          className="font-mono text-[9px] text-ink-faint mt-4 tracking-[0.28em] uppercase"
          initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
          transition={{ delay: 1.9, duration: 0.9 }}
        >
          · click anywhere · 
        </motion.p>
      </div>
    </motion.div>
  )
}
