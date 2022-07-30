<template>
  <HeaderMenuToggler
    :opened.sync="showDropdown"
    @click.native="onClickMenuIcon"
  />

  <transition name="slide-fade">
    <div
      v-if="showDropdown"
      class="mask"
    />
  </transition>

  <transition name="slide-fade">
    <div
      v-if="showDropdown"
      class="mobile-dropdown flex px-2 flex-col"
    >
      <Logo class="block h-10 self-start mt-4 mb-2" />

      <ul class="flex flex-col">
        <li
          v-for="(item, index) of navs"
          :key="index"
          class="dropdown-item"
        >
          <router-link
            class="link"
            :to="item.path"
            @click.native="showDropdown = false"
          >
            {{ item.label }}

            <svg-icon
              v-if="item.children"
              name="chevron-right"
              class="w-3 h-3"
            />
          </router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue'
import { MAIN_NAV as navs } from '@/config'

import Logo from '@/components/Logo.vue'
import HeaderMenuToggler from './HeaderMenuToggler.vue'

const showDropdown = ref(false)

onMounted(async () => {
  await nextTick()
})

function onClickMenuIcon () {
  showDropdown.value = !showDropdown.value
}
</script>

<style scoped lang="scss">
$header-height-sm: 50px;

@keyframes icon-animation {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(25%);
  }

  100% {
    transform: translateX(0%);
  }
}

@keyframes slide-fade {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 小屏 */
@media screen and (max-width: theme('screens.md')) {
  .mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 500;
    background-color: rgb(0 0 0 / 75%);
  }

  .mobile-dropdown {
    @apply bg-white shadow-lg;

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 4000;
    width: 15em;

    ul {
      @apply flex flex-col divide-y divide-gray-200;
    }

    .dropdown-item {
      .link {
        @apply px-4 py-3 text-gray-500 inline-flex w-full justify-between;
      }

      &.nuxt-link-exact-active {
        background-color: rgb(255 255 255 / 20%);
      }
    }
  }

  .slide-fade-enter-active {
    transform-origin: top center;
    animation: slide-fade 250ms;
    transition: all ease-in-out;
  }

  .slide-fade-leave-active {
    transform-origin: top center;
    animation: slide-fade 250ms reverse;
    transition: all ease-in-out;
  }
}

@media screen and (min-width: theme('screens.md')) {
  .mobile-dropdown {
    @apply hidden;
  }
}
</style>
