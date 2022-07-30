<template>
  <main>
    <Banner />
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted, useSSRContext } from 'vue'

// components
import Banner from '@/components/index/Banner.vue'

import { useHeadByKey } from '@/composables/useSeo'

// GSAP
import gsap, { Sine } from 'gsap'

const commonSections = [
  {
    title: '<span class="color-primary">LiFePO4 Battery</span><br/>for Energy Storage Pack',
    urlHash: '#lifepo4-battery-pack',
    description: 'IMPROVE - Lithium Iron Phosphate Battery (LiFePO4) have higher energy density and service life, which makes them an alternative to lead-acid battery products. An excellent choice in any industry. At the same time, we can customize according to unique needs.',
    buttonText: 'Discover More',
    img: '/img/index/energy-storage.png',
    bgImg: '/img/index/bg-energy-storage.jpg',
    bgGray: true,
  },
  {
    title: '<span class="color-primary">LiFePO4 Battery</span><br/>FOR Cabinet Type ESS',
    urlHash: '#cabinet-type-energy-storage',
    description: 'IMPROVE Cabinet Type series is a safe and versatile lifepo4 battery solution. It has been developed to offer power back-up for remote or outside telecommunications plants like Accessibility Terminals, Base Transceiver Stations, Base Station Controllers. The battery pack is compact, allowing multiple parallel configurations in the battery pack.',
    buttonText: 'Discover More',
    img: '/img/index/cabinet-type-ess.png',
    bgImg: '/img/index/bg-cabinet-type-ess.jpg',
    reverse: true,
  },
  {
    title: '<span class="color-primary">LiFePO4 Battery</span><br/>FOR Household ESS',
    urlHash: '#household-energy-storage',
    description: 'IMPROVE Powerwall ESS which is a new product of energy storage system. It is a compact household battery. Your solar energy can be stored for backup protection and also reduce your reliance on the grid The energy is 5kwh/unit. Home ESS systems can be combined in parallel.',
    buttonText: 'Discover More',
    img: '/img/index/household-ess.png',
    bgImg: '/img/index/bg-household-ess.jpg',
    bgGray: true,
  },
  {
    title: '<span class="color-primary">LiFePO4 Battery</span><br/>FOR Golf Cart & Forklift',
    urlHash: '#golf-cart-lifepo4-battery',
    description: 'Use IMPROVE Lithium Iron Phosphate (LiFePO4) battery for your Golf Cart, allowing you to enjoy the best freedom and comfort in golf No more worrying about battery life. IMPROVE\'s Golft Cart Lithium Batteries offer huge energy reserves, are significantly lighter in weight, are easy to install and last much longer than lead-acid batteries.',
    buttonText: 'Discover More',
    img: '/img/index/golf-cart.png',
    bgImg: '/img/index/bg-golf-cart.jpg',
    reverse: true,
  },
]

// useHead
useHeadByKey('home')

function initGsap () {
  gsap.fromTo('.news-item', {
    opacity: 0,
    y: '50%',
    markers: false,
  }, {
    opacity: 1,
    y: 0,
    ease: Sine.easeOut,
    stagger: 0.1,
    duration: 0.5,
    scrollTrigger: {
      trigger: '.news',
      start: 'top 70%',
      end: 'bottom top',
    },
  })
}

onMounted(() => {
  initGsap()
})
</script>

<style scoped lang="scss">
.section-description {
  background-image: url('/img/solar.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 220px auto;
}

@screen lg {
  .request-form {
    @apply w-1/2 mx-auto;

    .form-control {
      @apply flex flex-col w-full;

      input,
      textarea {
        @apply w-full outline-none border border-gray-400 rounded-sm;
      }
    }

    .btn-submit {
      @apply px-8 py-2 text-white rounded-md;

      background-color: var(--color-primary);
    }
  }
}
</style>
