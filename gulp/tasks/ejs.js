const { src, dest } = require('gulp');
const ejs = require('gulp-ejs'); // gulp plugin for ejs
// more usages on https://www.npmjs.com/package/gulp-ejs
const fs = require('fs');
const rename = require('gulp-rename');
const config = require('../config').ejs;

module.exports = function ejsCompile() {
  return src(config.src)
    .pipe(ejs({ data: JSON.parse(fs.readFileSync(config.data)) }))
    .pipe(
      rename(path => {
        path.extname = '.html';
      })
    )
    .pipe(dest(config.dist));
};
