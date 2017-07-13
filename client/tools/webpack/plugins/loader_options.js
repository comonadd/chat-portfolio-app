/**
 * @file define.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const webpack = require('webpack');

module.exports = buildModeConfig =>
  new webpack.LoaderOptionsPlugin({
    minimize: buildModeConfig.minimize,
    debug: buildModeConfig.debug,
  });
