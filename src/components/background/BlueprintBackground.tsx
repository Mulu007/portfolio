import { useEffect, useRef } from 'react'

/* ── Wave definitions ──────────────────────────────── */
interface WaveDef {
  freq:  number   // cycles across screen width
  amp:   number   // amplitude as fraction of half-height
  phase: number   // initial phase offset (radians)
  speed: number   // animation speed (rad/s)
  r: number; g: number; b: number
  fillAlpha: number
  lineAlpha: number
  lw:    number   // core line width
}

const WAVES: WaveDef[] = [
  { freq: 2.2, amp: 0.28, phase: 0.0,  speed: 0.45, r:56,  g:189, b:248, fillAlpha:0.07, lineAlpha:0.55, lw:1.6 },
  { freq: 1.5, amp: 0.22, phase: 1.3,  speed: 0.62, r:103, g:232, b:249, fillAlpha:0.06, lineAlpha:0.45, lw:1.3 },
  { freq: 2.8, amp: 0.18, phase: 2.6,  speed: 0.80, r:56,  g:189, b:248, fillAlpha:0.05, lineAlpha:0.40, lw:1.1 },
  { freq: 1.3, amp: 0.32, phase: 0.7,  speed: 0.34, r:129, g:140, b:248, fillAlpha:0.05, lineAlpha:0.35, lw:1.0 },
  { freq: 3.1, amp: 0.16, phase: 1.9,  speed: 1.05, r:56,  g:189, b:248, fillAlpha:0.04, lineAlpha:0.38, lw:0.8 },
  { freq: 1.9, amp: 0.24, phase: 3.2,  speed: 0.55, r:103, g:232, b:249, fillAlpha:0.05, lineAlpha:0.32, lw:0.7 },
  { freq: 2.5, amp: 0.20, phase: 4.1,  speed: 0.70, r:165, g:243, b:252, fillAlpha:0.04, lineAlpha:0.28, lw:0.6 },
]

/* ── Stars (fixed, recomputed on resize) ───────────── */
interface Star { x: number; y: number; r: number; a: number }

export default function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let rafId    = 0
    let t0       = performance.now()
    let stars: Star[] = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      stars = Array.from({ length: 130 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 0.9 + 0.2,
        a: Math.random() * 0.35 + 0.08,
      }))
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const draw = () => {
      const W  = canvas.width
      const H  = canvas.height
      const cy = H * 0.5
      const t  = (performance.now() - t0) / 1000

      /* ── Background ── */
      ctx.fillStyle = '#0b1728'
      ctx.fillRect(0, 0, W, H)

      /* ── Grid ── */
      const GRID = 56
      ctx.lineWidth   = 0.5
      ctx.strokeStyle = 'rgba(56,189,248,0.055)'
      for (let x = 0; x <= W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y <= H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      /* ── Stars ── */
      for (const s of stars) {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147,210,255,${s.a})`
        ctx.fill()
      }

      /* ── Waves ── */
      const STEPS = Math.ceil(W / 2)   // 1 sample per 2px — smooth & fast

      for (const w of WAVES) {
        const maxAmp = w.amp * H * 0.5

        /* Build sample points */
        const pts: [number, number][] = new Array(STEPS + 1)
        for (let s = 0; s <= STEPS; s++) {
          const x = (s / STEPS) * W
          // Envelope: amplitude breathes slowly across X
          const env = 0.75 + 0.25 * Math.sin((x / W) * Math.PI * 1.5 + t * 0.25)
          const y   = cy + maxAmp * env * Math.sin(w.freq * (x / W) * Math.PI * 2 + w.phase + t * w.speed)
          pts[s] = [x, y]
        }

        /* ── Ribbon fill (wave ↔ centre line) ── */
        ctx.beginPath()
        ctx.moveTo(0, cy)
        for (const [x, y] of pts) ctx.lineTo(x, y)
        ctx.lineTo(W, cy)
        ctx.closePath()

        // Vertical gradient fades toward centre
        const grad = ctx.createLinearGradient(0, cy - maxAmp, 0, cy + maxAmp)
        grad.addColorStop(0,   `rgba(${w.r},${w.g},${w.b},${w.fillAlpha})`)
        grad.addColorStop(0.45,`rgba(${w.r},${w.g},${w.b},${w.fillAlpha * 0.3})`)
        grad.addColorStop(0.55,`rgba(${w.r},${w.g},${w.b},${w.fillAlpha * 0.3})`)
        grad.addColorStop(1,   `rgba(${w.r},${w.g},${w.b},${w.fillAlpha})`)
        ctx.fillStyle = grad
        ctx.fill()

        /* ── Outer glow (wide faint stroke) ── */
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        for (const [x, y] of pts) ctx.lineTo(x, y)
        ctx.strokeStyle = `rgba(${w.r},${w.g},${w.b},${w.lineAlpha * 0.18})`
        ctx.lineWidth   = w.lw * 7
        ctx.lineJoin    = 'round'
        ctx.stroke()

        /* ── Mid glow ── */
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        for (const [x, y] of pts) ctx.lineTo(x, y)
        ctx.strokeStyle = `rgba(${w.r},${w.g},${w.b},${w.lineAlpha * 0.35})`
        ctx.lineWidth   = w.lw * 3
        ctx.stroke()

        /* ── Core bright line ── */
        ctx.beginPath()
        ctx.moveTo(pts[0][0], pts[0][1])
        for (const [x, y] of pts) ctx.lineTo(x, y)
        ctx.strokeStyle = `rgba(${w.r},${w.g},${w.b},${w.lineAlpha})`
        ctx.lineWidth   = w.lw
        ctx.stroke()
      }

      /* ── Top & bottom fade mask (keeps nav + footer readable) ── */
      const topMask = ctx.createLinearGradient(0, 0, 0, H * 0.22)
      topMask.addColorStop(0, 'rgba(11,23,40,0.88)')
      topMask.addColorStop(1, 'rgba(11,23,40,0)')
      ctx.fillStyle = topMask
      ctx.fillRect(0, 0, W, H * 0.22)

      const botMask = ctx.createLinearGradient(0, H * 0.78, 0, H)
      botMask.addColorStop(0, 'rgba(11,23,40,0)')
      botMask.addColorStop(1, 'rgba(11,23,40,0.88)')
      ctx.fillStyle = botMask
      ctx.fillRect(0, H * 0.78, W, H * 0.22)

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -3 }}
    />
  )
}
