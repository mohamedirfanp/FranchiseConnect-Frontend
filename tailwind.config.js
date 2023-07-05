/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const animationUtilities = {
        '.animate-gradient': {
          animation: 'gradientAnimation 5s linear infinite',
        },
      };

      const keyframes = {
        gradientAnimation: {
          '0%': {
            'background-position': '0% 50%',
          },
          '100%': {
            'background-position': '100% 50%',
          },
        },
      };

      addUtilities(animationUtilities, ['responsive']);
      addUtilities(keyframes, ['responsive']);
    },
  ],
}

