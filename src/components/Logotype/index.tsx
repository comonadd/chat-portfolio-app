import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faComment } from '@fortawesome/free-solid-svg-icons'

export default (props: {}) => (
  <div className={style["sidebar-logotype"]} title="Index">
    <Link to="/">
      <FontAwesomeIcon icon={faComment} />
    </Link>
  </div>
);
