/**
 * Fetches a single joke from the JokeAPI.
 */
export async function getJoke(): Promise<string> {
  const url = 'https://v2.jokeapi.dev/joke/Any?type=single';
  const res = await fetch(url);
  const data = await res.json();

  return data?.joke || 'No joke available.';
}
