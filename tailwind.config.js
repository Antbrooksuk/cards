const { ANIMATION_CONSTANTS } = require('./src/constants/cardConstants')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        dealCard: {
          '0%': { transform: 'translateY(30px) scale(0.3)', opacity: '0' },
          '50%': { transform: 'translateY(-3px) scale(1.05)', opacity: '1' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        dealCard: `dealCard ${ANIMATION_CONSTANTS.CARD_ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
      },
      transitionDuration: {
        0: '0ms',
        300: `${ANIMATION_CONSTANTS.BASE_DURATION}ms`,
      },
    },
  },
  plugins: [],
}
