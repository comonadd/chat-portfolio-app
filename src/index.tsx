import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import history from "+/history";
import AppWrapper from "+/components/AppWrapper";
import App from "./components/App";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "+/global_styles.scss";
import "+/webkit_scrollbar.scss";

// Setup font awesome icons
library.add(fab, fas);

// Create the application container element and append it to the document body.
let appContainerElement = document.createElement("div");
appContainerElement.style.height = "100%";
appContainerElement.id = "root";
document.body.appendChild(appContainerElement);

// Render the application onto the root element
ReactDOM.render(
  <AppWrapper store={store} history={history}>
    <App />
  </AppWrapper>,
  appContainerElement
);
