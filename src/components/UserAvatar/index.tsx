import util from "+/util";
import React from "react";
import { MoonLoader } from "react-spinners";
import style from "./style.module.scss";

interface UserAvatarProps {
  user: { firstName: string; lastName: string; username: string };
  displayFullName: boolean;
  loading: boolean;
}

export default ({ user, displayFullName, loading }: UserAvatarProps) => {
  const backgroundColor = util.getUserAvatarBackgroundColor(user.username);

  return (
    <div
      className={style["user-avatar"]}
      style={{ background: backgroundColor, color: "#fff" }}
    >
      {loading ? (
        <MoonLoader color={"#fff"} size={15} />
      ) : displayFullName ? (
        <span className={style["user-avatar__fullname"]}>
          {`${user.firstName} ${user.lastName}`}
        </span>
      ) : (
        <span className={style["user-avatar__name-initials"]}>
          {`${user.firstName[0]} ${user.lastName[0]}`}
        </span>
      )}
    </div>
  );
};
