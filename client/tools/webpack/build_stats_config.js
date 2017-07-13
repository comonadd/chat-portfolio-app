/**
 * @file build_stats_config.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

module.exports = buildModeConfig => ({
  colors: true,
  timings: true,
  reasons: buildModeConfig.showWebpackReasonsInStats,
});
