/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

const style = require('./style');

export interface LoaderItemProps {
  index: number;
}

const LoaderItem = (props: LoaderItemProps) =>
  <li
    className={classnames(style.loader__items__item, [
        'style.loader__items__item_' + props.index,
    ])}
  />;

const LoaderItems = () =>
  <ul className={style.loader__items}>
    {[0, 1, 2, 3, 4].map((i) => <LoaderItem key={i} index={i} />)}
  </ul>;

const Loader = () =>
  <div className={style.loader}>
    <LoaderItems />
  </div>;

export default Loader;
