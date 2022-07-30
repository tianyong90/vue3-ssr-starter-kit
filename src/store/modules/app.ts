import { defineStore } from 'pinia'

interface AppState {
  name: string
  inquireDialogVisible: boolean
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    name: 'vue3-ssr-example',
    inquireDialogVisible: false,
  }),

  getters: {
    getName (): string {
      return this.name
    },

    getInquireDialogVisible (): boolean {
      return this.inquireDialogVisible
    },
  },

  actions: {
    setInquireDialogVisible (visible: boolean): void {
      this.inquireDialogVisible = visible
    },
  },
})
