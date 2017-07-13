/**
 * @file build_style_module_rules.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = require('../config');

module.exports = (buildModeConfig) => {
  const stylesUseOption = [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 0,
        sourceMap: buildModeConfig.stylesSourceMapEnabled,
        modules: true,
        minimize: buildModeConfig.minimize,
        camelCase: 'dashes',
        discardComments: {
          removeAll: true,
        },
        localIdentName: buildModeConfig.stylesLocalIdentName,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        includePaths: [config.srcDirPath, config.nodeModulesDirPath],
      },
    },
  ];

  return {
    test: /\.scss$/,
    // include: [config.srcDirPath],*/
    use: buildModeConfig.optimize ? ExtractTextWebpackPlugin.extract({
      stylesUseOption,
      fallback: 'style-loader',
    }) : stylesUseOption,
  };
};
