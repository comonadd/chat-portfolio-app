import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import util from "+/util";
import Modal from "+/components/Modal";
import RootState from "+/store/root_state";
import { addNotification, signIn, hideModal } from "+/store/action";
import { Dispatch } from "redux";
import style from "./style.module.scss";

export interface LoginModalOwnProps {
  onRemoval: any;
}

interface LoginModalConnectedProps {
  addNotification: typeof addNotification;
  signIn: any;
}

interface LoginModalState {
  email: string;
  password: string;
}

class UnconnectedLoginModal extends React.Component<
  LoginModalOwnProps & LoginModalConnectedProps,
  LoginModalState
> {
  public state = {
    email: "",
    password: ""
  };

  private onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      ...this.state,
      [name]: value
    });
  };

  private showErrorMessage = (msg: string): void => {
    this.props.addNotification("error", msg);
  };

  private checkEmailField = (): boolean => {
    if (!util.EMAIL_REGEX.test(this.state.email)) {
      this.showErrorMessage("The Email is badly formatted");
      return false;
    }
    return true;
  };

  private checkFields = (): boolean => {
    return this.checkEmailField();
  };

  private onSubmit = (e?: any) => {
    if (e) {
      e.preventDefault();
    }
    if (this.checkFields()) {
      this.props
        .signIn(this.state.email, this.state.password)
        .then(() =>
          this.props.addNotification("info", "Successfully logged in")
        )
        .catch((error: Error) => {
          this.props.addNotification(
            "error",
            "Failed to sign in. Check your credentials."
          );
        });
    }
  };

  public render() {
    const { onRemoval } = this.props;
    return (
      <Modal title="Login" onRemoval={onRemoval}>
        <div className={style["login-modal"]}>
          <div className={style["modal-title"]}>
            <h2>Sign In</h2>
          </div>
          <div className={style["modal-content"]}>
            <form
              onSubmit={this.onSubmit}
              action="#"
              className={style["login-form"]}
            >
              <div className={style["inputs"]}>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onFormChange}
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onFormChange}
                />
              </div>
              <button type="submit" className={style["login-button"]}>
                Login
              </button>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      addNotification,
      signIn,
      hideModal
    },
    dispatch
  );

export const LoginModal = connect(
  null,
  mapDispatchToProps
)(UnconnectedLoginModal);

export default LoginModal;
