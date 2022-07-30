<template>
  <transition
    name="custom-classes"
    enter-active-class="animate__animated animate__fast animate__fadeIn"
    leave-active-class="animate__animated animate__fast animate__fadeOut"
  >
    <div
      v-if="visible"
      class="mask"
      @click="handleClick"
    >
      <div class="btn-close">
        <svg-icon
          name="close"
          class="clost-icon"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps({
  value: {
    type: Boolean,
    default: false,
  },
})

const currentValue = ref(false)

const emit = defineEmits<{
  (e: 'close'): void
}>()

function handleClick (e) {
  currentValue.value = false

  emit('close')
}

</script>
