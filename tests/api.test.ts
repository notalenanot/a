import fetch from 'node-fetch';
import { getJoke } from '../src/api/joke';
import { getWeather } from '../src/api/weather';

jest.mock('node-fetch', () => jest.fn());

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API helpers', () => {
  beforeEach(() => {
    mockedFetch.mockReset();
  });

  test('getJoke returns joke from API', async () => {
    mockedFetch.mockResolvedValue({
      json: async () => ({ joke: 'Funny' })
    } as any);
    await expect(getJoke()).resolves.toBe('Funny');
    expect(mockedFetch).toHaveBeenCalledWith('https://v2.jokeapi.dev/joke/Any?type=single');
  });

  test('getJoke handles errors', async () => {
    mockedFetch.mockRejectedValue(new Error('network'));
    await expect(getJoke()).resolves.toBe('Unable to retrieve joke.');
  });

  test('getWeather returns formatted weather', async () => {
    const data = {
      current_weather: { temperature: 20 },
      current_weather_units: { temperature: '°C' },
    };
    mockedFetch.mockResolvedValue({
      json: async () => data
    } as any);
    await expect(getWeather()).resolves.toBe('Current temperature: 20°C');
    expect(mockedFetch).toHaveBeenCalled();
  });

  test('getWeather handles missing temperature', async () => {
    mockedFetch.mockResolvedValue({
      json: async () => ({})
    } as any);
    await expect(getWeather()).resolves.toBe('Unable to retrieve weather.');
  });

  test('getWeather handles fetch errors', async () => {
    mockedFetch.mockRejectedValue(new Error('network'));
    await expect(getWeather()).resolves.toBe('Unable to retrieve weather.');
  });
});
