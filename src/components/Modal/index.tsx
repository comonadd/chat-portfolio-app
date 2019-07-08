import React from "react";
import style from "./style.module.scss";

export interface ModalProps {
  children: React.ReactNode;
  title: string;
  onRemoval: () => void;
}

export default class Modal extends React.Component<ModalProps, {}> {
  public handleDocumentKeyPress = (ev: any) => {
    if (ev.keyCode == 27) {
      this.props.onRemoval();
    }
  };

  public componentWillMount() {
    document.addEventListener("keydown", this.handleDocumentKeyPress, false);
  }

  public componentWillUnmount() {
    document.removeEventListener("keydown", this.handleDocumentKeyPress, false);
  }

  public render() {
    let { title, children } = this.props;
    return <div>{children}</div>;
  }
}
