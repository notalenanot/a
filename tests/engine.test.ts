import { handleInput } from '../src/bot/core/engine';
import { getWeather } from '../src/api/weather';
import { getJoke } from '../src/api/joke';
import { findApp, initDefaultApps } from '../src/bot/core/apps';

jest.mock('../src/api/weather', () => ({
  __esModule: true,
  getWeather: jest.fn(),
}));
jest.mock('../src/api/joke', () => ({
  __esModule: true,
  getJoke: jest.fn(),
}));
jest.mock('../src/bot/core/apps', () => ({
  __esModule: true,
  findApp: jest.fn(),
  initDefaultApps: jest.fn(),
}));

const mockedWeather = getWeather as jest.MockedFunction<typeof getWeather>;
const mockedJoke = getJoke as jest.MockedFunction<typeof getJoke>;
const mockedFindApp = findApp as jest.MockedFunction<typeof findApp>;
const mockedInit = initDefaultApps as jest.MockedFunction<typeof initDefaultApps>;

describe('handleInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('routes to weather', async () => {
    mockedWeather.mockResolvedValue('w');
    const result = await handleInput('weather please');
    expect(result).toBe('w');
    expect(mockedWeather).toHaveBeenCalled();
  });

  it('routes to joke', async () => {
    mockedJoke.mockResolvedValue('j');
    const result = await handleInput('tell me a joke');
    expect(result).toBe('j');
    expect(mockedJoke).toHaveBeenCalled();
  });

  it('routes to registered app', async () => {
    const run = jest.fn().mockResolvedValue('app result');
    mockedFindApp.mockReturnValue({ name: 'uber', keywords: ['uber'], run });
    const result = await handleInput('call uber');
    expect(result).toBe('app result');
    expect(run).toHaveBeenCalledWith('call uber');
  });

  it('returns fallback when no match', async () => {
    mockedFindApp.mockReturnValue(null);
    const result = await handleInput('unknown');
    expect(result).toBe("Sorry I can't do that right now.");
    expect(mockedInit).toHaveBeenCalled();
  });
});
