import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#825bf9',
        'brand-blue': '#0052cc',
        'brand-orange': '#ffab00',
        'brand-green': '#00c49a',
        'brand-gray': '#f4f5f7',
        'brand-dark': '#1d1d1d',
        'brand-red': '#d32f2f',
      },
    },
  },
  plugins: [],
}
export default config
