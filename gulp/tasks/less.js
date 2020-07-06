const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const path = require('path');
const less = require('gulp-less');
// more usages on https://www.npmjs.com/package/gulp-less
// more less plugins on http://lesscss.org/usage/#plugins
const config = require('../config').less;
module.exports = function lessCompile() {
  return src(config.src)
    .pipe(
      less({
        paths: ['src/less/includes'],
        relativeUrls: false,
      })
    )
    .pipe(
      rename(path => {
        path.dirname = path.dirname.replace('less', '.');
      }).pipe(dest(config.dest))
    );
};
