import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  let linkedList: object;
  const elements = [10, 20, 30, false];

  beforeEach(() => {
    linkedList = generateLinkedList(elements);
  });

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(linkedList).toStrictEqual({
      value: 10,
      next: {
        value: 20,
        next: {
          value: 30,
          next: {
            value: false,
            next: { value: null, next: null },
          },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(linkedList).toMatchSnapshot();
  });
});
