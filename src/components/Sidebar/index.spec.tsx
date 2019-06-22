/**
 * @file spec.js
 * @author Dmitry Guzeev <dmitry.guzeev@yahoo.com>
 */

'use strict';

import React from 'react';
import { assert, expect } from 'chai';
import { mount as enzymeMount } from 'enzyme';

import store, { history as storeHistory } from 'store';
import AppWrapper from 'components/AppWrapper';
import Header from '.';

describe('`Header` component', () => {
  it('initializes without errors', () => {
    expect(() => enzymeMount(
      <AppWrapper store={store} history={storeHistory}>
        <Header />
      </AppWrapper>)).to.not.throw();
  });
});
