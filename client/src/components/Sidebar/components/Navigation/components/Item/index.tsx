/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

const style = require('components/Sidebar/style');

interface State {}

interface Props {
  name: string;
  iconClass: string;
  onClick: () => void;
}

export default class NavigationItem extends React.Component<Props, State> {
  static state: State = {};

  render() {
    return (
      <div
        className={classnames([
            style.sidebar__btn,
            style.sidebar__nav__item,
        ])}
        onClick={this.props.onClick}>
        <div className={style.sidebar__btn__content}>
          <span
            className={classnames([
                style.sidebar__btn__content__icon,
                this.props.iconClass,
            ])}>
          </span>
          <span className={style.sidebar__btn__content__text}>
            {this.props.name}
          </span>
        </div>
      </div>
    );
  }
}
