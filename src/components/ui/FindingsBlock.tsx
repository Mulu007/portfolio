interface Finding { label: string; text: string }
interface Props   { findings: Finding[] }

export default function FindingsBlock({ findings }: Props) {
  return (
    <div className="mt-3 mb-4">
      <p className="font-mono text-[9px] uppercase tracking-widest mb-2"
         style={{ color: 'rgba(46,97,90,0.55)' }}>
        Key Findings
      </p>
      <div className="space-y-2">
        {findings.map((f, i) => (
          <div
            key={i}
            className="rounded-sm px-3 py-2.5"
            style={{
              background: 'rgba(46,97,90,0.03)',
              border:     '1px solid rgba(46,97,90,0.12)',
            }}
          >
            <p className="font-mono text-xs font-bold mb-1"
               style={{ color: '#2e615a' }}>
              {f.label}
            </p>
            <p className="text-ink-muted text-xs leading-relaxed">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
