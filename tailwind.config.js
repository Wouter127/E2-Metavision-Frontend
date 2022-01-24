module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'wbRed': '#7e1b27',
        'wbDarkGreen': '#7e1b27',
        'wbGreen': '#677e5a',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
