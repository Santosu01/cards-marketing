<script setup lang="ts">
import { FormField, FormLabel, FormMessage } from './index'
import Input from '../Input.vue'
import { cn } from '@/lib/utils'

interface Props {
  name: string
  label?: string
  placeholder?: string
  type?: string
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
      <Input
        :id="id"
        v-bind="componentField"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :error="errorMessage"
      />
      <FormMessage :id="id" :error="errorMessage" />
    </div>
  </FormField>
</template>
