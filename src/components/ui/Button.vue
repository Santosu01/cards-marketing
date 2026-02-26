<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'gold'
    | 'holographic'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  class?: string
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
})

const variants: Record<string, string> = {
  default:
    'bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 uppercase tracking-wider font-bold',
  destructive:
    'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/20 hover:bg-destructive/90 active:scale-95',
  outline:
    'border-2 border-primary/30 bg-transparent text-primary hover:bg-primary/10 hover:border-primary/60 active:scale-95 uppercase tracking-widest font-extrabold',
  secondary:
    'bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/80 active:scale-95',
  ghost: 'hover:bg-accent hover:text-accent-foreground active:scale-95',
  link: 'text-primary underline-offset-4 hover:underline',
  gold: 'gold-gradient text-primary-foreground border-b-4 border-yellow-700 shadow-[0_4px_0_0_rgba(133,96,21,1)] hover:brightness-110 active:translate-y-1 active:border-b-0 active:mb-[4px] uppercase tracking-widest font-black',
  holographic:
    'holographic bg-white/5 text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/10 active:scale-95 uppercase tracking-tighter font-black italic',
}

const sizes: Record<string, string> = {
  default: 'h-11 px-6 py-2.5',
  sm: 'h-9 px-4 text-xs',
  lg: 'h-14 px-10 text-base',
  icon: 'h-11 w-11',
}
</script>

<template>
  <button
    :disabled="disabled || loading"
    :class="
      cn(
        'ring-offset-background focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-lg text-sm whitespace-nowrap transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        props.class,
      )
    "
  >
    <div
      v-if="loading"
      class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    ></div>
    <slot v-if="!loading" />
    <span v-else>Carregando...</span>
  </button>
</template>
