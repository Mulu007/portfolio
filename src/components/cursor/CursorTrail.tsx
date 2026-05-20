import { useEffect, useRef } from 'react'

const ACCENTS = ['#38bdf8', '#67e8f9', '#7dd3fc', '#818cf8', '#a5b4fc', '#22d3ee']
const N = 8

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ringRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if ('ontouchstart' in window) return

    const canvas = canvasRef.current!
    const ring   = ringRef.current!
    const ctx    = canvas.getContext('2d')!

    const xs = Array(N).fill(window.innerWidth / 2)
    const ys = Array(N).fill(window.innerHeight / 2)
    let mx = xs[0], my = ys[0]
    let ringX = mx, ringY = my
    let rafId: number

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY }, { passive: true })

    document.addEventListener('mouseover', (e) => {
      const el = (e.target as Element)
      ring.classList.toggle('grow', !!el.closest('a,button,[data-grow]'))
    }, { passive: true })

    document.addEventListener('click', (e) => {
      for (let i = 0; i < 10; i++) {
        const dot = document.createElement('div')
        dot.className = 'burst-dot'
        const color = ACCENTS[Math.floor(Math.random() * ACCENTS.length)]
        dot.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:${color};box-shadow:0 0 5px 1px ${color};`
        document.body.appendChild(dot)
        const ang = (i / 10) * Math.PI * 2 + Math.random() * 0.5
        const dist = 40 + Math.random() * 55
        dot.animate([
          { transform: 'translate(-50%,-50%) scale(1.3)', opacity: 1 },
          { transform: `translate(calc(-50% + ${(Math.cos(ang)*dist).toFixed(0)}px),calc(-50% + ${(Math.sin(ang)*dist).toFixed(0)}px)) scale(0)`, opacity: 0 },
        ], { duration: 450 + Math.random() * 300, easing: 'cubic-bezier(.25,.46,.45,.94)', fill: 'forwards' })
          .finished.then(() => dot.remove())
      }
    })

    const loop = () => {
      xs[0] += (mx - xs[0]) * 0.3
      ys[0] += (my - ys[0]) * 0.3
      for (let i = 1; i < N; i++) {
        xs[i] += (xs[i-1] - xs[i]) * 0.28
        ys[i] += (ys[i-1] - ys[i]) * 0.28
      }
      ringX += (mx - ringX) * 0.2
      ringY += (my - ringY) * 0.2
      ring.style.transform = `translate(${ringX.toFixed(1)}px,${ringY.toFixed(1)}px) translate(-50%,-50%)`

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < N; i++) {
        const frac = 1 - i / N
        ctx.beginPath()
        ctx.arc(xs[i], ys[i], Math.max(1, 5 * frac), 0, Math.PI * 2)
        ctx.fillStyle = ACCENTS[i % ACCENTS.length]
        ctx.globalAlpha = frac * 0.5
        ctx.fill()
      }
      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])

  if ('ontouchstart' in window) return null

  return (
    <>
      <canvas ref={canvasRef} aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: 197 }} />
      <div ref={ringRef} aria-hidden className="cursor-ring" />
    </>
  )
}
