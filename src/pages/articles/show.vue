<template>
  <main>
    <top-banner
      slogan="The latest news"
      sub-slogan="Company's latest news trends."
      :bg-src="bgResource"
    />

    <div class="container my-10 flex flex-col md:flex-row spacey-y-5 md:space-x-10">
      <div class="article-wrapper">
        <div class="w-full aspect-w-2 aspect-h-1 rounded-md overflow-hidden mb-4">
          <img
            :src="article.cover_url"
            :alt="article.title"
            class="cover object-cover"
          >
        </div>

        <div class="mb-1">
          <svg-icon
            name="calendar"
            class="w-4 h-4 inline mr-2 color-primary"
          />
          <span class="text-sm text-gray-500">{{ formatToDate(article.created_at, 'MMMM DD, YYYY') }}</span>
        </div>

        <h1 class="text-2xl font-bold text-slate-700 mb-5">
          {{ article.title }}
        </h1>

        <article
          class="prose"
          v-html="article.content"
        />

        <div class="flex items-center justify-end border-t border-gray-200 py-3 mt-5">
          <div
            class="shareon"
            :data-url="`https://www.improvecn.com/articles/${article.title_slug}`"
          >
            <a
              class="facebook"
              :data-title="article.title"
            />
            <button
              class="twitter"
              data-via="ImproveBattery"
            />
            <a
              class="linkedin"
              :data-url="`https://www.improvecn.com/articles/${article.title_slug}`"
            />
            <button
              class="telegram"
              :data-text="article.title"
            />
          </div>
        </div>

        <div class="flex flex-col space-y-5 sm:space-y-0 sm:flex-row sm:space-x-8">
          <router-link
            v-if="article.previous"
            :to="`/articles/${$get(article, 'previous.title_slug')}`"
            class="pagination-link pagination-prev"
          >
            {{ article.previous.title }}
          </router-link>

          <router-link
            v-if="article.next"
            :to="`/articles/${$get(article, 'next.title_slug')}`"
            class="pagination-link pagination-prev"
          >
            {{ article.next.title }}
          </router-link>
        </div>
      </div>

      <div class="sider flex flex-col space-y-8">
        <div class="sider-panel panel-latest-posts">
          <div class="sider-header">
            Latest Posts
          </div>

          <div class="latest-post-list">
            <router-link
              v-for="item in latestArticles"
              :key="item.id"
              :to="`/articles/${item.title_slug}`"
              class="post-item"
            >
              <img
                :src="item.cover_url"
                :alt="item.title"
                class="cover"
              >
              <div class="flex flex-col ml-3">
                <div class="mb-0.5">
                  <svg-icon
                    name="calendar"
                    class="w-4 h-4 inline mr-2 color-primary"
                  />
                  <span class="text-xs text-gray-600">{{ formatToDate(article.created_at, 'MMMM DD, YYYY') }}</span>
                </div>
                <div class="title">
                  {{ item.title }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick, watch, computed } from 'vue'
import bgResource from '@/assets/img/articles/banner.jpg'
import { useRoute } from 'vue-router'
import { useDatetime } from '@/composables/useDatetime'
import { useHead } from '@vueuse/head'

import { http } from '@/utils/axios'

const route = useRoute()

const article = ref({})

const latestArticles = ref([])
try {
  latestArticles.value = await http.get('latest-articles?count=3')
} catch (_err) {
  console.log('error', _err)
}

async function fetchArticle () {
  const { title_slug: titleSlug } = route.params

  if (!titleSlug) {
    return
  }

  try {
    // 注意这里只能用解构赋值
    article.value = await http.get(`articles/${titleSlug}`)
  } catch (_err) {
    console.log(_err)
  }
}

// 必须 await，不然 ssr 爬不到文章内容
await fetchArticle()

useHead({
  title: computed(() => `${article.value.seo_title || article.value.title} - IMPROVE BATTERY`),
  meta: [
    {
      hid: 'keywords',
      name: 'keywords',
      content: computed(() => article.value.keywords),
    },
    {
      hid: 'description',
      name: 'description',
      content: computed(() => article.value.description),
    },
  ],
})

const { formatToDate } = useDatetime()

watch(() => route.params, () => {
  fetchArticle()
})

onMounted(async () => {
  await nextTick()
  window.Shareon.init()
})
</script>

<style scoped lang="scss">
.article-wrapper {
  @apply flex-1;
}

.pagination-link {
  @apply flex-1 p-5 md:p-6 lg:p-10 inline-flex rounded-md;

  background-color: #f4f1ee;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: darken(#f4f1ee, 5%);
    box-shadow: 0 3px 3px 3px rgb(0 0 0 / 10%);
  }
}

.sider {
  @apply mt-5 md:mt-0 flex-1;

  .sider-panel {
    @apply rounded-md px-6 py-8;

    background-color: #f4f1ee;
  }

  .sider-header {
    @apply text-xl font-bold text-gray-700 leading-none mb-5 ml-4;
  }

  .latest-post-list {
    @apply space-y-1;

    .post-item {
      @apply p-4 w-full inline-flex hover:bg-white rounded-md;

      .cover {
        @apply inline w-12 h-12 lg:w-20 lg:h-20 rounded-md object-cover;
      }

      .title {
        @apply text-slate-700 leading-normal line-clamp-1 lg:line-clamp-2;
      }
    }
  }

  .related-product-list {
    @apply grid grid-cols-2 md:grid-cols-1 gap-8;

    .product-item {
      @apply w-full md:w-4/5 mx-auto inline-flex flex-col;

      .main-pic-wrapper {
        @apply w-full aspect-w-1 aspect-h-1 rounded-md overflow-hidden;

        transition: all 0.2s ease-in-out;

        &:hover {
          @apply shadow-md;

          transform: scale(1.05);
        }
      }

      .main-pic {
        @apply w-full h-full object-cover bg-white;
      }

      .name {
        @apply text-slate-700 leading-normal line-clamp-2 mt-2;
      }
    }
  }
}

@screen md {
  .sider {
    flex: 260px 0 0;
  }
}

@screen lg {
  .sider {
    flex: 370px 0 0;
  }
}
</style>
