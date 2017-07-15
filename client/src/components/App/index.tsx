/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { Switch, Route } from 'react-router';
import NotificationSystem from 'react-notification-system';
import PropTypes from 'prop-types';
import { connect as reactReduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';

import RootState from 'store/root_state';
import { State as NotificationsState, removeNotification } from 'store/ducks/notifications';
import Sidebar from 'components/Sidebar';
import IndexScene from 'scenes/Index';
import UnknownScene from 'scenes/Unknown';
const style = require('./style');

/**
 * @summary
 * The properties interface of the `App` component.
 */
interface AppProps {
  notifications: NotificationsState;
  removeNotification: typeof removeNotification;
}

/**
 * @summary
 * The state type of the `App` component.
 */
type AppState = {
};

/**
 * @summary
 * The `App` component.
 *
 * @description
 * The `App` component is the main component that is the parent
 * of all other application components.
 *
 * @return {React.Component}
 */
class App extends React.Component<AppProps, AppState> {
  state: AppState = {} as AppState;

  notificationSystem: NotificationSystem.System;

  componentWillReceiveProps(props: any) {
    /* Display all the notifications */
    props.notifications.items.map((notification: any, index: number) => {
      this.notificationSystem.addNotification({
        level: notification.level,
        message: notification.text,
      })
      this.props.removeNotification(index);
    });
  }

  render() {
    return (
      <div className={style.app}>
        <Sidebar />
        <div className={style.app__main}>
          <Switch>
            <Route exact path="/" component={IndexScene} />
            <Route path="*" component={UnknownScene} />
          </Switch>
        </div>
        <NotificationSystem ref={(ref: any) =>
          this.notificationSystem = ref} />
      </div>
    );
  }
}

export default reactReduxConnect(
  (state: RootState) => ({
    notifications: state.notifications,
  }),
  (dispatch: any) => bindActionCreators({
    removeNotification,
  }, dispatch),
)(App);
