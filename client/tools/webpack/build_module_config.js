/**
 * @file build_module_config.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const buildScriptRules = require('./build_script_module_rules');
const buildStyleRules = require('./build_style_module_rules');
const buildImgRules = require('./build_img_module_rules');

/**
 * @summary
 * Build `module` Webpack configuration option
 *
 * @param {object} buildModeConfig - The build mode configuration.
 *
 * @return {object}
 */
module.exports = buildModeConfig => ({
  rules: [
    buildScriptRules(buildModeConfig),
    buildStyleRules(buildModeConfig),
    buildImgRules(buildModeConfig),
  ],
});
