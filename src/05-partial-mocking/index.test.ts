// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  const mock = jest.fn()
  return {
    ...originalModule,
    mockOne: mock,
    mockTwo: mock,
    mockThree: mock
  }
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    mockOne()
    mockTwo()
    mockThree()
    expect(mockOne).toHaveBeenCalled()
    expect(mockTwo).toHaveBeenCalled()
    expect(mockThree).toHaveBeenCalled()
    expect(consoleSpy).not.toHaveBeenCalled()
    consoleSpy.mockRestore()
  });

  test('unmockedFunction should log into console', () => {
    // Write your test here
    const consoleSpy = jest.spyOn(console, 'log')
    unmockedFunction()
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked')
    consoleSpy.mockRestore()

  });
});
