import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0f19',
        surface: 'rgba(255,255,255,0.06)',
        neon: '#7f5af0',
        cyan: '#22d3ee',
        glass: 'rgba(255, 255, 255, 0.08)'
      },
      boxShadow: {
        glass: '0 2px 20px rgba(127, 90, 240, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        tab: '10px'
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(127, 90, 240, 0.4)' },
          '50%': { boxShadow: '0 0 20px rgba(34, 211, 238, 0.35)' }
        }
      },
      animation: {
        glow: 'glow 3s ease-in-out infinite'
      }
    },
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  darkMode: 'class',
  plugins: []
}

export default config






