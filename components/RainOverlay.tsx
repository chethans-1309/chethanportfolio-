'use client'

import { useEffect, useRef } from 'react'

type RainConfig = {
  dropCount?: number
  speedMin?: number
  speedMax?: number
  lengthMin?: number
  lengthMax?: number
  opacity?: number
}

export function RainOverlay({ config }: { config?: RainConfig }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = Math.min(2, window.devicePixelRatio || 1)
    const drops: { x: number; y: number; len: number; speed: number }[] = []
    const cfg: Required<RainConfig> = {
      dropCount: config?.dropCount ?? 140,
      speedMin: config?.speedMin ?? 350,
      speedMax: config?.speedMax ?? 780,
      lengthMin: config?.lengthMin ?? 8,
      lengthMax: config?.lengthMax ?? 16,
      opacity: config?.opacity ?? 0.35
    }

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * DPR)
      canvas.height = Math.floor(window.innerHeight * DPR)
    }
    resize()
    window.addEventListener('resize', resize)

    const rand = (min: number, max: number) => Math.random() * (max - min) + min
    const resetDrop = (d: { x: number; y: number; len: number; speed: number }, w: number) => {
      d.x = Math.random() * w
      d.y = rand(-w * 0.2, -10)
      d.len = rand(cfg.lengthMin, cfg.lengthMax)
      d.speed = rand(cfg.speedMin, cfg.speedMax)
    }

    for (let i = 0; i < cfg.dropCount; i++) {
      drops.push({ x: 0, y: 0, len: 0, speed: 0 })
    }
    drops.forEach((d) => resetDrop(d, canvas.width))

    // lightning state
    type Bolt = { points: { x: number; y: number }[] }
    let bolts: Bolt[] = []
    let flash = 0 // 0..1
    const scheduleNextStrike = () => performance.now() + 4000 + Math.random() * 7000
    let nextStrikeAt = scheduleNextStrike()

    const createBolt = (w: number, h: number): Bolt => {
      const x = Math.random() * w
      const segments = 8 + Math.floor(Math.random() * 6)
      const spread = 60
      const points = [{ x, y: 0 }]
      for (let i = 1; i <= segments; i++) {
        const prev = points[i - 1]
        points.push({
          x: prev.x + (Math.random() - 0.5) * spread,
          y: (h / segments) * i * (0.4 + Math.random() * 0.6)
        })
      }
      return { points }
    }

    let last = performance.now()
    const loop = (t: number) => {
      const dt = (t - last) / 1000
      last = t
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = `rgba(127, 90, 240, ${cfg.opacity})`
      ctx.lineWidth = Math.max(1, DPR)
      ctx.lineCap = 'round'

      for (const d of drops) {
        const dy = d.speed * dt
        d.y += dy
        const x2 = d.x
        const y2 = d.y + d.len * 4
        ctx.beginPath()
        ctx.moveTo(d.x, d.y)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        if (d.y > h) resetDrop(d, w)
      }

      // Lightning logic
      if (t >= nextStrikeAt) {
        bolts = Array.from({ length: 1 + Math.floor(Math.random() * 2) }, () => createBolt(w, h))
        flash = 1
        nextStrikeAt = scheduleNextStrike()
      }

      if (flash > 0) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        ctx.strokeStyle = 'rgba(255,255,255,0.9)'
        ctx.lineWidth = 2 * DPR
        ;(ctx as any).shadowColor = 'rgba(255,255,255,0.8)'
        ;(ctx as any).shadowBlur = 20
        for (const b of bolts) {
          ctx.beginPath()
          ctx.moveTo(b.points[0].x, b.points[0].y)
          for (let i = 1; i < b.points.length; i++) {
            const p = b.points[i]
            ctx.lineTo(p.x, p.y)
          }
          ctx.stroke()
        }
        ctx.restore()
        // flash overlay
        ctx.fillStyle = `rgba(255,255,255,${0.12 * flash})`
        ctx.fillRect(0, 0, w, h)
        flash = Math.max(0, flash - dt * 3.5)
      }
      animationRef.current = requestAnimationFrame(loop)
    }
    animationRef.current = requestAnimationFrame(loop)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [config])

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Still background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(127,90,240,0.08),transparent_45%)]" />
      {/* Rain canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
    </div>
  )
}



