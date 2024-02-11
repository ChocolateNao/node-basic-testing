import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 5, b: 5, action: Action.Multiply, expected: 25 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 4, b: 2, action: 'amogus', expected: null },
  { a: 'a', b: 'b', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    "should return '$expected' when '$a $action $b'",
    (arg) => {
      const { a, b, action, expected } = arg;
      const testCase = simpleCalculator({ a, b, action });

      expect(testCase).toBe(expected);
    },
  );
});
