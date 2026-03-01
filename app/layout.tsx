import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chetan S — Portfolio',
  description: 'Portfolio of Chetan S — Computer Science Engineering student and developer.',
  openGraph: {
    title: 'Chetan S — Portfolio',
    description: 'Computer Science Engineering student building innovative apps.',
    type: 'website'
  },
  metadataBase: new URL('https://example.com')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden">
        {/* Rain overlay and background particles are rendered per page */}
        {children}
      </body>
    </html>
  )
}






