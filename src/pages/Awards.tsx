import { motion } from 'framer-motion'
import { Trophy, Star, BookOpen, Users } from 'lucide-react'
import { awards, categoryMeta, type AwardCategory } from '../data/awards'
import ScrollReveal from '../components/ui/ScrollReveal'
import PaperCard from '../components/ui/GlassCard'

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3 } },
}

const catIcons: Record<AwardCategory, typeof Trophy> = {
  academic:    BookOpen,
  competition: Trophy,
  recognition: Star,
  leadership:  Users,
}

export default function Awards() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">

      <ScrollReveal>
        <p className="font-mono text-xs text-ink-faint uppercase tracking-widest mb-2">§3</p>
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Awards & Recognition</h1>
        <p className="text-ink-muted leading-relaxed mb-10">
          Academic honors, competition placements, scholarships and extracurricular recognition.
        </p>
      </ScrollReveal>

      {/* Stats bar */}
      <ScrollReveal delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {(
            [
              { label: 'Academic', count: awards.filter(a => a.category === 'academic').length,    color: '#38bdf8' },
              { label: 'Competition', count: awards.filter(a => a.category === 'competition').length, color: '#67e8f9' },
              { label: 'Recognition', count: awards.filter(a => a.category === 'recognition').length, color: '#818cf8' },
              { label: 'Leadership', count: awards.filter(a => a.category === 'leadership').length,  color: '#7dd3fc' },
            ]
          ).map(stat => (
            <PaperCard key={stat.label} className="p-4 text-center" tilt={false} accent={stat.color}>
              <p className="font-mono text-2xl font-bold" style={{ color: stat.color }}>{stat.count}</p>
              <p className="font-mono text-xs text-ink-faint uppercase tracking-wider mt-1">{stat.label}</p>
            </PaperCard>
          ))}
        </div>
      </ScrollReveal>

      {/* Awards list */}
      <div className="space-y-4">
        {awards.map((award, i) => {
          const meta  = categoryMeta[award.category]
          const Icon  = catIcons[award.category]
          return (
            <ScrollReveal key={award.id} delay={i * 0.06}>
              <PaperCard className={award.image ? 'overflow-hidden' : 'p-5'} accent={meta.color} tilt={false}>

                {/* ── Optional photo banner ── */}
                {award.image && (
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={award.image}
                      alt={award.title}
                      className="w-full h-full object-cover"
                      onError={e => {
                        const el = e.currentTarget.parentElement!
                        el.style.background = `${meta.color}0a`
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    {/* Gradient overlay */}
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(to bottom, transparent 20%, rgba(11,23,40,0.95) 100%)' }}
                    />
                    {/* Category tag on photo */}
                    <span
                      className="absolute top-3 right-3 font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm"
                      style={{ color: meta.color, background: 'rgba(11,23,40,0.75)', border: `1px solid ${meta.color}40` }}
                    >
                      {meta.label}
                    </span>
                    {/* Title pinned to bottom of photo */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <h2 className="font-display font-bold text-base text-ink leading-snug drop-shadow">
                        {award.title}
                      </h2>
                      <p className="font-mono text-[10px] text-ink-faint mt-0.5">{award.org} · {award.year}</p>
                    </div>
                  </div>
                )}

                {/* ── Card body ── */}
                <div className={`flex items-start gap-4 ${award.image ? 'p-4 pt-3' : ''}`}>

                  {/* Icon column */}
                  <div
                    className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `${meta.color}14`, border: `1px solid ${meta.color}30` }}
                  >
                    <Icon size={16} style={{ color: meta.color }} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title row — hidden when photo already shows it */}
                    {!award.image && (
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                        <div>
                          <h2 className="font-display font-bold text-lg text-ink leading-snug">
                            {award.title}
                          </h2>
                          <p className="font-mono text-xs text-ink-faint mt-0.5">
                            {award.org} · {award.year}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {award.highlight && (
                            <span
                              className="font-mono text-xs font-bold px-2 py-0.5 rounded-sm"
                              style={{ color: meta.color, background: `${meta.color}12`, border: `1px solid ${meta.color}30` }}
                            >
                              {award.highlight}
                            </span>
                          )}
                          <span className={meta.tagClass}>{meta.label}</span>
                        </div>
                      </div>
                    )}

                    {/* Badges row — always visible */}
                    {award.image && (
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        {award.highlight && (
                          <span
                            className="font-mono text-xs font-bold px-2 py-0.5 rounded-sm"
                            style={{ color: meta.color, background: `${meta.color}12`, border: `1px solid ${meta.color}30` }}
                          >
                            {award.highlight}
                          </span>
                        )}
                        <span className={meta.tagClass}>{meta.label}</span>
                      </div>
                    )}

                    <div className="h-px my-2" style={{ background: 'rgba(56,189,248,0.10)' }} />

                    <p className="text-ink-muted text-sm leading-relaxed">{award.description}</p>
                  </div>
                </div>

              </PaperCard>
            </ScrollReveal>
          )
        })}
      </div>

    </motion.div>
  )
}
