const { src, dest } = require('gulp');
const { SRC, DIST, BUILD } = require('../config').DIR;

// copy static files
module.exports = {
  copy2dist: function copy2dist() {
    return src([`${SRC}/img/**/*.*`, `${SRC}/font/**/*.*`]).pipe(dest(DIST));
  },
  copy2build: function copy2build() {
    return src([`${DIST}/img/**/*.*`, `${DIST}/font/**/*.*`]).pipe(dest(BUILD));
  },
};
