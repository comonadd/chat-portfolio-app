/**
 * @file build_resolve_config.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const path = require('path');

const config = require('../config');

module.exports = _ => ({
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.json', '.jpg', '.png'],
  modules: [config.srcDirPath, config.nodeModulesDirPath],
});
