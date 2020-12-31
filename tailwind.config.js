module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ['./src/components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {}
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')]
};
