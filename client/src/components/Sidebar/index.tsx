/**
 * @file index.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

import SidebarLogotype from './components/Logotype';
import SidebarNavigation from './components/Navigation';
import SidebarAuthorizationBlock from './components/AuthorizationBlock';
const style = require('./style');

interface SidebarState {
  mobileMenuActive: boolean;
}

/**
 * @summary
 * The sidebar component
 *
 * @return {React.Component}
 */
export default class Sidebar extends React.Component<any, SidebarState> {

  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args);

    // Initialize the state
    this.state = {
      mobileMenuActive: false,
    };

    // Bind the member methods
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
  }

  toggleMobileMenu() {
    this.setState({
      ...this.state,
      mobileMenuActive: !this.state.mobileMenuActive,
    });
  }

  render() {
    const mobileMenuContainerStyles = classnames({
      [style.sidebar__mobileMenu]: true,
      [style.sidebar__mobileMenu_active]: this.state.mobileMenuActive,
    });

    return (
      <div className={style.sidebar}>
        <SidebarLogotype />
        <div className={mobileMenuContainerStyles}>
          <SidebarNavigation />
          <SidebarAuthorizationBlock />
        </div>
        <div
          className={classnames([style.sidebar__btn, style.sidebar__mobileMenuBtn])}
          onClick={this.toggleMobileMenu}>
          <i className="fa fa-bars"></i>
        </div>
      </div>
    );
  }
}
