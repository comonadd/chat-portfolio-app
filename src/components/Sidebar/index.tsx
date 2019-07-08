import React from "react";
import Logotype from "+/components/Logotype";
import SidebarNavigation from "./components/Navigation";
import style from "./style.module.scss";

const SidebarLogotype = () => (
  <div className={style["sidebar-logotype"]}>
    <Logotype />
  </div>
);

export default () => (
  <div className={style["sidebar"]}>
    <SidebarLogotype />
    <SidebarNavigation active={false} />
  </div>
);
