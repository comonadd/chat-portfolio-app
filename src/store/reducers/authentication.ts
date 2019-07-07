import { Action } from "+/store/types";
import { createReducer } from "+/store/helpers";
import { User } from "+/store/types";
import {
  FINISH_SIGN_IN,
  FINISH_LOGOUT,
  FinishLogoutAction,
  FinishSignInAction,
  START_SIGN_IN,
  StartSignInAction
} from "+/store/action";
import { UNKNOWN_USER } from "+/util/constants";

export interface AuthenticationState {
  user: User;
  authenticated: boolean;
  inProcessOfAuthentication: boolean;
}

export const authenticationInitialState = {
  user: UNKNOWN_USER,
  authenticated: false,
  inProcessOfAuthentication: false
};

export default createReducer(
  {
    [START_SIGN_IN]: (
      state: AuthenticationState,
      action: StartSignInAction
    ) => ({
      ...state,
      inProcessOfAuthentication: true,
      authenticated: false
    }),
    [FINISH_SIGN_IN]: (
      state: AuthenticationState,
      action: FinishSignInAction
    ) => ({
      ...state,
      user: action.payload.user,
      inProcessOfAuthentication: false,
      authenticated: true
    }),
    [FINISH_LOGOUT]: (
      state: AuthenticationState,
      action: FinishLogoutAction
    ) => ({
      ...state,
      user: UNKNOWN_USER,
      authenticated: false
    })
  },
  authenticationInitialState
);
