/**
 * @file index.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import {
  createStore,
  combineReducers,
  compose as reduxCompose,
  applyMiddleware as reduxApplyMiddleware,
  combineReducers as reduxCombineReducers,
} from 'redux';
import reduxThunk from 'redux-thunk';
import createHashHistory from 'history/createHashHistory';
import {
  routerReducer,
  routerMiddleware as createRouterMiddleware,
} from 'react-router-redux';
import persistState, {mergePersistedState} from 'redux-localstorage';
import localStorageAdapter from 'redux-localstorage/lib/adapters/localStorage';

import RootState from './root_state';
import MessagesDuck from './ducks/messages';
import UserDuck from './ducks/user';
import UsersDuck from './ducks/users';
import NotificationsDuck from './ducks/notifications';

// Construct a store reducer
const rootReducer = reduxCompose(
  mergePersistedState()
)(
  reduxCombineReducers<RootState>({
    messages: MessagesDuck,
    user: UserDuck,
    users: UsersDuck,
    notifications: NotificationsDuck,
  })
);

// Create the history for the router
export let history = createHashHistory();

// Create the router middleware
const routerMiddleware = createRouterMiddleware(history);

const storage = reduxCompose(
)(localStorageAdapter(window.localStorage));

// Construct the store enhancer
let enhancer = reduxCompose(
  reduxApplyMiddleware(reduxThunk),
  reduxApplyMiddleware(routerMiddleware),
  persistState(storage, 'user'),
);

declare var __DEBUG__: boolean;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

// Enable the Redux devtools iff built in the debug mode
if (__DEBUG__ && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancer = reduxCompose(enhancer, window.__REDUX_DEVTOOLS_EXTENSION__());
}

// Create the store
const store = createStore(
  rootReducer,
  {} as RootState,
  enhancer,
);

// Export the store
export default store;
