import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const R    = 88
const CX   = 140
const CY   = 140
const SIZE = 280
const PERIOD = 20000 // 20s per full rotation

const VERTS = [
  { angleDeg: -90,  label: 'Curiosity',     color: '#38bdf8' },
  { angleDeg: 30,   label: 'Synchronicity', color: '#a5f3fc' },
  { angleDeg: 150,  label: 'Aesthetic',     color: '#818cf8' },
]

interface Particle {
  id: number
  sx: number
  sy: number
  angle: number
  color: string
}

function baseXY(angleDeg: number) {
  const r = (angleDeg * Math.PI) / 180
  return { x: CX + R * Math.cos(r), y: CY + R * Math.sin(r) }
}

function rotateAround(px: number, py: number, deg: number) {
  const r  = (deg * Math.PI) / 180
  const dx = px - CX, dy = py - CY
  return {
    x: CX + dx * Math.cos(r) - dy * Math.sin(r),
    y: CY + dx * Math.sin(r) + dy * Math.cos(r),
  }
}

export default function TriangleConcept() {
  const svgGroupRef = useRef<SVGGElement>(null)
  const labelRefs   = useRef<(HTMLDivElement | null)[]>([null, null, null])
  const degRef      = useRef(0)
  const pidRef      = useRef(0)
  const [particles, setParticles] = useState<Particle[]>([])

  // RAF rotation loop — no React re-renders
  useEffect(() => {
    let start: number | null = null
    let rafId: number

    const tick = (t: number) => {
      if (start === null) start = t
      const deg = (((t - start) % PERIOD) / PERIOD) * 360
      degRef.current = deg

      svgGroupRef.current?.setAttribute('transform', `rotate(${deg}, ${CX}, ${CY})`)

      VERTS.forEach((v, i) => {
        const el = labelRefs.current[i]
        if (!el) return
        const base = baseXY(v.angleDeg)
        const rot  = rotateAround(base.x, base.y, deg)
        el.style.left = `${rot.x}px`
        el.style.top  = `${rot.y}px`
      })

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  const burst = (i: number) => {
    const base = baseXY(VERTS[i].angleDeg)
    const pos  = rotateAround(base.x, base.y, degRef.current)
    const id   = pidRef.current++
    const newP: Particle[] = Array.from({ length: 14 }, (_, j) => ({
      id: id * 20 + j,
      sx: pos.x,
      sy: pos.y,
      angle: (j / 14) * Math.PI * 2 + Math.random() * 0.25,
      color: VERTS[i].color,
    }))
    setParticles(p => [...p, ...newP])
  }

  const pts     = VERTS.map(v => baseXY(v.angleDeg))
  const triPath = `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y} L ${pts[2].x},${pts[2].y} Z`

  return (
    <div className="relative mx-auto" style={{ width: SIZE, height: SIZE }}>

      {/* SVG — triangle rotates inside here */}
      <svg
        width={SIZE} height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
      >
        <defs>
          <filter id="vtx-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="line-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Rotating group */}
        <g ref={svgGroupRef}>
          {/* Fill + outer border */}
          <path d={triPath} fill="rgba(56,189,248,0.04)" stroke="rgba(56,189,248,0.15)" strokeWidth="1.5" />
          {/* Glowing inner line */}
          <path d={triPath} fill="none" stroke="rgba(56,189,248,0.55)" strokeWidth="0.7" filter="url(#line-glow)" />
          {/* Corner tick marks (blueprint style) */}
          {pts.map((p, i) => {
            const next = pts[(i + 1) % 3]
            const dx = next.x - p.x, dy = next.y - p.y
            const len = Math.sqrt(dx * dx + dy * dy)
            const nx = dx / len, ny = dy / len
            return (
              <g key={i}>
                <line x1={p.x + nx * 6} y1={p.y + ny * 6} x2={p.x + nx * 16} y2={p.y + ny * 16}
                      stroke="rgba(56,189,248,0.30)" strokeWidth="1" />
              </g>
            )
          })}
          {/* Vertex dots */}
          {pts.map((p, i) => (
            <circle
              key={i}
              cx={p.x} cy={p.y} r={5}
              fill={VERTS[i].color}
              style={{ filter: `drop-shadow(0 0 8px ${VERTS[i].color})` }}
            />
          ))}
          {/* Center dot */}
          <circle cx={CX} cy={CY} r={2.5} fill="rgba(56,189,248,0.4)" />
          {/* Center to vertex lines (subtle) */}
          {pts.map((p, i) => (
            <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y}
                  stroke="rgba(56,189,248,0.08)" strokeWidth="0.6" strokeDasharray="3 4" />
          ))}
        </g>

        {/* Burst particles — not in the rotating group */}
        {particles.map(p => (
          <motion.circle
            key={p.id}
            cx={p.sx} cy={p.sy} r={3}
            fill={p.color}
            style={{ filter: `drop-shadow(0 0 5px ${p.color})` }}
            initial={{ opacity: 1 }}
            animate={{
              cx: p.sx + Math.cos(p.angle) * 75,
              cy: p.sy + Math.sin(p.angle) * 75,
              r: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onAnimationComplete={() =>
              setParticles(prev => prev.filter(pt => pt.id !== p.id))
            }
          />
        ))}
      </svg>

      {/* Label divs — positions updated via RAF */}
      {VERTS.map((v, i) => {
        const base = baseXY(v.angleDeg)
        return (
          <div
            key={v.label}
            ref={el => { labelRefs.current[i] = el }}
            onClick={() => burst(i)}
            style={{
              position:    'absolute',
              left:         base.x,
              top:          base.y,
              transform:   'translate(-50%, -50%)',
              color:        v.color,
              textShadow:  `0 0 12px ${v.color}, 0 0 24px ${v.color}80`,
              fontFamily:  '"JetBrains Mono", monospace',
              fontSize:    '9.5px',
              fontWeight:  '700',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              cursor:       'pointer',
              userSelect:   'none',
              whiteSpace:   'nowrap',
              pointerEvents: 'auto',
            }}
          >
            {v.label}
          </div>
        )
      })}
    </div>
  )
}
