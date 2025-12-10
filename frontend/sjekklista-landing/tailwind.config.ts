import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': 'var(--color-brand-purple)',
        'brand-blue': 'var(--color-brand-blue)',
        'brand-orange': 'var(--color-brand-orange)',
        'brand-green': 'var(--color-brand-green)',
        'brand-gray': 'var(--color-brand-gray)',
        'brand-dark': 'var(--color-brand-dark)',
        'brand-red': 'var(--color-brand-red)',
      },
    },
  },
  plugins: [],
}
export default config
