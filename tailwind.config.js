module.exports = {
  // @see https://tailwindcss.com/docs/upcoming-changes
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },
  purge: {
    content: ['./app/**/*.tsx', './pages/**/*.tsx'],

    // These options are passed through directly to PurgeCSS
    options: {
      safelist: ['bg-site-0', 'bg-site-1', 'bg-site-2', 'bg-site-3', 'bg-site-4', 'bg-site-5']
    }
  },
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'site-0': "url('/images/backgrounds/0.jpg')",
        'site-1': "url('/images/backgrounds/1.jpg')",
        'site-2': "url('/images/backgrounds/2.jpg')",
        'site-3': "url('/images/backgrounds/3.jpg')",
        'site-4': "url('/images/backgrounds/4.jpg')",
        'site-5': "url('/images/backgrounds/5.jpg')"
      }),
      colors: {
        'awesome-color': '#56b890'
      },
      height: (theme) => ({
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)'
      })
    }
  },
  variants: {
    display: ['responsive', 'hover', 'focus'],
    extend: {
      opacity: ['disabled']
    }
  },
  plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')]
};
