/**
 * @file root_state.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import { State as NotificationsState } from './ducks/notifications';

export type RootState = {
  notifications: NotificationsState,
  firebase: any,
};

export default RootState;
