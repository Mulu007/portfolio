import { useEffect, useRef } from 'react'
import katex from 'katex'

interface PieceRow {
  expr:   string   // LaTeX for the polynomial expression
  domain: string   // LaTeX for the domain
}

interface Props {
  rows: PieceRow[]
}

function KatexSpan({ latex, display = false }: { latex: string; display?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    katex.render(latex, ref.current, {
      throwOnError:    false,
      displayMode:     display,
      output:          'html',
    })
  }, [latex, display])

  return <span ref={ref} />
}

export default function PiecewiseSystem({ rows }: Props) {
  return (
    <div
      className="rounded-sm px-4 py-3 mt-3 mb-4 overflow-x-auto"
      style={{
        background:   'rgba(56,189,248,0.04)',
        border:       '1px solid rgba(56,189,248,0.18)',
        boxShadow:    '0 0 18px rgba(56,189,248,0.06)',
      }}
    >
      {/* Label */}
      <p className="font-mono text-[9px] uppercase tracking-widest text-gold-dark mb-3 opacity-70">
        P(x) — Piecewise System · 6 Intervals
      </p>

      {/* P(x) = { ... } layout */}
      <div className="flex items-start gap-2">

        {/* "P(x) =" */}
        <span
          className="font-mono text-xs text-ink-muted shrink-0 pt-1"
          style={{ lineHeight: '2rem' }}
        >
          P(x) =
        </span>

        {/* Left brace */}
        <div
          className="shrink-0 self-stretch"
          style={{
            borderLeft:   '1.5px solid rgba(56,189,248,0.55)',
            borderTop:    '1.5px solid rgba(56,189,248,0.55)',
            borderBottom: '1.5px solid rgba(56,189,248,0.55)',
            width:        '8px',
            borderRadius: '3px 0 0 3px',
            minHeight:    `${rows.length * 2}rem`,
          }}
        />

        {/* Rows */}
        <div className="flex flex-col gap-1.5 pl-2">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-4 min-h-[2rem]">
              {/* Expression */}
              <span className="text-ink text-sm">
                <KatexSpan latex={row.expr} />
              </span>
              {/* Domain */}
              <span
                className="text-xs shrink-0"
                style={{ color: 'rgba(56,189,248,0.60)' }}
              >
                <KatexSpan latex={row.domain} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
