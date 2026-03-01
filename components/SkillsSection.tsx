'use client'

import { motion } from 'framer-motion'

const SKILLS: { name: string; level: number; category: string }[] = [
  { name: 'Java', level: 80, category: 'Languages' },
  { name: 'C', level: 75, category: 'Languages' },
  { name: 'Python', level: 78, category: 'Languages' },
  { name: 'MySQL / DBMS', level: 76, category: 'Data' },
  { name: 'Machine Learning', level: 75, category: 'AI/ML' },
  { name: 'HTML / CSS', level: 85, category: 'Frontend' },
  { name: 'REST APIs', level: 72, category: 'Backend' },
  { name: 'Git', level: 74, category: 'Tools' },
  { name: 'Linux basics', level: 65, category: 'Tools' }
]

export function SkillsSection() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-bold">Skills</h2>
      <p className="mt-2 max-w-2xl text-white/70">Technical toolkit with practical proficiency levels.</p>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
        {SKILLS.map((s, idx) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: idx * 0.03 }}
            className="group glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between">
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-white/60">{s.category}</div>
            </div>
            <div className="mt-3 h-2 rounded bg-white/10">
              <motion.div
                className="h-2 rounded bg-gradient-to-r from-neon to-cyan"
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <div className="mt-2 text-right text-sm text-white/60">{s.level}%</div>
            <div className="mt-3 text-xs text-white/60 opacity-0 transition-opacity group-hover:opacity-100">
              Hover micro-interaction: proficiency bar pulses slightly and value glows.
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}



