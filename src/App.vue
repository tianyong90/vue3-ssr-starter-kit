<template>
  <div>
    <Header />
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>

    <Footer />
    <BackToTop />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import Header from '@/components/Header'
import Footer from '@/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'
</script>
