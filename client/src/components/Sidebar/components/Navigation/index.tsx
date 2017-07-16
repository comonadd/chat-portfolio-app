/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';
import { push as reactRouterReduxPush } from 'react-router-redux';

import SidebarButton from '../Button';
const style = require('components/Sidebar/style');

/**
 * @summary
 * The navigation component properties.
 */
export interface NavigationProps {}

/**
 * @summary
 * The navigation component state.
 */
export interface NavigationState {}

/**
 * @summary
 * The navigation component.
 */
export default class Navigation extends React.Component<NavigationProps, NavigationState> {
  static projectGithubLink: string = 'https://github.com/wrongway4you/chat_portfolio_app';
  static items: any = [
    {
      name: 'Source Code',
      rel: false,
      url: `${Navigation.projectGithubLink}`,
      iconClass: "octicon octicon-repo",
    },
    {
      name: 'Issues',
      rel: false,
      url: `${Navigation.projectGithubLink}/issues`,
      iconClass: "octicon octicon-issue-opened",
    },
    {
      name: 'Pull Requests',
      rel: false,
      url:`${Navigation.projectGithubLink}/pulls`,
      iconClass: "octicon octicon-git-pull-request",
    },
  ];

  static state: NavigationState = {};

  render() {
    return (
      <div className={style.sidebar__mobileMenu__nav}>
        {Navigation.items.map((item: any) =>
          <SidebarButton
            key={item.name}
            title={item.name}
            name={item.name}
            iconClass={item.iconClass}
            onClick={
              item.rel ?
               () => reactRouterReduxPush(item.url) :
               () => window.location.href = item.url
            } />)}
      </div>
    );
  }
}
