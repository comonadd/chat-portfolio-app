import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import util from "+/util";
import Modal from "+/components/Modal";
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from "+/util/constants";
import RootState from "+/store/root_state";
import {
  addNotification,
  createFirebaseUser,
  hideModal,
  showModal
} from "+/store/action";
import style from "./style.module.scss";
import { getCurrentUser, isAuthenticated } from "+/store/selectors";
import { Redirect } from "react-router";
import { FirebaseCreateUserInfo } from "+/firebase";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SocialButton from "+/components/SocialButton";

interface RegisterModalOwnProps {
  onRemoval: () => void;
}

interface RegisterModalConnectedProps {
  authenticated: boolean;
  addNotification: typeof addNotification;
  createFirebaseUser: typeof createFirebaseUser;
  hideModal: typeof hideModal;
  showModal: typeof showModal;
}

interface RegisterModalState {
  newUserInfo: FirebaseCreateUserInfo;
}

class UnconnectedRegisterModal extends React.Component<
  RegisterModalOwnProps & RegisterModalConnectedProps,
  RegisterModalState
> {
  public state: RegisterModalState = {
    newUserInfo: {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: ""
    }
  };

  private showErrorMessage = (msg: string) => {
    this.props.addNotification("error", msg);
  };

  /**
   * @summary
   * Check the username field.
   *
   * @description
   * This function checks the "username" field,
   * and, in case of any errors, it sets the appropriate
   * error message to the component's state.
   * <br/>
   * It returns true if all checks passed. False otherwise.
   *
   * @return {boolean}
   */
  private checkUsernameField = () => {
    const { newUserInfo } = this.state;
    const { username } = newUserInfo;

    if (username.length < MIN_USERNAME_LENGTH) {
      this.showErrorMessage(
        `The username length is too small (minimum is 4, you have ${
          username.length
        })`
      );
      return false;
    }

    if (username.length > MAX_USERNAME_LENGTH) {
      this.showErrorMessage(
        `The username length is too big (maximum is 4, you have ${
          username.length
        })`
      );
      return false;
    }

    return true;
  };

  private checkPasswordField = () => {
    const { newUserInfo } = this.state;
    const { password } = newUserInfo;

    if (password.length < MIN_PASSWORD_LENGTH) {
      this.showErrorMessage(
        `The password length is too small (minimum is 4, you have ${
          password.length
        })`
      );
      return false;
    }

    if (password.length > MAX_PASSWORD_LENGTH) {
      this.showErrorMessage(
        `The password length is too big (maximum is 4, you have ${
          password.length
        })`
      );
      return false;
    }

    return true;
  };

  private checkEmailField = () => {
    const { newUserInfo } = this.state;
    const { email } = newUserInfo;

    if (!util.EMAIL_REGEX.test(email)) {
      this.showErrorMessage("Entered Email address is badly formatted");
      return false;
    }

    return true;
  };

  private checkfirstNameField = () => {
    const { newUserInfo } = this.state;
    const { firstName } = newUserInfo;

    if (firstName.length === 0) {
      this.showErrorMessage("The firstName wasn't entered");
      return false;
    }

    if (!util.isUpper(firstName[0])) {
      this.showErrorMessage("The firstName should start with a capital letter");
      return false;
    }

    return true;
  };

  private checklastNameField = () => {
    const { newUserInfo } = this.state;
    const { lastName } = newUserInfo;

    if (lastName.length === 0) {
      this.showErrorMessage("The lastName wasn't entered");
      return false;
    }

    if (!util.isUpper(lastName[0])) {
      this.showErrorMessage("The lastName should start with a capital letter");
      return false;
    }

    return true;
  };

  private checkFields = () => {
    return (
      this.checkUsernameField() &&
      this.checkPasswordField() &&
      this.checkEmailField() &&
      this.checkfirstNameField() &&
      this.checklastNameField()
    );
  };

  private onSubmit = (e?: any) => {
    if (e) e.preventDefault();

    const { newUserInfo } = this.state;

    if (this.checkFields()) {
      this.props.createFirebaseUser(newUserInfo);
    }
  };

  private onFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
      ...this.state,
      newUserInfo: {
        ...this.state.newUserInfo,
        [name]: val
      }
    });
  };

  private registerViaGoogle = () => {};

  private registerViaGithub = () => {};

  public render() {
    const { authenticated, onRemoval } = this.props;
    const { newUserInfo } = this.state;
    const { username, password, email, firstName, lastName } = newUserInfo;

    if (authenticated) {
      return null;
    }

    return (
      <Modal title="Register" onRemoval={onRemoval}>
        <div className={style["register-modal"]}>
          <div className={style["modal-title"]}>
            <h2>Register</h2>
          </div>
          <div className={style["modal-content"]}>
            <form
              action="#"
              onSubmit={this.onSubmit}
              className={style["register-form"]}
            >
              <div className={style["inputs"]}>
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={this.onFormChange}
                />
                <input
                  name="password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.onFormChange}
                />
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={this.onFormChange}
                />
                <input
                  name="firstName"
                  type="text"
                  value={firstName}
                  placeholder="First name"
                  onChange={this.onFormChange}
                />
                <input
                  name="lastName"
                  type="text"
                  value={lastName}
                  placeholder="Last name"
                  onChange={this.onFormChange}
                />
              </div>
              <label className={style["form-label"]}>Or...</label>
              <div className={style["social-links"]}>
                <SocialButton
                  type="google"
                  onClick={this.registerViaGoogle}
                  colored={true}
                />
                <SocialButton
                  type="github"
                  onClick={this.registerViaGithub}
                  colored={true}
                />
              </div>
              <div className={style["form-bottom"]}>
                <div className={style["submit-button-container"]}>
                  <button type="submit" className={style["register-button"]}>
                    Register
                  </button>
                </div>
                <div
                  className={style["already-have-an-account"]}
                  onClick={(ev: any) => {
                    this.props.hideModal("register");
                    this.props.showModal("login");
                  }}
                >
                  Already have an account? Sign In
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (
  state: RootState,
  ownProps: RegisterModalOwnProps
) => ({
  authenticated: isAuthenticated(state)
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addNotification,
      createFirebaseUser,
      hideModal,
      showModal
    },
    dispatch
  );

export const RegisterModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedRegisterModal);

export default RegisterModal;
