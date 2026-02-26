<script setup lang="ts">
import {
  FormField,
  FormLabel,
  FormMessage,
} from './index'
import PasswordInput from '../PasswordInput.vue'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <FormField v-slot="{ id, componentField, errorMessage }" :name="name">
    <div :class="cn('space-y-2', props.class)">
      <FormLabel v-if="label" :for="id" :error="!!errorMessage">
        {{ label }}
      </FormLabel>
      <PasswordInput
        :id="id"
        v-bind="componentField"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="errorMessage"
      />
      <FormMessage :id="id" :error="errorMessage" />
    </div>
  </FormField>
</template>
