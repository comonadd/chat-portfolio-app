import React from "react";
import classnames from "classnames";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface NavigationItemProps {
  name: string;
  faIconParams: IconProp;
  onClick: () => void;
}

export default class NavigationItem extends React.Component<
  NavigationItemProps,
  {}
> {
  public render() {
    const {faIconParams} = this.props;
    return (
      <div className={style["navigation-item"]} onClick={this.props.onClick}>
        <div>
          <FontAwesomeIcon icon={faIconParams} />
        </div>
      </div>
    );
  }
}
