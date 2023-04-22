/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        highlight: 'var(--highlight-text-color)',
        surface: {
          primary: 'var(--surface-ground)',
          overlay: 'var(--surface-overlay)',
        }
      }
    },
    screens: {
      // => @media (max-width: 1535px) { ... }
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1279px) { ... }
      'xl': {'max': '1279px'},
      // => @media (max-width: 1023px) { ... }
      'lg': {'max': '1023px'},
      // => @media (max-width: 767px) { ... }
      'md': {'max': '767px'},
      // => @media (max-width: 639px) { ... }
      'sm': {'max': '639px'},
      // => @media (max-width: 475px) { ... }
      'xs': {'max': '475px'},
    }
  },
  plugins: [],
}