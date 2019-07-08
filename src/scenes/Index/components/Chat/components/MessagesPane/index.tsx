import React from "react";
import { User, Message } from "+/store/types";
import MessagesPaneTitle from "./components/MessagesPaneTitle";
import { bindActionCreators } from "redux";
import { addMessage, fetchMoreMessages } from "+/store/action";
import ItemsContainer from "./components/ItemsContainer";
import { connect } from "react-redux";
import RootState from "+/store/root_state";
import style from "./style.module.scss";

export interface MessagesPaneProps {
  messages: Message[];
  usersById: Record<string, User>;
  loading: boolean;
  loadingUsers: boolean;
  onScrollToTheTop: () => void;
}

const MessagesPane = (props: MessagesPaneProps) => {
  const { messages, loading, usersById, onScrollToTheTop, loadingUsers } = props;
  console.log(loadingUsers);

  return (
    <div className={style["messages-pane"]}>
      <MessagesPaneTitle />
      <ItemsContainer
        usersById={usersById}
        messages={messages}
        loading={loading}
        loadingUsers={loadingUsers}
        onScrollToTheTop={onScrollToTheTop}
      />
    </div>
  );
};

export default MessagesPane;
