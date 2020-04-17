/* eslint-disable */
const path = require('path');
/* eslint-enable */

module.exports = {
  title: 'Webpack Boilerplate',
  description: 'Webpack static-site boilerplate',
  appName: 'webpack-boilerplate',
  developer: 'Ömer Balyali',
  developerURL: 'http://www.omerbalyali.com',
  favicon: {
    logo: 'logo.svg',
    mode: 'webapp',
    devMode: 'light',
    background: '#fff',
    themeColor: '#333',
    icons: {
      coast: false,
      yandex: false,
    },
  },
  paths: {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    pages: 'pages',
    templates: 'templates',
    styles: 'assets/styles',
    scripts: 'assets/scripts',
    images: 'assets/images',
    fonts: 'assets/fonts',
  },
  regex: {
    js: /\.jsx?$/,
    ts: /\.tsx?$/,
    css: /\.css$/,
    cssModules: /\.module\.css$/,
    images: /\.(jpe?g|png|gif)$/,
    svgs: /\.svg$/,
    compression: /\.(jpe?g|png|gif|svg)$/,
    fonts: /\.(ttf|eot|woff|woff2)$/,
  },
  compilation: {
    cssModules: true,
    cssMediaQueries: './src/assets/styles/commons/mediaqueries.css',
    entryPoint: './src/assets/scripts/index.ts',
    fileExtensions: {
      js: '[name]-[contenthash:12].min.js',
      css: '[name]-[hash:12].css',
      cssModuleIdent: '[local]--[hash:base64:5]',
      font: '[name].[ext]',
      image: '[name].[hash:8].[ext]',
    },
    templateExtension: 'html',
    indexFile: 'home',
    inlineImageLimit: 1500,
    publicPath: '/',
    resolveExtensions: ['.tsx', '.ts', '.js'],
    sourceMaps: { devtool: 'inline-source-map', cssSourceMaps: true, jsSourceMaps: true },
    stats: 'errors-only',
  },
  optimization: {
    svgo: {
      cleanupIDs: true,
    },
    images: {
      mozjpeg: {
        progressive: true,
        quality: 80,
      },
      optipng: {
        enabled: true,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      gifsicle: {
        interlaced: false,
      },
    },
  },
};
