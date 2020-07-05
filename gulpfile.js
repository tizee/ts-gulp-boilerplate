const { series, parallel } = require('gulp');
const source = require('vinyl-source-stream');
const logger = require('./gulp/logger');

const { copy2dist, copy2build } = require('./gulp/tasks/copy');
const { cleanDist, cleanBuild } = require('./gulp/tasks/clean');
const minifyJS = require('./gulp/tasks/minifyJs');
const minifyCSS = require('./gulp/tasks/minifyCSS');
const serveEJS = require('./gulp/tasks/ejs-serve');
const servePug = require('./gulp/tasks/pug-serve');
const ts = require('./gulp/tasks/typescript');
const scss = require('./gulp/tasks/scss');
const watch = require('./gulp/tasks/watch');
const babel = require('./gulp/tasks/babel');

// module.exports.html = series(
//   parallel(scss, series(ts, jsBundle)),
//   parallel(htmlServe, watch)
// );

// module.exports.ejs = series(
//   parallel(scss, series(ts, jsBundle)),
//   parallel(ejsServe, watch)
// );

module.exports.default = series(
  cleanDist,
  parallel(scss, series(ts, babel), copy2dist)
  // parallel(servePug, watch)
);

module.exports.build = series(
  cleanBuild,
  parallel(scss, series(ts, babel)),
  parallel(minifyCSS, minifyJS, copy2build)
);
