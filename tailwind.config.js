module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
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
        'wbAccent': '#059296',
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
        }
      },
      textColor: {
        'percentage': {
          0: '#bc1313',
          10: '#bc3300',
          20: '#b74e00',
          30: '#b06300',
          40: '#aa6e00',
          50: '#9e7e00',
          60: '#918d00',
          70: '#809b00',
          80: '#6ba900',
          90: '#4eb514',
          100: '#0ac13e'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
