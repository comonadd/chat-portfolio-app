/**
 * @file build.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const fs = require('fs');

const webpack = require('webpack');

const logger = require('./logger');
const config = require('./config');
const constants = require('./constants');
const buildWebpackConfig = require('./build_webpack_config');

/**
 * @summary
 * Build the project.
 *
 * @param {number} buildMode - The build mode.
 *
 * @return {undefined}
 */
const build = (buildMode) => {
  const webpackConfig = buildWebpackConfig(buildMode);

  /* Make the build directory */
  fs.mkdir(config.buildDirPath, () => {
    /* Make the output directory for the specific build mode */
    fs.mkdir(config.buildMode[buildMode].outDirPath, () => {
      /* Run Webpack */
      webpack(webpackConfig, (err, stats) => {
        if (!err) {
          /* All is good. There were no errors */
          const statsStr = stats.toString({
            chunks: false,
            colors: true,
          });

          logger.log(
            'info',
            `webpack:\n\n${statsStr}`,
          );

          /* Exit with 'success' exit code */
          process.exit(0);
        } else {
          /* There were some errors */
          logger.log(
            'error',
            `webpack reported some errors while compiling:\n${err}`,
          );

          /* Exit with 'error' exit code */
          process.exit(1);
        }
      });
    });
  });
};

/**
 * @summary
 * The main function.
 *
 * @return {undefined}
 */
const main = () => {
  /* Determine the build mode */
  const passedBuildType = process.argv[2];
  let buildMode = config.defaultBuildType;

  /* If the user passed any build mode, determine what it is */
  if (passedBuildType !== undefined) {
    switch (passedBuildType) {
      case 'dev':
        buildMode = constants.buildMode.DEV;
        break;
      case 'release':
        buildMode = constants.buildMode.RELEASE;
        break;
      default:
        logger.log(`unknown build mode: "${passedBuildType}"`);
        break;
    }
  }

  /* Set the NODE_ENV */
  process.env.NODE_ENV = config.buildMode[buildMode].nodeEnv;

  /* Build with the determined build mode */
  build(buildMode);
};

/* Call the main function */
main();
