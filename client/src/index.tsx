/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';

import store, { history as storeHistory } from './store';
import AppWrapper from './components/AppWrapper';
import App from './components/App';

// Create the application container element and append it to the document body.
let appContainerElement = document.createElement('div');
appContainerElement.style.height = '100%';
appContainerElement.id = 'root';
document.body.appendChild(appContainerElement);

// Render the application onto the root element
ReactDOM.render(
  <AppWrapper store={store} history={storeHistory}>
    <App />
  </AppWrapper>,
  appContainerElement
);
