const webpack = require('webpack');

module.exports = function override(config) {
  // Résolution des problèmes de polyfills
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    buffer: require.resolve('buffer'),
    zlib: require.resolve('browserify-zlib'),
    path: require.resolve('path-browserify'),
  };
  
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ];
  
  // Évitez les extensions ESLint qui peuvent causer des problèmes
  config.plugins = config.plugins.filter(plugin => 
    plugin.constructor.name !== 'ESLintWebpackPlugin'
  );
  
  // Désactivez complètement la minification en production pour éviter les problèmes avec terser
  if (process.env.NODE_ENV === 'production') {
    config.optimization.minimize = false;
  }
  
  return config;
};