/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect as reactReduxConnect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS,
} from 'react-redux-firebase'

import { addNotification } from 'store/ducks/notifications';
import { RootState, Dispatch } from 'store/types';
import Loader from 'components/Loader';
import MessagesPane, { MessageProps } from './components/MessagesPane';
import NewMessageBar from './components/NewMessageBar';
const style = require('./style');

type State = {
};

interface OwnProps {}

interface ConnectedProps {
  firebase: any;
  messages: any;
  users: any;
  auth: any;
  authError: any;
  profile: any;
  addNotification: typeof addNotification;
}

/**
 * @summary
 * The component that represents the chat.
 */
class Chat extends React.Component<OwnProps & ConnectedProps, State> {
  /**
   * @summary The initial state.
   */
  state: State = {
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
    if (!isEmpty(this.props.auth)) {
      console.log('Chat::onNewMsgSend():');
      console.log(this.props);
      this.props.firebase.push('messages/items', {
        text,
        date: Date.now(),
        authorID: this.props.auth.uid,
      });
    } else {
      this.props.addNotification(
        'error',
        'You must be authenticated in order to send messages',
      );
    }
  }

  render() {
    const messages = this.props.messages || {};
    const users = this.props.users || {};

    return (
      <div className={style.chat}>
        <MessagesPane
          items={messages.items}
          isEmpty={isEmpty(messages.items)}
          users={users}
          loading={!isLoaded(messages.items)} />
        <NewMessageBar onSend={this.onNewMsgSend} />
      </div>
    );
  }
}

export default firebaseConnect([
  'messages',
  'users',
])(reactReduxConnect(
  (state: RootState, ownProps: OwnProps) => ({
    authError: pathToJS(state.firebase, 'authError'),
    auth: pathToJS(state.firebase, 'auth'),
    profile: pathToJS(state.firebase, 'profile'),
    messages: dataToJS(state.firebase, 'messages'),
    users: dataToJS(state.firebase, 'users'),
  }),
  (dispatch: Dispatch) => bindActionCreators({
  }, dispatch)
)(Chat));
