/**
 * @file format.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const process = require('process');
const fs = require('fs');
const stream = require('stream');
const path = require('path');

const vfs = require('vinyl-fs');
const sassConverter = require('sass-convert');
const prettier = require('prettier');
const tsfmt = require('typescript-formatter');

const logger = require('./logger');
const util = require('./util');
const config = require('./config');

/**
 * @summary
 * The options for the prettier javascript formatting tool.
 */
const prettierToolOptions = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  bracketSpacing: false,
  jsxBracketSameLine: false,
};

/**
 * @summary
 * Format all JavaScript files in the given directory
 *
 * @param {String} dirPath - The directory path
 *
 * @return {undefined}
 */
const formatScriptsInDir = (dirPath) => {
  const sayAboutFormatting = filePath =>
    logger.log('info', `formatting "${filePath}"`);

  // Format each JavaScript file in the given directory
  const jsFileRegexp = /\*\.js/;
  util.forEachFilePathWithPred(
    dirPath,
    filePath => jsFileRegexp.test(filePath),
    (filePath) => {
      sayAboutFormatting(filePath);
      fs.readFile(filePath, (readErr, data) => {
        if (!readErr) {
          const formattedData = prettier.format(data, prettierToolOptions);
          fs.writeFile(filePath, data, (writeErr) => {
            if (writeErr) {
              // TODO: Handle the error
            }
          });
        }
      });
    });

  // Format each TypeScript file in the given directory
  const tsFileRegexp = /\*\.tsx?/;
  util.forEachFilePathWithPred(
    dirPath,
    filePath => tsFileRegexp.test(filePath),
    filePath =>
      tsfmt.processFiles([filePath]).then(
        res => sayAboutFormatting(res[filePath].src)));
};

/**
 * @summary
 * Format all the scripts in the project.
 *
 * @return {undefined}
 */
const formatScripts = () => {
  logger.log('info', 'formatting the scripts');
  // Format source directory
  formatScriptsInDir(config.srcDirPath);
  // Format tools directory
  formatScriptsInDir(config.toolsDirPath);
};

/**
 * @summary
 * Format all the styles in the project.
 *
 * @return {undefined}
 */
const formatStyles = () => {
  logger.log('info', 'formatting the styles');
  vfs.src(path.resolve(config.srcDirPath, '**/*.sass'))
     .pipe(sassConverter({
       from: 'sass',
       to: 'sass',
     }))
     .pipe(vfs.dest(config.srcDirPath));
};

try {
  process.argv.slice(2).forEach((arg, ..._) => {
    switch (arg) {
      case 'scripts':
        formatScripts();
        break;
      case 'styles':
        formatStyles();
        break;
      default:
        logger.log(
          'error',
          `there is no "${arg}" formatting implemented`,
        );
        process.exit(1);
    }
  });
} catch (err) {
  logger.log('error', err.msg());
}
