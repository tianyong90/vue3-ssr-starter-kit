import { App, Plugin } from 'vue'

import { get } from 'lodash'

const LodashPlugin: Plugin = {
  install (app: App, options) {
    if (import.meta.env.NODE_ENV === 'development') {
      console.log('LodashPlugin is installed')
    }

    app.config.globalProperties.$get = get
  },
}

export default LodashPlugin
