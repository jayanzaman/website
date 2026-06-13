import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-deep': 'var(--paper-deep)',
        'paper-edge': 'var(--paper-edge)',
        rule: 'var(--rule)',
        sumi: 'var(--sumi)',
        'sumi-2': 'var(--sumi-2)',
        'sumi-3': 'var(--sumi-3)',
        bottle: 'var(--bottle)',
        'bottle-deep': 'var(--bottle-deep)',
        'bottle-soft': 'var(--bottle-soft)',
        vermilion: 'var(--vermilion)',
        'vermilion-deep': 'var(--vermilion-deep)',
        // Backwards compatibility mappings:
        primary: 'var(--vermilion)',
        'primary-dark': 'var(--vermilion-deep)',
        'text-primary': 'var(--sumi)',
        'text-secondary': 'var(--sumi-2)',
        'border-color': 'var(--paper-edge)',
      },
      spacing: {
        's1': 'var(--space-1)', // 4px
        's2': 'var(--space-2)', // 8px
        's3': 'var(--space-3)', // 16px
        's4': 'var(--space-4)', // 24px
        's5': 'var(--space-5)', // 40px
        's6': 'var(--space-6)', // 64px
        's7': 'var(--space-7)', // 104px
        's8': 'var(--space-8)', // 168px
      },
      fontFamily: {
        serif: ['var(--font-spectral)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        bangla: ['var(--font-tiro-bangla)', 'serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
}

export default config
