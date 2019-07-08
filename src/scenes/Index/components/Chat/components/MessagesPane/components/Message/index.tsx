import React from "react";
import UserAvatar from "+/components/UserAvatar";
import "./style.scss";
import { Message, User } from "+/store/types";
import { UNKNOWN_USER } from "+/util/constants";

export interface MessageProps {
  msg: Message;
  author: User;
  loading: boolean;
}

export default ({ msg, author, loading }: MessageProps) => {
  const displayAuthor = author || UNKNOWN_USER;
  return (
    <div className={"msg"}>
      <div className={"msg__left"}>
        <div className={"msg__left__authorAvatar"}>
          <UserAvatar
            displayFullName={false}
            user={displayAuthor}
            loading={loading}
          />
        </div>
      </div>
      <div className={"msg__body"}>
        <div className={"msg__body__header"}>
          <div className={"msg__body__header__author"}>
            <div className={"msg__body__header__author__fullname"}>
              {displayAuthor.firstName + " " + displayAuthor.lastName}
            </div>
            <div className={"msg__body__header__author__username"}>
              (@{displayAuthor.username})
            </div>
          </div>
        </div>
        <div className={"msg__body__text"}>{msg.text}</div>
      </div>
    </div>
  );
};
