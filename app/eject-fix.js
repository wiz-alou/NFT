const fs = require('fs');
const path = require('path');

// Trouver et remplacer la référence à validateOptions dans le fichier webpack.config.js
const webpackConfigPath = path.resolve('./node_modules/react-scripts/config/webpack.config.js');
let webpackConfig = fs.readFileSync(webpackConfigPath, 'utf8');

// Remplacer la partie qui utilise validateOptions
webpackConfig = webpackConfig.replace(
  /new TerserPlugin\([\s\S]+?\)/g,
  `new TerserPlugin({
    terserOptions: {
      parse: {
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
      mangle: {
        safari10: true,
      },
      keep_classnames: false,
      keep_fnames: false,
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    },
    parallel: true,
  })`
);

fs.writeFileSync(webpackConfigPath, webpackConfig);
console.log('Webpack config fixed successfully!');