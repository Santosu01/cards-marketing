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
  <div class="group relative w-full">
    <input
      :type="type"
      v-model="model"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="
        cn(
          'text-foreground placeholder:text-muted-foreground/40 focus-visible:ring-primary/40 focus-visible:border-primary/40 flex h-12 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 text-sm shadow-inner transition-all hover:border-white/20 hover:bg-white/[0.05] focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          error &&
            'border-destructive/40 focus-visible:ring-destructive/40 focus-visible:border-destructive/40',
          props.class,
        )
      "
    />
  </div>
</template>
