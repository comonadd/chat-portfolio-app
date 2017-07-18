/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

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

  msgsList: any;

  constructor(...args: any[]) {
    super(...args);

    this.scrollDown = this.scrollDown.bind(this);
  }

  componentDidUpdate() {
    this.scrollDown();
  }

  scrollDown() {
    this.msgsList.scrollTop = this.msgsList.scrollHeight;
  }

  render() {
    const messages = this.props.items || {};
    const users = this.props.users || {};

    return (
      <div className={style.messagesPane}>
        <div className={style.messagesPane__title}>
          <h1>Messages</h1>
        </div>
        <div
          ref={(ref) => this.msgsList = ref}
          className={style.messagesPane__msgsList}>
          {
            this.props.loading ? <Loader /> :
            this.props.isEmpty ?
            <div className={style.messagesPane__msgsList__noMsgsMsg}>
              <span className={classnames([
                  style.messagesPane__msgsList__noMsgsMsg__icon,
                  "fa", "fa-comment"])}>
              </span>
              <span className={style.messagesPane__msgsList__noMsgsMsg__text}>
                There is no messages yet. Start conversation first!
              </span>
            </div> :
            Object.keys(messages).sort().map((msgKey: string) => {
              const msg = messages[msgKey];
              const author = users[msg.authorID];
              return <Message key={msgKey} author={author} {...msg} />;
            })
          }
        </div>
      </div>
    );
  }
}
