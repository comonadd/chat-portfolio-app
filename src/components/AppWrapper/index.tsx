/**
 * @file AppWrapper.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import Redux from 'redux';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

export interface Props {
    store: Redux.Store<any>;
    history: object;
    children: React.ReactNode;
}

/**
 * @summary
 * The `AppWrapper` component.
 *
 * @description
 * The component that wraps the application and provides
 * context that it needs to work.
 *
 * @return {React.Component}
 */
export default (props: Props) =>
    <Provider store={props.store}>
        <HashRouter>
            {props.children}
        </HashRouter>
    </Provider>;
