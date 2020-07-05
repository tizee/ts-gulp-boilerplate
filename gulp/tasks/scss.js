const { src, dest } = require('gulp');
const rename = require('gulp-rename'); // gulp plugin for renaming files
// more usages on https://www.npmjs.com/package/gulp-rename
const sass = require('gulp-sass'); // gulp plugin for sass
// more usages check https://www.npmjs.com/package/gulp-sass
const autoprefixer = require('gulp-autoprefixer'); // gulp plugin for autoprefixer
// more options on https://github.com/postcss/autoprefixer#options
const fiber = require('fibers'); // call asynchronous importers from the sychronous code path as synchronous compilation is 2x faster than asynchronous compilation using Dart sass
sass.compiler = require('sass'); // use Dart sass https://sass-lang.com/dart-sass
// sass.compiler = require('node-sass'); // more options on https://github.com/sass/node-sass#options
// note: node-sass has not supported @use yet.
// see https://github.com/sass/node-sass/issues/2886

const logger = require('../logger');
const config = require('../config').sass;

module.exports = function scssTransiple() {
  logger.debug('start sass');
  return src(config.src)
    .pipe(
      sass({ fiber: fiber /*outputStyle: 'compressed'*/ }).on(
        'error',
        sass.logError
      )
    )
    .pipe(
      autoprefixer({
        cascade: false,
      }).on('error', logger.error)
    )
    .pipe(
      rename(path => {
        path.dirname = path.dirname.replace('scss', '.');
      })
    )
    .pipe(dest(config.dest));
};
