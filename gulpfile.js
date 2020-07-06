const { series, parallel } = require('gulp');

const { copy2dist, copy2build } = require('./gulp/tasks/copy');
const { cleanDist, cleanBuild } = require('./gulp/tasks/clean');
const minifyImage = require('./gulp/tasks/minifyImage');
const minifyJS = require('./gulp/tasks/minifyJs');
const minifyCSS = require('./gulp/tasks/minifyCSS');
const serveEJS = require('./gulp/tasks/ejs-serve');
const servePug = require('./gulp/tasks/pug-serve');
const ts = require('./gulp/tasks/typescript');
const scss = require('./gulp/tasks/scss');
const less = require('./gulp/tasks/less');
const pug = require('./gulp/tasks/pug');
const ejs = require('./gulp/tasks/ejs');
const watch = require('./gulp/tasks/watch');
const babel = require('./gulp/tasks/babel');
const webpack = require('./gulp/tasks/_webpack');

module.exports.copy2build = copy2build;
module.exports.copy2dist = copy2dist;
module.exports.less = less;
module.exports.scss = scss;
module.exports.pug = pug;
module.exports.ejs = ejs;
module.exports.babel = babel;
module.exports.webpack = webpack;

module.exports['dev:ejs'] = series(
  cleanDist,
  parallel(scss, series(ts, babel), copy2dist),
  parallel(serveEJS, watch)
);

module.exports.default = series(
  cleanDist,
  parallel(scss, series(ts, babel), copy2dist),
  parallel(servePug, watch)
);

module.exports.build = series(
  cleanBuild,
  parallel(scss, series(ts, babel)),
  parallel(minifyCSS, minifyJS),
  minifyImage,
  copy2build
);
