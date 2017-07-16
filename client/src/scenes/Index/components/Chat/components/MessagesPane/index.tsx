/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';

import Message, { MessageProps } from './components/Message';
import Loader from 'components/Loader';
const style = require('./style');

export { MessageProps } from './components/Message';

export type MessagesPaneProps = {
  items: object,
  users: object,
  loading: boolean,
  isEmpty: boolean,
};

type MessagesPaneState = {
};

const UNKNOWN_USER = {
  firstname: 'Unknown',
  lastname: 'Person',
  username: 'unknown',
};

export default class MessagesPane extends React.Component<MessagesPaneProps, MessagesPaneState> {
  /**
   * @summary The initial state.
   */
  state: MessagesPaneState = {
  };

  render() {
    const messages = this.props.items || {};
    const users = this.props.users || {};

    return (
      <div className={style.messagesPane}>
        <div className={style.messagesPane__title}>
          <h1>Messages</h1>
        </div>
        <div className={style.messagesPane__msgsList}>
          {
            !this.props.isEmpty ?
            this.props.loading ? <Loader /> :
            Object.keys(messages).map((id: string) => {
              const msg: any = messages[id];
              const author: any = users[msg.authorID] || UNKNOWN_USER;
              return (
                <Message key={id} author={author} {...msg} />
              );
            }) :
            <span>There is no messages (yet)</span>
          }
        </div>
      </div>
    );
  }
}
