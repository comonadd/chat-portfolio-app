/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

import LoginPopup from './components/LoginPopup';
import RegisterPopup from './components/RegisterPopup';
const style = require('components/Sidebar/style');

export interface AuthorizationBlockProps {
  isAuthorized: boolean;
  avatarUrl: string;
}

interface AuthorizationBlockState {
  loginPopupShowing: boolean;
  registerPopupShowing: boolean;
}

export default class AuthorizationBlock extends React.Component<AuthorizationBlockProps, AuthorizationBlockState> {
  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args);

    // Initialize the state
    this.state = {
      loginPopupShowing: false,
      registerPopupShowing: false,
    };

    // Bind member methods
    this.showLoginPopup = this.showLoginPopup.bind(this);
    this.hideLoginPopup = this.hideLoginPopup.bind(this);
    this.showRegisterPopup = this.showRegisterPopup.bind(this);
    this.hideRegisterPopup = this.hideRegisterPopup.bind(this);
    this.onLoginPopupFormSubmit = this.onLoginPopupFormSubmit.bind(this);
  }

  showLoginPopup() {
    this.setState({
      ...this.state,
      loginPopupShowing: true,
    });
  }

  hideLoginPopup() {
    this.setState({
      ...this.state,
      loginPopupShowing: false,
    });
  }

  showRegisterPopup() {
    this.setState({
      ...this.state,
      registerPopupShowing: true,
    });
  }

  hideRegisterPopup() {
    this.setState({
      ...this.state,
      registerPopupShowing: false,
    });
  }

  onLoginPopupFormSubmit(username: string, password: string): boolean {
    this.setState({
      ...this.state,
      loginPopupShowing: false,
    });
    console.log(`login: {${username}, ${password}}`);
    return true;
  }

  onRegisterPopupFormSubmit(
    username: string,
    password: string,
    firstname: string,
    lastname: string): boolean {
      this.setState({
        ...this.state,
        registerPopupShowing: false,
      });
      console.log(`register: {${username}, ${password}, ${firstname}, ${lastname}}`);
      return true;
    }

  render() {
    return (
      <div className={style.sidebar__mobileMenu__authorizationBlock}>
        {
          this.props.isAuthorized ?
          <div className={style.sidebar__mobileMenu__authorizationBlock__nonAuthorizedBlock}>
            <div
              className={style.sidebar__btn}
              title="Sign In"
              onClick={this.showLoginPopup}>
              <div className={style.sidebar__btn__content}>
                <span className={classnames([style.sidebar__btn__content__icon, "fa", "fa-sign-in"])}></span>
                <span className={style.sidebar__btn__content__text}>Sign In</span>
              </div>
            </div>
            <div
              className={style.sidebar__btn}
              title="Sign Up"
              onClick={this.showRegisterPopup}>
              <div className={style.sidebar__btn__content}>
                <span className={classnames([style.sidebar__btn__content__icon, "fa", "fa-user-plus"])}></span>
                <span className={style.sidebar__btn__content__text}>Sign Up</span>
              </div>
            </div>
          </div>
          :
          <div className={style.sidebar__mobileMenu__authorizationBlock__authorizedBlock}>
            <div
              className={
                classnames([
                  style.sidebar__btn,
                  style.sidebar__mobileMenu__authorizationBlock__profileBtn])}>
            </div>
          </div>
        }
        {
          this.state.loginPopupShowing ?
          <LoginPopup onSubmit={this.onLoginPopupFormSubmit}
                      onRemoval={this.hideLoginPopup} />
          :
          this.state.registerPopupShowing ?
          <RegisterPopup onSubmit={this.onRegisterPopupFormSubmit}
                         onRemoval={this.hideRegisterPopup} />
          : undefined
        }
      </div>
    );
  }
}
