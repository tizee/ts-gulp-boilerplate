const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');
const pipeline = require('readable-stream').pipeline;
const config = require('../config').jsMinify;

module.exports = function minifyJS() {
  return pipeline(src(config.src), uglify(), dest(config.dest));
};
