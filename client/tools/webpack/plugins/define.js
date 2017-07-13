/**
 * @file define.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const webpack = require('webpack');

module.exports = buildModeConfig => new webpack.DefinePlugin({
  __TESTING__: JSON.stringify(buildModeConfig.test),
  __DEBUG__: JSON.stringify(buildModeConfig.debug),
  NODE_ENV: JSON.stringify(buildModeConfig.nodeEnv),
  'process.env.NODE_ENV': JSON.stringify(buildModeConfig.nodeEnv),
});
