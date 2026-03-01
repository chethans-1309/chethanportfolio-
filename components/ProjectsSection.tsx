'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StatCounter } from './StatCounter'

type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  details: string
  links?: { code?: string; demo?: string }
}

const PROJECTS: Project[] = [
  {
    id: 'multimodal',
    title: 'Multimodal Human Behaviour Analysis',
    description:
      'Multimodal ML integrating video, audio, and sensor data for improved emotion recognition accuracy.',
    tags: ['Machine Learning', 'Multimodal', 'Temporal Modeling'],
    details:
      'Feature fusion with temporal modeling across video, audio, and sensor modalities. Pipeline emphasizes synchronized preprocessing, learned fusion, and robust evaluation.'
  },
  {
    id: 'academor',
    title: 'Academor – AI for Warehouse Optimization',
    description:
      'AI-driven warehouse intelligence improving accuracy, processing time, and decision speed.',
    tags: ['AI', 'Optimization', 'Analytics'],
    details:
      'Optimizes inventory tracking and order management using predictive analytics and rule-based automation. Architecture focuses on data ingestion, model scoring, and operator feedback loops.'
  }
]

export function ProjectsSection() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = PROJECTS.find((p) => p.id === activeId)

  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-bold">Projects</h2>
      <p className="mt-2 max-w-2xl text-white/70">
        Selected work showcasing practical applications of AI/ML and systems design.
      </p>

      <motion.div
        className="mt-8 grid grid-cols-1 gap-5"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 1 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } }
        }}
      >
        {PROJECTS.map((p, idx) => (
          <motion.article
            key={p.id}
            variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.02 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="glass group relative cursor-pointer overflow-hidden rounded-xl p-5 transition"
            onClick={() => setActiveId(p.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActiveId(p.id)}
            aria-label={`Open details for ${p.title}`}
          >
            {/* Hover glow accent */}
            <motion.div
              className="pointer-events-none absolute inset-0 -z-10 opacity-0"
              style={{
                background:
                  'radial-gradient(600px 120px at 20% 0%, rgba(127,90,240,0.18), transparent 60%)'
              }}
              aria-hidden
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <h3 className="text-xl font-semibold group-hover:text-white">{p.title}</h3>
            <p className="mt-2 text-white/70">{p.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li key={t} className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/70">
                  {t}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      {/* Academor KPI counters */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <motion.div
          className="glass rounded-xl p-4 text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-sm text-white/60">Inventory Accuracy</div>
          <StatCounter to={30} />
          <div className="text-xs text-white/50">improvement</div>
        </motion.div>
        <motion.div
          className="glass rounded-xl p-4 text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="text-sm text-white/60">Order Processing Time</div>
          <StatCounter to={40} />
          <div className="text-xs text-white/50">reduction</div>
        </motion.div>
        <motion.div
          className="glass rounded-xl p-4 text-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="text-sm text-white/60">Decision-Making Speed</div>
          <StatCounter to={25} />
          <div className="text-xs text-white/50">faster</div>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="glass relative w-full max-w-2xl rounded-xl p-6"
            >
              <button
                className="absolute right-3 top-3 rounded-md border border-white/10 px-2 py-1 text-sm text-white/80 hover:text-white focus-ring"
                onClick={() => setActiveId(null)}
                aria-label="Close project details"
              >
                Close
              </button>
              <h3 className="text-2xl font-semibold">{active.title}</h3>
              <p className="mt-2 text-white/80">{active.description}</p>
              <div className="mt-4 text-white/70">{active.details}</div>
              <div className="mt-5 flex flex-wrap gap-3">
                {active.links?.code && (
                  <a className="focus-ring rounded-tab border border-white/15 bg-surface px-4 py-2" href={active.links.code} target="_blank" rel="noreferrer">
                    View Code
                  </a>
                )}
                {active.links?.demo && (
                  <a className="focus-ring rounded-tab bg-neon/20 px-4 py-2" href={active.links.demo} target="_blank" rel="noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


