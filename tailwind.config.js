/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./index.html",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      indigo: colors.indigo,
      blue: colors.blue,
      red: colors.red,
      slate: colors.slate,
      sky: colors.sky,
      green: colors.green,
    },
    extend: {
      height: {
        'screen': 'calc(100vh - 48px)'
      }
    },
  },
  plugins: [],
}

