import { computed } from 'vue'

import { pinia } from '@/store'

import { useHead } from '@vueuse/head'
import { useSeoStore } from '@/store/modules/seo'

interface SeoOption {
  key: string
  title: string
  description: string
  keywords: string
}

const seoStore = useSeoStore(pinia)

/**
 * @description
 * @param key
 */
export function getOptionByKey (key: string): SeoOption | undefined {
  const seoOptions = seoStore.getOptions

  if (!seoOptions) {
    return
  }

  return seoOptions.find((option) => option.key === key)
}

/**
 * @param key
 */
export function useHeadByKey (key: string): void {
  const seoOption = getOptionByKey(key)

  if (!seoOption) {
    return
  }

  useHead({
    title: computed(() => `${seoOption.title} - VUE3 SSR EXAMPLE`),
    meta: [
      {
        hid: 'keywords',
        name: 'keywords',
        content: computed(() => seoOption.keywords),
      },
      {
        hid: 'description',
        name: 'description',
        content: computed(() => seoOption.description),
      },
    ],
  })
}
