// tailwind.config.js
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        swim: 'swim 4s ease-in-out infinite',
        'tail-wiggle': 'tail-wiggle 0.3s ease-in-out infinite',
      },
      keyframes: {
        swim: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        'tail-wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(30deg)' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.bg-gradient-radial': {
          backgroundImage: 'radial-gradient(var(--tw-gradient-stops))',
        },
      });
    }),
  ],
};
