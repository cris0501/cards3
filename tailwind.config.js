/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./index.html",
  ],
  safelist: [
    'bg-blue-500',
    'bg-blue-800',
    'text-blue-200',
    'bg-red-500',
    'bg-red-800',
    'text-red-200',
    'bg-green-500',
    'bg-green-800',
    'text-green-200',
    'bg-yellow-500',
    'bg-yellow-800',
    'text-yellow-200',
    'bg-gray-500',
    'bg-gray-800',
    'text-gray-200',
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

