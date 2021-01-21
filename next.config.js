const path = require('path');

module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depe1nd on `fs` module
    config.node = {
      fs: 'empty'
    };

    // For bare SVG importing.
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },
      use: ['@svgr/webpack']
    });

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')]
  },
  images: {
    domains: ['github.com'],
  },
};
