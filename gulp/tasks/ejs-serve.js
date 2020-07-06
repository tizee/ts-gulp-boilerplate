const browserSync = require('browser-sync');
// more options on https://browsersync.io/docs/options
const config = require('../config').serve;
const ejsConfig = require('../config').ejs;
const ROUTE = require('../config').ROUTE;
const ejs = require('ejs');
// more usages on https://www.npmjs.com/package/ejs
const fs = require('fs');
const url = require('url');
const path = require('path');
const logger = require('../logger');

const getEjsFilePath = pathname => {
  const suffix = path.parse(pathname).ext ? '' : 'index.html';
  let filepath = path.join(process.cwd(), 'src/html/ejs', pathname, suffix);
  filepath = filepath.replace('.html', '.ejs');
  filepath = filepath.replace(`src/html/ejs/${ROUTE}/`, 'src/html/ejs/');
  return filepath;
};

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {()=>void} next
 */
const ejsMiddleWare = async (req, res, next) => {
  const pathname = url.parse(req.url).pathname;
  if (path.parse(pathname).ext !== '.html') {
    next();
  }
  const filepath = getEjsFilePath(pathname);
  const data = JSON.parse(fs.readFileSync(ejsConfig.data, 'utf-8'));
  logger.info(`[BrowserSync] render ejs: ${filepath}`);
  const content = await ejs.renderFile(
    filepath,
    {
      data: data,
    },
    {
      async: true,
    }
  );
  res.end(Buffer.from(content));
};

module.exports = function serveEjs() {
  if (process.env.NODE_ENV === 'production') {
    browserSync(config.build);
  } else {
    config.dist.middleware = ejsMiddleWare;
    browserSync(config.dist);
  }
};
