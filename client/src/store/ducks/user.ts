/**
 * @file user.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import { fb, fbDbRef } from 'store/firebase';
import { IAction, ActionType } from 'store/action';
import { addNotification } from './notifications';

const fbUsersDbRef = fbDbRef.child('users');
const fbUsersItemsDbRef = fbUsersDbRef.child('items');

fb.auth().onAuthStateChanged((user: {
  email: string;
  password: string;
  uid: string;
}) => {
  if (user) {
    // Login
    /* store.dispatch({
     *   type: ActionType.LOGIN,
     *   payload: {
     *     id: user.uid,
     *     username: user.email,
     *     password: user.password,
     *   }
     * });*/
  } else {
    // Logout
    /* store.dispatch({
     *   type: ActionType.LOGOUT,
     * });*/
  }
});

export type State = {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  isAuthorized: boolean;
};

export const initialState: State = {
  id: '',
  username: '',
  email: '',
  firstname: '',
  lastname: '',
  isAuthorized: false,
};

export const register = (
  username: string,
  password: string,
  email: string,
  firstname: string,
  lastname: string,
) => (dispatch: any) => {
  fb.auth().createUserWithEmailAndPassword(email, password).then((user) => {
    // Register successfull
    const newUser = {
      id: user.uid,
      username,
      password,
      email,
      firstname,
      lastname,
    };

    fbUsersItemsDbRef.once('value', (snapshot) => {
      if (!snapshot.hasChild(username)) {
        fbUsersItemsDbRef.child(username).set(newUser, (err) => {
          if (!err) {
            dispatch({
              type: ActionType.LOGIN,
              payload: newUser,
            });
            dispatch(addNotification(
              'success',
              'Successfull registration',
            ));
          } else {
            dispatch(addNotification(
              'error',
              'Failed to create new user',
            ));
          }
        });
      } else {
        // The user with such username was already registered
        dispatch(addNotification(
          'error',
          'User with this username was already registered',
        ));
      }
    });
  }).catch((err) => {
    dispatch(addNotification(
      'error',
      err.message,
    ));
  });
};

export const login = (username: string, password: string) => (dispatch: any) => {
  fbUsersItemsDbRef.child(username).on('value', (snapshot: any) => {
    const user = snapshot.val();

    if (user) {
      fb.auth().signInWithEmailAndPassword(user.email, password).then((_) => {
        // Login successfull
        dispatch({
          type: ActionType.LOGIN,
          payload: user,
        });
        dispatch(addNotification(
          'success',
          'Successfull log-in',
        ));
      }).catch((err) => {
        dispatch(addNotification(
          'error',
          err.message,
        ));
      });
    } else {
      dispatch(addNotification(
        'error',
        'Username or password is incorrect',
      ));
    }
  });
};

export const logout = () => (dispatch: any) => {
  fb.auth().signOut().then(() => {
    dispatch({
      type: ActionType.LOGOUT,
    });
    dispatch(addNotification(
      'success',
      'Successfull logout',
    ));
  }).catch((err) => {
    dispatch(addNotification(
      'error',
      err.message,
    ));
  })
};

const reduceLogin = (state: State, action: IAction) => ({
  ...action.payload,
  isAuthorized: true,
});

const reduceLogout = (state: State) => ({
  ...state,
  isAuthorized: false,
});

export default (state: State = initialState, action: IAction): State => {
  switch (action.type) {
    case ActionType.LOGIN: return reduceLogin(state, action);
    case ActionType.LOGOUT: return reduceLogout(state);
    default: return state;
  }
};
