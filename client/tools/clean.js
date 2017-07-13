/**
 * @file clean.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const rimraf = require('rimraf');

const util = require('./util');
const config = require('./config');

/**
 * @summary
 * Clean the project tree
 *
 * @return {undefined}
 */
const clean = () =>
  config.pathsToRemoveWhenCleaning.forEach(
    path => rimraf(path, () => {}));

/**
 * @summary
 * The main function
 *
 * @return {undefined}
 */
const main = () => clean();

/* Call the main function */
main();
