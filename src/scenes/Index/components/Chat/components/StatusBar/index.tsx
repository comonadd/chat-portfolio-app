/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';

const style = require('../../style');

export type StatusBarProps {
  usersOnline: number,
  totalAmountOfMessages: number,
};

type StatusBarState {
};

export default class StatusBar extends React.Component<StatusBarProps, StatusBarState> {
  /**
   * @summary The initial state.
   */
  state: StatusBarState = {};

  render() {
    return (
      <div className={style.chat__statusBar}>
        <div className={style.chat__statusBar__part}>
          Online: 29
        </div>
        <div>
          Registered: 32
        </div>
        <div>
          Messages: 8939
        </div>
      </div>
    );
  }
}
