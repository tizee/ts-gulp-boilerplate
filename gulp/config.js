const DIR = {
  SRC: 'src',
  DIST: 'dist',
  BUILD: 'build',
};

const ROUTE = 'app';

module.exports = {
  ROUTE: ROUTE,
  DIR: DIR,
  webpack: {
    src: [`./${DIR.SRC}/**/*.{js,ts}`, `!./${DIR.SRC}/**/_*.{js,ts}`],
    dist: {
      dev: `${DIR.DIST}/js`,
      prod: `${DIR.BUILD}/js`,
    },
    // webpack config
    dev: {
      mode: 'development',
      entry: {
        main: `./${DIR.SRC}/template.ts`,
      },
      output: {
        filename: '[name].js',
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
        ],
      },
    },
    prod: {
      mode: 'production',
      entry: {
        main: `./${DIR.SRC}/template.ts`,
      },
      output: {
        filename: 'bundle-[chunkhash].js',
      },
      resolve: {
        extensions: ['ts', 'js'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
            },
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
        ],
      },
    },
  },
  pug: {
    src: ['src/html/pug/**/*.pug', '!src/html/pug/**/_*.pug'],
    data: `${DIR.SRC}/html/pug/data.json`,
    dist: 'dist',
  },
  ejs: {
    src: ['src/html/ejs/**/*.ejs', '!src/html/ejs/**/_*.ejs'],
    data: `${DIR.SRC}/html/ejs/data.json`,
    dist: 'dist',
  },
  serve: {
    dist: {
      startPath: `${ROUTE}/`,
      ghostMode: false,
      server: {
        baseDir: DIR.DIST,
        index: 'index.html',
        routes: {
          [ROUTE]: `${DIR.DIST}`,
        },
      },
      https: true,
    },
    build: {
      startPath: `${ROUTE}/`,
      ghostMode: false,
      server: {
        baseDir: DIR.BUILD,
        index: 'index.html',
        routes: {
          [ROUTE]: `${DIR.BUILD}`,
        },
      },
      https: true,
    },
  },
  sass: {
    src: `${DIR.SRC}/**/*.{sass,scss}`,
    dest: `${DIR.DIST}/css`,
  },
  less: {
    src: `${DIR.SRC}/less/*.less`,
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
