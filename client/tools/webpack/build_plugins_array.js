/**
 * @file build_plugins_array.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const path = require('path');
const fs = require('fs');

const config = require('../config');

const PLUGINS_DIR = path.resolve(__dirname, 'plugins');

/**
 * @summary
 * Build the array of plugins based on a given build mode.
 *
 * @param {object} buildModeConfig - The build mode configuration.
 *
 * @return {Array}
 */
module.exports = buildModeConfig =>
  fs.readdirSync(PLUGINS_DIR)
    .map(pluginFilename =>
      /* eslint-disable */
      require(path.resolve(PLUGINS_DIR, pluginFilename))(buildModeConfig))
      /* eslint-enable */
    .filter(plugin => plugin !== undefined);
