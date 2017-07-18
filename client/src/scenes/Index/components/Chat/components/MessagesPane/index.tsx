/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

import constants from 'src/util/constants';
import Message, { MessageProps } from './components/Message';
import Loader from 'components/Loader';
const style = require('./style');

export { MessageProps } from './components/Message';

const SCROLL_GAP = 240;

type ItemsContainerProps = {
  items: any,
  users: any,
  onScrollToTheTop: () => void,
};

type ItemsContainerState = {
};

class ItemsContainer extends React.Component<ItemsContainerProps, ItemsContainerState> {
  /**
   * @summary The initial state.
   */
  state: ItemsContainerState = {
  };

  rootElem: any;

  constructor(...args: any[]) {
    super(...args);

    this.scrollDown = this.scrollDown.bind(this);
  }

  componentDidUpdate(props: ItemsContainerProps): void {
    // If the user isn't loading the past messages or we've just
    // loaded thet first items
    const rootElemScrollBottom = this.rootElem.scrollTop + this.rootElem.clientHeight;
    if ((rootElemScrollBottom > (this.rootElem.scrollHeight - SCROLL_GAP)) ||
        (Object.keys(this.props.items).length == constants.AMOUNT_OF_MESSAGES_TO_LOAD)) {
      // Scroll to the bottom
      this.scrollDown();
    }
  }

  componentDidMount(): void {
    this.scrollDown();
    // Add the scroll event listener
    this.rootElem.addEventListener('scroll', (e: any) => {
      if (this.rootElem.scrollTop < SCROLL_GAP) {
        this.props.onScrollToTheTop();
      }
    });
  }

  /**
   * @summary
   * Scroll down the messages list.
   *
   * @return {undefined}
   */
  scrollDown(): void {
    this.rootElem.scrollTop = this.rootElem.scrollHeight;
  }

  render() {
    const {items, users} = this.props;

    const renderedItems = Object.keys(items).sort().map((msgKey: string) => {
      const msg = items[msgKey];
      const author = users[msg.authorID];
      return <Message key={msgKey} author={author} {...msg} />;
    });

    return (
      <div
        ref={(ref: any) => this.rootElem = ref}
        className={style.messagesPane__msgsList__items}
      >
        {renderedItems}
      </div>
    );
  }
}

export type MessagesPaneProps = {
  items: object,
  users: object,
  loading: boolean,
  isEmpty: boolean,
  onScrollToTheTop: () => void,
  loadingFirstTime: boolean,
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

  /**
   * @summary
   * The messages list items container element reference.
   */
  msgsListItemsContainer: any;

  render(): JSX.Element {
    const messages = this.props.items || {};
    const users = this.props.users || {};

    return (
      <div className={style.messagesPane}>
        <div className={style.messagesPane__title}><h1>Messages</h1></div>
        <div className={style.messagesPane__msgsList}>
          {
            (this.props.loading && this.props.loadingFirstTime) ?
            <Loader /> :
            (this.props.isEmpty && !this.props.loading) ?
            (<div className={style.messagesPane__msgsList__noMsgsMsg}>
              <span className={classnames([
                  style.messagesPane__msgsList__noMsgsMsg__icon,
                  "fa", "fa-comment"])}>
              </span>
              <span className={style.messagesPane__msgsList__noMsgsMsg__text}>
                There is no messages yet. Start conversation first!
              </span>
            </div>) :
            <ItemsContainer items={messages} users={users} onScrollToTheTop={this.props.onScrollToTheTop} />
          }
        </div>
      </div>
    );
  }
}
