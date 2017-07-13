/**
 * @file logger.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const winston = require('winston');

module.exports = new winston.Logger({
  transports: [
    new winston.transports.Console(),
  ],
});
