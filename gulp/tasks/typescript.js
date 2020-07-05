const { src, dest } = require('gulp');
const ts = require('gulp-typescript'); // gulp typescript plugin
// more options see https://www.npmjs.com/package/gulp-typescript
const tsProject = ts.createProject('tsconfig.json');
const logger = require('../logger');
// To help properly handle error conditions with Node streams, this project recommends the use of pipeline from readable-stream.
const pipeline = require('readable-stream').pipeline;

module.exports = function tsTransiple() {
  return src('src/**/*.{ts,js}')
    .pipe(tsProject())
    .js.pipe(dest('dist'))
    .on('error', logger.error);
};
