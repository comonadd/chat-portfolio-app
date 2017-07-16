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
import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

import RootState from './root_state';
import NotificationsDuck from './ducks/notifications';

// Construct a store reducer
const rootReducer = reduxCompose(
  mergePersistedState()
)(
  reduxCombineReducers<RootState>({
    firebase: firebaseStateReducer,
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


/**
 * @summary
 * The Firebase configuration object.
 */
const firebaseConfig = {
  apiKey: "AIzaSyC0YpGGTT3hBK6nTFIy0OhL4DF_Ucpe8Jw",
  authDomain: "chat-portfolio-app.firebaseapp.com",
  databaseURL: "https://chat-portfolio-app.firebaseio.com",
  projectId: "chat-portfolio-app",
  storageBucket: "chat-portfolio-app.appspot.com",
  messagingSenderId: "957903827137"
};

// Create the store
export default reduxCompose(
  reactReduxFirebase(firebaseConfig, {
    userProfile: 'users',
    enableLogging: __DEBUG__,
    profileFactory: (userData: any) => ({
      email: userData.email,
      username: userData.username,
      firstname: userData.firstname,
      lastname: userData.lastname,
    }),
  }))(createStore)(
    rootReducer,
    {} as RootState,
    enhancer,
  );
