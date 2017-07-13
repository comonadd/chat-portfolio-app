/**
 * @file emit_on_errors.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const webpack = require('webpack');

module.exports = _ => new webpack.NoEmitOnErrorsPlugin();
