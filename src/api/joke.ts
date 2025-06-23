import fetch from 'node-fetch';

/**
 * Fetches a single joke from the JokeAPI.
 */
export async function getJoke(): Promise<string> {
  const baseUrl = process.env.JOKE_API_BASE_URL || 'https://v2.jokeapi.dev';
  const url = `${baseUrl.replace(/\/$/, '')}/joke/Any?type=single`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    const data: any = await res.json();
    return data?.joke || 'No joke available.';
  } catch {
    return 'Service unreachable.';
  }
}
