/**
 * @file notifications.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import { IAction, ActionType } from 'store/action';

export type State = {
  items: {
    level: string,
    text: string,
  }[],
};

export const initialState = {
  items: [],
};

export const addNotification = (level: string, text: string): IAction => ({
  type: ActionType.ADD_NOTIFICATION,
  payload: {
    level,
    text,
  },
});

export const removeNotification = (index: number): IAction => ({
  type: ActionType.REMOVE_NOTIFICATION,
  payload: {
    index,
  },
});

const reduceAddNotification = (state, action) => ({
  ...state,
  items: state.items.concat([action.payload]),
});

const reduceRemoveNotification = (state, action) => ({
  ...state,
  items: state.items.filter((_: any, index: number) => index != action.payload.index),
});

/**
 * @summary The reducer.
 *
 * @return {State}
 */
export default (state: State = initialState, action: IAction): State => {
  switch (action.type) {
    case ActionType.ADD_NOTIFICATION: return reduceAddNotification(state, action);
    case ActionType.REMOVE_NOTIFICATION: return reduceRemoveNotification(state, action);
    default: return state;
  }
};
