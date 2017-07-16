/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { connect as reactReduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Popup from 'components/Popup';
import RootState from 'store/root_state';
import { addNotification } from 'store/ducks/notifications';
const style = require('../../../../style');

export interface OwnProps {
  onSubmit: (email: string, password: string) => boolean;
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
  }

  onFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const name = e.target.name;

    this.setState({
      ...this.state,
      [name]: value,
    });
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
            onClick={() => this.props.onSubmit(this.state.email, this.state.password)}>
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
