/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

const sourceCodeNavItemIcon = require('img/source_code_nav_item.png');
const githubIssuesNavItemIcon = require('img/github_issues_nav_item.png');
const githubPullRequestNavItemIcon = require('img/github_pull_request_nav_item.png');
const style = require('components/Sidebar/style');

interface NavigationItemProps {
  name: string;
  iconClass: string;
}

const NavigationItem = (props: NavigationItemProps) =>
  <div className={style.sidebar__btn__content}>
    <span className={classnames([style.sidebar__btn__content__icon, props.iconClass])}></span>
    <span className={style.sidebar__btn__content__text}>
      {props.name}
    </span>
  </div>;

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
      url: `${Navigation.projectGithubLink}`,
      innerElem: <NavigationItem name="Source Code" iconClass="octicon octicon-repo" />,
    },
    {
      name: 'Issues',
      url: `${Navigation.projectGithubLink}/issues`,
      innerElem: <NavigationItem name="Issues" iconClass="octicon octicon-issue-opened" />,
    },
    {
      name: 'Pull Requests',
      url:`${Navigation.projectGithubLink}/pulls`,
      innerElem: <NavigationItem name="Pull Requests" iconClass="octicon octicon-git-pull-request" />,
    },
  ];

  constructor(...args: any[]) {
    // Call the parent class constructor
    super(...args);

    // Initialize the state
    this.state = {};
  }

  render() {
    return (
      <div className={style.sidebar__mobileMenu__nav}>
        {Navigation.items.map((item: any) =>
          <div
            key={item.name}
            title={item.name}
            className={style.sidebar__btn}>
            <a href={item.url}>
              {item.innerElem}
            </a>
          </div>)}
      </div>
    );
  }
}
