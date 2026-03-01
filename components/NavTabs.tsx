'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useActiveSection } from '@/lib/useActiveSection'

// Custom order/labels to match requested style
const LINKS: { id: string; label: string }[] = [
  { id: 'home', label: 'About Me' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'Academic Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact Me' }
]

export function NavTabs() {
  const active = useActiveSection(['home', 'projects', 'skills', 'about', 'profile', 'contact'])

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id) || document.querySelector(`[data-anchor="${id}"]`) as HTMLElement | null
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="mx-auto mt-4 w-full max-w-6xl px-3 py-3" aria-label="Primary">
      <div className="glass flex items-center justify-center rounded-full px-6 py-2">
        {/* Links */}
        <ul className="flex flex-wrap items-center gap-8">
          {LINKS.map((l) => {
            const isActive = active === l.id || (l.id === 'certifications' && active === 'about')
            return (
              <li key={l.id} className="relative">
                <button
                  onClick={handleClick(l.id)}
                  className="text-sm text-white/80 transition hover:text-white focus-ring"
                  aria-current={isActive ? 'page' : undefined}
                >
                  {l.label}
                </button>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan"
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}



