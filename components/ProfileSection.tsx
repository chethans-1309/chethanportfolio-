'use client'

import { motion } from 'framer-motion'

const LANGUAGES = ['English', 'Hindi', 'Kannada']
const INTERESTS = [
  'Data Engineering',
  'Competitive Programming & DSA',
  'Cloud Computing'
]
const HOBBIES = [
  'Building Side Projects',
  'Coding Challenges',
  'Playing Strategy Games',
  'Teaching & Mentoring'
]

export function ProfileSection() {
  const card = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  }
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-bold">Profile Details, Interests, and Hobbies</h2>
      <motion.div
        className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.div variants={card} className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold">Languages</h3>
          <ul className="mt-4 space-y-3">
            {LANGUAGES.map((l) => (
              <li key={l} className="flex items-center gap-3 text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
                {l}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={card} className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold">Interests</h3>
          <ul className="mt-4 space-y-3">
            {INTERESTS.map((i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-neon" aria-hidden />
                {i}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div variants={card} className="glass rounded-xl p-6">
          <h3 className="text-xl font-semibold">Hobbies</h3>
          <ul className="mt-4 space-y-3">
            {HOBBIES.map((h) => (
              <li key={h} className="flex items-center gap-3 text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </div>
  )
}


