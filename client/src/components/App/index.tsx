/**
 * @file index.tsx
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import React from 'react';
import { Switch, Route } from 'react-router';

import Sidebar from 'components/Sidebar';
import IndexScene from 'scenes/Index';
import UnknownScene from 'scenes/Unknown';
const style = require('./style');

export interface Props {
}

/**
 * @summary
 * The `App` component.
 *
 * @description
 * The `App` component is the main component that is the parent
 * of all other application components.
 *
 * @return {React.Component}
 */
export default (props: Props) =>
    <div className={style.app}>
        <Sidebar />
        <div className={style.app__main}>
            <Switch>
                <Route exact path="/" component={IndexScene} />
                <Route path="*" component={UnknownScene} />
            </Switch>
        </div>
    </div>;
