const webpack = require('webpack');

module.exports = function override(config, env) {
  // Résolution des problèmes de polyfills
  config.resolve.fallback = {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    zlib: require.resolve('browserify-zlib'),
    path: require.resolve('path-browserify'),
    fs: false,
    buffer: require.resolve('buffer'),
  };
  
  // Ajout des plugins nécessaires
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );
  
  // Désactivation temporaire d'ESLint
  config.plugins = config.plugins.filter(plugin => 
    plugin.constructor.name !== 'ESLintWebpackPlugin'
  );
  
  // Fix pour le problème de terser
  if (env === 'production') {
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    };
  }
  
  return config;
};