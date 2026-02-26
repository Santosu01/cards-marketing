<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  for?: string
  error?: string | boolean
  class?: string
}

const props = defineProps<Props>()
</script>

<template>
  <label
    :for="props.for"
    :class="
      cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.error && 'text-destructive',
        props.class,
      )
    "
  >
    <slot />
  </label>
</template>
