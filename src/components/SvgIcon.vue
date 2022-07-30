<template>
  <svg aria-hidden="true">
    <use
      :xlink:href="symbolId"
      :fill="color"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon',
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'currentColor',
    },
  },

  setup (props) {
    const symbolId = computed(() => {
      // 区分 icons 根目录与子目录下的图标
      if (props.name.indexOf('/') > -1) {
        return `#${props.prefix}__${props.name}`
      } else {
        return `#${props.prefix}__/${props.name}`
      }
    })

    return { symbolId }
  },
})
</script>
