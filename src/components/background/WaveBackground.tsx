import { useEffect, useRef } from 'react'

interface WaveCfg {
  amp: number; freq: number; speed: number
  color: string; lw: number; yFrac: number; phase: number
}

const WAVES: WaveCfg[] = [
  { amp: 24,  freq: 0.0095, speed: 0.00055, color: 'rgba(200,149,42,0.13)', lw: 1.3, yFrac: 0.18, phase: 0      },
  { amp: 38,  freq: 0.0065, speed: 0.00040, color: 'rgba(30,58,95,0.10)',   lw: 1.1, yFrac: 0.36, phase: 1.2    },
  { amp: 20,  freq: 0.0140, speed: 0.00075, color: 'rgba(200,149,42,0.09)', lw: 0.9, yFrac: 0.52, phase: 2.5    },
  { amp: 32,  freq: 0.0080, speed: 0.00045, color: 'rgba(184,92,56,0.09)',  lw: 1.2, yFrac: 0.68, phase: 0.7    },
  { amp: 18,  freq: 0.0120, speed: 0.00065, color: 'rgba(30,58,95,0.08)',   lw: 0.8, yFrac: 0.84, phase: 3.1    },
]

const GRID = 64

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let frame = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const draw = () => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Graph-paper grid
      ctx.lineWidth = 0.5
      ctx.strokeStyle = 'rgba(212,203,191,0.40)'
      for (let x = 0; x <= W; x += GRID) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y <= H; y += GRID) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Sine waves
      const t = frame * Math.PI * 2
      WAVES.forEach(w => {
        const baseY = H * w.yFrac
        ctx.beginPath()
        ctx.moveTo(0, baseY + Math.sin(w.phase) * w.amp)
        for (let x = 2; x <= W; x += 2) {
          ctx.lineTo(x, baseY + Math.sin(w.freq * x + t * w.speed + w.phase) * w.amp)
        }
        ctx.strokeStyle = w.color
        ctx.lineWidth   = w.lw
        ctx.stroke()
      })

      frame++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="fixed inset-0 pointer-events-none z-[-3]"
    />
  )
}
