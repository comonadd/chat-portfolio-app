import { firebaseAddMessage } from "+/firebase";
import { addNotification, fetchMoreMessages } from "+/store/action";
import { RootState } from "+/store/root_state";
import {
  getCurrentUser,
  getMessagesSortedByDate,
  getUsersById,
  isAuthenticated,
  isFinishedLoadingMessages,
  isLoadingUsers,
  isMessagesLoading
} from "+/store/selectors";
import { Message, User } from "+/store/types";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MessagesPane from "./components/MessagesPane";
import NewMessageBar from "./components/NewMessageBar";
import "./style.scss";

interface ConnectedProps {
  messages: Message[];
  usersById: Record<string, User>;
  currentUser: User;
  auth: any;
  messagesLoading: boolean;
  messagesLoadedAll: boolean;
  addNotification: typeof addNotification;
  fetchMoreMessages: any;
  loadingUsers: boolean;
  authenticated: boolean;
}

class Chat extends React.Component<{} & ConnectedProps, {}> {
  private onSend = (text: string): void => {
    const { authenticated, currentUser } = this.props;
    if (authenticated) {
      firebaseAddMessage({
        text: text,
        authorID: currentUser.id
      }).catch((error: Error) => {
        this.props.addNotification("error", "Failed to send message");
      });
    } else {
      this.props.addNotification(
        "error",
        "You have be authenticated in order to send messages"
      );
    }
  };

  public componentWillMount() {
    this.props.fetchMoreMessages();
  }

  public render() {
    const {
      messages,
      usersById,
      messagesLoading,
      addNotification,
      authenticated,
      loadingUsers
    } = this.props;

    return (
      <div className={"chat"}>
        <MessagesPane
          messages={messages}
          usersById={usersById}
          onScrollToTheTop={this.props.fetchMoreMessages}
          loading={messagesLoading}
          loadingUsers={loadingUsers}
        />
        <NewMessageBar
          authenticated={authenticated}
          onSend={this.onSend}
          addNotification={addNotification}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: any) => ({
  usersById: getUsersById(state),
  messages: getMessagesSortedByDate(state),
  messagesLoading: isMessagesLoading(state),
  messagesLoadedAll: isFinishedLoadingMessages(state),
  authenticated: isAuthenticated(state),
  loadingUsers: isLoadingUsers(state),
  currentUser: getCurrentUser(state)
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addNotification,
      fetchMoreMessages
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
