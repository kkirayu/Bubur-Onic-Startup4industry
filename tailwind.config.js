/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/alurkerja-ui/dist/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', ...defaultTheme.fontFamily.sans] },
      colors: {
        black: '#3F4254',
        red: {
          alurkerja: '#F64E60',
        },
        orange: { alurkerja: '#FFA800' },
        purple: { alurkerja: '#9056FC' },
        blue: { alurkerja: '#586BE2' },
        'main-blue': { alurkerja: '#0095E8' },
        'tifany-blue': { alurkerja: '#17BCB4' },
        green: { alurkerja: '#50CD89' },
        'forst-white': { alurkerja: '#F3F6F9' },
        'light-blue': { alurkerja: '#E1F0FF' },
        black: {
          alurkerja: {
            1: '#1E1E2D',
            2: '#3F4254',
          },
        },
        gray: {
          alurkerja: {
            1: '#7E8299',
            2: '#B5B5C3',
            3: '#E4E6EF',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
