import { useEffect, useRef } from 'react'
import katex from 'katex'

interface Row { label: string; latex: string }
interface Props { rows: Row[] }

function KatexBlock({ latex }: { latex: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    katex.render(latex, ref.current, { throwOnError: false, displayMode: true, output: 'html' })
  }, [latex])
  return <div ref={ref} />
}

function KatexInline({ latex }: { latex: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!ref.current) return
    katex.render(latex, ref.current, { throwOnError: false, displayMode: false, output: 'html' })
  }, [latex])
  return <span ref={ref} />
}

export default function EquationSystem({ rows }: Props) {
  return (
    <div className="mt-3 mb-4 space-y-2">
      {rows.map((row, i) => (
        <div
          key={i}
          className="rounded-sm px-4 py-3"
          style={{
            background: 'rgba(56,189,248,0.04)',
            border:     '1px solid rgba(56,189,248,0.16)',
          }}
        >
          {/* Label */}
          <p className="font-mono text-[9px] uppercase tracking-widest mb-2"
             style={{ color: 'rgba(56,189,248,0.55)' }}>
            <KatexInline latex={row.label} />
          </p>
          {/* Equation */}
          <div className="text-ink overflow-x-auto">
            <KatexBlock latex={row.latex} />
          </div>
        </div>
      ))}
    </div>
  )
}
