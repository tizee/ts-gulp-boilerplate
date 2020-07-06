const { src, dest } = require('gulp');
const webpackStream = require('webpack-stream'); // gulp webpack plugin
const webpack = require('webpack'); // webpack
const rename = require('gulp-rename');
const config = require('../config').webpack;

module.exports = function webpackComiple() {
  const mode = process.env.NODE_ENV;
  if (mode === 'production') {
    return webpackStream(config.prod, webpack)
      .on('error', () => {
        this.emit('end');
      })
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(config.dist.prod));
  } else {
    return src(config.src)
      .pipe(webpackStream(config.dev, webpack))
      .on('error', function () {
        this.emit('end');
      })
      .pipe(dest(config.dist.dev));
  }
};
