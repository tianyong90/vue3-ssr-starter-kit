<template>
  <section
    id="banner"
    class="swiper slider"
  >
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div
        id="slide1"
        class="swiper-slide"
      >
        <div
          class="bg"
          style="background-image: url('/img/index/slide-1.jpg');"
        />

        <div class="container swiper-content flex-col justify-center">
          <div class="slogan">
            VUE3 SSR EXAMPLES.
          </div>
          <p class="description">
            Ready to use in production.
          </p>
        </div>
      </div>

      <div
        id="slide2"
        class="swiper-slide"
      >
        <div
          class="bg"
          style="background-image: url('/img/index/slide-2.jpg');"
        />

        <div class="container swiper-content flex-col justify-center">
          <div class="slogan">
            VUE3 SSR EXAMPLES.
          </div>
          <p class="description">
            Ready to use in production.
          </p>
        </div>
      </div>

    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination" />

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev" />
    <div class="swiper-button-next" />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Swiper, { Autoplay, EffectFade, Navigation, Pagination } from 'swiper'

import gsap, { Sine } from 'gsap'

onMounted(() => {
  initSwiper()
})

const initSwiper = () => {
  /* eslint-disable-next-line */
  const swiper = new Swiper('#banner', {
    effect: 'fade',
    modules: [
      Autoplay,
      EffectFade,
      Navigation,
      Pagination,
    ],
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      clickable: true,
      renderBullet: (index, className) => {
        return '<span class="' + className + '"><svg t="1657639339766" class="icon" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M753.152 479.4368H613.376c-12.5952 0-22.2208-11.3664-20.1728-23.7568l49.7664-304.8448c3.2768-19.968-21.4016-32.0512-35.2256-17.3056L255.8976 510.0544c-12.1856 13.1072-2.9696 34.5088 14.9504 34.5088H410.624c12.5952 0 22.2208 11.3664 20.1728 23.7568l-49.7664 304.8448c-3.2768 19.968 21.4016 32.0512 35.2256 17.3056l351.8464-376.5248c12.288-13.1072 2.9696-34.5088-14.9504-34.5088z" p-id="1413"></path></svg></span>'
      },
    },
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    parallax: true,
    speed: 500,
    preloadImages: true,
    updateOnImagesReady: true,
    on: {
      slideChangeTransitionStart: (swiper) => {
        doSlideAnimation(swiper.activeIndex)
      },
    },
  })
}

/**
 * slide content animation
 * @param slideIndex
 */
function doSlideAnimation (slideIndex: number) {
  const slide = document.body.querySelector('#banner .swiper-slide-active')

  if (!slide) {
    return
  }

  const bg = slide.querySelector('.bg')
  const elSlogan = slide.querySelector('.slogan')
  const elDescription = slide.querySelector('.description')
  const elBtnContact = slide.querySelector('.btn-contact')

  gsap.fromTo(
    bg,
    { scale: 1 },
    {
      ease: Sine.easeOut,
      scale: 1.2,
      duration: 5,
    },
  )

  gsap.fromTo(
    elSlogan,
    {
      autoAlpha: 0,
      y: -100,
    },
    {
      ease: Sine.easeInOut,
      autoAlpha: 1,
      y: 0,
      duration: 1.5,
    },
  )

  if (elDescription) {
    gsap.fromTo(
      elDescription,
      {
        autoAlpha: 0,
        y: -80,
      },
      {
        ease: Sine.easeInOut,
        autoAlpha: 0.8,
        y: 0,
        duration: 1.8,
      },
    )
  }

  gsap.fromTo(elBtnContact, {
    opacity: 0,
    y: 100,
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: Sine.easeInOut,
    delay: 0.1,
  })
}
</script>

<style lang="scss">
.slider {
  .swiper-pagination {
    bottom: 30px;

    .swiper-pagination-bullet {
      width: 60px;
      height: 5px;
      background-color: #fff;
      border-radius: 1px;
      opacity: 0.5;

      .icon {
        display: none;
      }
    }

    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      width: 30px;
      height: 30px;
      background-color: transparent;
      opacity: 1;

      .icon {
        display: inline-block;
        width: 30px;
        height: 30px;
        color: var(--color-primary);
      }
    }
  }
}
</style>

<style scoped lang="scss">
@media screen and (max-width: theme('screens.md')) {
  .swiper-button-prev,
  .swiper-button-next {
    display: none;
  }
}

.slider {
  display: flex;

  .swiper-wrapper {
    display: flex;
  }

  .swiper-slide {
    position: relative;
    height: 85vh !important;
    max-height: 85vh;

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    padding: 3rem 1.2rem;
    color: #fff;
    background-color: rgb(255 255 255 / 20%);
    border-radius: 4px;
    transition: all 0.3s ease;

    &:hover {
      color: #000;
      background-color: rgb(255 255 255 / 85%);
    }

    &::after {
      font-size: 20px;
    }
  }
}

.swiper-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  display: flex;
  height: 100%;

  .slogan {
    @apply text-white opacity-0 text-3xl md:text-5xl;

    font-weight: 700;
    text-shadow: 0 5px 10px rgb(0 0 0 / 80%);
  }

  .description {
    @apply text-white md:text-lg mt-4;

    text-shadow: 0 4px 8px rgb(0 0 0 / 80%);
  }

  .btn-contact {
    @apply mt-10 px-6 py-2 text-lg rounded-md font-medium  bg-white self-start text-slate-600;

    background-color: var(--color-primary);
    box-shadow: 0 5px 15px 0 rgb(0 0 0 / 60%);
  }
}
</style>
