/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

const logotypeImageSrc = require('img/logotype');

const style = require('components/Sidebar/style');

export interface LogotypeProps {}

export default (props: LogotypeProps) =>
  <div
    className={classnames([style.sidebar__logotype, style.sidebar__btn])}
    title="Index"
  >
    <Link to="/">
      <span className={classnames([style.sidebar__logotype__icon, "fa", "fa-comments-o"])}>
      </span>
    </Link>
  </div>;
