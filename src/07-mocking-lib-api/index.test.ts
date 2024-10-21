// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios')
describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })
  afterAll(() => {
    jest.useRealTimers()
  })
  const path= './todos/1';
  const data = 'data';
  test('should create instance with provided base url', async () => {
    const url = { baseURL: 'https://jsonplaceholder.typicode.com' }
    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockReturnValue({data})
    })
    await throttledGetDataFromApi(path)
    jest.runAllTimers()
    expect(axios.create).toHaveBeenCalledWith(expect.objectContaining(url))
  });


  test('should perform request to correct provided url', async () => {

    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({data}),
    });

    await throttledGetDataFromApi(path)
    jest.runAllTimers()
    expect(axios.create().get).toHaveBeenCalledWith(path);
  });


  test('should return response data', async () => {
    axios.create = jest.fn().mockReturnValue({
      get: jest.fn().mockResolvedValue({ data }),
    });

    const response = await throttledGetDataFromApi(path);
    jest.runAllTimers();

    expect(response).toBe(data);
  });
});
