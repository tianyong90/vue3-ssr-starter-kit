<template>
  <footer class="footer">
    <div class="container flex flex-col md:flex-row py-10 items-center">
      <dl class="link-group">
        <dt class="title">
          Explore
        </dt>
        <dd
          v-for="(item, index) of navigations"
          :key="index"
        >
          <router-link
            :to="item.path"
            class="link"
          >
            {{ item.label }}
          </router-link>
        </dd>
      </dl>
    </div>

    <div class="copyright">
      <div class="py-5 text-center px-5">
        Copyright © tianyong90. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MAIN_NAV as navigations } from '@/config'
</script>

<style scoped lang="scss">
@media (max-width: theme('screens.md')) {
  .footer {
    background-color: #1F242C;

    .link-group {
      @apply flex-col self-start pr-10 mb-8;

      .title {
        @apply text-xl font-semibold mb-1 text-white;
      }

      .link {
        @apply whitespace-nowrap text-gray-400 leading-8;
      }

      .link-icon {
        @apply inline text-gray-200 w-4 h-4 mr-1;
      }
    }

    .contact-panel {
      @apply flex-col items-start self-start;

      .title {
        @apply text-xl font-semibold mb-1 text-white;
      }
    }

    .copyright {
      @apply text-gray-400;
    }
  }
}

@screen md {
  .footer {
    background-color: #1F242C;

    .link-group {
      @apply flex flex-col self-start pr-10;

      .title {
        @apply text-xl font-medium mb-5 text-gray-200;
      }

      .link {
        @apply whitespace-nowrap text-gray-300 leading-8;
      }

      .link-icon {
        @apply inline text-gray-200 w-5 h-5;
      }
    }

    .contact-panel {
      @apply w-1/3 flex-col self-start ml-auto;

      .title {
        @apply text-xl font-medium mb-5 text-gray-200;
      }
    }

    .copyright {
      @apply text-gray-400;
    }
  }
}
</style>
