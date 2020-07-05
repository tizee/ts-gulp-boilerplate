const { src, dest } = require('gulp');
const cleanCSS = require('gulp-clean-css'); // minify css file using clean-css
// more usages on https://www.npmjs.com/package/gulp-clean-css
const sourcemaps = require('gulp-sourcemaps');
const config = require('../config').cssMinify;

module.exports = function minifyCSS() {
  return src(config.src)
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest(config.dest));
};
