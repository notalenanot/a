import { getWeather } from '../../api/weather';
import { getJoke } from '../../api/joke';
import { findApp, initDefaultApps } from './apps';

/**
 * Routes a user input string to the correct intent.
 * If the input mentions "weather", the weather adapter is called.
 * If the input mentions "joke", the joke adapter is called.
 * Otherwise a simple fallback message is returned.
 */
export async function handleInput(input: string): Promise<string> {
  const text = input.toLowerCase();

  initDefaultApps();

  if (text.includes('weather')) {
    return getWeather();
  }

  if (text.includes('joke')) {
    return getJoke();
  }

  const app = findApp(text);
  if (app) {
    return app.run(text);
  }

  return "Sorry I can't do that right now.";
}
