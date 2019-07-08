import React from "react";
import Redux from "redux";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

export interface Props {
  store: Redux.Store<any>;
  history: object;
  children: React.ReactNode;
}

export default (props: Props) => (
  <Provider store={props.store}>
    <HashRouter>{props.children}</HashRouter>
  </Provider>
);
