/**
 * @file users.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import { fb, fbDbRef } from 'store/firebase';
import { IAction, ActionType } from 'store/action';

const fbUsersDbRef = fbDbRef.child('users');
const fbUsersItemsDbRef = fbUsersDbRef.child('items');

export type State = {
  items: {},
};

export const initialState = {
  items: {},
};

export const fetchUser = (username: string) => (dispatch: any) => {
  return new Promise((resolve: any) =>
    fbUsersItemsDbRef.child(username).on('value', (snapshot) => {
      resolve(dispatch({
        type: ActionType.FETCH_USER,
        payload: snapshot.val() || {},
      }));
    }));
};

export const fetchUsers = (usernames: string[]) => (dispatch: any) =>
  new Promise((rootResolve: (...args: any[]) => void) => {
    if (usernames.length == 0) return rootResolve();

    let promise: any = new Promise((resolve) =>
      resolve(dispatch(fetchUser(usernames[0]))));

    if (usernames.length == 1) promise = promise.then(rootResolve);

    for (let i = 1; i < usernames.length; i++) {
      promise = (i == (usernames.length - 1)) ?
                promise.then(() => dispatch(fetchUser(usernames[i]))).then(rootResolve) :
                promise.then(() => dispatch(fetchUser(usernames[i])));
    }
  });

const reduceFetchUser = (state: State, action: IAction) => ({
  ...state,
  items: {
    ...state.items,
    [action.payload.username]: action.payload,
  },
});

export default (state: State = initialState, action: IAction): State => {
  switch (action.type) {
    case ActionType.FETCH_USER: return reduceFetchUser(state, action);
    default: return state;
  }
};
