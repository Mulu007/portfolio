const METEORS = [
  { top: '8%',  dur: '10s', delay: '0s'   },
  { top: '28%', dur: '15s', delay: '5s'   },
  { top: '52%', dur: '12s', delay: '9s'   },
  { top: '72%', dur: '18s', delay: '3s'   },
  { top: '18%', dur: '22s', delay: '14s'  },
  { top: '62%', dur: '11s', delay: '7.5s' },
]

export default function MeteorShower() {
  return (
    <div aria-hidden className="fixed inset-0 z-[-3] pointer-events-none overflow-hidden" style={{ contain: 'strict' }}>
      {METEORS.map((m, i) => (
        <div
          key={i}
          className="meteor"
          style={{
            top: m.top,
            left: -200,
            '--dur': m.dur,
            '--delay': m.delay,
            animation: `meteorFly ${m.dur} ${m.delay} linear infinite`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
