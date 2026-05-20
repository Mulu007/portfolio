import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#0b1728',
          dark:    '#0d1e38',
          darker:  '#0f2544',
        },
        ink: {
          DEFAULT: '#dbeafe',
          muted:   '#7ea8c9',
          faint:   '#3d6080',
        },
        rule:  '#163350',
        gold: {
          DEFAULT: '#38bdf8',
          light:   '#7dd3fc',
          dark:    '#0ea5e9',
        },
        navy: {
          DEFAULT: '#67e8f9',
          light:   '#a5f3fc',
          dark:    '#22d3ee',
        },
        rust: {
          DEFAULT: '#818cf8',
          light:   '#a5b4fc',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        serif:   ['Lora', 'Georgia', 'serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'float':      'float 7s ease-in-out infinite',
        'fade-in':    'fadeIn 0.7s ease forwards',
        'slide-up':   'slideUp 0.6s ease forwards',
        'blink':      'blink 1s step-end infinite',
        'gradient-x': 'gradientX 5s linear infinite',
        'scan':       'scan 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        gradientX: {
          '0%':   { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '300% 50%' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        paper:      '0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,189,248,0.08)',
        'paper-lg': '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(56,189,248,0.12)',
        'paper-xl': '0 20px 60px rgba(0,0,0,0.7)',
        gold:       '0 0 20px rgba(56,189,248,0.35)',
      },
      maxWidth: {
        paper: '780px',
      },
    },
  },
  plugins: [],
} satisfies Config
