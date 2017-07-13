/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';

import Popup from 'components/Popup';
const style = require('../../../../style');

export interface LoginPopupProps {
  onSubmit: (username: string, password: string) => boolean;
  onRemoval: () => void;
}

interface LoginPopupState {
  username: string;
  password: string;
}

export default class LoginPopup extends React.Component<LoginPopupProps, LoginPopupState> {
  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args)

    // Initialize the state
    this.state = {
      username: '',
      password: '',
    };

    // Bind member methods
    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      ...this.state,
      [name]: value,
    });
    console.log(this.state);
  }

  render() {
    return (
      <Popup
        title="Login"
        modal={true}
        onRemoval={this.props.onRemoval}
      >
        <form>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.onFormChange}/>
          <input
            name="password"
            type="text"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onFormChange}/>
          <button
            type="submit"
            onClick={() => this.props.onSubmit(this.state.username, this.state.password)}>
            Login
          </button>
        </form>
      </Popup>
    );
  }
}
