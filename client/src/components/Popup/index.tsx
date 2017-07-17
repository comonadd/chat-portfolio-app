/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';

const style = require('./style');

interface Props {
  children: React.ReactNode;
  modal: boolean;
  onRemoval: () => void;
  title: string;
}

interface State {}

export default class Popup extends React.Component<Props, State> {
  state: State = {};

  constructor(...args: any[]) {
    super(...args)

    // Bind the member functions
    this.handleDocumentKeyPress = this.handleDocumentKeyPress.bind(this);
  }

  handleDocumentKeyPress(ev: any) {
    if (ev.keyCode == 27) {
      // ESC was pressed
      this.props.onRemoval();
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleDocumentKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyPress, false);
  }

  render() {
    return (
      <div className={style.popupEnv}>
        {this.props.modal &&
         <div className={style.modalBackground} onClick={this.props.onRemoval}></div>}
        <div className={style.popup}>
          <div className={style.popup__title}>{this.props.title}</div>
          <div className={style.popup__content}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}
