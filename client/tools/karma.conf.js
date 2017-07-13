/**
 * @file karma.conf.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const constants = require('./constants');
const config = require('./config');
const buildWebpackConfig = require('./build_webpack_config');

module.exports = karmaConfig => karmaConfig.set({
  // The base path
  basePath: config.rootDirPath,

  // Browsers to use
  browsers: ['PhantomJs'],

  // Testing frameworks to use
  frameworks: ['mocha', 'chai'],

  // Tests entry points
  files: [
    config.testsEntryFilePath,
  ],

  // Preprocessors to use for each test file
  preprocessors: {
    [config.testsEntryFilePath]: ['webpack', 'sourcemap'],
  },

  // Reporters
  reporters: ['nyan'],

  // Nyan reporter configuration
  nyanReporter: {
    suppressErrorHighlighting: true,
  },

  // Webpack preprocessor configuration
  webpack: buildWebpackConfig(constants.buildMode.TESTS),
  webpackMiddleware: {
    noInfo: false,
  },

  // Other settings
  port: 9876,
  colors: true,
  logLevel: karmaConfig.LOG_INFO,
  autoWatch: true,
  singleRun: false,
});
