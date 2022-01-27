module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'wbRed': '#7e1b27',
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
