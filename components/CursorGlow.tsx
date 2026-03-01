'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Particle = {
  id: number
  x: number
  y: number
  size: number
  rotate: number
  dx: number
  dy: number
  life: number
}

export function CursorGlow() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const smoothX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const smoothY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })
  const [pressed, setPressed] = useState(false)
  const [hoverInteractive, setHoverInteractive] = useState(false)
  const rafRef = useRef<number | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const pid = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const isInteractive = !!el && (el.closest('a,button,[role="button"],input,textarea,select') !== null)
      setHoverInteractive(isInteractive)

      // spawn star particles
      const spawnCount = 3
      setParticles((prev) => {
        const next = [...prev]
        for (let i = 0; i < spawnCount; i++) {
          next.push({
            id: pid.current++,
            x: e.clientX,
            y: e.clientY,
            size: 12 + Math.random() * 16,
            rotate: Math.random() * 360,
            dx: (Math.random() - 0.5) * 40,
            dy: (Math.random() - 0.5) * 40 - 20,
            life: 600 // ms
          })
        }
        // Keep array size bounded
        return next.slice(-160)
      })
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    // simple particle decay loop
    let last = performance.now()
    const tick = (t: number) => {
      const dt = t - last
      last = t
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, x: p.x + (p.dx * dt) / 1000, y: p.y + (p.dy * dt) / 1000, life: p.life - dt, rotate: p.rotate + dt * 0.2 }))
          .filter((p) => p.life > 0)
      )
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [x, y])

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-hidden>
      {/* star trail (no big round dot) */}
      {particles.map((p) => (
        <motion.svg
          key={p.id}
          width={p.size}
          height={p.size}
          viewBox="0 0 24 24"
          style={{ position: 'absolute', left: p.x, top: p.y, transform: 'translate(-50%, -50%)', rotate: `${p.rotate}deg` }}
          initial={{ opacity: 0.95, scale: 1 }}
          animate={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: Math.max(0.3, p.life / 1000) }}
        >
          <path
            d="M12 2l2.2 5.6 5.8.5-4.4 3.8 1.3 5.7L12 14.8 7.1 17.6l1.3-5.7L4 8.1l5.8-.5L12 2z"
            fill="url(#grad)"
          />
          <defs>
            <radialGradient id="grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#cbd5e1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </radialGradient>
          </defs>
        </motion.svg>
      ))}
    </div>
  )
}


