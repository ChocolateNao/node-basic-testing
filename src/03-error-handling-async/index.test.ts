import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('amogus')).resolves.toEqual('amogus');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testCase = () => throwError('amogus');

    expect(testCase).toThrowError('amogus');
  });

  test('should throw error with default message if message is not provided', () => {
    const testCase = () => throwError();

    expect(testCase).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const testCase = () => throwCustomError();

    expect(testCase).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
