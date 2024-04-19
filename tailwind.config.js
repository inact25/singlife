/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'singlife-red-800': '#FF0008',
      'singlife-red-200': '#FFE9EC',
      'singlife-Turquoise-800': '#19D3C5',
      'singlife-Turquoise-200': '#B0ECE6',
      'singlife-Purple-800': '#883E89',
      'singlife-Purple-200': '#CFAAD0',
      'singlife-Orange-800': '#FFA168',
      'singlife-Orange-200': '#FFD5BE',
      'singlife-black-900': '#000000',
      'singlife-Black-800': '#434343',
      'singlife-Black-200': '#DBDBDB',
      'singlife-Black-100': '#F2F2F2',
      'singlife-white': '#FFFFFF',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}
