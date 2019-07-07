import React from "react";
import classnames from "classnames";
import "./style.scss";

export interface LoaderItemProps {
  index: number;
}

const LoaderItem = (props: LoaderItemProps) => (
  <li
    className={classnames("loader__items__item", [
      `loader__items__item_${props.index}`
    ])}
  />
);

const LoaderItems = () => (
  <ul className={"loader__items"}>
    {[0, 1, 2, 3, 4].map(i => (
      <LoaderItem key={i} index={i} />
    ))}
  </ul>
);

export default () => (
  <div className={"loader"}>
    <LoaderItems />
  </div>
);
