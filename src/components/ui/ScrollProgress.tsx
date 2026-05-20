import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      setPct(max ? (el.scrollTop / max) * 100 : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 h-[2px] z-[120] transition-[width] duration-100"
      style={{
        width: `${pct}%`,
        background: 'linear-gradient(90deg, #38bdf8, #67e8f9, #818cf8)',
        boxShadow: '0 0 10px rgba(56,189,248,0.5)',
      }}
    />
  )
}
