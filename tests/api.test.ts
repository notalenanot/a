import request from 'supertest';
import { app } from '../src/server';
import fetch from 'node-fetch';
import nodemailer from 'nodemailer';

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('nodemailer', () => ({
  __esModule: true,
  default: {
    createTransport: jest.fn().mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(undefined),
    }),
  },
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

  test('/api/foia generates letter', async () => {
    const res = await request(app)
      .post('/api/foia')
      .send({
        agency: 'City Hall',
        topic: 'budgets',
        dateRange: '2020-2023',
        location: 'CA',
      });

    expect(res.status).toBe(200);
    expect(res.body.letter).toContain('City Hall');
    expect(res.body.letter).toContain('budgets');
  });
});
