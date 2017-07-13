/**
 * @file define.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = require('../../config');

module.exports = buildModeConfig => (
  buildModeConfig.buildFavicons ?
  new FaviconsWebpackPlugin(config.faviconFilePath) : undefined
);
