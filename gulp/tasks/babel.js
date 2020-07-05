const { src, dest } = require('gulp');
const babel = require('gulp-babel'); // gulp plugin for babel
// more usages on https://www.npmjs.com/package/gulp-babel
const sourcemaps = require('gulp-sourcemaps');

module.exports = function babelCompile() {
  return src('src/**/*.{js,ts}')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist'));
};
