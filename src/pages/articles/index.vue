<template>
  <main>
    <top-banner
      class="top-bg"
      slogan="The latest news"
      sub-slogan="Company's latest news trends."
      :bg-src="bgResource"
    />

    <div
      v-if="articlePageData"
      class="container my-10"
    >
      <ul class="article-list">
        <li
          v-for="article in articlePageData"
          :key="article.id"
          class="article-item"
        >
          <div class="img-wrapper aspect-w-5 aspect-h-3">
            <router-link :to="`/articles/${article.title_slug}`">
              <img
                :src="article.cover_url"
                class="article-cover"
                :alt="article.title"
                :title="article.title"
              >
            </router-link>
          </div>
          <div class="meta">
            <div class="publish-time">
              <svg-icon
                name="calendar"
                class="icon-calendar"
              />
              <span>
                {{ formatToDate(article.created_at, 'D MMMM, YYYY') }}
              </span>
            </div>

            <h2 class="title">
              <router-link :to="`/articles/${article.title_slug}`">
                {{ article.title }}
              </router-link>
            </h2>

            <router-link
              :to="`/articles/${article.title_slug}`"
              class="read-more"
            >
              CONTINUE READING

              <svg-icon
                name="d-arrow-right"
                class="readmore-arrow-right"
              />
            </router-link>
          </div>
        </li>
      </ul>

      <!--<div
        v-if="pageMeta"
        class="flex justify-center mt-10"
      >
        <TLaravelPaginator
          :page-meta="pageMeta"
          page-path="/articles"
        />
      </div>-->
    </div>
    <div
      v-else
      class="flex justify-center mt-20"
    >
      <span class="flex text-lg text-gray-600">No Data.</span>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import bgResource from '@/assets/img/articles/banner.jpg'

// import { useRoute } from 'vue-router'
import { http } from '@/utils/axios'
import { useDatetime } from '@/composables/useDatetime'

// import TLaravelPaginator from '@/components/TLaravelPaginator.vue'
import { useHeadByKey } from '@/composables/useSeo'

// const route = useRoute()
const { formatToDate } = useDatetime()

// useHead
useHeadByKey('contact')

// 当前页码
// const page = ref(1)
// page.value = route.query.page ? parseInt(route.query.page) : 1

const articlePageData = ref([])
// const pageMeta = ref(null)

// 查询文章列表
async function fetchArticles () {
  try {
    articlePageData.value = await http.get('articles', {
      params: {
        // page: page.value,
        // pageSize: 12,
      },
    })
  } catch (_err) {
    console.log(_err)
  }
}

await fetchArticles()

// watch(() => route.params, () => {
//   page.value = route.query.page
//
//   fetchArticles()
// })
</script>

<style scoped lang="scss">
@media screen and (max-width: theme('screens.md')) {
  .top-bg {
    @apply hidden;
  }
}

.article-list {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8;

  .article-item {
    @apply bg-white shadow-md rounded-md overflow-hidden;

    border-bottom: 5px solid transparent;
    transition: all 0.3s ease-in-out;

    .img-wrapper {
      @apply w-full relative;

      &::before {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
        background-color: #000;
        content: '';
        opacity: 0.3;
        transform: translateY(-100%);
        transition: all 0.3s ease-in-out;
      }
    }

    .article-cover {
      @apply w-full h-full object-cover;
    }

    .meta {
      @apply p-6;

      .title {
        @apply text-xl mb-2 font-semibold text-slate-700 leading-snug line-clamp-2 hover:text-green-600;
      }

      .publish-time {
        @apply text-gray-600 text-sm mb-4 inline-flex items-center;
      }

      .icon-calendar {
        @apply inline w-6 h-6 text-green-600 mr-2;
      }

      .description {
        @apply text-gray-700 leading-snug;
      }

      .read-more {
        @apply inline-block mt-3 pt-3 text-gray-500 font-medium  hover:text-green-600 tracking-tight border-t border-slate-200 w-full;
      }

      .readmore-arrow-right {
        @apply inline h-4 w-4 ml-1 duration-200;
      }

      .read-more:hover .readmore-arrow-right {
        @apply transform translate-x-1.5;
      }
    }

    &:hover {
      border-bottom: 5px solid var(--color-primary);
      transform: translateY(-0.5rem);

      .img-wrapper::before {
        transform: translateY(0);
      }
    }
  }
}
</style>
