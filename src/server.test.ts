import request from 'supertest';
import { app } from './server';
import fetch from 'node-fetch';

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));
const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('server api endpoints', () => {
  afterEach(() => {
    mockedFetch.mockReset();
  });

  test('GET /api/joke returns joke', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: async () => ({ joke: 'funny joke' }),
    } as any);

    const res = await request(app).get('/api/joke');
    expect(res.status).toBe(200);
    expect(res.body.joke).toBe('funny joke');
  });

  test('GET /api/weather returns weather', async () => {
    mockedFetch.mockResolvedValueOnce({
      json: async () => ({
        current_weather: { temperature: 21 },
        current_weather_units: { temperature: '°C' },
      }),
    } as any);

    const res = await request(app).get('/api/weather?lat=1&lon=2');
    expect(res.status).toBe(200);
    expect(res.body.weather).toBe('Current temperature: 21°C');
  });
});
