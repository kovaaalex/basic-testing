// Uncomment the code below and write your tests
import {  simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 3, b: 4, action: Action.Add, expected: 7 },
    { a: 6, b: 2, action: Action.Subtract, expected: 4 },
    { a: 5, b: 6, action: Action.Multiply, expected: 30 },
    { a: 10, b: 5, action: Action.Divide, expected: 2 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 5, b: 3, action: 'aaaaa', expected: null },
    { a: 'million', b: 3, action: Action.Add, expected: null }
];

describe('simpleCalculator', (): void => {
  test.each(testCases)(
    '$a $action $b should be $expected',
    ({ a, b, action, expected}): void => {
      const input = { a, b, action }
      expect(simpleCalculator(input)).toBe(expected)
    })
});
