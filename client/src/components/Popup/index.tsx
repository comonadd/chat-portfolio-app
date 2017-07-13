/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';

const style = require('./style');


interface PopupProps {
  children: React.ReactNode;
  modal: boolean;
  onRemoval: () => void;
  title: string;
}

interface PopupState {

}

export default class Popup extends React.Component<PopupProps, PopupState> {
  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args)

    // Initialize the state
    this.state = {

    };
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
