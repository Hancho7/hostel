/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Other plugins...

    // Define a custom plugin to create the common-input class
    function ({ addUtilities }) {
      const commonInputStyles = {
        '.common-input': {
          '@apply text-[#7b7979] h-9 border-none w-10/12 shadow-md': {},
        },
      };

      addUtilities(commonInputStyles, ['responsive', 'hover']);
    },
  ],
}

