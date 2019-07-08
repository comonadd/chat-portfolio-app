import React from "react";
import classnames from "classnames";
import { User, Message } from "+/store/types";
import { scrollDownElement } from "+/util";
import {
  MESSAGES_PANE_SCROLL_GAP,
  AMOUNT_OF_MESSAGES_TO_LOAD
} from "+/util/constants";
import MessageComponent from "../Message";
import Loader from "+/components/Loader";
import style from "./style.module.scss";
import { ScaleLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ItemsContainerProps {
  usersById: Record<string, User>;
  messages: Message[];
  loading: boolean;
  loadingUsers: boolean;
  onScrollToTheTop: () => void;
}

class ItemsContainer extends React.Component<ItemsContainerProps, {}> {
  private rootElemRef: React.Ref<any> = React.createRef();

  private scrollDown = (): void => {
    const rootElem = (this.rootElemRef as any).current;
    if (rootElem) scrollDownElement(rootElem);
  };

  private onRootElemScroll = (e: any) => {
    const rootElem = e.target;
    if (rootElem.scrollTop < MESSAGES_PANE_SCROLL_GAP) {
      this.props.onScrollToTheTop();
    }
  };

  public componentDidUpdate(props: ItemsContainerProps): void {
    const rootElem = (this.rootElemRef as any).current;
    if (!rootElem) return;
    // If the user isn't loading the past messages or we've just
    // loaded thet first items
    const rootElemScrollBottom = rootElem.scrollTop + rootElem.clientHeight;
    if (
      rootElemScrollBottom > rootElem.scrollHeight - MESSAGES_PANE_SCROLL_GAP ||
      Object.keys(this.props.messages).length == AMOUNT_OF_MESSAGES_TO_LOAD
    ) {
      // Scroll to the bottom
      this.scrollDown();
    }
  }

  public componentDidMount(): void {
    const rootElem = (this.rootElemRef as any).current;
    if (rootElem) this.scrollDown();
  }

  public render() {
    let { messages, usersById, loading, loadingUsers } = this.props;
    messages = [];

    const NoMessagesBox = () => (
      <div className={style["items-container__no-msgs-msg"]}>
        <div className={style["items-container__no-msgs-msg__icon-wrapper"]}>
          <FontAwesomeIcon icon={["fas", "comment"]} />
        </div>
        <span className={style["items-container__no-msgs-msg__text"]}>
          There is no messages yet. Start conversation first!
        </span>
      </div>
    );

    const content = (() => {
      // If there is nothing to load
      if (messages.length == 0 && !loading) {
        return <NoMessagesBox />;
      }

      const renderedItems = messages.map((msg: Message, idx: any) => {
        const author: User = usersById[msg.authorID];
        return (
          <MessageComponent
            msg={msg}
            key={idx}
            author={author}
            loading={loadingUsers}
          />
        );
      });

      return (
        <div
          ref={this.rootElemRef}
          onScroll={this.onRootElemScroll}
          className={style["items-container__items"]}
        >
          <React.Fragment>
            <div className={style["items-container__loader-container"]}>
              {loading && <ScaleLoader />}
            </div>
            {renderedItems}
          </React.Fragment>
        </div>
      );
    })();
    return <div className={style["items-container"]}>{content}</div>;
  }
}

export default ItemsContainer;
