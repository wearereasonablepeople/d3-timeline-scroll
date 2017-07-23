module.exports = {
  options: {
    source: 'src',
    output: 'dist'
  },
  env: {
    NODE_ENV: {
      production: {
        use: [
          'neutrino-preset-component',
          'neutrino-middleware-sass'
        ],
      },
      development: {
        use: [
          ['neutrino-preset-web', {
            polyfills: {
              async: false,
              babel: false
            }
          }],
          'neutrino-middleware-sass'
        ],
        options: {
          source: 'examples',
          output: 'dev'
        }
      }
    }
  }
};
