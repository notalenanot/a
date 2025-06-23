import fetch from 'node-fetch';
import { getWeather } from '../src/api/weather';

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('getWeather', () => {
  it('returns formatted temperature', async () => {
    mockedFetch.mockResolvedValue({
      json: async () => ({
        current_weather: { temperature: 25 },
        current_weather_units: { temperature: 'K' },
      }),
    } as any);

    await expect(getWeather()).resolves.toBe('Current temperature: 25K');
  });

  it('handles missing temperature', async () => {
    mockedFetch.mockResolvedValue({
      json: async () => ({})
    } as any);

    await expect(getWeather()).resolves.toBe('Unable to retrieve weather.');
  });
});
