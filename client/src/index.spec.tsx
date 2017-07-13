/**
 * @file index.spec.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

const context: any = require.context(__dirname, true, /\*.spec.js$/);
context.keys().forEach(context);
module.exports = context;
