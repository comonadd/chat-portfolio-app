/**
 * @file config.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const path = require('path');

const constants = require('./constants');

module.exports = {};
const c = module.exports;

// Entry file name
c.entryFileName = 'index.tsx';

// Paths
c.rootDirPath = path.resolve(__dirname, '..');
c.srcDirPath = path.resolve(c.rootDirPath, 'src');
c.srcImgDirPath = path.resolve(c.srcDirPath, 'img');
c.buildDirPath = path.resolve(c.rootDirPath, 'build');
c.jekyllBuildDirPath = path.resolve(c.rootDirPath, 'jekyll_build');
c.toolsDirPath = path.resolve(c.rootDirPath, 'tools');
c.nodeModulesDirPath = path.resolve(c.rootDirPath, 'node_modules');
c.sassCacheDirPath = path.resolve(c.rootDirPath, '.sass-cache');
c.entrySrcFilePath = path.resolve(c.srcDirPath, c.entryFileName);
c.htmlTemplateFilePath = path.resolve(c.srcDirPath, 'index.ejs');
c.faviconFilePath = path.resolve(c.srcImgDirPath, 'favicon.png');
c.yarnErrorLogFilePath = path.resolve(c.rootDirPath, 'yarn-error.log');
c.tmpDirPath = path.resolve(c.rootDirPath, 'tmp');
c.testsEntryFilePath = path.resolve(c.srcDirPath, 'index.spec.tsx');

/**
 * @summary
 * List of paths to remove when cleaning project.
 */
c.pathsToRemoveWhenCleaning = [
  c.buildDirPath,
  c.sassCacheDirPath,
  c.yarnErrorLogFilePath,
  c.jekyllBuildDirPath,
  c.tmpDirPath,
];

/**
 * @summary
 * Default build mode.
 */
c.defaultBuildType = constants.buildMode.RELEASE;

c.defaultNodeEnv = 'development';
c.commonsChunkFileName = 'vendor';

/**
 * @summary
 * Configuration for the 'DEV' build
 */
const DEV_BUILD_TYPE_CONFIG = {
  entry: c.entrySrcFilePath,
  webpackBail: false,
  cache: true,
  showWebpackReasonsInStats: true,
  optimize: false,
  minimize: false,
  showDebugInfo: true,
  stylesSourceMapEnabled: true,
  stylesLocalIdentName: '[local]____[hash:base64:3]',
  outputFilename: '[name].js',
  outputChunkFilename: '[name].chunk.js',
  outDirPath: path.resolve(c.buildDirPath, 'dev'),
  debug: true,
  nodeEnv: 'development',
  continuous: false,
  devtool: 'source-map',
  commonChunksEnable: true,
  buildFavicons: false,
  test: false,
  indexHtmlAtRootDir: false,
  liveReload: false,
};

/**
 * @summary
 * Configuration for the 'RELEASE' build
 */
const RELEASE_BUILD_TYPE_CONFIG = {
  entry: c.entrySrcFilePath,
  webpackBail: true,
  cache: false,
  showWebpackReasonsInStats: false,
  optimize: true,
  minimize: true,
  showDebugInfo: false,
  stylesSourceMapEnabled: false,
  stylesLocalIdentName: '[hash:base64:5]',
  outputFilename: '[name]_[chunkhash:8].js',
  outputChunkFilename: '[name]_[chunkhash:8].chunk.js',
  outDirPath: path.resolve(c.buildDirPath, 'release'),
  debug: false,
  continuous: false,
  nodeEnv: 'production',
  devtool: false,
  commonChunksEnable: true,
  buildFavicons: true,
  test: false,
  indexHtmlAtRootDir: true,
  liveReload: false,
};

const TESTS_BUILD_TYPE_CONFIG = {
  ...DEV_BUILD_TYPE_CONFIG,
  entry: c.testsEntryFilePath,
  outputFilename: 'main.js',
  outDirPath: c.tmpDirPath,
  devtool: 'inline-source-map',
  commonChunksEnable: false,
  test: true,
  indexHtmlAtRootDir: false,
  liveReload: true,
};

/**
 * @summary
 * Build type configuration.
 */
c.buildMode = {
  [constants.buildMode.DEV]: DEV_BUILD_TYPE_CONFIG,
  [constants.buildMode.CONTINUOUS_DEV]: {
    ...DEV_BUILD_TYPE_CONFIG,
    continuous: true,
    liveReload: true,
    entry: c.entrySrcFilePath,
  },
  [constants.buildMode.RELEASE]: RELEASE_BUILD_TYPE_CONFIG,
  [constants.buildMode.TESTS]: TESTS_BUILD_TYPE_CONFIG,
};

// Initial page title
c.initialPageTitle = 'The Modern Frontend Starter Kit';
