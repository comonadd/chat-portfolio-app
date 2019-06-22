/**
 * @file index.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import classnames from 'classnames';

import SidebarLogotype from './components/Logotype';
import SidebarNavigation from './components/Navigation';
const style = require('./style');

interface Props {}
interface State {}

/**
 * @summary
 * The sidebar component
 *
 * @return {React.Component}
 */
export default class Sidebar extends React.Component<Props, State> {
  render() {
    return (
      <div className={style.sidebar}>
        <SidebarLogotype />
        <SidebarNavigation />
      </div>
    );
  }
}
