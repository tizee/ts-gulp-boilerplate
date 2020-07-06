const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const pug = require('gulp-pug');
// gulp plugin for pug https://www.npmjs.com/package/gulp-pug
// more options on https://pugjs.org/api/reference.html
const data = require('gulp-data');
const config = require('../config').pug;

module.exports = function pugCompile() {
  return src(config.src)
    .pipe(
      data(file => {
        return { data: require(`../../${config.data}`) };
      })
    )
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(
      rename(path => {
        path.dirname = path.dirname.replace('html', '.');
      })
    )
    .pipe(dest('dist'));
};
