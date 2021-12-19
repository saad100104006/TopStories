import { expect, test } from '@jest/globals';
import { capitalize } from '~/utils/utils';

test('to capitalize method test', () => {
  expect.assertions(1);

  expect(capitalize('hello World')).toEqual('Hello World');
});
