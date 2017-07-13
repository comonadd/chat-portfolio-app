/**
 * @file common_chunks.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const webpack = require('webpack');

const config = require('../../config');

module.exports = buildModeConfig => (
  buildModeConfig.commonChunksEnable ? new webpack.optimize.CommonsChunkPlugin({
    name: config.commonsChunkFileName,
    minChunks: module => /node_modules/.test(module.resource),
  }) : undefined
);
