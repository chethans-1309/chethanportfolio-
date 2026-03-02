'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Hero() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-center px-4 pt-16 text-left">
      
      {/* Small profile photo */}
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-4"
      >
        {imgError ? (
          <div
            className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan/30 to-purple-400/30"
            role="img"
            aria-label="Profile placeholder"
          />
        ) : (
          <div className="relative h-16 w-16">
            <span className="absolute inset-0 -z-10 rounded-full bg-cyan/30 blur-md" />
            <Image
              src="/images/shanku.jpg"
              alt="Portrait of Chethan S"
              width={64}
              height={64}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-cyan-400"
              onError={() => setImgError(true)}
              priority
            />
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-3 text-cyan-400"
      >
        Hey there! I'm
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-[44px] font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
      >
        Chethan S
      </motion.h1>

      <RotatingSubtitle />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 max-w-4xl text-lg leading-8 text-white/80 sm:text-xl"
      >
        Highly motivated Computer Science Engineering student with strong 
        problem-solving and analytical abilities. Experienced in applying 
        academic knowledge through real-world projects and internships. 
        Passionate about leveraging technology to create innovative and 
        impactful applications.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <motion.a
          href="/chethan.pdf"
          download
          className="rounded-lg border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          View My Resume
        </motion.a>
      </motion.div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70"
      >
        <motion.li variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
          <a href="mailto:chethan130904@gmail.com" className="hover:text-white">
            chethan130904@gmail.com
          </a>
        </motion.li>

        <motion.li variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
          <a href="tel:+918050540978" className="hover:text-white">
            +91-8050540978
          </a>
        </motion.li>

        <motion.li variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
          <a
            href="https://linkedin.com/in/chethan-s-130904cs"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            LinkedIn
          </a>
        </motion.li>
      </motion.ul>
    </div>
  )
}

function RotatingSubtitle() {
  const phrases = [
    'A Software Developer',
    'A Creative Thinker',
    'Problem Solver'
  ]

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  const TYPING_MS = 70
  const DELETING_MS = 45
  const PAUSE_MS = 900

  useEffect(() => {
    const full = phrases[phraseIndex]
    let timer: number | undefined

    if (phase === 'typing') {
      if (display.length < full.length) {
        timer = window.setTimeout(() => {
          setDisplay(full.slice(0, display.length + 1))
        }, TYPING_MS)
      } else {
        timer = window.setTimeout(() => {
          setPhase('pausing')
        }, PAUSE_MS)
      }
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timer = window.setTimeout(() => {
          setDisplay(full.slice(0, display.length - 1))
        }, DELETING_MS)
      } else {
        setPhraseIndex((i) => (i + 1) % phrases.length)
        setPhase('typing')
      }
    } else if (phase === 'pausing') {
      timer = window.setTimeout(() => {
        setPhase('deleting')
      }, PAUSE_MS)
    }

    return () => {
      if (timer !== undefined) {
        window.clearTimeout(timer)
      }
    }
  }, [display, phase, phraseIndex])

  const progress = Math.min(
    1,
    display.length / phrases[phraseIndex].length
  )

  return (
    <div className="mt-6">
      <div className="inline-block">
        <div className="text-2xl font-semibold">
          <motion.span
            className="bg-gradient-to-r from-white via-cyan-400 to-purple-400 bg-clip-text text-transparent"
          >
            {display}
          </motion.span>
          <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-white/80" />
        </div>

        <div className="mt-2 h-[6px] w-full max-w-[360px] rounded bg-cyan-400/30 overflow-hidden">
          <motion.div
            style={{ width: `${progress * 100}%` }}
            className="h-[6px] rounded bg-cyan-400"
          />
        </div>
      </div>
    </div>
  )
}