import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export type Intent = {
  keywords?: string[]
  adapter: string
}

export type Flow = {
  intents: Record<string, Intent>
}

export class Engine {
  private flow: Flow

  constructor(flowPath = path.join(__dirname, '..', 'flows', 'example.yaml')) {
    const data = fs.readFileSync(flowPath, 'utf8')
    this.flow = yaml.load(data) as Flow
  }

  async handle(text: string): Promise<string> {
    const lower = text.toLowerCase()
    for (const intent of Object.values(this.flow.intents)) {
      if (intent.keywords && intent.keywords.some(k => lower.includes(k))) {
        const adapter = await this.loadAdapter(intent.adapter)
        return adapter()
      }
    }
    const fallback = await this.loadAdapter(this.flow.intents.fallback.adapter)
    return fallback()
  }

  private async loadAdapter(name: string): Promise<() => Promise<string>> {
    const mod = await import(path.join('..', 'adapters', name))
    return mod.default
  }
}
