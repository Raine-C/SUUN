import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SUUN Design System
        suun: {
          'dark-blue-darkest': '#01003A',
          'dark-blue-darker': '#01002D',
          'dark-blue-normal': '#030081',
          'dark-blue-hover': '#030074',
          'dark-blue-light-hover': '#D9D9EC',
          'purple-light': '#FBF9FF',
          'purple-light-active': '#F2EDFE',
          'purple-normal': '#D4C6FC',
          'purple-normal-hover': '#BFB2E3',
          'purple-dark-active': '#5F5971',
          'purple-darker': '#4A4558',
          'baby-blue-light': '#F7FBFE',
          'baby-blue-normal': '#AFD9F2',
          'baby-blue-normal-hover': '#9EC3DA',
          'baby-blue-darker': '#3D4C55',
        },
      },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'shippori': ['Shippori Mincho', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '2px',
        'widest-3': '3px',
        'widest-4': '4px',
      },
    },
  },
  plugins: [],
}
export default config
