/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", "[data-theme='dark']"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    function ({ addUtilities }) {
      addUtilities({
        '.drag-region': {
          '-webkit-app-region': 'drag',
        },
        '.no-drag-region': {
          '-webkit-app-region': 'no-drag',
        },
      });
    },
  ],
};