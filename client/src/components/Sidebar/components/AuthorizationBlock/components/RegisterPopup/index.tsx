/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';

import Popup from 'components/Popup';
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH
} from 'util/constants';
const style = require('../../../../style');

interface RegisterPopupProps {
  onSubmit: (username: string, password: string, firstname: string, lastname: string) => boolean;
  onRemoval: () => void;
}

interface RegisterPopupState {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  errorMessage: string,
  errorMessageShown: boolean,
}

export default class RegisterPopup extends React.Component<RegisterPopupProps, RegisterPopupState> {
  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args);

    // Initialize the state
    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      errorMessage: '',
      errorMessageShown: false,
    };

    // Bind the member methods
    this.setErrorMessage = this.setErrorMessage.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.hideErrorMessage = this.hideErrorMessage.bind(this);
    this.checkUsernameField = this.checkUsernameField.bind(this);
    this.checkPasswordField = this.checkPasswordField.bind(this);
    this.checkFirstnameField = this.checkFirstnameField.bind(this);
    this.checkLastnameField = this.checkLastnameField.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  /**
   * @summary
   * Set the error message.
   *
   * @return {undefined}
   */
  setErrorMessage(msg: string) {
    this.setState({
      ...this.state,
      errorMessage: msg,
    });
  }

  /**
   * @summary
   * Show the error message.
   *
   * @return {undefined}
   */
  showErrorMessage() {
    this.setState({
      ...this.state,
      errorMessageShown: true,
    });
  }

  /**
   * @summary
   * Hide the error message.
   *
   * @return {undefined}
   */
  hideErrorMessage() {
    this.setState({
      ...this.state,
      errorMessageShown: false,
    });
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
      this.setErrorMessage(`The username length is too small (minimum is 4, you have ${this.state.username.length})`);
      return false;
    }

    if (this.state.username.length > MAX_USERNAME_LENGTH) {
      this.setErrorMessage(`The username length is too big (maximum is 4, you have ${this.state.username.length})`);
      return false;
    }

    return true;
  }

  checkPasswordField() {
    if (this.state.password.length < MIN_PASSWORD_LENGTH) {
      this.setErrorMessage(`The password length is too small (minimum is 4, you have ${this.state.password.length})`);
      return false;
    }

    if (this.state.password.length > MAX_PASSWORD_LENGTH) {
      this.setErrorMessage(`The password length is too big (maximum is 4, you have ${this.state.password.length})`);
      return false;
    }

    return true;
  }

  checkFirstnameField() {
    return true;
  }

  checkLastnameField() {
    return true;
  }

  checkFields() {
    return (
      this.checkUsernameField() &&
      this.checkPasswordField() &&
      this.checkFirstnameField() &&
      this.checkLastnameField()
    );
  }

  onSubmit() {
    if (this.checkFields()) {
      this.showErrorMessage();
    } else {
      this.props.onSubmit(
        this.state.username,
        this.state.password,
        this.state.firstname,
        this.state.lastname);
    }
  }

  onFormChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const val = event.target.value;

    this.setState({
      ...this.state,
      [name]: val,
    }, this.checkFields);
  }

  render() {
    return (
      <Popup
        title="Register"
        modal={true}
        onRemoval={this.props.onRemoval}
      >
        {/* {this.state.errorMessageShown && <SomeComponentThatWillShowTheMessage />} */}
        <form action="">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onFormChange}/>
          <input
            name="password"
            type="text"
            value={this.state.password}
            placeholder="Password"
            onChange={this.onFormChange}
          />
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
