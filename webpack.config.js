/* eslint-disable */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const COMMONS = require('./webpack.common');
const SITE_CONFIG = require('./website.config');
require('dotenv').config();
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
  },
  target: 'node',
  output: {
    filename: `${SITE_CONFIG.paths.scripts}/${SITE_CONFIG.compilation.fileExtensions.js}`,
    path: SITE_CONFIG.paths.dist,
    publicPath: SITE_CONFIG.compilation.publicPath,
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
    ...COMMONS.browserSyncPlugin,
    new CleanWebpackPlugin(),
    ...COMMONS.manifestPlugin,
    ...COMMONS.faviconsPlugin,
    ...COMMONS.generateHTMLPages,
    COMMONS.extractCSSPlugin,
  ],
};
