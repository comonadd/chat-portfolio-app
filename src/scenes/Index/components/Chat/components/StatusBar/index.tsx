import React from "react";
import "./style.scss";

export interface StatusBarProps {
  usersOnline: number;
  totalAmountOfMessages: number;
}

export default class StatusBar extends React.Component<StatusBarProps, {}> {
  public render() {
    return (
      <div className={"chat__statusBar"}>
        <div className={"chat__statusBar__part"}>Online: 29</div>
        <div>Registered: 32</div>
        <div>Messages: 8939</div>
      </div>
    );
  }
}
