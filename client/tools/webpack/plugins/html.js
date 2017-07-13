/**
 * @file html.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('../../config');

const minifyOption = buildModeConfig => (
  buildModeConfig.minimize ? {
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeComments: true,
    quoteCharacter: '\'',
    collapseWhitespace: true,
    caseSensitive: false,
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true,
  } : false
);

module.exports = buildModeConfig =>
  new HtmlWebpackPlugin({
    title: config.initialPageTitle,
    minify: minifyOption,
    cache: buildModeConfig.cache,
    filename: 'index.html',
    template: config.htmlTemplateFilePath,
  });
