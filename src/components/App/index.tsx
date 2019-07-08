import React from "react";
import { Switch, Route } from "react-router";
import NotificationSystem from "react-notification-system";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeNotification, fetchAllUsers } from "+/store/action";
import RootState from "+/store/root_state";
import Sidebar from "+/components/Sidebar";
import IndexScene from "+/scenes/Index";
import UnknownScene from "+/scenes/Unknown";
import ModalSystem from '+/components/ModalSystem';

import "./style.scss";

interface AppProps {
  notifications: any;
  removeNotification: typeof removeNotification;
  fetchAllUsers: any;
}

class App extends React.Component<AppProps, {}> {
  private notificationSystemRef = React.createRef();

  public componentWillReceiveProps(props: any) {
    // Display all the notifications
    props.notifications.items.map((notification: any, index: number) => {
      const notifSystem = this.notificationSystemRef
        .current as NotificationSystem.System;
      notifSystem.addNotification({
        level: notification.level,
        message: notification.text
      });
      this.props.removeNotification(index);
    });
  }

  public componentDidMount() {
    this.props.fetchAllUsers();
  }

  public render() {
    return (
      <div className="app">
        <Sidebar />
        <div className="app__main">
          <Switch>
            <Route exact path="/" component={IndexScene} />
            <Route path="*" component={UnknownScene} />
          </Switch>
        </div>
        <NotificationSystem ref={this.notificationSystemRef as any} />
        <ModalSystem />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  notifications: state.notifications
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      removeNotification,
      fetchAllUsers
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
