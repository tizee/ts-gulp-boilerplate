const browserSync = require('browser-sync');
// more options on https://browsersync.io/docs/options
const config = require('../config').serve;
const pugConfig = require('../config').pug;
const ROUTE = require('../config').ROUTE;
const pug = require('pug');
const fs = require('fs');
const url = require('url');
const path = require('path');
const logger = require('../logger');

const getPugFilePath = pathname => {
  const suffix = path.parse(pathname).ext ? '' : 'index.html';
  let pugFilePath = path.join(process.cwd(), 'src/html/pug', pathname, suffix);
  pugFilePath = pugFilePath.replace('.html', '.pug');
  pugFilePath = pugFilePath.replace(`src/html/pug/${ROUTE}/`, 'src/html/pug/');
  return pugFilePath;
};

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {()=>void} next
 */
const pugMiddleWare = (req, res, next) => {
  const pathname = url.parse(req.url).pathname;
  if (path.parse(pathname).ext !== '.html') {
    next();
  }
  const pugFilePath = getPugFilePath(pathname);
  const data = JSON.parse(fs.readFileSync(pugConfig.data, 'utf-8'));
  // get pug file path
  logger.info(`[BrowserSync] render pug: ${pugFilePath}`);
  const content = pug.renderFile(pugFilePath, {
    data: data,
    pretty: true,
  });
  res.end(Buffer.from(content));
};

module.exports = function servePug() {
  if (process.env.NODE_ENV === 'production') {
    browserSync(config.build);
  } else {
    config.dist.middleware = pugMiddleWare;
    browserSync(config.dist);
  }
};
