import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#f8f7f3',   // cream page
          dark:    '#f2f1ec',   // subtle card / hover fill
          darker:  '#e9efeb',   // pale green wash (tags)
        },
        ink: {
          DEFAULT: '#252b2a',   // body text
          muted:   '#5c6664',   // secondary text
          faint:   '#8a928f',   // labels, meta
        },
        rule: '#dcded8',        // hairlines
        gold: {                 // primary accent — deep green
          DEFAULT: '#2e615a',
          light:   '#3f7a70',
          dark:    '#24504a',
        },
        navy: {                 // secondary accent — slate blue
          DEFAULT: '#4a5578',
          light:   '#5d6b91',
          dark:    '#3b4463',
        },
        rust: {                 // tertiary accent — warm brown
          DEFAULT: '#7c5e3b',
          light:   '#96744c',
        },
      },
      fontFamily: {
        display: ['Libre Baskerville', 'Georgia', 'serif'],
        serif:   ['Libre Baskerville', 'Georgia', 'serif'],
        sans:    ['DM Sans', 'system-ui', 'Arial', 'sans-serif'],
        mono:    ['DM Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        paper: '930px',
      },
    },
  },
  plugins: [],
} satisfies Config
