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
          '@apply text-[#F4F6F8] font-[16px] h-9 w-10/12 h-11 border border-gray-300 rounded-md text-base text-[#9FA1A3] p-4': {},
        },
        '.common-input2': {
          '@apply rounded h-11 px-2 font-semibold text-black': {},
        },
        
      };

      addUtilities(commonInputStyles, ['responsive', 'hover']);
    },
  ],
}

