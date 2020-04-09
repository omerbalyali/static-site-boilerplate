/* eslint-disable */
const path = require('path');
const glob = require('glob');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const FaviconsPlugin = require('favicons-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const _ = require('lodash');
const SITE_CONFIG = require('./website.config');
/* eslint-disable */

const devMode = process.env.NODE_ENV !== 'production';

const transpileJS = [
  {
    test: SITE_CONFIG.regex.js,
    include: SITE_CONFIG.paths.src,
    use: ['babel-loader', 'eslint-loader'],
  },
];

const compileTS = [
  {
    test: SITE_CONFIG.regex.ts,
    use: ['ts-loader', 'eslint-loader'],
    exclude: /node_modules/,
  },
];

const extractCSSPlugin = new MiniCSSExtractPlugin({
  filename: `${SITE_CONFIG.paths.styles}/${SITE_CONFIG.compilation.fileExtensions.css}`,
});

const cssModulesSettings = SITE_CONFIG.compilation.cssModules
  ? {
      mode: 'local',
      exportGlobals: true,
      localIdentName: SITE_CONFIG.compilation.fileExtensions.css,
      context: SITE_CONFIG.paths.src,
    }
  : false;

const extractCSS = [
  {
    test: SITE_CONFIG.regex.css,
    use: [
      {
        loader: MiniCSSExtractPlugin.loader,
        options: {
          hmr: devMode,
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: SITE_CONFIG.compilation.sourceMaps.cssSourceMaps && devMode,
          modules: cssModulesSettings,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: SITE_CONFIG.compilation.sourceMaps.cssSourceMaps && devMode,
        },
      },
    ],
  },
];

const generateHTMLPages = glob
  .sync(`${SITE_CONFIG.paths.src}/pages/*.${SITE_CONFIG.compilation.templateExtension}`)
  .map((page) => {
    const filename = path.basename(page);
    const routeName = filename.replace(/[$.]\w+/, '');
    if (routeName === SITE_CONFIG.compilation.indexFile) {
      return new HTMLWebpackPlugin({
        filename: 'index.html',
        template: page,
        templateParameters: {
          title: SITE_CONFIG.title,
        },
        minify: !devMode,
        hash: !devMode,
        inject: false,
      });
    }
    return new HTMLWebpackPlugin({
      filename: `${routeName}/index.html`,
      template: `${page}`,
      templateParameters: {
        title: `${_.startCase(_.toLower(routeName)).replace('-', ' ')} – ${SITE_CONFIG.title}`,
      },
      minify: !devMode,
      hash: !devMode,
      inject: false,
    });
  });

const extractImages = [
  {
    test: SITE_CONFIG.regex.images,
    use: {
      loader: 'url-loader',
      options: {
        limit: SITE_CONFIG.compilation.inlineImageLimit,
        fallback: 'file-loader',
        name: `${SITE_CONFIG.paths.images}/${SITE_CONFIG.compilation.fileExtensions.image}`,
      },
    },
  },
  {
    test: SITE_CONFIG.regex.svgs,
    use: {
      loader: 'file-loader',
      options: {
        name: `${SITE_CONFIG.paths.images}/${SITE_CONFIG.compilation.fileExtensions.image}`,
      },
    },
  },
];

const compressImages = devMode
  ? []
  : [
      {
        test: SITE_CONFIG.regex.compression,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: SITE_CONFIG.optimization.images.mozjpeg.progressive,
                quality: SITE_CONFIG.optimization.images.mozjpeg.quality,
              },
              optipng: {
                enabled: SITE_CONFIG.optimization.images.optipng.enabled,
              },
              pngquant: {
                quality: SITE_CONFIG.optimization.images.pngquant.quality,
                speed: SITE_CONFIG.optimization.images.pngquant.speed,
              },
              gifsicle: {
                interlaced: SITE_CONFIG.optimization.images.gifsicle.interlaced,
              },
            },
          },
        ],
      },
    ];

const extractFonts = [
  {
    test: SITE_CONFIG.regex.fonts,
    use: {
      loader: 'file-loader',
      options: {
        name: `${SITE_CONFIG.paths.fonts}/${SITE_CONFIG.compilation.fileExtensions.font}`,
      },
    },
  },
];

const faviconsPlugin = devMode
  ? []
  : [
      new FaviconsPlugin({
        logo: `./src/${SITE_CONFIG.paths.images}/favicon/${SITE_CONFIG.favicon.logo}`,
        outputPath: `${SITE_CONFIG.paths.images}/favicons`,
        mode: SITE_CONFIG.favicon.mode, // optional can be 'webapp' or 'light' - 'webapp' by default
        devMode: SITE_CONFIG.favicon.devMode, // optional can be 'webapp' or 'light' - 'light' by default
        favicons: {
          appName: SITE_CONFIG.appName,
          appDescription: SITE_CONFIG.description,
          developerName: SITE_CONFIG.developer,
          developerURL: SITE_CONFIG.developerURL, // null: prevent retrieving from the nearest package.json
          background: SITE_CONFIG.favicon.background,
          /* eslint-disable */
          theme_color: SITE_CONFIG.favicon.themeColor,
          /* eslint-enable */
          icons: SITE_CONFIG.favicon.icons,
        },
      }),
    ];

const manifestPlugin = devMode ? [] : [new ManifestPlugin()];

const dashboardPlugin = new DashboardPlugin({
  port: process.env.PORT,
});

const dotenvPlugin = [new Dotenv()];

module.exports = {
  devMode,
  transpileJS,
  compileTS,
  extractCSS,
  extractCSSPlugin,
  generateHTMLPages,
  extractImages,
  compressImages,
  extractFonts,
  faviconsPlugin,
  manifestPlugin,
  dashboardPlugin,
  dotenvPlugin,
};
