/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';
import {
  bindActionCreators,
} from 'redux';
import {
  connect as reactReduxConnect
} from 'react-redux';
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS,
  pathToJS,
} from 'react-redux-firebase'

import SidebarButton from 'components/Sidebar/components/Button';
import { Dispatch, RootState } from 'store/types';
import LoginPopup from './components/LoginPopup';
import RegisterPopup from './components/RegisterPopup';
import ProfilePopup from './components/ProfilePopup';
const style = require('components/Sidebar/style');

export interface OwnProps {
  showPopup: any;
}

interface ConnectProps {
  firebase: any;
  auth: any;
  authError: any;
  profile: any;
}

interface State {
  popups: {
    login: boolean,
    register: boolean,
    profile: boolean,
  };
}

class AuthorizationBlock extends React.Component<OwnProps & ConnectProps, State> {
  /**
   * @summary The initial state.
   */
  state: State = {
    popups: {
      register: false,
      login: false,
      profile: false,
    },
  };

  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args);

    // Bind member methods
    this.showPopup = this.showPopup.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.onLoginPopupFormSubmit = this.onLoginPopupFormSubmit.bind(this);
    this.onRegisterPopupFormSubmit = this.onRegisterPopupFormSubmit.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  /**
   * @summary
   * Show the popup by name.
   *
   * @return {undefined}
   */
  showPopup(name: string) {
    this.setState({
      ...this.state,
      popups: {
        ...this.state.popups,
        [name]: true,
      },
    });
  }

  hidePopup(name: string) {
    this.setState({
      ...this.state,
      popups: {
        ...this.state.popups,
        [name]: false,
      },
    });
  }

  onLoginPopupFormSubmit(
    email: string,
    password: string): boolean {
      this.hidePopup('login');
      console.log(this.props);
      this.props.firebase.login({
        email,
        password,
      });
      return true;
    }

  onRegisterPopupFormSubmit(
    username: string,
    password: string,
    email: string,
    firstname: string,
    lastname: string): boolean {
      this.hidePopup('register');
      this.props.firebase.createUser(
        {email, password},
        {username, email, firstname, lastname},
      );
      return true;
    }

  onLogout() {
    this.props.firebase.logout();
  }

  render() {
    const isAuthorized = this.props.auth && !this.props.auth.isAnonymous;

    return (
      <div className={style.sidebar__mobileMenu__authorizationBlock}>
        {
          isAuthorized ?
          <div className={style.sidebar__mobileMenu__authorizationBlock__authorizedBlock}>
            <SidebarButton
              title="Profile"
              name="Profile"
              iconClass="fa fa-user"
              onClick={() => this.showPopup('profile')} />
            <SidebarButton
              title="Logout"
              name="Logout"
              iconClass="fa fa-sign-out"
              onClick={this.onLogout} />
          </div>
          :
          <div className={style.sidebar__mobileMenu__authorizationBlock__nonAuthorizedBlock}>
            <div
              className={style.sidebar__btn}
              title="Sign In"
              onClick={() => this.showPopup('login')}>
              <div className={style.sidebar__btn__content}>
                <span className={classnames([style.sidebar__btn__content__icon, "fa", "fa-sign-in"])}></span>
                <span className={style.sidebar__btn__content__text}>Sign In</span>
              </div>
            </div>
            <div
              className={style.sidebar__btn}
              title="Sign Up"
              onClick={() => this.showPopup('register')}>
              <div className={style.sidebar__btn__content}>
                <span className={classnames([style.sidebar__btn__content__icon, "fa", "fa-user-plus"])}></span>
                <span className={style.sidebar__btn__content__text}>Sign Up</span>
              </div>
            </div>
          </div>
        }
        {
          this.state.popups.login ?
          <LoginPopup
            onSubmit={this.onLoginPopupFormSubmit}
            onRemoval={() => this.hidePopup('login')} />
          :
          this.state.popups.register ?
          <RegisterPopup
            onSubmit={this.onRegisterPopupFormSubmit}
            onRemoval={() => this.hidePopup('register')} />
          :
          this.state.popups.profile ?
          <ProfilePopup
            onRemoval={() => this.hidePopup('profile')} />
          : undefined
        }
      </div>
    );
  }
}

export default firebaseConnect()(reactReduxConnect(
  (state: RootState, ownProps: OwnProps) => ({
    authError: pathToJS(state.firebase, 'authError'),
    auth: pathToJS(state.firebase, 'auth'),
    profile: pathToJS(state.firebase, 'profile'),
  }),
  (dispatch: Dispatch) => bindActionCreators({
  }, dispatch)
)(AuthorizationBlock));
