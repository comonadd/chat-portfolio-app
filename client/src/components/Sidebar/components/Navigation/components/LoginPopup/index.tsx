/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { connect as reactReduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';

import util from 'src/util';
import Popup from 'components/Popup';
import RootState from 'store/root_state';
import { addNotification } from 'store/ducks/notifications';
const style = require('../../../../style');

export interface OwnProps {
  onSubmit: (email: string, password: string) => void;
  onRemoval: () => void;
}

interface LoginPopupProps extends OwnProps {
  addNotification: typeof addNotification;
}

interface LoginPopupState {
  email: string;
  password: string;
}

class LoginPopup extends React.Component<LoginPopupProps, LoginPopupState> {
  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args)

    // Initialize the state
    this.state = {
      email: '',
      password: '',
    };

    // Bind member methods
    this.onFormChange = this.onFormChange.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  showErrorMessage(msg: string): void {
    this.props.addNotification('error', msg);
  }

  checkEmailField(): boolean {
    if (!util.EMAIL_REGEX.test(this.state.email)) {
      this.showErrorMessage('The Email is badly formatted');
      return false;
    }
    return true;
  }

  checkFields(): boolean {
    return this.checkEmailField();
  }

  onSubmit(e: any) {
    e.preventDefault();

    if (this.checkFields()) {
      this.props.onSubmit(this.state.email, this.state.password);
    }
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
            name="email"
            type="text"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onFormChange}/>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onFormChange}/>
          <button
            type="submit"
            onClick={this.onSubmit}>
            Login
          </button>
        </form>
      </Popup>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  addNotification,
}, dispatch);

export default reactReduxConnect(mapStateToProps, mapDispatchToProps)(LoginPopup);
