// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const array = [3, 2, 1]
    const list = {
      value: 3,
      next: {
        value: 2,
        next: {
          value: 1,
          next: {
            value: null,
            next: null
          }
        }
      }
    }
    expect(list).toStrictEqual(generateLinkedList(array))
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const array = [3, 2, 1]
    expect(generateLinkedList(array)).toMatchSnapshot()
  });
});
