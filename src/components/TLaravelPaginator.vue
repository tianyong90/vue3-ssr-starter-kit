<template>
  <div class="t-paginator">
    <router-link
      tag="button"
      class="t-paginator-btn btn-prev"
      :disabled="prevDisabled"
      :to="{
        path: pagePath,
        query: { ...query, page: page - 1 },
      }"
    >
      <svg-icon
        name="chevron-left"
        class="arrow arrow-left"
      />
    </router-link>
    <router-link
      v-for="(item, index) in pageCount"
      :to="{
        path: pagePath,
        query: { ...query, page: index + 1 }
      }"
      class="t-paginator-item"
      :class="{ active: index + 1 === page }"
    >
      {{ index + 1 }}
    </router-link>
    <router-link
      tag="button"
      class="t-paginator-btn btn-next"
      :disabled="nextDisabled"
      :to="{
        path: pagePath,
        query: { ...query, page: page + 1 },
      }"
    >
      <svg-icon
        name="chevron-right"
        class="arrow arrow-left"
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    pageMeta: {
      type: Object,
      required: true,
    },
    pagePath: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      page: this.pageMeta.current_page,
      query: this.$route.query,
    }
  },

  computed: {
    pageCount () {
      return this.pageMeta.last_page
    },

    prevDisabled () {
      return this.page === 1
    },

    nextDisabled () {
      return this.page === this.pageCount
    },
  },

  watch: {
    $route (newValue) {
      this.page = parseInt(newValue.query.page || 1)
    },
  },
})
</script>

<style scoped lang="scss">
.t-paginator {
  @apply flex justify-center items-center;

  .t-paginator-btn {
    @apply w-8 h-8 lg:w-12 lg:h-12 bg-gray-200 mx-2 rounded-full text-gray-700 inline-flex justify-center items-center;

    &[disabled] {
      @apply bg-gray-100 cursor-not-allowed;
    }

    &:hover {
      @apply bg-green-100;
    }

    .arrow {
      @apply w-4 h-4 inline;
    }
  }

  .t-paginator-item {
    @apply w-8 h-8 lg:w-12 lg:h-12 bg-gray-200 text-center mx-2 rounded-full text-gray-700 inline-flex justify-center items-center;

    &.active {
      color: #fff;
      background-color: var(--color-primary);
    }

    &:hover {
      @apply bg-green-100;
    }
  }
}
</style>
