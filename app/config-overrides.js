const webpack = require('webpack');

module.exports = function override(config) {
  // Résoudre les fallbacks pour les polyfills
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
  
  // Fournir les polyfills de base
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );
  
  // Complètement ignorer l'optimisation et terser
  config.optimization = {
    minimize: false
  };
  
  return config;
};