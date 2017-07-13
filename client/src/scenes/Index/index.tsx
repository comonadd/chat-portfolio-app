/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

import Chat from './components/Chat';
const style = require('./style');

/**
 * @summary
 * The `Index` scene.
 *
 * @return {React.Component}
 */
export default () =>
  <div className={style.indexScene}>
    <Chat messages={[]} loading={false} />
  </div>;
