<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-vue-next'

interface Props {
  placeholder?: string
  class?: string
  disabled?: boolean
  error?: string
}

const model = defineModel<string>()
const props = defineProps<Props>()

const showPassword = ref(false)

const toggleVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="relative w-full group">
    <input
      :type="showPassword ? 'text' : 'password'"
      v-model="model"
      :disabled="disabled"
      :placeholder="placeholder"
      :class="cn(
        'flex h-12 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 pr-12 text-sm text-foreground shadow-inner transition-all placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/40 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-white/[0.05] hover:border-white/20',
        error && 'border-destructive/40 focus-visible:ring-destructive/40 focus-visible:border-destructive/40',
        props.class
      )"
    />
    <button
      type="button"
      class="absolute right-3 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-muted-foreground/60 hover:text-primary transition-colors focus:outline-none"
      @click="toggleVisibility"
      tabindex="-1"
    >
      <EyeOff v-if="showPassword" class="w-4 h-4" />
      <Eye v-else class="w-4 h-4" />
    </button>
  </div>
</template>
