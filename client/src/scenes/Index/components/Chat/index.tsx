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

import constants from 'src/util/constants';
import { addNotification } from 'store/ducks/notifications';
import { RootState, Dispatch } from 'store/types';
import Loader from 'components/Loader';
import MessagesPane, { MessageProps } from './components/MessagesPane';
import NewMessageBar from './components/NewMessageBar';
const style = require('./style');

type State = {
  messages: any,
  messagesLoaded: number,
  messagesLoading: boolean,
  loadingMessagesFirstTime: boolean,
  loadedAllMessages: boolean,
};

interface OwnProps {}

interface ConnectedProps {
  firebase: any;
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
    messages: {},
    messagesLoaded: 0,
    messagesLoading: false,
    loadingMessagesFirstTime: true,
    loadedAllMessages: false,
  };

  constructor(...args: any[]) {
    super(...args);

    this.onSend = this.onSend.bind(this);
    this.fetchMoreMessages = this.fetchMoreMessages.bind(this);
  }

  onSend(text: string): void {
    if (!isEmpty(this.props.auth)) {
      const msg = {
        text: text,
        date: Date.now(),
        authorID: this.props.auth.uid,
      };
      const msgKey = this.props.firebase.push('messages', msg);

      this.setState({
        ...this.state,
        messages: {
          ...this.state.messages,
          msgKey: msg,
        },
      });
    } else {
      this.props.addNotification(
        'error',
        'You must be authenticated in order to send messages',
      );
    }
  }

  fetchMoreMessages() {
    // If we've already loaded all the messages, return
    if (this.state.loadedAllMessages || this.state.messagesLoading) return;

    // Set the "loading" state
    this.setState({
      ...this.state,
      messagesLoading: true,
    });

    // Calculate the amount of messages to load
    const amountOfMsgsToLoad = this.state.messagesLoaded + constants.AMOUNT_OF_MESSAGES_TO_LOAD;

    this.props.firebase
        .ref()
        .child('messages')
        .orderByKey()
        .limitToLast(amountOfMsgsToLoad)
        .once('value', (snapshot) => {
          const val = snapshot.val();

          this.setState({
            ...this.state,
            messagesLoading: false,
            loadingMessagesFirstTime: false,
          });

          if (val) {
            const loadedActually = Object.keys(val).length;

            // If the amount of messages haven't changed from the
            // last load
            if (loadedActually == this.state.messagesLoaded) {
              // We're done
              this.setState({
                ...this.state,
                loadedAllMessages: true,
              });
              return;
            }

            this.setState({
              ...this.state,
              messages: val,
              messagesLoaded: loadedActually,
            });
          }
        });
  }

  componentWillMount() {
    // Fetch the first part of messages
    this.fetchMoreMessages();
  }

  render() {
    const messages = this.state.messages || {};
    const users = this.props.users || {};

    return (
      <div className={style.chat}>
        <MessagesPane
          items={messages}
          isEmpty={isEmpty(messages) || isEmpty(users)}
          users={users}
          loadingFirstTime={this.state.loadingMessagesFirstTime}
          loading={this.state.messagesLoading || !isLoaded(this.props.users)}
          onScrollToTheTop={this.fetchMoreMessages}
        />
        <NewMessageBar onSend={this.onSend} />
      </div>
    );
  }
}

export default firebaseConnect([
  'users',
])(reactReduxConnect(
  (state: RootState, ownProps: OwnProps) => ({
    auth: pathToJS(state.firebase, 'auth'),
    authError: pathToJS(state.firebase, 'authError'),
    profile: pathToJS(state.firebase, 'profile'),
    users: dataToJS(state.firebase, 'users'),
  }),
  (dispatch: Dispatch) => bindActionCreators({
    addNotification,
  }, dispatch)
)(Chat));
