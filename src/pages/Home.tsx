import { Link } from 'react-router-dom'
import { projects, categoryLabels } from '../data/projects'

const KEYWORDS = [
  'Time Series Econometrics',
  'VAR / SVAR',
  'Statistical Modelling',
  'Input–Output Analysis',
  'Statistical Arbitrage',
  'Market Analysis',
  'R',
  'Python (learning)',
]

const METHODS = [
  'Econometrics',
  'Time series analysis',
  'Structural VAR',
  'Input–output analysis',
  'Cointegration',
]

/** Highlighted term inside the abstract. */
function Term({ children }: { children: React.ReactNode }) {
  return <span className="text-gold font-semibold">{children}</span>
}

function SectionTitle({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-4 mb-6">
      <span className="font-mono text-[10px] tracking-[0.09em] text-gold">{index} /</span>
      <h2 className="text-[25px] leading-tight">{children}</h2>
    </div>
  )
}

export default function Home() {
  const featured = projects.filter(p => p.featured)
  const cv = `${import.meta.env.BASE_URL}resume.pdf`

  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="pt-20 pb-16" style={{ borderBottom: '1px solid var(--rule)' }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.09em] text-gold mb-6">
          Undergraduate researcher / {new Date().getFullYear()}
        </p>

        <h1 className="text-[clamp(34px,5vw,57px)] leading-[1.22] tracking-[-0.055em] mb-5">
          Silvanius Brian Mulu
        </h1>

        <p className="text-[15px] text-ink-muted mb-8">
          B.A. Economics (Honors) <span aria-hidden="true">·</span> Minor in Mathematics
        </p>

        <p className="font-display text-[17px] leading-[1.9] max-w-[680px] mb-8">
          I study how economic shocks move through industries and financial markets,
          with interests in econometrics, time series, and quantitative finance.
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <Link to="/projects" className="btn-primary">Explore research&nbsp; ↗</Link>
          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-gold pb-[3px]"
            style={{ borderBottom: '1px solid #849b90' }}
          >
            Download CV ↓
          </a>
        </div>
      </section>

      {/* ── Main + sidebar ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_205px] gap-y-0 lg:gap-x-[75px]">

        {/* ── Main column ── */}
        <div className="min-w-0">

          {/* 01 — About */}
          <section className="py-14" style={{ borderBottom: '1px solid var(--rule)' }}>
            <SectionTitle index="01">About</SectionTitle>

            <p className="text-ink-muted mb-4">
              I am an Economics major and Mathematics minor who enjoys reading and applying
              theoretical models to real world problems. As a research assistant under
              Dr. Anurag Deb, I am currently working on my honors thesis studying how industries
              with stronger <Term>oil linkage factors</Term> experience sharper upstream and
              downstream propagation of <Term>oil price shocks</Term>. The project draws on{' '}
              <Term>input–output analysis</Term>, macroeconomics, network theory and{' '}
              <Term>VAR and SVAR frameworks</Term> to trace how shocks travel through the
              industrial structure of the U.S. economy.
            </p>

            <p className="text-ink-muted mb-4">
              Independently, I am working on a <Term>statistical arbitrage</Term> paper examining{' '}
              <Term>pairs trading dynamics</Term> between oil and U.S. equities.
            </p>

            <p className="text-ink-muted">
              Outside research, I read on financial instruments, <Term>market microstructure</Term>{' '}
              and <Term>time series analysis</Term>. Looking ahead, my longer term goal is a{' '}
              <Term>PhD in Macroeconomics or Econometrics</Term>, with{' '}
              <Term>quantitative research</Term> as the foundation I am building toward now.
            </p>
          </section>

          {/* 02 — Selected research */}
          <section className="py-14" style={{ borderBottom: '1px solid var(--rule)' }}>
            <SectionTitle index="02">Selected research</SectionTitle>

            {featured.map((p, i) => (
              <article
                key={p.id}
                className="py-6 first:pt-0"
                style={i === 0 ? undefined : { borderTop: '1px solid var(--rule)' }}
              >
                <div className="flex justify-between items-baseline gap-4 flex-wrap mb-2">
                  <h3 className="text-[17px] leading-[1.5] tracking-[-0.02em]">{p.title}</h3>
                  <span className="font-mono text-[9px] uppercase tracking-[0.09em] text-ink-faint whitespace-nowrap">
                    {String(i + 1).padStart(2, '0')} · {categoryLabels[p.category]}
                  </span>
                </div>

                {p.metric && (
                  <p className="font-mono text-[10px] text-gold mb-2.5">
                    {p.metric.label} · {p.metric.value}
                  </p>
                )}

                <p className="text-[13px] leading-[1.85] text-ink-muted mb-3 line-clamp-3">
                  {p.description}
                </p>

                <Link to="/projects" className="text-xs font-semibold text-gold hover:underline">
                  Read more ↗
                </Link>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.tags.slice(0, 5).map(t => (
                    <span key={t} className="tag-default">{t}</span>
                  ))}
                </div>
              </article>
            ))}

            <Link
              to="/projects"
              className="inline-block mt-6 text-xs font-semibold text-gold hover:underline"
            >
              View all projects ↗
            </Link>
          </section>

          {/* 03 — Research interests */}
          <section className="py-14" style={{ borderBottom: '1px solid var(--rule)' }}>
            <SectionTitle index="03">Research interests</SectionTitle>
            <p className="text-ink-muted mb-5">
              Time series econometrics, structural VARs, financial market microstructure,
              quantitative trading, network economics, and macroeconomic transmission.
            </p>
            <div className="flex flex-wrap gap-2">
              {KEYWORDS.map(k => <span key={k} className="tag-default">{k}</span>)}
            </div>
          </section>

          {/* 04 — Contact */}
          <section className="py-14">
            <SectionTitle index="04">Contact</SectionTitle>
            <p className="text-ink-muted mb-3">
              I welcome conversations about research, economics, and quantitative finance.
            </p>
            <p className="text-ink-muted">
              <a className="text-gold hover:underline" href="mailto:uvb20@txstate.edu">Email me ↗</a>
              <span className="mx-3 text-ink-faint">·</span>
              <a className="text-gold hover:underline" href="https://github.com/Mulu007" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <span className="mx-3 text-ink-faint">·</span>
              <a className="text-gold hover:underline" href="https://www.linkedin.com/in/silvanius/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            </p>
          </section>
        </div>

        {/* ── Sidebar ── */}
        <aside
          className="pt-9 lg:pt-16 pb-2 grid grid-cols-2 gap-x-6 sm:grid-cols-4 lg:grid-cols-1 lg:gap-x-0"
          aria-label="Research profile"
        >
          <div className="pb-7 mb-7 lg:border-b" style={{ borderColor: 'var(--rule)' }}>
            <p className="kicker mb-4">Current focus</p>
            <p className="text-xs leading-[1.9] text-ink-muted">
              Oil shock transmission across U.S. industries, and regime-dependent
              statistical arbitrage.
            </p>
          </div>

          <div className="pb-7 mb-7 lg:border-b" style={{ borderColor: 'var(--rule)' }}>
            <p className="kicker mb-4">Methods</p>
            <p className="text-xs leading-[1.9] text-ink-muted">
              {METHODS.map(m => <span key={m} className="block">{m}</span>)}
            </p>
          </div>

          <div className="pb-7 mb-7 lg:border-b" style={{ borderColor: 'var(--rule)' }}>
            <p className="kicker mb-4">Tools</p>
            <p className="text-xs leading-[1.9] text-ink-muted">
              R · Python (learning)<br />Power BI · Excel · LaTeX
            </p>
          </div>

          <div className="pb-7">
            <p className="kicker mb-4">Elsewhere</p>
            <a className="block text-xs text-gold hover:underline my-2" href="https://github.com/Mulu007" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a className="block text-xs text-gold hover:underline my-2" href="https://www.linkedin.com/in/silvanius/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
            <a className="block text-xs text-gold hover:underline my-2" href="mailto:uvb20@txstate.edu">Email ↗</a>
          </div>
        </aside>
      </div>
    </>
  )
}
