<template>
  <transition
    name="custom-classes"
    enter-active-class="animate__animated animate__fast animate__fadeInRight"
    leave-active-class="animate__animated animate__fast animate__fadeOutRight"
  >
    <div
      v-if="visible"
      class="back-to-top"
      @click.prevent.stop="goBackToTop"
    >
      <svg-icon
        name="chevron-up"
        class="icon"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()

const visible = computed(() => {
  return y.value >= 600
})

function goBackToTop ():void {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
}
</script>

<style lang="scss">
.back-to-top {
  @apply fixed flex justify-center items-center rounded-full shadow-lg;

  right: 25px;
  bottom: 50px;
  z-index: 9999;
  width: 60px;
  height: 60px;
  background-color: var(--color-primary);

  .icon {
    @apply text-white;

    width: 40px;
    height: 40px;
  }

  &:hover {
    background-color: #557D3C;

    .icon {
      color: #fff;
    }
  }
}
</style>
