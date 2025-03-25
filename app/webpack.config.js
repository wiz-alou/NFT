module.exports = function override(config) {
    // Désactiver complètement l'optimisation pour éviter les problèmes avec terser
    if (process.env.NODE_ENV === 'production') {
      config.optimization = {
        minimize: false
      };
    }
    
    return config;
  };