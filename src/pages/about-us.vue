<template>
  <main>
    <top-banner
      slogan="Reliable Lithium Battery"
      sub-slogan="Provide lithium batteries for users all over the world."
      :bg-src="bgResource"
    />
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'

import bgResource from '@/assets/img/about/banner.jpg'

import WhyTrustUs from '@/components/about-us/WhyTrustUs.vue'
import CertificateSwiper from '@/components/about-us/CertificateSwiper.vue'
import VisionAndMission from '@/components/about-us/VisionAndMission.vue'

import { useHeadByKey } from '@/composables/useSeo'

// GSAP
// import gsap from 'gsap'

// useHead
useHeadByKey('about_us')

const processImages = [
  {
    cover: '/img/about/production-process/1.jpg',
    name: 'R&D',
    description: 'Our R&D team can help you analyze and design the required battery or energy storage system.',
  },
  {
    cover: '/img/about/production-process/2.jpg',
    name: 'Cell Matching',
    description: 'As part of quality control, each unit is measured and segregated into categories according to their capacity levels.',
  },
  {
    cover: '/img/about/production-process/3.jpg',
    name: 'Terminal Connection',
    description: 'Tab to terminal connections, internal terminal connections, tab welding, seam welding, fill port welding, short circuit protection, laser marking.',
  },
  {
    cover: '/img/about/production-process/4.jpg',
    name: 'BMS Testing',
    description: 'Battery Management System, supporting Bluetooth, communication, or remote control.',
  },
  {
    cover: '/img/about/production-process/5.jpg',
    name: 'Assembly',
    description: 'The assembly process is an important mechanism to ensure optimal battery performance.',
  },
  {
    cover: '/img/about/production-process/6.jpg',
    name: 'Aging & Testing',
    description: 'To ensure the integrity and quality of welded or sealed housing components, our ageing test department has extensive experience  in testing systems.',
  },
]

// function initGsap () {
//   gsap.fromTo('.production-process .process-item', {
//     opacity: 0,
//     // y: '+30px',
//   }, {
//     opacity: 1,
//     // y: 0,
//     ease: 'power2.out',
//     stagger: 0.1,
//     duration: 0.5,
//     scrollTrigger: {
//       trigger: '.production-process',
//       start: 'top 70%',
//       end: 'bottom top',
//     },
//   })
// }

onMounted(() => {
  // initGsap()
})
</script>

<style scoped lang="scss">
.section-profile {
  background-color: #f8f8f8;

  .description {
    @apply flex-1;

    .title {
      @apply text-2xl md:text-3xl;

      margin-bottom: 0.5em;
      font-weight: 700;
      line-height: 1.3;
      color: #333;
    }
  }

  .factory-image {
    @apply flex-1 self-center order-first md:order-last mb-5 md:mb-0;

    img {
      box-shadow: 0 5px 10px 3px rgb(0 0 0 / 40%);
    }
  }
}

.production-process {
  @apply grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8;

  .process-item {
    @apply w-full;

    box-shadow: 0 5px 30px 0 rgb(0 0 0 / 10%);

    .process-img-wrapper {
      @apply w-full aspect-w-11 aspect-h-7;
    }

    .name {
      @apply text-2xl;

      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #333;
    }

    .description {
      line-height: 1.5;
      color: #666;
    }
  }
}
</style>
