/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'texas-navy': '#002868',
        'texas-red': '#BF0A30',
        'texas-gold': '#D4A017',
        'texas-cream': '#FDF6E3',
        'obsidian': '#030305',
        'obsidian-light': '#111111',
        'electric-blue': '#FA5D29',
        'cyber-purple': '#FF8C42',
      },
      fontFamily: {
        'space': ['var(--font-space-grotesk)', 'sans-serif'],
        'jetbrains': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(250, 93, 41, 0.4), 0 0 40px rgba(250, 93, 41, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(250, 93, 41, 0.8), 0 0 60px rgba(250, 93, 41, 0.4)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
