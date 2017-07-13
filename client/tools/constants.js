/**
 * @file constants.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

/**
 * @summary
 * The build mode
 *
 * @description
 * Those values are used in order to distinguish
 * between build modes.
 *
 * @property {number} DEV - The development build.
 * @property {number} RELEASE - The release build.
 * @property {number} CONTINUOUS_DEV
 *           The continuous development build.
 *           It is used when running development server.
 */
module.exports.buildMode = {
  DEV: 0,
  RELEASE: 1,
  CONTINUOUS_DEV: 2,
  TESTS: 3,
};
