/**
 * @file root_state.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import { State as MessagesState } from './ducks/messages';
import { State as UserState } from './ducks/user';
import { State as UsersState } from './ducks/users';
import { State as NotificationsState } from './ducks/notifications';

export type RootState = {
  messages: MessagesState,
  user: UserState,
  users: UsersState,
  notifications: NotificationsState,
};

export default RootState;
