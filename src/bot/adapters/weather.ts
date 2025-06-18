export default async function weather(): Promise<string> {
  const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m'
  const res = await fetch(url)
  if (!res.ok) {
    return 'Unable to fetch weather.'
  }
  const data = await res.json() as any
  const temp = data.current?.temperature_2m
  if (temp === undefined) {
    return 'Weather data unavailable.'
  }
  return `Current temperature is ${temp}\u00B0C`
}
