<template>
  <div
    class="t-textarea"
    :class="cssClass"
  >
    <textarea
      :value="modelValue"
      :rows="rows"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div class="wrapper">
      <label
        class="t-textarea-label"
        for=""
      >{{ label }}</label>
      <span class="star">*</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TInput',

  props: {
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: null,
    },
    rows: {
      type: Number,
      default: 5,
    },
  },

  computed: {
    cssClass () {
      const ret = {}

      if (this.required) {
        ret.required = true
      }

      return ret
    },
  },
})
</script>

<style scoped lang="scss">
.t-textarea {
  @apply relative;

  textarea {
    @apply outline-none border border-gray-400 rounded-md pl-6 pt-3 w-full;

    &::placeholder {
      @apply text-gray-600 text-sm;
    }

    &:focus {
      @apply shadow shadow-blue-400 border-blue-500;
    }
  }

  .t-textarea-label {
    position: absolute;
    top: 0;
    left: 0.5em;
    z-index: 1;
    padding: 0 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    color: #444;
    background-color: #fff;
    visibility: visible;
    transform: translate3d(0, -0.9em, 0);
    transition: transform 0.1s ease-in-out,
      z-index 0ms,
      visibility 0ms;
  }

  textarea:placeholder-shown + .wrapper {
    .t-textarea-label {
      z-index: -1;
      visibility: hidden;
      transform: translate3d(0.5em, 0.5em, 0);
    }
  }

  textarea:focus:not(:placeholder-shown) + .wrapper {
    .t-textarea-label {
      @apply bg-blue-600 text-white rounded-sm;
    }
  }

  /* required 红星标记 */
  &.required {
    .star {
      @apply text-red-500 absolute text-xl font-bold;

      top: 0.65rem;
      left: 0.35em;
    }
  }

  &:not(.required) .star {
    display: none;
  }

  textarea:not(:placeholder-shown) + .wrapper {
    .star {
      display: none;
    }
  }
}
</style>
