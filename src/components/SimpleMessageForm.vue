<template>
  <section class="py-10">
    <div class="container md:shadow-lg p-10">
      <h3 class="text-center text-3xl md:text-5xl font-bold text-gray-700">
        GET IN TOUCH NOW!
      </h3>
      <p class="my-5 text-center text-gray-600">
        Get a quote today from our most experienced consultants now!<br>
        We will reply you within 24 hrs.
      </p>

      <form
        id="indexMessageForm"
        ref="indexMessageForm"
        class="index-message-form"
        @submit.prevent="onSubmit"
      >
        <TFormControl
          class=""
          :error="getFieldError('email')"
        >
          <TEmailAutocomplete
            v-model="formData.email"
            type="text"
            label="Email"
            placeholder="Email"
            required
          />
        </TFormControl>
        <TFormControl
          class=""
          :error="getFieldError('phone')"
        >
          <TInput
            v-model="formData.phone"
            type="text"
            label="Tel/Whatsapp"
            placeholder="Tel/Whatsapp"
          />
        </TFormControl>
        <TFormControl
          class="col-span-2"
          :error="getFieldError('content')"
        >
          <TTextarea
            v-model="formData.content"
            label="Message"
            placeholder="Message"
            required
          />
        </TFormControl>

        <div class="md:col-span-2 flex justify-center">
          <button
            class="btn-submit"
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

import TFormControl from '@/components/TFormControl.vue'
import TEmailAutocomplete from '@/components/TEmailAutocomplete/index'
import TInput from '@/components/TInput.vue'
import TTextarea from '@/components/TTextarea.vue'

import Schema from 'async-validator'
import { http } from '@/utils/axios'
import message from '@/utils/message'

const descriptor = {
  email: [
    {
      type: 'string',
      required: true,
      message: 'Please enter your email',
    },
    {
      type: 'string',
      pattern: /^[A-Za-z0-9-_\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
      message: 'Email address is invalid',
    },
  ],
  content: {
    type: 'string',
    required: true,
    message: 'Please enter your message',
  },
}

const isSubmitting = ref(false)
const formData = ref({
  email: '',
  phone: '',
  content: '',
})

const formErrors = ref<any>(null)
// @ts-ignore
const validator = new Schema(descriptor)

/**
 * 提交留言
 */
async function onSubmit () {
  try {
    await validator.validate(formData.value)
  } catch (err) {
    formErrors.value = err.errors
    return
  }

  isSubmitting.value = true
  http.post('/messages', formData.value).then((res) => {
    formData.value = {
      email: '',
      phone: '',
      content: '',
    }
    nextTick(() => {
      formErrors.value = null
    })

    message.requestMessageSuccess()
  }).finally(() => {
    isSubmitting.value = false
  })
}

function getFieldError (field: string) {
  if (!formErrors.value) {
    return null
  }

  if (formErrors.value.find(({ field: f }) => f === field)) {
    return formErrors.value.find(({ field: f }) => f === field).message
  }

  return null
}

watch(formData, (val) => {
  if (validator) {
    validator.validate(val, (errors) => {
      formErrors.value = errors
    })
  }
}, {
  deep: true,
})
</script>

<style scoped lang="scss">
.index-message-form {
  @apply mx-auto w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-5;

  .btn-submit {
    @apply text-white inline-flex items-center justify-center font-semibold py-2 px-8 rounded-md;

    background-color: var(--color-primary);
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #fff;
      background-color: var(--color-primary);
    }
  }
}
</style>
