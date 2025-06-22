import fetch from 'node-fetch';

/**
 * Fetches a single joke from the JokeAPI.
 */
export async function getJoke(): Promise<string> {
  const url = 'https://v2.jokeapi.dev/joke/Any?type=single';
  try {
    const res = await fetch(url);
    const data: any = await res.json();

    return data?.joke || 'No joke available.';
  } catch (err) {
    return 'Unable to retrieve joke.';
  }
}
