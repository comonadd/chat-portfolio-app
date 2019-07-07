import { createSelector } from "reselect";
import RootState from "+/store/root_state";
import { User } from "+/store/types";
import messages, { MessagesState } from "+/store/reducers/messages";
import { UsersState } from "+/store/reducers/users";
import { AuthenticationState } from "./reducers/authentication";
import { create } from "domain";
import { ModalSystem } from "+/components/ModalSystem";
import { ModalsState } from "./reducers/modals";

/////////////////////////////////
// Authentication
/////////////////////////////////

const getAuth = (state: RootState) => state.auth;

export const getCurrentUser = createSelector(
  [getAuth],
  (auth: AuthenticationState) => auth.user
);

export const getCurrentUserID = createSelector(
  [getCurrentUser],
  (currentUser?: User) => (currentUser ? currentUser.id : null)
);

export const isAuthenticated = createSelector(
  getAuth,
  (auth: AuthenticationState) => auth.authenticated
);

export const isCurrentUserGuest = createSelector(
  isAuthenticated,
  (authenticated: boolean) => !authenticated
);

export const isAuthInProgress = createSelector(
  getAuth,
  (auth: AuthenticationState) => auth.inProcessOfAuthentication
);

/////////////////////////////////
// Messages
/////////////////////////////////

const getMessages = (state: RootState) => state.messages;

export const getAmountOfMessagesLoaded = createSelector(
  getMessages,
  (messages: MessagesState) => messages.messages.length
);

export const isFinishedLoadingMessages = createSelector(
  getMessages,
  (messages: MessagesState) => messages.loadedAll
);

export const isMessagesLoading = createSelector(
  getMessages,
  (messages: MessagesState) => messages.fetching
);

export const getMessagesSortedByDate = createSelector(
  getMessages,
  (messages: MessagesState) =>
    Object.keys(messages.messagesById)
      .sort()
      .map((id: string) => messages.messagesById[id])
);

/////////////////////////////////
// Users
/////////////////////////////////

const getUsers = (state: RootState) => state.users;

export const getUsersById = createSelector(
  getUsers,
  (users: UsersState) => users.usersById
);

const getModals = (state: RootState) => state.modals;
export const getModalSystemInfo = createSelector(
  getModals,
  (modals: ModalsState) => modals.modals
);

export const isLoadingUsers = createSelector(
  getUsers,
  (users: UsersState) => users.fetching
);
