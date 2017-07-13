/**
 * @file build_script_module_rules.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const config = require('../config');

module.exports = buildModeConfig => ({
  test: /\.tsx?$/,
  exclude: [config.nodeModulesDirPath],
  use: [
    {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        babelrc: false,
        presets: [
          'es2015',
          'react',
          'stage-0',
          ...(buildModeConfig.optimize ? ['react-optimize'] : []),
        ],
        plugins: [
          /* Decorators support */
          'transform-decorators-legacy',
          /* Component stack to warning messages */
          ...(buildModeConfig.showDebugInfo
            ? ['transform-react-jsx-source']
            : []),
          /* __self attribute to JSX which React will use for some warnings */
          ...(buildModeConfig.showDebugInfo
            ? ['transform-react-jsx-self']
            : []),
        ],
      },
    },
    {
      loader: 'awesome-typescript-loader',
      options: {
        reportFiles: [
          'src/**/*.{ts,tsx}',
        ],
        configFileName: 'tools/tsconfig.dev.json',
      },
    },
  ],
});
