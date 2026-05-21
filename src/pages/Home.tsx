import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Code2, FileText } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import PaperCard from '../components/ui/GlassCard'
import { projects } from '../data/projects'

const ROLES = [
  'Macro-Economist Enthusiast',
  'Global News Addict',
  // 'Backyard Chicken Farmer',
  // 'Professional Pet Pamperer',
  'Decision Optmiser',
]

const KEYWORDS = [
  'Econometric modeling',
  'Time Series',
  'Numerical Optmisation',
  'Applied Calculus',
  'Market Analysis',
  'Quantitative Analysis',
]

function Typewriter() {
  const [idx, setIdx]      = useState(0)
  const [text, setText]    = useState('')
  const [deleting, setDel] = useState(false)

  useEffect(() => {
    const target = ROLES[idx]
    const delay  = deleting ? 30 : 65
    const timer  = setTimeout(() => {
      if (!deleting && text.length < target.length) {
        setText(target.slice(0, text.length + 1))
      } else if (!deleting && text.length === target.length) {
        setTimeout(() => setDel(true), 1800)
      } else if (deleting && text.length > 0) {
        setText(text.slice(0, -1))
      } else {
        setDel(false)
        setIdx(i => (i + 1) % ROLES.length)
      }
    }, delay)
    return () => clearTimeout(timer)
  }, [text, deleting, idx])

  return (
    <span className="text-gold font-mono">
      {text}
      <motion.span
        className="inline-block w-0.5 h-5 bg-gold align-middle ml-px"
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.65 }}
      />
    </span>
  )
}

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3 } },
}

const journeyVariants: Variants = {
  hidden:  {},
  show:    { transition: { staggerChildren: 0.12 } },
}

const journeyItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Home() {
  const featured = projects.filter(p => p.featured)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">

      {/* ── Manifesto card ─────────────────────────── */}
      <motion.div
        variants={journeyVariants}
        initial="hidden"
        animate="show"
      >
        <div className="abstract-box mb-10">

          {/* Top bar */}
          <motion.div
            variants={journeyItem}
            className="flex items-center justify-between flex-wrap gap-2 mb-5 pb-4"
            style={{ borderBottom: '1px solid var(--rule)' }}
          >
            <span className="font-mono text-xs text-ink-faint uppercase tracking-widest">
              · Undergraduate Portfolio · 
            </span>
            <span className="font-mono text-xs text-ink-faint">{new Date().getFullYear()}</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={journeyItem}
            className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight mb-1"
          >
            Silvanius Brian Mulu
          </motion.h1>

          <motion.p variants={journeyItem} className="font-mono text-sm text-ink-muted mb-4">
            Department of Economics ·{' '}
            <span className="text-navy">B.A. Economics (Honors), Minor in Mathematics</span>
          </motion.p>

          {/* Typewriter */}
          <motion.p variants={journeyItem} className="font-serif text-lg text-ink-muted mb-6">
            <Typewriter />
          </motion.p>

          {/* Abstract */}
          <motion.div variants={journeyItem} className="mb-6">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-gold-dark mb-3">
              Abstract
            </p>
            <p className="text-ink leading-relaxed">
              I am an Economics and Mathematics undergraduate driven by the idea that global events share an underlying, synchronized pattern. 
              Currently, I am authoring research papers focused on               {' '}
              <span className="text-gold font-semibold" style={{ textShadow: '0 0 14px rgba(56,189,248,0.75)' }}>
                VaR/sVaR
              </span>{' '}
              economic models while learning how to leverage time-series analysis to study stock market dynamics. 
              I love translating these interconnected global events into rigorous mathematical frameworks. 
              Looking ahead, I am building the foundations to transition into               {' '}
              <span className="text-gold font-semibold" style={{ textShadow: '0 0 14px rgba(56,189,248,0.75)' }}>
                quantitative trading/research
              </span>{' '} or a               {' '}
              <span className="text-gold font-semibold" style={{ textShadow: '0 0 14px rgba(56,189,248,0.75)' }}>
                PhD in Macroeconomics
              </span>{' '}.
              </p>
          </motion.div>

          {/* Keywords */}
          <motion.div variants={journeyItem} className="mb-6">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-gold-dark mb-2">
              Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {KEYWORDS.map((k, i) => (
                <motion.span
                  key={k}
                  className="tag-default"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.04, duration: 0.3 }}
                >
                  {k}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Equation */}
          {/* <motion.div variants={journeyItem} className="equation-box inline-block mb-6">
            {'E[rᵢ] = rⁱ + βᵢ · (E[rₘ] − rⁱ) + εᵢ'}
          </motion.div> */}

          {/* CTAs */}
          <motion.div
            variants={journeyItem}
            className="flex flex-wrap gap-3 pt-4"
            style={{ borderTop: '1px solid var(--rule)' }}
          >
            <Link to="/projects" className="btn-primary">
              View Research <ArrowRight size={16} />
            </Link>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
               className="btn-ghost">
              <Code2 size={16} /> GitHub
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <FileText size={16} /> CV
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Featured projects ─────────────────────── */}
      <ScrollReveal delay={0.1}>
        <div className="section-rule">
          <span className="section-heading">§1 &nbsp;Featured Research</span>
        </div>
      </ScrollReveal>

      <div className="space-y-4">
        {featured.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.08}>
            <PaperCard className="p-6" accent="#38bdf8">
              <div className="flex items-start gap-4">
                <span className="cite-num mt-0.5">[{i + 1}]</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <h3 className="font-display font-bold text-lg text-ink leading-snug">
                      {p.title}
                    </h3>
                    {p.metric && (
                      <span className="font-mono text-xs text-gold-dark font-bold whitespace-nowrap">
                        {p.metric.label}: {p.metric.value}
                      </span>
                    )}
                  </div>
                  <p className="text-ink-muted text-sm leading-relaxed mb-3">{p.description}</p>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-1 font-mono text-xs text-gold-dark hover:text-gold transition-colors mb-3"
                  >
                    Click here to read more <ArrowRight size={11} />
                  </Link>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map(t => <span key={t} className="tag-default">{t}</span>)}
                  </div>
                </div>
              </div>
            </PaperCard>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={0.1}>
        <div className="mt-6 flex justify-end">
          <Link to="/projects"
            className="font-mono text-sm text-gold-dark hover:text-gold flex items-center gap-1 transition-colors">
            View all projects <ArrowRight size={14} />
          </Link>
        </div>
      </ScrollReveal>

    </motion.div>
  )
}
