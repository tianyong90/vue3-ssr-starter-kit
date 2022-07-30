<template>
  <header
    id="header"
    ref="header"
    class="header"
  >
    <div class="container w-full flex items-center mx-auto">
      <router-link
        to="/"
        title="VUE3 SSR EXAMPLE"
      >
        <Logo class="logo" />
      </router-link>

      <ul class="main-nav">
        <li
          v-for="(item, index) of navs"
          :key="index"
          class="nav-item"
        >
          <router-link
            class="link"
            :to="item.path"
            :target="item.target"
            exact
          >
            {{ item.label }}
          </router-link>

          <ul
            v-if="item.children"
            class="sub-nav"
          >
            <li
              v-for="(subItem, subIndex) of item.children"
              :key="subIndex"
              class="sub-nav-item"
            >
              <router-link
                class="sub-link"
                :to="subItem.path"
                :target="subItem.target"
              >
                <span>{{ subItem.label }}</span>

                <svg-icon
                  name="d-arrow-right"
                  class="sub-link-icon"
                />
              </router-link>
            </li>
          </ul>
        </li>
      </ul>

      <MobileDropdown />
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted, nextTick, ref } from 'vue'
import { MAIN_NAV } from '@/config'

import Logo from '@/components/Logo.vue'
import MobileDropdown from './MobileDropdown.vue'

const header = ref(null)

const navs = MAIN_NAV

onMounted(async () => {
  await nextTick()

  // TODO: headroom 动效
  // const headroom = new Headroom(header.value, {
  //   offset: 100,
  //   tolerance: 15,
  // })
  // headroom.init()
})
</script>

<style lang="scss">
.headroom {
  --color: #fff;
  --active-line-color: #fff;
  --header-height: 100px;

  will-change: height;
  transition: all 200ms linear;
}

.headroom--not-top {
  --color: #fff;
  --active-line-color: var(--color-primary);
  --header-height: 60px;

  background: rgba(0 0 0 / 80%);
}

//.headroom--pinned {
//  transform: translateY(0%);
//}
//
//.headroom--unpinned {
//  transform: translateY(-100%);
//}
</style>

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

/* 小屏 */
@media screen and (max-width: theme('screens.md')) {
  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    width: 100vw;
    height: $header-height-sm;
    background-color: rgba(255 255 255 / 90%);
    box-shadow: 0 0 6px 3px rgb(0 0 0 / 20%);
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    will-change: left, width, top;

    .logo {
      @apply h-8;
    }
  }

  // 小屏上主菜单为折叠效果
  .main-nav {
    display: none;
  }
}

@media screen and (min-width: theme('screens.md')) {
  .header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    height: var(--header-height);
    justify-content: space-between;
    background-color: #fafafc;
    box-shadow: 0 0 6px 4px rgb(0 0 0 / 20%);

    .header-links {
      @apply flex space-x-5 items-center;
    }

    .link-icon {
      @apply w-4 h-4 inline mr-3;

      color: #2786cc;
    }

    .link-text {
      color: #333;
    }

    .btn-reseller {
      @apply px-3 py-1 rounded-md text-white text-sm;

      background-color: var(--color-primary);
    }

    /* 大屏上不显示折叠菜单按钮 */
    .menu-icon {
      display: none;
    }

    .logo {
      @apply h-10;
    }

    .main-nav {
      @apply flex items-center ml-20 lg:ml-32 space-x-6;

      .nav-item {
        @apply relative inline-flex text-lg items-center;

        color: #333;
      }

      .link {
        @apply relative tracking-wide px-3 py-3;

        white-space: nowrap;
      }
    }

    .link.router-link-exact-active {
      font-weight: 600;

      /* 下划线 */
      &::after {
        position: absolute;
        bottom: 5px;
        left: 50%;
        width: 30px;
        height: 4px;
        background-color: var(--color-primary);
        content: "";
        transform: translateX(-50%);
      }
    }

    .sub-nav {
      @apply absolute bg-white divide-y divide-gray-300;

      top: 52px;
      left: 50%;
      border-top: 2px solid var(--color-primary);
      border-radius: 0 0 5px 5px;
      transform: translateX(-50%) scaleY(0);
      transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
      transform-origin: top center;

      .sub-nav-item {
        @apply px-3 py-2;
      }

      .sub-link {
        @apply inline-flex w-full justify-between items-center px-2 py-1 whitespace-nowrap text-base text-slate-600 rounded-md;

        &:hover {
          @apply bg-gray-200;

          .sub-link-icon {
            @apply opacity-100;
          }
        }
      }

      .sub-link-icon {
        @apply w-5 h-5 ml-4 opacity-0 text-green-700;

        animation: icon-animation 0.8s ease-in-out infinite;
        transition: all 0.5s ease-in-out;
      }
    }

    .nav-item:hover .sub-nav {
      transform: translateX(-50%) scaleY(1);
    }
  }
}
</style>
