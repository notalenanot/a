import fetch from 'node-fetch';

/**
 * Fetches current weather from the Open-Meteo API for a given location.
 * Defaults to New York City coordinates if none are provided.
 */
export async function getWeather(
  latitude = 40.7128,
  longitude = -74.0060
): Promise<string> {
  const baseUrl =
    process.env.WEATHER_API_BASE_URL ||
    'https://api.open-meteo.com/v1/forecast';
  const url = `${baseUrl}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    const data: any = await res.json();

    const temp = data?.current_weather?.temperature;
    const unit = data?.current_weather_units?.temperature || '°C';

    if (temp === undefined) {
      return 'Unable to retrieve weather.';
    }

    return `Current temperature: ${temp}${unit}`;
  } catch {
    return 'Service unreachable.';
  }
}
