const del = require('del');
const { DIST, BUILD } = require('../config').DIR;

module.exports = {
  cleanDist: function cleanDist(cb) {
    del(DIST).then(() => {
      cb();
    });
  },
  cleanBuild: function cleanBuild(cb) {
    del(BUILD).then(() => {
      cb();
    });
  },
};
