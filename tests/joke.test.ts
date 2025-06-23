import fetch from 'node-fetch';
import { getJoke } from '../src/api/joke';

jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockedFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('getJoke', () => {
  it('returns joke when available', async () => {
    mockedFetch.mockResolvedValue({
      json: async () => ({ joke: 'funny' }),
    } as any);

    await expect(getJoke()).resolves.toBe('funny');
  });

  it('falls back when joke missing', async () => {
    mockedFetch.mockResolvedValue({
      json: async () => ({})
    } as any);

    await expect(getJoke()).resolves.toBe('No joke available.');
  });
});
