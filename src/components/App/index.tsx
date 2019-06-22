import React from "react";
import { Switch, Route } from "react-router";
import NotificationSystem from "react-notification-system";
import PropTypes from "prop-types";
import { connect as reactReduxConnect } from "react-redux";
import { bindActionCreators } from "redux";
import RootState from "store/root_state";
import {
  State as NotificationsState,
  removeNotification
} from "store/ducks/notifications";
import Sidebar from "components/Sidebar";
import IndexScene from "scenes/Index";
import UnknownScene from "scenes/Unknown";
import style from "./style.scss";

interface AppProps {
  notifications: NotificationsState;
  removeNotification: typeof removeNotification;
}

type AppState = {};

class App extends React.Component<AppProps, AppState> {
  state: AppState = {} as AppState;

  notificationSystem: NotificationSystem.System;

  componentWillReceiveProps(props: any) {
    /* Display all the notifications */
    props.notifications.items.map((notification: any, index: number) => {
      this.notificationSystem.addNotification({
        level: notification.level,
        message: notification.text
      });
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
        <NotificationSystem
          ref={(ref: any) => (this.notificationSystem = ref)}
        />
      </div>
    );
  }
}

export default reactReduxConnect(
  (state: RootState) => ({
    notifications: state.notifications
  }),
  (dispatch: any) =>
    bindActionCreators(
      {
        removeNotification
      },
      dispatch
    )
)(App);
