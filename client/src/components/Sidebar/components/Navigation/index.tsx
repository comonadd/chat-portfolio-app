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
import { push as reactRouterReduxPush } from 'react-router-redux';

import { addNotification } from 'store/ducks/notifications';
import { Dispatch, RootState } from 'store/types';
import NavigationItem from './components/Item';
import LoginPopup from './components/LoginPopup';
import RegisterPopup from './components/RegisterPopup';
import ProfilePopup from './components/ProfilePopup';
const style = require('../../style');

export interface OwnProps {
  active: boolean;
}

interface ConnectedProps {
  firebase: any;
  auth: any;
  authError: any;
  profile: any;
  addNotification: typeof addNotification,
  reactRouterReduxPush: typeof reactRouterReduxPush,
}

/**
 * @summary
 * The navigation component state inteface.
 */
interface State {
  popups: {
    login: boolean,
    register: boolean,
    profile: boolean,
  };
  active: boolean;
}

/**
 * @summary
 * The navigation component.
 */
class Navigation extends React.Component<OwnProps & ConnectedProps, State> {
  static projectGithubLink: string = 'https://github.com/wrongway4you/chat_portfolio_app';

  /**
   * @summary The initial state.
   */
  state: State = {
    popups: {
      register: false,
      login: false,
      profile: false,
    },
    active: false,
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
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.hideMobileMenu = this.hideMobileMenu.bind(this);
  }

  /**
   * @summary
   * Show the popup with a given name.
   *
   * @return {undefined}
   */
  showPopup(name: string) {
    this.setState({
      ...this.state,
      active: false,
      popups: {
        ...this.state.popups,
        [name]: true,
      },
    });
    return true;
  }

  /**
   * @summary
   * Hide the popup with a given name.
   *
   * @return {undefined}
   */
  hidePopup(name: string) {
    this.setState({
      ...this.state,
      popups: {
        ...this.state.popups,
        [name]: false,
      },
    });
  }

  onLoginPopupFormSubmit(email: string, password: string) {
    this.hidePopup('login');
    this.props.firebase.login({
      email,
      password,
    }).then(() => {
      this.props.firebase.update();
      this.props.addNotification('success', 'Successfull log-in');
    }).catch((err) => {
      this.props.addNotification('error', err.message);
    });
  }

  onRegisterPopupFormSubmit(
    username: string, password: string,
    email: string, firstname: string,
    lastname: string) {
    this.hidePopup('register');
    this.props.firebase.createUser(
      {email, password},
      {username, email, firstname, lastname},
    ).then(() => {
      this.props.firebase.update();
      this.props.addNotification('success', 'Successfull registration');
    }).catch((err) => {
      this.props.addNotification('error', err.message);
    });
  }

  onLogout() {
    this.props.firebase.logout();
    this.props.reactRouterReduxPush('/');
  }

  toggleMobileMenu() {
    this.setState({
      ...this.state,
      active: !this.state.active,
    });
  }

  hideMobileMenu() {
    this.setState({
      ...this.state,
      active: false,
    });
  }

  render() {
    const isAuthorized = this.props.auth && !this.props.auth.isAnonymous;

    const items: any = [
      {
        name: 'Source Code',
        iconClass: 'octicon octicon-repo',
        onClick: () => {
          this.hideMobileMenu();
          window.location.href = Navigation.projectGithubLink;
        },
      },
      {
        name: 'Issues',
        iconClass: 'octicon octicon-issue-opened',
        onClick: () => {
          this.hideMobileMenu();
          window.location.href = `${Navigation.projectGithubLink}/issues`;
        },
      },
      {
        name: 'Pull Requests',
        rel: false,
        url:`${Navigation.projectGithubLink}/pulls`,
        iconClass: 'octicon octicon-git-pull-request',
        onClick: () => {
          this.hideMobileMenu();
          window.location.href = `${Navigation.projectGithubLink}/pulls`;
        },
      },
      ...(isAuthorized ? [
        {
          name: 'Profile',
          iconClass: 'fa fa-user',
          onClick: () => this.showPopup('profile'),
        },
        {
          name: 'Logout',
          iconClass: 'fa fa-sign-out',
          onClick: () => {
            this.hideMobileMenu();
            this.onLogout();
          },
        },
      ] : [
        {
          name: 'Sign In',
          iconClass: 'fa fa-sign-in',
          onClick: () => this.showPopup('login'),
        },
        {
          name: 'Sign Up',
          iconClass: 'fa fa-user-plus',
          onClick: () => this.showPopup('register'),
        },
      ]),
    ];

    const renderedItems = items.map((item: any) =>
      <NavigationItem
        key={item.name}
        name={item.name}
        iconClass={item.iconClass}
        onClick={item.onClick} />);

    const popup =
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
      : undefined;

    return (
      <div className={style.sidebar__nav}>
        <div className={classnames({
            [style.sidebar__nav__items]: true,
            [style.sidebar__nav__items_active]: this.state.active,
        })}>
          {renderedItems}
        </div>
        <div
          className={classnames([style.sidebar__btn, style.sidebar__nav__mobileMenuBtn])}
          onClick={this.toggleMobileMenu}>
          <i className="fa fa-bars"></i>
        </div>
        <div className={style.sidebar__nav__popup}>
          {popup}
        </div>
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
    addNotification,
    reactRouterReduxPush,
  }, dispatch)
)(Navigation));
