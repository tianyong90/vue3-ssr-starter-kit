<template>
  <div
    class="t-form-control"
    :class="cssClass"
  >
    <slot />
    <span
      v-if="error"
      class="form-error-msg"
    >{{ error }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  error: {
    type: String,
    default: null,
  },
})

const cssClass = computed(() => {
  const ret = {}

  if (props.error) {
    ret.error = true
  }

  return ret
})
</script>

<style scoped lang="scss">
.t-form-control {
  @apply relative;

  .form-error-msg {
    @apply inline text-red-600 text-sm;
  }
}
</style>
