import { combineReducers } from "redux";
import { RootState } from "+/store/root_state";
import authenticationReducer, {
  authenticationInitialState
} from "./authentication";
import notificationsReducer, {
  notificationsInitialState
} from "./notifications";
import usersReducer, { usersInitialState } from "./users";
import messagesReducer, { messagesInitialState } from "./messages";
import modalsReducer, { modalsInitialState } from "./modals";

const rootReducer = combineReducers<RootState>({
  notifications: notificationsReducer,
  auth: authenticationReducer,
  users: usersReducer,
  messages: messagesReducer,
  modals: modalsReducer
});

export const initialState = {
  notifications: notificationsInitialState,
  auth: authenticationInitialState,
  users: usersInitialState,
  messages: messagesInitialState,
  modals: modalsInitialState
};

export default rootReducer;
