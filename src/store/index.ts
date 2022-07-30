import type { App } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()

export function setupStore (app: App): void {
  app.use(pinia)
}

export { pinia }
