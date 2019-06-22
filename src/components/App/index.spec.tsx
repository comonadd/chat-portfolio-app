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
import App from '.';
import Header from 'components/Header';
import Footer from 'components/Footer';

describe('`App` component', () => {
  it('is initialized without any errors', () => {
    expect(() => enzymeMount(
      <AppWrapper store={store} history={storeHistory}>
        <App />
      </AppWrapper>)).to.not.throw();
  });

  it('renders one <Header /> component', () => {
    const wrapper = enzymeMount(
      <AppWrapper store={store} history={storeHistory}>
        <App />
      </AppWrapper>);
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('renders one <Footer /> component', () => {
    const wrapper = enzymeMount(
      <AppWrapper store={store} history={storeHistory}>
        <App />
      </AppWrapper>);
    expect(wrapper.find(Footer)).to.have.length(1);
  });
});
