import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        action: 'rgb(95, 55, 176)',
        delete: '#e53e3e',
        primary: 'rgb(242,243,251)',
        secondary: 'rgb(255,255,255)',
        primaryDark: 'rgb(28,27,35)',
        secondaryDark: 'rgb(35,34,42)',
        textGray: 'rgb(105,107,129)',
      }
    },
  },
  plugins: [],
}
export default config
