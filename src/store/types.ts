/**
 * @file types.ts
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

import { Dispatch as ReduxDispatch } from 'redux';

import RootState from './root_state';

export { RootState } from './root_state';

export type Dispatch = ReduxDispatch<RootState>;
