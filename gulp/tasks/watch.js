const { watch, series } = require('gulp');
const browserSync = require('browser-sync');

const reload = done => {
  browserSync.reload();
  done();
};

module.exports = function liveReload() {
  watch(['src/**/*.{sass,scss}'], series('scss', reload));
  watch(['src/**/*.{less}'], series('less', reload));
  watch(['src/**/*.{ts,js}'], series('build', reload));
  watch(['src/**/*.pug'], series(reload));
  watch(['src/**/*.ejs'], series(reload));
  watch(['src/{img,font}/**/*.*'], series('copy2dist', reload));
};
