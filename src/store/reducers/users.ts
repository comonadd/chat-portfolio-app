import {
  FetchUserFailAction,
  FetchUsersSucceedAction,
  FetchUserStartAction,
  FetchUserSuccessAction,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCEED,
  FETCH_USER_FAIL,
  FETCH_USER_START,
  FETCH_USER_SUCCESS
} from "+/store/action";
import { createReducer } from "+/store/helpers";
import { Action, User } from "+/store/types";

export interface UsersState {
  usersById: Record<string, User>;
  fetching: boolean;
  fetchingFailed: boolean;
  users: string[];
}

export const usersInitialState = {
  usersById: {},
  users: []
};

export default createReducer(
  {
    [FETCH_USER_START]: (state: UsersState, action: FetchUserStartAction) => {
      const { id } = action.payload;
      return {
        ...state,
        usersById: {
          ...state.usersById,
          [id]: {
            ...state.usersById[id],
            fetching: true,
            fetchingFailed: false
          }
        }
      };
    },
    [FETCH_USER_FAIL]: (state: UsersState, action: FetchUserFailAction) => {
      const { id } = action.payload;
      return {
        ...state,
        usersById: {
          ...state.usersById,
          [id]: {
            fetching: false,
            fetchingFailed: true
          }
        }
      };
    },
    [FETCH_USER_SUCCESS]: (
      state: UsersState,
      action: FetchUserSuccessAction
    ) => {
      const { id, user } = action.payload;
      return {
        ...state,
        usersById: {
          ...state.usersById,
          [id]: {
            ...[user],
            fetching: false,
            fetchingFailed: false
          }
        }
      };
    },
    [FETCH_USERS_FAIL]: (state: UsersState, action: Action) => ({
      ...state,
      fetchingFailed: true,
      fetching: false
    }),
    [FETCH_USERS_SUCCEED]: (
      state: UsersState,
      { payload }: FetchUsersSucceedAction
    ) => {
      const users = payload.users || {};
      return {
        ...state,
        usersById: users,
        users: Object.keys(users),
        fetchingFailed: false,
        fetching: false
      };
    }
  },
  usersInitialState
);
