import { NavTabs } from '@/components/NavTabs'
import { RainOverlay } from '@/components/RainOverlay'
import { Hero } from '@/components/Hero'
import { ProjectsSection } from '@/components/ProjectsSection'
import { SkillsSection } from '@/components/SkillsSection'
import { AboutSection } from '@/components/AboutSection'
import { ContactSection } from '@/components/ContactSection'
import { ProfileSection } from '@/components/ProfileSection'
import { CursorGlow } from '@/components/CursorGlow'

export default function HomePage() {
  return (
    <div className="relative z-0">
      <CursorGlow />
      <RainOverlay />
      <header className="sticky top-0 z-40 backdrop-blur-sm/0">
        <NavTabs />
      </header>
      <section id="home" className="relative">
        <Hero />
      </section>
      <section id="projects" className="relative">
        <ProjectsSection />
      </section>
      <section id="skills" className="relative">
        <SkillsSection />
      </section>
      <section id="about" className="relative">
        <AboutSection />
      </section>
      <section id="profile" className="relative">
        <ProfileSection />
      </section>
      <section id="contact" className="relative">
        <ContactSection />
      </section>
      <footer className="py-8 text-center text-white/60">
        © {new Date().getFullYear()} Chetan S
      </footer>
    </div>
  )
}



