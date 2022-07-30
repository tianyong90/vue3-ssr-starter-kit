<template>
  <div
    class="top-banner parallax"
    :style="wrapperStyle"
  >
    <div
      class="parallax__layer parallax__lay-er--back"
      :style="bgStyle"
    />
    <div class="parallax__layer parallax__lay-er--base">
      <slot>
        <div class="container flex flex-col justify-center items-center h-full">
          <h2
            v-if="slogan"
            class="title"
          >
            {{ slogan }}
          </h2>

          <h2
            v-if="subSlogan"
            class="description"
          >
            {{ subSlogan }}
          </h2>
        </div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  slogan: {
    type: String,
    default: null,
  },
  subSlogan: {
    type: String,
    default: null,
  },
  bgSrc: {
    type: String,
    default: '/img/top-bg.webp',
  },
  height: {
    type: [Number, String],
    default: null,
  },
})

const wrapperStyle = computed(() => {
  if (props.height) {
    return {
      height: `${props.height}px`,
    }
  }
})

const bgStyle = computed(() => {
  return {
    backgroundImage: `url(${props.bgSrc})`,
  }
})

</script>

<style scoped lang="scss">
.top-banner {
  @apply relative w-full overflow-hidden pt-12 font-bold;

  height: 220px;
  font-family: "Alibaba Sans", sans-serif;
  //background-color: #888;
  //background-position: top center;
  //background-repeat: no-repeat;
  //background-size: auto 100%;

  .title {
    @apply text-xl sm:text-3xl lg:text-5xl text-white uppercase;

    text-shadow: 0 0 10px rgb(0 0 0 / 50%);
  }

  .description {
    @apply hidden lg:block text-lg text-white mt-5;
  }
}

@media screen and (min-width: theme('screens.lg')) {
  .top-banner {
    height: 350px;
    background-size: cover;
  }
}
</style>
