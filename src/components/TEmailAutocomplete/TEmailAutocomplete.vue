<template>
  <div
    class="t-input"
    :class="cssClass"
  >
    <Combobox v-model="currentValue">
      <ComboboxInput
        :placeholder="placeholder"
        @change="query = $event.target.value"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <TransitionRoot
        leave="transition ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions class="options-popup">
          <ComboboxOption
            v-for="item in filteredMailAddress"
            :key="item"
            v-slot="{ selected, active }"
            as="template"
            :value="item"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-teal-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                {{ item }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }"
              >
                <CheckIcon
                  class="h-5 w-5"
                  aria-hidden="true"
                />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </Combobox>
    <div class="wrapper">
      <label
        class="t-input-label"
        for=""
      >{{ label }}</label>
      <span class="star">*</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

import { emailSuffixes } from './mail-suffixes'

const props = defineProps({
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
})

const emits = defineEmits({
  'update:modelValue': String,
})

const currentValue = ref('')
const query = ref('')

/**
 * 国家名称过滤器
 */
const filteredMailAddress = computed(() => {
  if (!query.value) {
    return []
  }

  const splitedParts = query.value.split('@')
  let res = []

  if (splitedParts.length === 1) {
    // 还没有输入 @
    res = emailSuffixes.map(suffix => {
      return query.value + suffix
    })
  } else if (splitedParts.length === 2) {
    // 输入了 @
    res = emailSuffixes
      .filter((suffix) => {
        return suffix.includes('@' + splitedParts[1])
      })
      .map(suffix => {
        return splitedParts[0] + suffix
      })
  }

  return res
})

const cssClass = computed(() => {
  {
    const ret = {}

    if (props.required) {
      ret.required = true
    }

    return ret
  }
})

watch(() => props.modelValue, (val) => {
  currentValue.value = val
})

watch(currentValue, (val) => {
  emits('update:modelValue', val)
})
</script>

<style scoped lang="scss">
.t-input {
  @apply relative;

  input {
    @apply outline-none border border-gray-400 rounded-md pl-6 h-10 w-full;

    &::placeholder {
      @apply text-gray-600 text-sm;
    }

    &:focus {
      @apply shadow shadow-blue-400 border-blue-500;
    }
  }

  .t-input-label {
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

  input:placeholder-shown + .wrapper {
    .t-input-label {
      z-index: -1;
      visibility: hidden;
      transform: translate3d(0.5em, 0.5em, 0);
    }
  }

  input:focus:not(:placeholder-shown) + .wrapper {
    .t-input-label {
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

  input:not(:placeholder-shown) + .wrapper {
    .star {
      display: none;
    }
  }

  .options-popup {
    @apply z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm;
  }
}
</style>
