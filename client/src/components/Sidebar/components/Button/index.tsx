/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

const style = require('components/Sidebar/style');

interface NavigationItemProps {
  title: string;
  name: string;
  iconClass: string;
  onClick: () => void;
}

export default (props: NavigationItemProps) =>
  <div className={style.sidebar__btn} onClick={props.onClick}>
    <div className={style.sidebar__btn__content}>
      <span className={classnames([style.sidebar__btn__content__icon, props.iconClass])}></span>
      <span className={style.sidebar__btn__content__text}>
        {props.name}
      </span>
    </div>
  </div>;
