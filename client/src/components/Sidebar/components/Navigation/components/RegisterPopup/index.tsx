/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { connect as reactReduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';

import util from 'src/util';
import Popup from 'components/Popup';
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from 'util/constants';
import RootState from 'store/root_state';
import { addNotification } from 'store/ducks/notifications';
const style = require('../../../../style');

interface OwnProps {
  onSubmit: (
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string
  ) => void;
  onRemoval: () => void;
}

interface RegisterPopupProps extends OwnProps {
  addNotification: typeof addNotification;
}

type RegisterPopupState = {
  username: string,
  password: string,
  email: string,
  firstname: string,
  lastname: string,
};

class RegisterPopup extends React.Component<RegisterPopupProps, RegisterPopupState> {
  state: RegisterPopupState = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
  };

  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args);

    // Bind the member methods
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.checkUsernameField = this.checkUsernameField.bind(this);
    this.checkPasswordField = this.checkPasswordField.bind(this);
    this.checkFirstnameField = this.checkFirstnameField.bind(this);
    this.checkLastnameField = this.checkLastnameField.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  /**
   * @summary
   * Show the error message.
   *
   * @return {undefined}
   */
  showErrorMessage(msg: string) {
    this.props.addNotification('error', msg);
  }

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
  checkUsernameField() {
    if (this.state.username.length < MIN_USERNAME_LENGTH) {
      this.showErrorMessage(
        `The username length is too small (minimum is 4, you have ${this.state.username.length})`);
      return false;
    }

    if (this.state.username.length > MAX_USERNAME_LENGTH) {
      this.showErrorMessage(
        `The username length is too big (maximum is 4, you have ${this.state.username.length})`);
      return false;
    }

    return true;
  }

  checkPasswordField() {
    if (this.state.password.length < MIN_PASSWORD_LENGTH) {
      this.showErrorMessage(
        `The password length is too small (minimum is 4, you have ${this.state.password.length})`);
      return false;
    }

    if (this.state.password.length > MAX_PASSWORD_LENGTH) {
      this.showErrorMessage(
        `The password length is too big (maximum is 4, you have ${this.state.password.length})`);
      return false;
    }

    return true;
  }

  checkEmailField() {
    if (!util.EMAIL_REGEX.test(this.state.email)) {
      this.showErrorMessage('Entered Email address is badly formatted');
      return false;
    }

    return true;
  }

  checkFirstnameField() {
    if (this.state.firstname.length === 0) {
      this.showErrorMessage('The firstname wasn\'t entered');
      return false;
    }

    if (!util.isUpper(this.state.firstname[0])) {
      this.showErrorMessage('The firstname should start with a capital letter');
      return false;
    }

    return true;
  }

  checkLastnameField() {
    if (this.state.lastname.length === 0) {
      this.showErrorMessage('The lastname wasn\'t entered');
      return false;
    }

    if (!util.isUpper(this.state.lastname[0])) {
      this.showErrorMessage('The lastname should start with a capital letter');
      return false;
    }

    return true;
  }

  checkFields() {
    return (
      this.checkUsernameField() &&
      this.checkPasswordField() &&
      this.checkEmailField() &&
      this.checkFirstnameField() &&
      this.checkLastnameField()
    );
  }

  onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    if (this.checkFields()) {
      this.props.onSubmit(
        this.state.username,
        this.state.password,
        this.state.email,
        this.state.firstname,
        this.state.lastname
      );
    }
  }

  onFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  render() {
    return (
      <Popup
        title="Register"
        modal={true}
        onRemoval={this.props.onRemoval}
      >
        <form action="">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onFormChange}/>
          <input
            name="password"
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.onFormChange}
          />
          <input
            name="email"
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onFormChange}/>
          <input
            name="firstname"
            type="text"
            value={this.state.firstname}
            placeholder="First name"
            onChange={this.onFormChange}
          />
          <input
            name="lastname"
            type="text"
            value={this.state.lastname}
            placeholder="Last name"
            onChange={this.onFormChange}
          />
          <button type="submit" onClick={this.onSubmit}>Register</button>
        </form>
      </Popup>
    );
  }
}

export default reactReduxConnect(
  (state: RootState, ownProps: OwnProps) => ({
  }),
  (dispatch: any) => bindActionCreators({
    addNotification,
  }, dispatch),
)(RegisterPopup);
