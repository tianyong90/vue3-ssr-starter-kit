import { createMemoryHistory, createWebHistory, createRouter as _createRouter } from 'vue-router'
import type { Router } from 'vue-router'
import routes from './routes'

export function createRouter (): Router {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      }

      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      }

      // 其它情况下滚动到顶部
      return { top: 0 }
    },
  })
}
