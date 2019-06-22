/* File: index.js */
/* Creation date: 2017-06-18 */
/* Creator: Dmitry Guzeev <dmitry.guzeev@yahoo.com> */
/* Description: */
/* Tests for the `Loader` component */

import React from 'react';
import {assert, expect} from 'chai';
import {mount as enzymeMount} from 'enzyme';

import Loader from '.';

describe('`Loader` component', () => {
  it('initializes without errors', () => {
    expect(() => enzymeMount(<Loader />)).to.not.throw();
  });
});
