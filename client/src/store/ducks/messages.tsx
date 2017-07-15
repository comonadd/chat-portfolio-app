/**
 * @file messages.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import { Reducer } from 'redux';

import { fbDbRef } from 'store/firebase';
import { ActionType, IAction } from 'store/action';
import { fetchUser, fetchUsers } from './users';

const fbMessagesDbRef = fbDbRef.child('messages');
const fbMessagesItemsDbRef = fbMessagesDbRef.child('items');

export type State = {
  readonly loading: boolean,
  readonly items: {},
};

export const initialState: State = {
  loading: false,
  items: {},
};

/**
 * @summary
 * The action creator that creates the "add message" action.
 *
 * @param {string} text - The text of the new message.
 *
 * @return {(dispatch: any) => void}
 */
export const addMsg = (
  author: {
    id: string;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
  },
  text: string): ((dispatch: any) => void) => {
  const date = Date.now();
  return (dispatch) => {
    const newMsgRef = fbMessagesItemsDbRef.push();
    const newMsg = {
      id: newMsgRef.key,
      authorUsername: author.username,
      text,
      date,
    };

    console.log(newMsg);

    newMsgRef.set(newMsg);
    dispatch({
      type: ActionType.ADD_MSG,
      payload: newMsg,
    });
  };
};

/**
 * @summary
 * The action creator that produces the "fetch messages" action.
 *
 * @description
 *
 *
 * @return {}
 */
export const fetchMessages = (startPostTime: number, n: number) => (dispatch) => {
  /* Enable "loading" state */
  dispatch({
    type: ActionType.ENABLE_MSGS_LOADING_STATE,
  });

  fbMessagesItemsDbRef
    .orderByChild('date')
    .startAt(startPostTime)
    .limitToFirst(n)
    .on('value', (snapshot) => {
      const val = snapshot.val();
      console.log(val);

      // Fetch the users data of all the messages
      const usersUsernames = Object.keys(val).map(key => val[key].authorUsername)
      new Promise((resolve) => resolve(dispatch(fetchUsers(usersUsernames)))).then(() => {
        dispatch({
          type: ActionType.FETCH_MESSAGES,
          payload: val || {},
        });

        /* Disable "loading" state */
        dispatch({
          type: ActionType.DISABLE_MSGS_LOADING_STATE,
        });
      });
    });
};

const reduceAddMsg = (state: any, action: IAction) => ({
  ...state,
  items: {
    ...state.items,
    [action.payload.id]: action.payload,
  },
});

const reduceFetchMessages = (state: any, action: IAction) => ({
  ...state,
  items: action.payload,
});

const reduceEnableMsgsLoadingState = (state: any) => ({
  ...state,
  loading: true,
});

const reduceDisableMsgsLoadingState = (state: any) => ({
  ...state,
  loading: false,
});

/**
 * @summary
 * The messages reducer.
 *
 * @return {State}
 */
const reducer: Reducer<State> = (state: State = initialState, action: IAction): State => {
  switch (action.type) {
    case ActionType.ADD_MSG: return reduceAddMsg(state, action);
    case ActionType.FETCH_MESSAGES: return reduceFetchMessages(state, action);
    case ActionType.ENABLE_MSGS_LOADING_STATE: return reduceEnableMsgsLoadingState(state);
    case ActionType.DISABLE_MSGS_LOADING_STATE: return reduceDisableMsgsLoadingState(state);
    default: return state;
  }
};

export default reducer;
