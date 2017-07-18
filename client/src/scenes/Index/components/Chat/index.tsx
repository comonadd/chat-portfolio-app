/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect as reactReduxConnect } from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS,
  customToJS,
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
  messagesLoading: boolean;
  usersLoading: boolean;
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
    super(...args);

    this.onSend = this.onSend.bind(this);
  }

  onSend(text: string): void {
    if (!isEmpty(this.props.auth)) {
      this.props.firebase.push('messages', {
        text: text,
        date: Date.now(),
        authorID: this.props.auth.uid,
      })
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
          items={messages}
          isEmpty={isEmpty(messages) || isEmpty(users)}
          users={users}
          loading={!(isLoaded(this.props.messages) || isLoaded(this.props.users))} />
        <NewMessageBar onSend={this.onSend} />
      </div>
    );
  }
}

export default firebaseConnect([
  {path: 'messages', queryParams: ['orderByKey']},
  'users',
])(reactReduxConnect(
  (state: RootState, ownProps: OwnProps) => ({
    auth: pathToJS(state.firebase, 'auth'),
    authError: pathToJS(state.firebase, 'authError'),
    profile: pathToJS(state.firebase, 'profile'),
    messages: dataToJS(state.firebase, 'messages'),
    users: dataToJS(state.firebase, 'users'),
  }),
  (dispatch: Dispatch) => bindActionCreators({
    addNotification,
  }, dispatch)
)(Chat));
