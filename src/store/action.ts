/**
 * @file action.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import { Action } from 'redux';

/**
 * @summary
 * The types of the possible actions.
 */
export const ActionType = {
  ADD_MSG: 'ADD_MSG',
  FETCH_MESSAGES: 'FETCH_MESSAGES',
  ENABLE_MSGS_LOADING_STATE: 'ENABLE_MSGS_LOADING_STATE',
  DISABLE_MSGS_LOADING_STATE: 'DISABLE_MSGS_LOADING_STATE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  FETCH_USER: 'FETCH_USER',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
};

/**
 * @summary
 * The action type.
 */
export interface IAction extends Action {
  type: string;
  payload: any;
};
