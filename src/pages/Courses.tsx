import { motion } from 'framer-motion'
import { courses, categoryMeta, type CourseCategory } from '../data/courses'
import ScrollReveal from '../components/ui/ScrollReveal'
import PaperCard from '../components/ui/GlassCard'

const ORDER: CourseCategory[] = ['quant', 'economics', 'math', 'cs']

const accentMap: Record<string, string> = {
  gold:     '#c8952a',
  electric: '#1e3a5f',
  jade:     '#4a7c59',
  violet:   '#6b5b8f',
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3 } },
}

export default function Courses() {
  const grouped = ORDER.map(cat => ({
    cat, meta: categoryMeta[cat],
    items: courses.filter(c => c.category === cat),
  }))

  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">

      <ScrollReveal>
        <p className="font-mono text-xs text-ink-faint uppercase tracking-widest mb-2">§3</p>
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Courses</h1>
        <p className="text-ink-muted leading-relaxed mb-10">
          Relevant coursework grouped by discipline. Courses in quantitative methods,
          economics, mathematics, and computer science form the foundation of my research toolkit.
        </p>
      </ScrollReveal>

      <div className="space-y-14">
        {grouped.map(({ cat, meta, items }) => {
          const accent = accentMap[meta.color] ?? '#c8952a'
          return (
            <div key={cat}>
              <ScrollReveal>
                <div className="section-rule">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xl font-bold" style={{ color: accent }}>
                      {meta.icon}
                    </span>
                    <span className="font-mono text-sm font-bold uppercase tracking-widest"
                          style={{ color: accent }}>
                      {meta.label}
                    </span>
                    <span className="font-mono text-xs text-ink-faint">({items.length})</span>
                  </div>
                </div>
              </ScrollReveal>

              <div className="grid md:grid-cols-2 gap-4">
                {items.map((course, i) => (
                  <ScrollReveal key={course.code} delay={i * 0.05}>
                    <PaperCard className="p-5 h-full flex flex-col" accent={accent} tilt={false}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className="font-mono text-xs font-bold px-2 py-0.5 rounded border"
                          style={{
                            color: accent,
                            borderColor: `${accent}40`,
                            background: `${accent}10`,
                          }}
                        >
                          {course.code}
                        </span>
                        {course.grade && (
                          <span className="font-mono text-xs text-ink-faint">{course.grade}</span>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-base text-ink mb-2 leading-snug">
                        {course.title}
                      </h3>

                      <p className="text-ink-muted text-sm leading-relaxed flex-1">
                        {course.description}
                      </p>

                      {course.tools && (
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3" style={{ borderTop: '1px solid var(--rule)' }}>
                          {course.tools.map(t => <span key={t} className="tag-default">{t}</span>)}
                        </div>
                      )}
                    </PaperCard>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
