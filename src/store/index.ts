import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
import constants from "+/util/constants";
import { initialState } from "./reducers";
import { savePersistedState } from "./helpers";
import firebase from "../firebase";
import { finishSignIn, finishLogout } from "+/store/action";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const store = (() => {
  const loggerMiddleware = createLogger();

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );
  return createStore(rootReducer, initialState, enhancer);
})();

// Subscribe for store changes
// for local storage sync
store.subscribe(() => savePersistedState(store));

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch(finishSignIn(user));
  } else {
    store.dispatch(finishLogout());
  }
});

export default store;
