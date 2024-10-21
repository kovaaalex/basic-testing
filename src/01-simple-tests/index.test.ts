// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const input = { a: 3, b: 4, action: Action.Add }
    expect(simpleCalculator(input)).toBe(7)
  });

  test('should subtract two numbers', () => {
    const input = { a: 6, b: 2, action: Action.Subtract }
    expect(simpleCalculator(input)).toBe(4)
  });

  test('should multiply two numbers', () => {
    const input = { a: 5, b: 6, action: Action.Multiply }
    expect(simpleCalculator(input)).toBe(30)
  });

  test('should divide two numbers', () => {
    const input = { a: 10, b: 5, action: Action.Divide }
    expect(simpleCalculator(input)).toBe(2)
  });

  test('should exponentiate two numbers', () => {
    const input = { a: 2, b: 3, action: Action.Exponentiate }
    expect(simpleCalculator(input)).toBe(8)
  });

  test('should return null for invalid action', () => {
    const input = { a: 5, b: 3, action: 'aaaaa' }
    expect(simpleCalculator(input)).toBeNull()
  });

  test('should return null for invalid arguments', () => {
    const input = { a: 'million', b: 3, action: Action.Add }
    expect(simpleCalculator(input)).toBeNull()
  });
});
