import firebase, {
  firebaseCreateUser,
  FirebaseCreateUserInfo,
  firebaseFetchAllUsers,
  firebaseLogout
} from "+/firebase";
import {
  getAmountOfMessagesLoaded,
  getCurrentUserID,
  isAuthenticated,
  isFinishedLoadingMessages
} from "+/store/selectors";
import { Action, Message, User } from "+/store/types";
import { getCurrentTime } from "+/util";
import { AMOUNT_OF_MESSAGES_TO_LOAD } from "+/util/constants";
import { Dispatch } from "redux";

/////////////////////////////////
// Notifications
/////////////////////////////////

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export interface AddNotificationAction extends Action {
  payload: { level: number; text: string };
}
export const addNotification = (level: string, text: string): Action => ({
  type: ADD_NOTIFICATION,
  payload: {
    level,
    text
  }
});

export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";
export interface RemoveNotificationAction extends Action {
  payload: { index: number };
}
export const removeNotification = (index: number): Action => ({
  type: REMOVE_NOTIFICATION,
  payload: {
    index
  }
});

/////////////////////////////////
// Users
/////////////////////////////////

export interface FetchUserStartAction extends Action {
  payload: { id: string };
}
export const FETCH_USER_START = "FETCH_USER_SUCCESS";
const fetchUserStart = (id: string) => ({
  type: FETCH_USER_START,
  payload: { id }
});

export interface FetchUserFailAction extends Action {
  payload: { id: string };
}
export const FETCH_USER_FAIL = "FETCH_USER_FAIL";
const fetchUserFail = (id: string) => ({
  type: FETCH_USER_FAIL,
  payload: { id }
});

export interface FetchUserSuccessAction extends Action {
  payload: { id: string; user: Partial<User> };
}
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const fetchUserSuccess = (user: Partial<User>) => ({
  type: FETCH_USER_SUCCESS,
  payload: { id: user.id, user }
});

export const fetchUser = (id: string) => (
  dispatch: Dispatch,
  getState: any
) => {
  dispatch(fetchUserStart(id));
  firebase
    .database()
    .ref(`/users/${id}`)
    .on(
      "value",
      (snapshot: any) => {
        const user = snapshot.val();
        fetchUserSuccess(user);
      },
      (error: Error) => {
        fetchUserFail(id);
        console.log(error);
      }
    );
};

export interface FetchUsersSucceedAction extends Action {
  payload: { users: Record<string, Partial<User>> };
}
export const FETCH_USERS_SUCCEED = "FETCH_USERS_SUCCEED";
export const fetchUsersSucceed = (
  users: Record<string, Partial<User>>
): FetchUsersSucceedAction => ({
  type: FETCH_USERS_SUCCEED,
  payload: { users }
});

export const FETCH_USERS_FAIL = "FETCH_USERS_FAIL";
export const fetchUsersFail = () => ({
  type: FETCH_USERS_FAIL
});

export const fetchAllUsers = () => (dispatch: Dispatch, getState: any) => {
  return firebaseFetchAllUsers()
    .then((users: any) => {
      dispatch(fetchUsersSucceed(users));
    })
    .catch((err: Error) => {
      console.error(err);
      dispatch(fetchUsersFail());
    });
};

export const createFirebaseUser = (newUserInfo: FirebaseCreateUserInfo) => (
  dispatch: Dispatch,
  getState: any
) => {
  if (isAuthenticated(getState())) {
    console.error("can't create new users when authenticated");
    return;
  }

  firebaseCreateUser(newUserInfo)
    .then(() => {
      dispatch(addNotification("success", "Successfull registration"));
    })
    .catch((err: any) => {
      dispatch(addNotification("error", err.message));
    });
};

/////////////////////////////////
// Messages
/////////////////////////////////

export const ADD_MSG_START = "ADD_MSG_START";
export const addMessageStart = (text: string) => ({
  type: ADD_MSG_START,
  payload: { text }
});

export const ADD_MSG_SUCCESS = "ADD_MSG_SUCCESS";
export const addMessageSuccess = () => ({ type: ADD_MSG_SUCCESS });

export const ADD_MSG_FAIL = "ADD_MSG_FAIL";
export const addMessageFail = () => ({ type: ADD_MSG_FAIL });

export const addMessage = (text: string) => (
  dispatch: Dispatch,
  getState: any
) => {
  dispatch(addMessageStart(text));
  firebase
    .database()
    .ref("messages")
    .push()
    .set({
      text,
      date: getCurrentTime(),
      authorID: getCurrentUserID(getState())
    });
};

export interface FetchMoreMessagesStartAction extends Action {}
export const FETCH_MORE_MESSAGES_START = "FETCH_MORE_MESSAGES_START";
export const fetchMoreMessagesStart = () => ({
  type: FETCH_MORE_MESSAGES_START
});

export interface FetchMoreMessagesFailAction extends Action {}
export const FETCH_MORE_MESSAGES_FAIL = "FETCH_MORE_MESSAGES_FAIL";
export const fetchMoreMessagesFail = () => ({
  type: FETCH_MORE_MESSAGES_FAIL
});

export interface FetchMoreMessagesSucceedAction extends Action {
  payload: { newMessages: Record<string, Message> };
}
export const FETCH_MORE_MESSAGES_SUCCEED = "FETCH_MORE_MESSAGES_SUCCEED";
export const fetchMoreMessagesSucceed = (
  newMessages: Record<string, Message>
) => ({
  type: FETCH_MORE_MESSAGES_SUCCEED,
  payload: { newMessages }
});

export const fetchMoreMessages = () => (dispatch: Dispatch, getState: any) => {
  if (isFinishedLoadingMessages(getState())) {
    console.log(
      "finished loadidng messages, skipping fetchMoreMessages() call"
    );
    return;
  }

  const amountOfMsgsToLoad =
    getAmountOfMessagesLoaded(getState()) + AMOUNT_OF_MESSAGES_TO_LOAD;

  return firebase
    .database()
    .ref("messages")
    .orderByKey()
    .limitToLast(amountOfMsgsToLoad)
    .once(
      "value",
      (snapshot: any) => {
        const newMessages: Record<string, Message> = snapshot.val() as any;
        dispatch(fetchMoreMessagesSucceed(newMessages));
      },
      (error: Error) => {
        console.error(error);
        dispatch(fetchMoreMessagesFail());
      }
    );
};

/////////////////////////////////
// Authentication
/////////////////////////////////

export const START_SIGN_IN = "start_SIGN_IN";
export interface StartSignInAction extends Action {}
export const startSignIn = () => ({
  type: START_SIGN_IN
});

export const FINISH_SIGN_IN = "FINISH_SIGN_IN";
export interface FinishSignInAction extends Action {
  payload: { user: User };
}
export const finishSignIn = (user: any) => ({
  type: FINISH_SIGN_IN,
  payload: { user }
});

export const signIn = (email: string, password: string) => (
  dispatch: Dispatch,
  getState: any
) => {
  dispatch(startSignIn());
  return new Promise((resolve: any, reject: any) => {
    if (isAuthenticated(getState())) {
      reject(new Error("Already authenticated"));
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(resolve)
      .catch(reject);
  });
};

export const FINISH_LOGOUT = "LOGOUT";
export interface FinishLogoutAction extends Action {}
export const finishLogout = () => ({
  type: FINISH_LOGOUT
});

export const logout = () => (dispatch: Dispatch, getState: any) => {
  return new Promise((resolve: any, reject: any) => {
    if (!isAuthenticated(getState())) {
      reject(new Error("Not authenticated"));
    }
    return firebaseLogout()
      .then(resolve)
      .catch(reject);
  });
};

/////////////////////////////////
// Modals
/////////////////////////////////

export const SHOW_MODAL = "SHOW_MODAL";
export interface ShowModalAction extends Action {
  payload: { id: string };
}
export const showModal = (id: string) => ({
  type: SHOW_MODAL,
  payload: { id }
});

export const HIDE_MODAL = "HIDE_MODAL";
export interface HideModalAction extends Action {
  payload: { id: string };
}
export const hideModal = (id: string) => ({
  type: HIDE_MODAL,
  payload: { id }
});

export const HIDE_ALL_MODALS = "HIDE_ALL_MODALS";
export interface HideAllModalsAction extends Action {}
export const hideAllModals = () => ({
  type: HIDE_ALL_MODALS
});
