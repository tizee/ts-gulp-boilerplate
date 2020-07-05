const DIR = {
  SRC: 'src',
  DIST: 'dist',
  BUILD: 'build',
};
module.exports = {
  DIR: DIR,
  sass: {
    src: `${DIR.SRC}/**/*.{sass,scss}`,
    dest: `${DIR.DIST}/css`,
  },
  less: {
    src: `${DIR.SRC}/**/*.less`,
    dest: `${DIR.DIST}/css`,
  },
  cssMinify: {
    src: `${DIR.DIST}/css/base.css`,
    dest: `${DIR.BUILD}/css`,
  },
  jsMinify: {
    src: `${DIR.DIST}/**/*.js`,
    dest: `${DIR.BUILD}/js`,
  },
};
