/**
 * @file build_img_module_rules.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const config = require('../config');

module.exports = _ => ({
  test: /\.(jpg|png)$/,
  include: config.srcImgDirPath,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 0,
        useRelativePath: false,
      },
    },
  ],
});
