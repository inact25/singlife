/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      colors: {
        'singlife-red-800': '#FF0008',
        'singlife-red-200': '#FFE9EC',
        'singlife-turquoise-800': '#19D3C5',
        'singlife-turquoise-200': '#B0ECE6',
        'singlife-purple-800': '#883E89',
        'singlife-purple-200': '#CFAAD0',
        'singlife-orange-800': '#FFA168',
        'singlife-orange-200': '#FFD5BE',
        'singlife-black-900': '#000000',
        'singlife-black-800': '#434343',
        'singlife-black-200': '#DBDBDB',
        'singlife-black-100': '#F2F2F2',
        'singlife-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
