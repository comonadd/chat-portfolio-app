/**
 * @file run_dev_server.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const buildWebpackConfig = require('./build_webpack_config');
const logger = require('./logger');
const constants = require('./constants');
const config = require('./config');

/**
 * @summary
 * Run the development server.
 *
 * @return {undefined}
 */
const runDevServer = () => {
  const webpackConfig = buildWebpackConfig(constants.buildMode.CONTINUOUS_DEV);
  const bundler = webpack(webpackConfig);
  const webpackDevServer = new WebpackDevServer(bundler, {
    stats: webpackConfig.stats,
  });
  webpackDevServer.listen(8080, 'localhost', () => {
    logger.log('info', 'listening on http://localhost:8080/');
  });
};

/**
 * @summary
 * The main function.
 *
 * @return {undefined}
 */
const main = () => runDevServer();

/* Call the main function */
main();
