'use client'

import { useEffect, useRef, useState } from 'react'

export function StatCounter({
  from = 0,
  to,
  suffix = '%',
  duration = 1200
}: {
  from?: number
  to: number
  suffix?: string
  duration?: number
}) {
  const [value, setValue] = useState<number>(from)
  const ref = useRef<HTMLSpanElement | null>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const animate = (t: number) => {
            const p = Math.min((t - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            setValue(Math.floor(from + (to - from) * eased))
            if (p < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [from, to, duration])

  return (
    <span ref={ref} className="font-mono text-xl text-cyan">
      {value}
      {suffix}
    </span>
  )
}






