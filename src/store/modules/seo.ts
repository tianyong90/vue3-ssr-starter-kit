import { defineStore } from 'pinia'

export const useSeoStore = defineStore({
  id: 'seo',
  state: () => ({
    options: [],
  }),

  getters: {
    getOptions (): Array<any> {
      return this.options
    },
  },

  actions: {
    setOptions (options: any) {
      this.options = options
    },
  },
})
