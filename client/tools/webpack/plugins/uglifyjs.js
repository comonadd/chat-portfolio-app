/**
 * @file uglifyjs.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const webpack = require('webpack');

module.exports = buildModeConfig => (
  buildModeConfig.minimize ? new webpack.optimize.UglifyJsPlugin({
    compress: {
      // Disable support for IE8
      screw_ie8: true,

      // Disable warnings
      warnings: false,

      // Join consecutive statemets with the “comma operator”
      sequences: true,

      // Optimize property access: a["foo"] → a.foo
      properties: true,

      // Discard unreachable code
      dead_code: true,

      // Discard “debugger” statements
      drop_debugger: true,

      // Some unsafe optimizations (see below)
      unsafe: false,

      // Optimize if-s and conditional expressions
      conditionals: true,

      // optimize comparisons
      comparisons: true,

      // evaluate constant expressions
      evaluate: true,

      // optimize boolean expressions
      booleans: true,

      // optimize loops
      loops: true,

      // drop unused variables/functions
      unused: true,

      // hoist function declarations
      hoist_funs: true,

      // hoist variable declarations
      hoist_vars: false,

      // optimize if-s followed by return/continue
      if_return: true,

      // join var declarations
      join_vars: true,

      // try to cascade `right` into `left` in sequences
      cascade: true,

      // drop side-effect-free statements
      side_effects: true,

      // global definitions
      global_defs: {},
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  }) : undefined
);
