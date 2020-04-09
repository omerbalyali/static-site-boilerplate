/* eslint-disable */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const COMMONS = require('./webpack.common');
const SITE_CONFIG = require('./website.config');
/* eslint-enable */

module.exports = {
  mode: COMMONS.devMode ? 'development' : 'production',
  stats: SITE_CONFIG.compilation.stats,
  entry: SITE_CONFIG.compilation.entryPoint,
  resolve: {
    extensions: SITE_CONFIG.compilation.resolveExtensions,
  },
  devtool: SITE_CONFIG.compilation.sourceMaps.devtool,
  devServer: {
    overlay: true,
    host: process.env.HOST,
    port: process.env.PORT,
    open: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
  target: 'node',
  output: {
    filename: `${SITE_CONFIG.paths.scripts}/${SITE_CONFIG.compilation.fileExtensions.js}`,
    path: SITE_CONFIG.paths.dist,
    publicPath: SITE_CONFIG.compilation.publicPath,
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      ...COMMONS.extractImages,
      ...COMMONS.compressImages,
      ...COMMONS.extractCSS,
      ...COMMONS.extractFonts,
      ...COMMONS.transpileJS,
      ...COMMONS.compileTS,
    ],
  },
  plugins: [
    ...COMMONS.dotenvPlugin,
    new CleanWebpackPlugin(),
    ...COMMONS.manifestPlugin,
    ...COMMONS.faviconsPlugin,
    COMMONS.extractCSSPlugin,
    ...COMMONS.generateHTMLPages,
  ],
};
