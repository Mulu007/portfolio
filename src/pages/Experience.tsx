import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Award, MapPin, Calendar, ArrowUpRight, Star } from 'lucide-react'
import ScrollReveal from '../components/ui/ScrollReveal'
import PaperCard from '../components/ui/GlassCard'
import { education, workExperience, relevantExperience, certifications } from '../data/experience'

const toSrc = (path: string) =>
  path.startsWith('http') ? path
    : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.3 } },
}

export default function Experience() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">

      {/* Page header */}
      <ScrollReveal>
        <p className="font-mono text-xs text-ink-faint uppercase tracking-widest mb-2">§5</p>
        <h1 className="font-display text-4xl font-bold text-ink mb-2">Experience</h1>
        <p className="text-ink-muted leading-relaxed mb-10">
          Academic background, research experience and professional certifications.
        </p>
      </ScrollReveal>

      {/* ── Education ─────────────────────────────── */}
      <ScrollReveal delay={0.05}>
        <div className="section-rule mb-6">
          <div className="flex items-center gap-2 shrink-0">
            <GraduationCap size={15} className="text-gold" />
            <span className="section-heading">Education</span>
          </div>
        </div>
      </ScrollReveal>

      <div className="space-y-4 mb-12">
        {education.map((edu, i) => (
          <ScrollReveal key={edu.institution} delay={i * 0.06}>
            <PaperCard className="p-6" accent="#38bdf8">
              <div className="flex items-start gap-4">
                <span className="cite-num mt-0.5">[{i + 1}]</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <div>
                      <h2 className="font-display font-bold text-xl text-ink leading-snug">
                        {edu.institution}
                      </h2>
                      <p className="font-mono text-sm text-gold-dark mt-0.5">{edu.degree}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-1 mb-3 flex-wrap">
                    <span className="flex items-center gap-1 font-mono text-xs text-ink-faint">
                      <Calendar size={11} /> {edu.period}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs text-ink-faint">
                      <MapPin size={11} /> {edu.location}
                    </span>
                  </div>
                  <div className="h-px bg-rule mb-3" />
                  <ul className="space-y-1.5">
                    {edu.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink-muted">
                        <span className="text-gold mt-1 shrink-0">◆</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </PaperCard>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Work Experience ───────────────────────── */}
      <ScrollReveal delay={0.05}>
        <div className="section-rule mb-6">
          <div className="flex items-center gap-2 shrink-0">
            <Briefcase size={15} className="text-gold" />
            <span className="section-heading">Work Experience</span>
          </div>
        </div>
      </ScrollReveal>

      <div className="space-y-4 mb-12">
        {workExperience.map((job, i) => (
          <ScrollReveal key={job.role + job.org} delay={i * 0.06}>
            <PaperCard className="p-6" accent="#38bdf8">
              <div className="flex items-start gap-4">
                <span className="cite-num mt-0.5">[{i + 1}]</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <div>
                      <h2 className="font-display font-bold text-xl text-ink leading-snug">
                        {job.role}
                      </h2>
                      <p className="font-mono text-sm text-gold-dark mt-0.5">{job.org}</p>
                    </div>
                    {job.badge && <span className="tag-navy whitespace-nowrap">{job.badge}</span>}
                  </div>
                  <div className="flex items-center gap-4 mt-1 mb-3 flex-wrap">
                    <span className="flex items-center gap-1 font-mono text-xs text-ink-faint">
                      <Calendar size={11} /> {job.period}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs text-ink-faint">
                      <MapPin size={11} /> {job.location}
                    </span>
                  </div>
                  <div className="h-px bg-rule mb-3" />
                  <ul className="space-y-1.5">
                    {job.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink-muted">
                        <span className="text-gold mt-1 shrink-0">◆</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </PaperCard>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Relevant Experience ──────────────────── */}
      <ScrollReveal delay={0.05}>
        <div className="section-rule mb-6">
          <div className="flex items-center gap-2 shrink-0">
            <Star size={15} className="text-gold" />
            <span className="section-heading">Relevant Experience</span>
          </div>
        </div>
      </ScrollReveal>

      <div className="space-y-4 mb-12">
        {relevantExperience.map((job, i) => (
          <ScrollReveal key={job.role + job.org} delay={i * 0.06}>
            <PaperCard className="p-6" accent="#38bdf8">
              <div className="flex items-start gap-4">
                <span className="cite-num mt-0.5">[{i + 1}]</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                    <div>
                      <h2 className="font-display font-bold text-xl text-ink leading-snug">{job.role}</h2>
                      <p className="font-mono text-sm text-gold-dark mt-0.5">{job.org}</p>
                    </div>
                    {job.badge && <span className="tag-navy whitespace-nowrap">{job.badge}</span>}
                  </div>
                  <div className="flex items-center gap-4 mt-1 mb-3 flex-wrap">
                    <span className="flex items-center gap-1 font-mono text-xs text-ink-faint">
                      <Calendar size={11} /> {job.period}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-xs text-ink-faint">
                      <MapPin size={11} /> {job.location}
                    </span>
                  </div>
                  <div className="h-px bg-rule mb-3" />
                  <ul className="space-y-1.5">
                    {job.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-ink-muted">
                        <span className="text-gold mt-1 shrink-0">◆</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </PaperCard>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Certifications ────────────────────────── */}
      <ScrollReveal delay={0.05}>
        <div className="section-rule mb-6">
          <div className="flex items-center gap-2 shrink-0">
            <Award size={15} className="text-gold" />
            <span className="section-heading">Certifications</span>
          </div>
        </div>
      </ScrollReveal>

      {certifications.length === 0 ? (
        <ScrollReveal delay={0.06}>
          <PaperCard className="p-6">
            <p className="font-mono text-xs text-ink-faint text-center">
              Certifications coming soon — add them in <code>src/data/experience.ts</code>
            </p>
          </PaperCard>
        </ScrollReveal>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.name} delay={i * 0.05}>
              <PaperCard className="p-5" tilt={false}>
                <p className="font-display font-bold text-ink mb-1">{cert.name}</p>
                <p className="font-mono text-xs text-gold-dark mb-1">{cert.issuer}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-mono text-xs text-ink-faint">{cert.year}</p>
                  {cert.pdf && (
                    <a
                      href={toSrc(cert.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-mono text-xs text-navy hover:text-navy-light transition-colors"
                    >
                      <ArrowUpRight size={11} /> View Certificate
                    </a>
                  )}
                </div>
              </PaperCard>
            </ScrollReveal>
          ))}
        </div>
      )}

    </motion.div>
  )
}
