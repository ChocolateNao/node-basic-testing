import path from 'node:path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const timeout = 1000;
  const cb = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, timeout);
    jest.runAllTimers();

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(cb, timeout);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, 1000);

    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1001);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const interval = 1000;
  const cb = jest.fn();

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, interval);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(cb, 1000);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(interval * 3);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  beforeAll(() => {
    jest.mock('path', () => ({
      join: jest.fn(),
    }));
    jest.mock('fs', () => ({
      existsSync: jest.fn().mockReturnValue(false),
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously('amogus.ts');

    expect(joinSpy).toHaveBeenCalledWith(__dirname, 'amogus.ts');
  });

  test('should return null if file does not exist', async () => {
    const data = await readFileAsynchronously('amogus.ts');

    expect(data).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const data = await readFileAsynchronously('./index.ts');

    expect(data).toBeDefined();
  });
});
