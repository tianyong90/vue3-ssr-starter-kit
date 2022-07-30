import App from '@/App.vue'
import { createSSRApp } from 'vue'
import { createRouter } from '@/router'

import { setupStore, pinia } from '@/store'

// plugins
import LodashPlugin from '@/plugins/lodash'

import '@/assets/scss/app.scss'
import 'virtual:svg-icons-register'

import { createHead } from '@vueuse/head'

// global components
import SvgIcon from '@/components/SvgIcon.vue'
import TopBanner from '@/components/TopBanner.vue'

import { http } from '@/utils/axios'

import { useSeoStore } from '@/store/modules/seo'

/**
 * 获取页面 SEO 设置数据
 */
async function fetchSeoOptions (): Promise<any> {
  try {
    const seoOptions = await http.get('seo-options')

    // 保存到 store
    const productCategoryStore = useSeoStore(pinia)
    productCategoryStore.setOptions(seoOptions)
  } catch (_err) {
    console.log('获取 SEO 设置数据失败')
  }
}

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp (): any {
  const app = createSSRApp(App)

  setupStore(app)

  // IMPORTANT
  const router = createRouter()

  router.beforeEach(async (to, from, next) => {
    await fetchSeoOptions()

    next()
  })

  app.use(router)
  app.use(LodashPlugin)

  const head = createHead()
  app.use(head)

  app.component('SvgIcon', SvgIcon)
  app.component('TopBanner', TopBanner)
  return { app, router, head }
}
