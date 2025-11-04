/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#ff00cc',
        'neon-green': '#00ffcc',
        'neon-blue': '#00ccff',
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon-pink': '0 0 12px #ff00cc',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'glitch': 'glitch 1s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 12px #ff00cc',
          },
          '50%': {
            boxShadow: '0 0 6px #ff00cc',
          },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2px, 2px)' },
          '50%': { transform: 'translate(2px, -2px)' },
          '75%': { transform: 'translate(-1px, 1px)' },
        },
      },
    },
  },
  plugins: [],
}

