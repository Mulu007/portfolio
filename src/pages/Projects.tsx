import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Code2, TrendingUp } from 'lucide-react'
import { projects, categoryLabels, type ProjectCategory } from '../data/projects'
import ScrollReveal from '../components/ui/ScrollReveal'
import PaperCard from '../components/ui/GlassCard'
import PiecewiseSystem from '../components/ui/PiecewiseSystem'
import EquationSystem from '../components/ui/EquationSystem'
import FindingsBlock from '../components/ui/FindingsBlock'

const toSrc = (path: string) =>
  path.startsWith('http') ? path
    : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const FILTERS: { value: 'all' | ProjectCategory | 'ib'; label: string }[] = [
  { value: 'all',          label: 'All' },
  { value: 'economics',    label: 'Economics' },
  { value: 'software',     label: 'Software-Engineering' },
  { value: 'ib',           label: 'IB' },
]

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3 } },
}

export default function Projects() {
  const [active, setActive] = useState<'all' | ProjectCategory | 'ib'>('all')
  const filtered =
    active === 'all' ? projects :
    active === 'ib'  ? projects.filter(p => p.ib) :
    projects.filter(p => p.category === active)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">

      {/* Page header */}
      <ScrollReveal>
        <p className="font-mono text-xs text-ink-faint uppercase tracking-widest mb-2">§2</p>
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Projects & Research</h1>
        <p className="text-ink-muted leading-relaxed mb-8">
          Here is some of the work I have done.
          Each project includes the core methodology, key results and a link to source code.
        </p>
      </ScrollReveal>

      {/* Filter bar */}
      <ScrollReveal delay={0.05}>
        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-all duration-150 ${
                active === value
                  ? 'text-gold-dark border-gold/50 bg-gold/10'
                  : 'text-ink-muted border-rule bg-paper-dark hover:border-gold/30 hover:text-ink'
              }`}
            >
              {active === value && <span className="mr-1 opacity-60">◆</span>}
              {label}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Citation list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {filtered.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.05}>
              <PaperCard className="p-6" accent={p.featured ? '#38bdf8' : undefined}>
                <div className="flex items-start gap-4">

                  {/* Citation number */}
                  <span className="cite-num mt-0.5">[{i + 1}]</span>

                  <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                      <div>
                        <h2 className="font-display font-bold text-xl text-ink leading-snug">
                          {p.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="tag-gold">{categoryLabels[p.category]}</span>
                          {p.featured && <span className="tag-navy">Featured</span>}
                        </div>
                      </div>
                      {p.metric && (
                        <div className="flex items-center gap-1 font-mono text-sm font-bold text-gold-dark whitespace-nowrap">
                          <TrendingUp size={13} />
                          {p.metric.label}: {p.metric.value}
                        </div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-rule my-3" />

                    {/* Description */}
                    <p className="text-ink-muted text-sm leading-relaxed mb-3 whitespace-pre-line">{p.description}</p>

                    {/* Piecewise system (rendered KaTeX) */}
                    {p.piecewiseEquations && (
                      <PiecewiseSystem rows={p.piecewiseEquations} />
                    )}

                    {/* ODE / equation system (KaTeX) */}
                    {p.equationSystem && (
                      <EquationSystem rows={p.equationSystem} />
                    )}

                    {/* Key findings */}
                    {p.findings && (
                      <FindingsBlock findings={p.findings} />
                    )}

                    {/* Single equation (plain text fallback) */}
                    {p.equation && !p.piecewiseEquations && !p.equationSystem && (
                      <div className="equation-box text-xs mb-4 inline-block">
                        {p.equation}
                      </div>
                    )}

                    {/* Tags + links */}
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {p.tags.map(t => <span key={t} className="tag-default">{t}</span>)}
                      </div>
                      <div className="flex gap-4">
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer"
                             className="flex items-center gap-1 font-mono text-xs text-ink-muted hover:text-gold-dark transition-colors">
                            <Code2 size={13} /> Source
                          </a>
                        )}
                        {p.demo && (
                          <a href={toSrc(p.demo!)} target="_blank" rel="noopener noreferrer"
                             className="flex items-center gap-1 font-mono text-xs text-navy hover:text-navy-light transition-colors">
                            <ArrowUpRight size={13} />
                            {p.demo.endsWith('.pdf') ? 'PDF' : 'Demo'}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </PaperCard>
            </ScrollReveal>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
