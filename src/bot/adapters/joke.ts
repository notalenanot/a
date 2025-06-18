export default async function joke(): Promise<string> {
  const res = await fetch('https://v2.jokeapi.dev/joke/Any?type=single')
  if (!res.ok) {
    return 'Unable to fetch a joke.'
  }
  const data = await res.json() as any
  return data.joke || 'No joke found.'
}
