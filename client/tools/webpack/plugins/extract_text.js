/**
 * @file extract_text.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

module.exports = buildModeConfig => (
  buildModeConfig.optimize ? new ExtractTextWebpackPlugin({
    filename: '[name].[contenthash].css',
    allChunks: true,
  }) : undefined
);
