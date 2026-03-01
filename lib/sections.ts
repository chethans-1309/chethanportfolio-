export type SectionId = 'home' | 'projects' | 'skills' | 'about' | 'profile' | 'contact'

export const SECTION_LABELS: Record<SectionId, string> = {
  home: 'Home',
  projects: 'Projects',
  skills: 'Skills',
  about: 'About',
  profile: 'Profile',
  contact: 'Contact'
}

export const SECTIONS_IN_ORDER: SectionId[] = ['home', 'projects', 'skills', 'about', 'profile', 'contact']



