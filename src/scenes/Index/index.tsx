import React from "react";
import classnames from "classnames";
import Chat from "./components/Chat";
import style from "./style.module.scss";

export default (props: {}) => (
  <div className={style["index-scene"]}>
    <Chat />
  </div>
);
