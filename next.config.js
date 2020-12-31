const path = require('path');

module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depe1nd on `fs` module
    config.node = {
      fs: 'empty'
    };

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'app/styles')]
  }
};
