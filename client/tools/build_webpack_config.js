/**
 * @file build_webpack_config.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

const constants = require('./constants');
const config = require('./config');

const buildOutputConfig = require('./webpack/build_output_config');
const buildPluginsArray = require('./webpack/build_plugins_array');
const buildModuleConfig = require('./webpack/build_module_config');
const buildResolveConfig = require('./webpack/build_resolve_config');
const buildStatsConfig = require('./webpack/build_stats_config');

/**
 * @summary
 * Build the Webpack configuration using given build
 * mode configuration object.
 *
 * @return {object}
 */
const buildWebpackConfigWithBuildConfig = buildModeConfig => ({
  // The entry configuration
  entry: buildModeConfig.entry,

  // Webpack output configuration
  output: buildOutputConfig(buildModeConfig),

  // Webpack module configuration
  module: buildModuleConfig(buildModeConfig),

  // Webpack plugins
  plugins: buildPluginsArray(buildModeConfig),

  // Webpack resolve configuration
  resolve: buildResolveConfig(buildModeConfig),

  // The Webpack context
  context: config.srcDirPath,

  // Don't try to continue if there are any errors
  bail: buildModeConfig.webpackBail,

  // Webpack cache
  cache: buildModeConfig.cache,

  // Source map generation configuration
  devtool: buildModeConfig.devtool,

  // Webpack stats
  stats: buildStatsConfig(buildModeConfig),
});

/**
 * @summary
 * Build the Webpack configuration
 *
 * @param {number} buildMode - build mode.
 *
 * @return {object}
 */
module.exports = buildMode =>
  buildWebpackConfigWithBuildConfig(config.buildMode[buildMode]);
