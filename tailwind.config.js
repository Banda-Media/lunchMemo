module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: ['./app/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: () => ({
        'site-0': "url('/images/backgrounds/0.jpg')",
        'site-1': "url('/images/backgrounds/1.jpg')",
        'site-2': "url('/images/backgrounds/2.jpg')",
        'site-3': "url('/images/backgrounds/3.jpg')",
        'site-4': "url('/images/backgrounds/4.jpg')",
        'site-5': "url('/images/backgrounds/5.jpg')"
      })
    }
  },
  variants: {
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')]
};
