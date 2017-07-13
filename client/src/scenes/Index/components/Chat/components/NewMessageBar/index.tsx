/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';

const style = require('./style');

export type NewMessageBarProps = {
  onSend: (text: string) => void,
}

type NewMessageBarState = {
  newMsg: {
    text: string;
  },
  errorMessage: string,
}

export default class NewMessageBar extends React.Component<NewMessageBarProps, NewMessageBarState> {
  /**
   * @summary The initial state.
   */
  state: NewMessageBarState = {
    newMsg: {
      text: '',
    },
    errorMessage: '',
  };

  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args);

    // Bind member methods
    this.onSend = this.onSend.bind(this);
  }

  setErrorMessage(msg: string): void {
    this.setState({
      ...this.state,
      errorMessage: msg,
    });
  }

  checkText(): boolean {
    if (this.state.newMsg.text.length == 0) {
      this.setErrorMessage('The message is empty');
      return false;
    }

    return true;
  }

  onSend(event: React.MouseEvent<HTMLButtonElement>): void {
    if (this.checkText()) {
      this.props.onSend(this.state.newMsg.text);
    }
  }

  onTextChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  render(): JSX.Element {
    const isThereAnError = this.state.errorMessage.length != 0;

    return (
      <div className={style.newMessageBar}>
        <button
          className={style.newMessageBar__sendBtn}
          onClick={this.onSend}
        >
          Send
        </button>
        <input
          className={style.newMessageBar__field}
          name="text"
          type="text"
          value={this.state.newMsg.text}
          onChange={this.onTextChange}
        />
        {/* {isThereAnError &&
            <SomeNotifictionThatWouldSayhAboutTheERror />} */}
      </div>
    );
  }
}
