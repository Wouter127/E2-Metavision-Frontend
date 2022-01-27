module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'wbRed': {
          100: '#b2767d',
          200: '#a55f68',
          300: '#984952',
          400: '#8b323d',
          500: '#7e1b27',
          600: '#711823',
          700: '#65161f',
          800: '#58131b',
          900: '#4c1017'
        },
        'wbDarkGreen': '#7e1b27',
        'wbGreen': {
          100: '#a4b29c',
          200: '#95a58c',
          300: '#85987b',
          400: '#768b6b',
          500: '#677e5a',
          600: '#5d7151',
          700: '#526548',
          800: '#48583f',
          900: '#3e4c36'          
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
