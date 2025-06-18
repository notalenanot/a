import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import axios from 'axios';

interface IntentConfig {
  phrases: string[];
}

interface FlowConfig {
  intents: Record<string, IntentConfig>;
}

type Adapter = () => Promise<string>;

async function fetchWeather(): Promise<string> {
  const lat = 40.71; // New York City latitude
  const lon = -74.01; // New York City longitude
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const response = await axios.get(url);
  const temp = response.data.current_weather?.temperature;
  return `The current temperature is ${temp}\u00B0C.`;
}

async function fetchJoke(): Promise<string> {
  const url = 'https://v2.jokeapi.dev/joke/Any?type=single';
  const response = await axios.get(url);
  return response.data.joke;
}

export class Engine {
  private flows: FlowConfig;
  private adapters: Record<string, Adapter>;

  constructor(flowFile: string) {
    const filePath = path.resolve(flowFile);
    const content = fs.readFileSync(filePath, 'utf-8');
    this.flows = yaml.parse(content);

    this.adapters = {
      weather: fetchWeather,
      joke: fetchJoke,
      fallback: async () => "Sorry, I didn't understand that."
    };
  }

  async handle(text: string): Promise<string> {
    const lower = text.toLowerCase();

    for (const [intent, cfg] of Object.entries(this.flows.intents)) {
      if (intent === 'fallback') continue;
      for (const phrase of cfg.phrases) {
        if (lower.includes(phrase.toLowerCase())) {
          const adapter = this.adapters[intent];
          if (adapter) {
            return adapter();
          }
        }
      }
    }

    return this.adapters['fallback']();
  }
}
