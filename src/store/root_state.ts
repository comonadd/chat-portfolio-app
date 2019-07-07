import { NotificationsState } from "./reducers/notifications";
import { AuthenticationState } from "./reducers/authentication";
import { UsersState } from "./reducers/users";
import { MessagesState } from "./reducers/messages";
import { ModalsState } from "./reducers/modals";

export interface RootState {
  notifications: NotificationsState;
  auth: AuthenticationState;
  users: UsersState;
  messages: MessagesState;
  modals: ModalsState;
}

export default RootState;
