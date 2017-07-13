/**
 * @file occurence_order.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const webpack = require('webpack');

module.exports = buildModeConfig => (
  buildModeConfig.optimize ?
  new webpack.optimize.OccurrenceOrderPlugin()
  : undefined
);
