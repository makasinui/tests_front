/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5E5C74',
        secondary: '#8B9DAC',
        'main-bg': '#f1f4f7'
      }
    },
  },
  plugins: [],
}

