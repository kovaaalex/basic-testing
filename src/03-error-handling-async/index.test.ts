// Uncomment the code below and write your tests
import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const value = 69
    await expect(resolveValue(value)).resolves.toBe(value)
  });
  test('should resolve provided value', async () => {
    const value = NaN
    await expect(resolveValue(value)).resolves.toBeNaN()
  });
});

describe('throwError', () => {
  test('should throw error with provided message', async () => {
    const message = 'Oops!'
    expect(() => throwError(message)).toThrow(message)
  });

  test('should throw error with default message if message is not provided', async () => {
    const message = 'Provide message'
    expect(() => throwError(message)).toThrow(message)
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError)
  });
});
