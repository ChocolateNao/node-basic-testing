import axios, { Axios } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const url = 'posts/100';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');

    throttledGetDataFromApi(url);
    jest.runAllTimers();

    expect(createSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });

    createSpy.mockRestore();
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest
      .spyOn(Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: {} }));

    throttledGetDataFromApi(url);
    jest.runAllTimers();

    expect(getSpy).toBeCalledWith(url);

    getSpy.mockRestore();
  });

  test('should return response data', async () => {
    const getSpy = jest
      .spyOn(Axios.prototype, 'get')
      .mockImplementation(async () => ({
        data: {
          id: 100,
        },
      }));

    expect(throttledGetDataFromApi(url)).resolves.toMatchObject({ id: 100 });

    getSpy.mockRestore();
  });
});
