import request from 'supertest';
import { app } from '../src/server';
import fetch from 'node-fetch';

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('API endpoints', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('/api/joke returns joke json', async () => {
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ joke: 'Funny' }),
    } as any);

    const res = await request(app).get('/api/joke');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ joke: 'Funny' });
  });

  test('/api/weather returns weather json', async () => {
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        current_weather: { temperature: 20 },
        current_weather_units: { temperature: '°C' },
      }),
    } as any);

    const res = await request(app).get('/api/weather');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ weather: 'Current temperature: 20°C' });
  });
});
