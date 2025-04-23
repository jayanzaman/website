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
        primary: '#FF5F00',
        'primary-dark': '#E65600',
        secondary: '#FF8534',
        'text-primary': '#1A1A1A',
        'text-secondary': '#4A4A4A',
      },
    },
  },
  plugins: [],
}