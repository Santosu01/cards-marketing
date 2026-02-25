<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  type?: string
  placeholder?: string
  class?: string
  disabled?: boolean
  error?: string
}

const model = defineModel<string | number>()
const props = defineProps<Props>()
</script>

<template>
  <input
    :type="type"
    v-model="model"
    :disabled="disabled"
    :placeholder="placeholder"
    :class="cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      error && 'border-destructive focus-visible:ring-destructive',
      props.class
    )"
  />
</template>
