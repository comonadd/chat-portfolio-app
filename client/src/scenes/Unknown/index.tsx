/**
 * @file index.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const style = require('./style');

/**
 * @summary
 * The `Unknown` scene component.
 *
 * @description
 * The scene component which represents the 404 page.
 *
 * @return {React.Component}
 */
const UnknownScene = () =>
  <div className={style.unknownScene}>
    <div className={style.unknownScene__msg}>
      <div className={style.unknownScene__msg__text}>
        There is no such a page.
      </div>
      <div className={style.unknownScene__msg__link}>
        <Link to='/'>Try to find another one</Link>
      </div>
    </div>
  </div>;

export default UnknownScene;
