import { motion } from 'framer-motion'
import { Trophy, Wrench } from 'lucide-react'
import { skills, interests, competitions } from '../data/interests'
import ScrollReveal from '../components/ui/ScrollReveal'
import PaperCard from '../components/ui/GlassCard'

/** Resolve a public-folder path against Vite's base URL so it works
 *  both in dev (base = '/') and on GitHub Pages (base = '/portfolio/'). */
const toSrc = (path: string) =>
  path.startsWith('http') ? path
    : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3 } },
}

const catMeta = {
  lang:    { label: 'Languages',        accent: '#38bdf8' },
  lib:     { label: 'Libraries',        accent: '#67e8f9' },
  tool:    { label: 'Tools',            accent: '#818cf8' },
  finance: { label: 'Finance Concepts', accent: '#a5f3fc' },
}

function SkillDots({ level, accent }: { level: number; accent: string }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full transition-all duration-300"
          style={{
            background: i < level ? accent : 'rgba(56,189,248,0.12)',
            boxShadow:  i < level ? `0 0 5px ${accent}88` : 'none',
          }}
        />
      ))}
    </div>
  )
}

export default function Interests() {
  const catKeys = ['lang', 'lib', 'tool', 'finance'] as const

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">

      {/* ── Header ──────────────────────────────────── */}
      <ScrollReveal>
        <p className="font-mono text-xs text-ink-faint uppercase tracking-widest mb-2">§4</p>
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Skills & Interests</h1>
        <p className="text-ink-muted leading-relaxed mb-10">
          Technical toolkit, reading list, competitions, and the life outside the terminal.
        </p>
      </ScrollReveal>

      {/* ── Skills ──────────────────────────────────── */}
      <ScrollReveal>
        <div className="flex items-center gap-2 mb-6">
          <Wrench size={16} className="text-gold" />
          <h2 className="font-display font-bold text-2xl text-ink">Technical Skills</h2>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-4 mb-14">
        {catKeys.map((cat, ci) => {
          const { label, accent } = catMeta[cat]
          const items = skills.filter(s => s.category === cat)
          return (
            <ScrollReveal key={cat} delay={ci * 0.06}>
              <PaperCard className="p-5" accent={accent} tilt={false}>
                <p className="font-mono text-xs font-bold uppercase tracking-widest mb-4"
                   style={{ color: accent }}>
                  {label}
                </p>
                <div className="space-y-3">
                  {items.map(skill => (
                    <div key={skill.name} className="flex items-center justify-between gap-3">
                      <span className="text-sm text-ink font-semibold">{skill.name}</span>
                      <SkillDots level={skill.level} accent={skill.color} />
                    </div>
                  ))}
                </div>
              </PaperCard>
            </ScrollReveal>
          )
        })}
      </div>

      {/* ── Competitions ────────────────────────────── */}
      <div className="section-rule">
        <div className="flex items-center gap-2 shrink-0">
          <Trophy size={15} className="text-gold" />
          <span className="section-heading">Competitions</span>
        </div>
      </div>

      <div className="space-y-3 mb-14">
        {competitions.map((c, i) => (
          <ScrollReveal key={c.name} delay={i * 0.07}>
            <PaperCard className="p-4 flex items-center gap-4" tilt={false}>
              <span className="text-xl shrink-0">🏆</span>
              <div>
                <p className="font-display font-bold text-base text-ink">{c.name}</p>
                <p className="font-mono text-xs text-ink-muted">{c.org} · {c.detail}</p>
              </div>
            </PaperCard>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Personal ────────────────────────────────── */}
      <div className="section-rule">
        <span className="section-heading">Personal</span>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {interests.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.06}>
            {item.image ? (
              /* Photo card */
              <PaperCard className="overflow-hidden" tilt={false}>
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={toSrc(item.image!)}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    onError={e => {
                      /* fallback: hide broken image, show icon bg */
                      const el = e.currentTarget.parentElement!
                      el.style.background = 'rgba(56,189,248,0.06)'
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, transparent 25%, rgba(13,30,56,0.92) 100%)' }}
                  />
                  {/* Label on top of image */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>
                    <h3 className="font-display font-bold text-sm text-ink">{item.label}</h3>
                  </div>
                  {/* Blueprint corner brackets on the photo */}
                  <span className="absolute top-2 right-2 font-mono text-[8px] text-gold opacity-60 tracking-widest">
                    PHOTO
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-ink-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </PaperCard>
            ) : (
              /* Icon card */
              <PaperCard className="p-5" tilt={false}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-display font-bold text-base text-ink mb-1">{item.label}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{item.description}</p>
              </PaperCard>
            )}
          </ScrollReveal>
        ))}
      </div>

    </motion.div>
  )
}
