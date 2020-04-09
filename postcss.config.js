module.exports = {
  ident: 'postcss',
  plugins: [
    /* eslint-disable */
    process.env.NODE_ENV === 'production' ? require('autoprefixer') : null,
    process.env.NODE_ENV === 'production' ? require('cssnano')({ preset: 'default' }) : null,
    require('postcss-preset-env')({ stage: 0 }),
    require('@fullhuman/postcss-purgecss')({
      /* eslint-enable */
      content: ['./src/**/*.html', './src/**/*.js', './src/**/*.ts', './src/**/*.jsx', './src/**/*.tsx'],
      css: ['./src/**/*.css'],
      // Include any special characters you're using in this regular expression
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
