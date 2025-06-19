import { getWeather } from '../../api/weather';
import { getJoke } from '../../api/joke';

/**
 * Routes a user input string to the correct intent.
 * If the input mentions "weather", the weather adapter is called.
 * If the input mentions "joke", the joke adapter is called.
 * Otherwise a simple fallback message is returned.
 */
export async function handleInput(input: string): Promise<string> {
  const text = input.toLowerCase();

  if (text.includes('weather')) {
    return getWeather();
  }

  if (text.includes('joke')) {
    return getJoke();
  }

  return "I'm not sure how to help with that.";
}
