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
        shuffle: {
          '0%': { transform: 'rotate(0deg) translateX(0) translateY(0)' },
          '25%': {
            transform:
              'rotate(-25deg) translateX(-30px) translateY(-10px) scale(1.1)',
          },
          '75%': {
            transform:
              'rotate(25deg) translateX(30px) translateY(-10px) scale(0.9)',
          },
          '100%': { transform: 'rotate(0deg) translateX(0) translateY(0)' },
        },
        shuffleInLeft: {
          '0%': {
            transform: 'rotate(180deg) scale(0.3) translate(-200px, 100px)',
            opacity: '0',
            boxShadow: '0 0 0 rgba(66, 153, 225, 0)',
          },
          '40%': {
            transform: 'rotate(-45deg) scale(1.2) translate(-50px, -20px)',
            opacity: '0.7',
            boxShadow: '0 15px 30px rgba(66, 153, 225, 0.5)',
          },
          '70%': {
            transform: 'rotate(15deg) scale(1.1) translate(20px, 10px)',
            opacity: '0.9',
            boxShadow: '0 8px 20px rgba(66, 153, 225, 0.6)',
          },
          '100%': {
            transform: 'rotate(0deg) scale(1) translate(0, 0)',
            opacity: '1',
            boxShadow: '0 2px 8px rgba(66, 153, 225, 0.4)',
          },
        },
        shuffleInRight: {
          '0%': {
            transform: 'rotate(-180deg) scale(0.3) translate(200px, 100px)',
            opacity: '0',
            boxShadow: '0 0 0 rgba(66, 153, 225, 0)',
          },
          '40%': {
            transform: 'rotate(45deg) scale(1.2) translate(50px, -20px)',
            opacity: '0.7',
            boxShadow: '0 15px 30px rgba(66, 153, 225, 0.5)',
          },
          '70%': {
            transform: 'rotate(-15deg) scale(1.1) translate(-20px, 10px)',
            opacity: '0.9',
            boxShadow: '0 8px 20px rgba(66, 153, 225, 0.6)',
          },
          '100%': {
            transform: 'rotate(0deg) scale(1) translate(0, 0)',
            opacity: '1',
            boxShadow: '0 2px 8px rgba(66, 153, 225, 0.4)',
          },
        },
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(66, 153, 225, 0.6)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow:
              '0 0 30px rgba(66, 153, 225, 0.9), 0 0 50px rgba(66, 153, 225, 0.4)',
            transform: 'scale(1.05)',
          },
        },
      },
      animation: {
        dealCard: 'dealCard 500ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        shuffle: 'shuffle 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        shuffleInLeft: 'shuffleInLeft 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        shuffleInRight: 'shuffleInRight 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
        glow: 'glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
