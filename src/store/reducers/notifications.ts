import { Action } from "+/store/types";
import { createReducer } from "+/store/helpers";
import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
  RemoveNotificationAction,
  AddNotificationAction
} from "+/store/action";

export interface NotificationsState {
  items: {
    level: string;
    text: string;
  }[];
}

export const notificationsInitialState = {
  items: []
};

export default createReducer(
  {
    [ADD_NOTIFICATION]: (
      state: NotificationsState,
      action: AddNotificationAction
    ) => ({
      ...state,
      items: [
        ...state.items,
        ...[
          {
            level: action.payload.level,
            text: action.payload.text
          }
        ]
      ]
    }),
    [REMOVE_NOTIFICATION]: (
      state: NotificationsState,
      action: RemoveNotificationAction
    ) => ({
      ...state,
      items: state.items.filter(
        (_: any, index: number) => index != action.payload.index
      )
    })
  },
  notificationsInitialState
);
