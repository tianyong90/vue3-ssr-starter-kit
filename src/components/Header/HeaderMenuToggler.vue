<template>
  <div
    class="lg:hidden menu-icon"
    :class="{ times: opened }"
  >
    <svg
      class="w-8 h-8"
      viewBox="0 0 100 100"
    >
      <path
        class="line line1"
        d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
      />
      <path
        class="line line2"
        d="M 20,50 H 80"
      />
      <path
        class="line line3"
        d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  opened: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.menu-icon {
  position: relative;
  right: 0;
  width: auto;
  height: 100%;
  margin-left: auto;
  overflow: hidden;
  cursor: pointer;

  &::before {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    color: var(--color-primary);
    content: "";
  }

  .line {
    transition:
      stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
      stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
    fill: none;
    stroke: #000;
    stroke-width: 6;
  }

  .line1 {
    stroke-dasharray: 60 207;
  }

  .line2 {
    stroke-dasharray: 60 60;
  }

  .line3 {
    stroke-dasharray: 60 207;
  }

  &.times {
    z-index: 600;

    .line {
      stroke: #fff;
    }

    .line1 {
      stroke-dasharray: 90 207;
      stroke-dashoffset: -134;
    }

    .line2 {
      stroke-dasharray: 1 60;
      stroke-dashoffset: -30;
    }

    .line3 {
      stroke-dasharray: 90 207;
      stroke-dashoffset: -134;
    }
  }
}
</style>
