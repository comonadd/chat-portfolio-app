/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect as reactReduxConnect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchMessages, addMsg, State as MessagesState } from 'store/ducks/messages';
import { addNotification } from 'store/ducks/notifications';
import { State as UserState } from 'store/ducks/user';
import { State as UsersState } from 'store/ducks/users';
import { RootState, Dispatch } from 'store/types';
import Loader from 'components/Loader';
import MessagesPane, { MessageProps } from './components/MessagesPane';
import NewMessageBar from './components/NewMessageBar';
const style = require('./style');

type ChatState = {
};

interface OwnProps {}

interface ChatProps extends OwnProps {
  messages: MessagesState;
  user: UserState;
  users: UsersState;
  addMsg: typeof addMsg;
  fetchMessages: typeof fetchMessages;
  addNotification: typeof addNotification;
}

/**
 * @summary
 * The component that represents the chat.
 */
class Chat extends React.Component<ChatProps, ChatState> {
  /**
   * @summary The initial state.
   */
  state: ChatState = {
  };

  constructor(...args: any[]) {
    // Call the super constructor
    super(...args);

    // Bind member methods
    this.onNewMsgSend = this.onNewMsgSend.bind(this);
  }

  /**
   * @summary
   * This is the function which gets called when a new message
   * is sent by the user.
   *
   * @param {string} text - The text of the message.
   *
   * @return {undefined}
   */
  onNewMsgSend(text: string) {
    if (this.props.user.isAuthorized) {
      this.props.addMsg(
        this.props.user,
        text,
      );
    } else {
      this.props.addNotification(
        'error',
        'You must be authenticated in order to send messages',
      );
    }
  }

  componentWillMount() {
    this.props.fetchMessages(0, 10);
  }

  render() {
    return (
      <div className={style.chat}>
        <MessagesPane
          items={this.props.messages.items}
          users={this.props.users.items}
          loading={this.props.messages.loading} />
        <NewMessageBar onSend={this.onNewMsgSend} />
      </div>
    );
  }
}

export default reactReduxConnect(
  (state: RootState, ownProps: OwnProps) => ({
    messages: state.messages,
    user: state.user,
    users: state.users,
  }),
  (dispatch: Dispatch) => bindActionCreators({
    fetchMessages,
    addMsg,
    addNotification,
  }, dispatch),
)(Chat);
