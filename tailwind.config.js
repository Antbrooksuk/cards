/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        dealCard: {
          '0%': { 
            transform: 'translateY(100%) scale(0.8)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0) scale(1)',
            opacity: '1'
          }
        }
      },
      animation: {
        dealCard: 'dealCard 0.3s ease-out forwards'
      }
    },
  },
  plugins: [],
}
