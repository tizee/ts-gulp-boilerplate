// more options on https://www.npmjs.com/package/winston
const winston = require('winston');
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.label({ label: '⚙️ logger' }),
    winston.format.printf(info => {
      return `${info.label}: ${info.message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
