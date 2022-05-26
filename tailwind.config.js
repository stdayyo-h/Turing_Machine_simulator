module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
       },
       fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive']
      }
    },
  },
  plugins: [],
}