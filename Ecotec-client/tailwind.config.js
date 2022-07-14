const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
      opacity: ['disabled'],
      colors: {
        fblue: {
          100: '#1D90F5',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
  variants: {
    scrollbar: ['rounded'],
  },
};
