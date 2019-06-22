/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';

type NotificationDisplayerProps = {
  notifications: NotificationsState,
};

type NotificationDisplayerState = {};

class NotificationDisplayer extends React.Component<NotificationDisplayerProps, NotificationDisplayerState> {
  /**
   * @summary The initial state.
   */
  state: NotificationDisplayerState = {};

  render() {
    /* Display all the notifications */
    this.props.notifications.map(this.context.addNotification);

    return (
      <div>
      </div>
    );
  }
}
