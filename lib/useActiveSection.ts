'use client'

import { useEffect, useState } from 'react'
import type { SectionId } from './sections'

export function useActiveSection(sectionIds: SectionId[]) {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(id)
            }
          })
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [sectionIds])

  return active
}






