import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import style from "./style.module.scss";

export interface OwnProps {
  onSend: (text: string) => void;
}

interface ConnectedProps {
  authenticated: boolean;
  addNotification: any;
}

interface State {
  newMsg: {
    text: string;
  };
}

class NewMessageBar extends React.Component<OwnProps & ConnectedProps, State> {
  public state: State = {
    newMsg: {
      text: ""
    }
  };

  private showErrorMessage = (msg: string): void => {
    this.props.addNotification("error", msg);
  };

  private onSend = (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (this.state.newMsg.text.length == 0) {
      // If the input field is empty, ignore the send button press
      return false;
    }

    this.props.onSend(this.state.newMsg.text);
    this.resetNewMsg();
  };

  private resetNewMsg() {
    this.setState({
      ...this.state,
      newMsg: {
        text: ""
      }
    });
  }

  private onTextChange = (event: any): void => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      ...this.state,
      newMsg: {
        ...this.state.newMsg,
        text: value
      }
    });
  };

  public render() {
    return (
      <div className={style["new-msg-bar"]}>
        <input
          className={classnames({
            [style["new-msg-bar__field"]]: true,
            "placeholder-hidden": this.state.newMsg.text.length > 0
          })}
          name="text"
          value={this.state.newMsg.text}
          onChange={this.onTextChange}
          placeholder="Write a message..."
          onKeyPress={(e: any) => e.key === "Enter" && this.onSend(undefined)}
        />
        <button
          className={style["new-msg-bar__send-btn"]}
          onClick={this.onSend}
        >
          <FontAwesomeIcon icon={["fas", "paper-plane"]} />
        </button>
      </div>
    );
  }
}

export default NewMessageBar;
