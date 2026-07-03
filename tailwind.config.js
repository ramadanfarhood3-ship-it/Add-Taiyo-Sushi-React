/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        fitx: {
          bg: '#0a0a0f',
          surface: '#131318',
          card: '#1a1a22',
          card2: '#20202a',
          border: '#2a2a35',
          text: '#f3f4f6',
          muted: '#8b8b98',
          primary: '#ff5b1e',
          primaryLight: '#ff8a4c',
          accent: '#c6ff3d',
          danger: '#ff3b5c',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'pulse-ring': 'pulseRing 1.4s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseRing: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 91, 30, 0.5)' },
          '100%': { boxShadow: '0 0 0 12px rgba(255, 91, 30, 0)' },
        }
      }
    },
  },
  plugins: [],
}
