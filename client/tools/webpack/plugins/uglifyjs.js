/**
 * @file uglifyjs.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const webpack = require('webpack');

module.exports = buildModeConfig => (
  buildModeConfig.minimize ? new webpack.optimize.UglifyJsPlugin({
    compress: {
      // join consecutive statemets with the “comma operator”
      sequences: true,

      // optimize property access: a["foo"] → a.foo
      properties: true,

      // discard unreachable code
      dead_code: true,

      // discard “debugger” statements
      drop_debugger: true,

      // some unsafe optimizations (see below)
      unsafe: false,

      // optimize if-s and conditional expressions
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

      // warn about potentially dangerous optimizations/code
      warnings: true,

      // global definitions
      global_defs: {},
    },
    output: {
      comments: false,
    },
  }) : undefined
);
