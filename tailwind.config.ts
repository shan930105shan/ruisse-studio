import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ruisse-black': '#050505',
        'ruisse-blue': '#04324a',
      },
    },
  },
  plugins: [],
} satisfies Config