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
    extend: {
      height: {
        'view': 'calc(100dvh - 84px)'
      }
    },
  },
  plugins: [],
}

