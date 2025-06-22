export interface App {
  name: string;
  keywords: string[];
  run: (input: string) => Promise<string>;
}

const apps: App[] = [];

export function registerApp(app: App) {
  apps.push(app);
}

export function findApp(text: string): App | null {
  const lower = text.toLowerCase();
  return apps.find(app => app.keywords.some(k => lower.includes(k))) || null;
}

export function initDefaultApps() {
  if (apps.length) return;
  registerApp({
    name: 'uber',
    keywords: ['uber'],
    async run() {
      return 'Requesting a ride via Uber...';
    },
  });
}
