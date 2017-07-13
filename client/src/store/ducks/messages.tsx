/**
 * @file messages.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import initialState from '../initial_state';
import { fbMessagesItemsDbRef } from './firebase';

const actionTypes = {
  ADD_MSG: 'ADD_MSG',
  FETCH_MESSAGES: 'FETCH_MESSAGES',
};

export type Action = {
  type: actionTypes.ADD_MSG,
  text: string,
} | {
  type: actionTypes.FETCH_MESSAGES,
  startAt: number,
};

export const addMsg = (text: string): Action => {
  const date = Date.now();
  return (dispatch) => {
    const newMsgRef = fbMessagesItemsDbRef.push();
    const newMsg = {
      id: newMsgRef,
      text,
      date,
    };
    newMsgRef.set(newMsg);
    dispatch({
      type: actionTypes.ADD_MSG,
      payload: newMsg,
    });
  };
};

export const fetchMessages = (startPostTime: number, n: number): Action => {
  /* Enable "loading" state */
  dispatch({
    type: actionTypes.ENABLE_MSGS_LOADING_STATE,
  });

  return (dispatch) => {
    fbMsgsItemsDbRef
      .orderByChild('date')
      .startAt(startPostTime)
      .limitToFirst(n)
      .on('value', (snapshot) => {
        dispatch({
          type: actionTypes.FETCH_MSGS,
          payload: snapshot,
        });

        /* Disable "loading" state */
        dispatch({
          type: actionTypes.DISABLE_MSGS_LOADING_STATE,
        });
      });
  };
};
