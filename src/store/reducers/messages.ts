import { Action } from "+/store/types";
import { createReducer } from "+/store/helpers";
import {
  FETCH_MORE_MESSAGES_FAIL,
  FetchMoreMessagesStartAction,
  FETCH_MORE_MESSAGES_START,
  FetchMoreMessagesFailAction,
  FETCH_MORE_MESSAGES_SUCCEED,
  FetchMoreMessagesSucceedAction
} from "+/store/action";
import { Message } from "+/store/types";

export interface MessagesState {
  messages: string[];
  messagesById: Record<string, Message>;
  fetching: boolean;
  fetchingFailed: boolean;
  loadedAll: boolean;
}

export const messagesInitialState: MessagesState = {
  messages: [],
  messagesById: {},
  fetching: false,
  fetchingFailed: false,
  loadedAll: false
};

export default createReducer(
  {
    [FETCH_MORE_MESSAGES_START]: (
      state: MessagesState,
      action: FetchMoreMessagesStartAction
    ) => ({
      ...state,
      fetching: true,
      fetchingFailed: false
    }),
    [FETCH_MORE_MESSAGES_FAIL]: (
      state: MessagesState,
      action: FetchMoreMessagesFailAction
    ) => ({
      ...state,
      fetching: false,
      fetchingFailed: true
    }),
    [FETCH_MORE_MESSAGES_SUCCEED]: (
      state: MessagesState,
      action: FetchMoreMessagesSucceedAction
    ) => {
      const newMessages = action.payload.newMessages || {};
      return {
        ...state,
        fetching: false,
        fetchingFailed: false,
        messagesById: { ...newMessages },
        messages: Object.keys(newMessages)
      };
    }
  },
  messagesInitialState
);
