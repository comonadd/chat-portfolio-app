/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect as reactReduxConnect } from 'react-redux';

/* import * as messageActions from 'store/ducks/messages';*/
import Loader from 'components/Loader';
import MessagesPane, { MessageProps } from './components/MessagesPane';
import NewMessageBar from './components/NewMessageBar';
const style = require('./style');

export type ChatState = {
}

export type ChatProps = {
  messages: MessageProps[],
  loading: boolean,
}

/**
 * @summary
 * The component that represents the chat.
 */
/* @reactReduxConnect(
 *   (state) => ({
 *     user: state.user,
 *   }),
 *   (dispatch) => ({
 *     actions: bindActionCreators(messageActions, dispatch),
 *   }),
 * )*/
export default class Chat extends React.Component<ChatProps, any> {
  /**
   * @summary
   * The initial state.
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
    console.log('sending the message');
    /* this.props.actions.addMsg({
     *   author: this.props.user,
     *   text,
     * });*/
  }

  render() {
    // TODO: Remove this fixture
    const msgs = [{
      id: '1',
      text: 'Hello, how are you?',
      author: {
        firstName: 'Dmitry',
        lastName: 'Guzeev',
        username: 'wrongway4you',
        avatarUrl: '',
      },
    }, {
      id: '2',
      text: 'What is that really qsq?',
      author: {
        firstName: 'Dmitry',
        lastName: 'Guzeev',
        username: 'wrongway4you',
        avatarUrl: '',
      },
    }];

    return (
      <div className={style.chat}>
        <MessagesPane
          messages={msgs}
          loading={false} />
        <NewMessageBar onSend={this.onNewMsgSend} />
      </div>
    );
  }
}
