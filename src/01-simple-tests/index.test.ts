import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const testCase = simpleCalculator({ a: 4, b: 6, action: Action.Add });

    expect(testCase).toBe(10);
  });

  test('should subtract two numbers', () => {
    const testCase = simpleCalculator({ a: 3, b: 4, action: Action.Subtract });

    expect(testCase).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const testCase = simpleCalculator({ a: 2, b: 2, action: Action.Multiply });

    expect(testCase).toBe(4);
  });

  test('should divide two numbers', () => {
    const testCase = simpleCalculator({ a: 6, b: 2, action: Action.Divide });

    expect(testCase).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const testCase = simpleCalculator({
      a: 4,
      b: 2,
      action: Action.Exponentiate,
    });

    expect(testCase).toBe(16);
  });

  test('should return null for invalid action', () => {
    const testCase = simpleCalculator({ a: 2, b: 2, action: 'amogus' });

    expect(testCase).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const testCase = simpleCalculator({ a: 'a', b: 'b', action: Action.Add });

    expect(testCase).toBeNull();
  });
});
