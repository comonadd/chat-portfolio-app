/**
 * @file build_output_config.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

/**
 * @summary
 * Build the `output` Webpack configuration object
 *
 * @param {object} buildModeConfig - The build mode configuration
 *
 * @return {object}
 */
module.exports = buildModeConfig => ({
  path: buildModeConfig.outDirPath,
  filename: buildModeConfig.outputFilename,
  chunkFilename: buildModeConfig.outputChunkFilename,
});
