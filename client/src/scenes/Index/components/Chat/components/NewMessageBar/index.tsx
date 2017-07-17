/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect as reactReduxConnect } from 'react-redux';

import { Dispatch, RootState } from 'store/types';
import { addNotification } from 'store/ducks/notifications';
const style = require('./style');

export interface OwnProps {
  onSend: (text: string) => void;
};

interface ConnectedProps {
  addNotification: typeof addNotification;
}

type State = {
  newMsg: {
    text: string;
  },
}

class NewMessageBar extends React.Component<OwnProps & ConnectedProps, State> {
  /**
   * @summary The initial state.
   */
  state: State = {
    newMsg: {
      text: '',
    },
  };

  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args);

    // Bind member methods
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.checkText = this.checkText.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.resetNewMsg = this.resetNewMsg.bind(this);
  }

  showErrorMessage(msg: string): void {
    this.props.addNotification('error', msg);
  }

  checkText(): boolean {
    if (this.state.newMsg.text.length == 0) {
      this.showErrorMessage('The message is empty');
      return false;
    }

    return true;
  }

  resetNewMsg() {
    this.setState({
      ...this.state,
      newMsg: {
        text: '',
      },
    });
  };

  onSend(event: React.MouseEvent<HTMLButtonElement>): void {
    if (this.checkText()) {
      this.props.onSend(this.state.newMsg.text);
      this.resetNewMsg();
    }
  }

  onTextChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      ...this.state,
      newMsg: {
        ...this.state.newMsg,
        text: value,
      },
    });
  }

  render(): JSX.Element {
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
          onKeyPress={(e: any) => (e.key == 'Enter') ? this.onSend(undefined) : undefined}
        />
      </div>
    );
  }
}

export default reactReduxConnect(
  (state: RootState, ownProps: OwnProps) => ({
  }),
  (dispatch: Dispatch) => bindActionCreators({
    addNotification,
  }, dispatch)
)(NewMessageBar);
