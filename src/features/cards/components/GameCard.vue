<script setup lang="ts">
import { ref } from 'vue'
import type { Card } from '../types'
import { Maximize2, Check } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import CardExpandModal from './CardExpandModal.vue'

interface Props {
  card: Card
  variant?: 'compact' | 'full'
  selected?: boolean
  actionLabel?: string
  isSelectable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'full',
  selected: false,
  isSelectable: false
})

const emit = defineEmits<{
  expand: [card: Card]
  click: [id: string]
  action: [id: string]
}>()

const isExpanded = ref(false)

const handleExpand = () => {
  isExpanded.value = true
  emit('expand', props.card)
}
</script>

<template>
  <div
    class="group relative flex flex-col bg-card border-2 border-white/5 rounded-xl overflow-hidden transition-all duration-300 cursor-pointer holographic"
    :class="[
      variant === 'full' ? 'hover:border-primary/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,215,0,0.2)]' : 'hover:scale-105 hover:z-20 hover:border-primary/30',
      selected ? 'ring-2 ring-primary border-primary shadow-[0_0_30px_-5px_hsla(var(--primary),0.4)]' : ''
    ]" @click="emit('click', card.id)">
    <div class="aspect-[2/3] w-full bg-muted/20 overflow-hidden relative">
      <img :src="card.imageUrl" :alt="card.name"
        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" loading="lazy" />

      <!-- Rarity Badge (only in full) -->
      <div v-if="variant === 'full'"
        class="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[8px] font-black uppercase tracking-tighter text-white/90">
        Rare
      </div>

      <!-- Expand Trigger -->
      <button
        class="absolute z-10 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/80"
        :class="variant === 'full' ? 'top-2 right-2 w-8 h-8' : 'inset-0 m-auto w-10 h-10 rounded-full'"
        @click.stop="handleExpand">
        <Maximize2 :class="variant === 'full' ? 'w-4 h-4' : 'w-5 h-5'" />
      </button>

      <!-- Expand Modal -->
      <Teleport to="body">
        <CardExpandModal :card="isExpanded ? card : null" @close="isExpanded = false" />
      </Teleport>

      <!-- Selection Overlay -->
      <div v-if="selected" class="absolute inset-0 bg-primary/10 backdrop-blur-[1px]"></div>
    </div>

    <!-- Info Section (only in full) -->
    <div v-if="variant === 'full'" class="p-2.5 space-y-1 bg-gradient-to-b from-card to-background">
      <h3
        class="font-black text-[11px] sm:text-xs uppercase tracking-tight truncate leading-tight italic group-hover:text-primary transition-colors">
        {{ card.name }}
      </h3>
      <p class="text-[9px] text-muted-foreground/80 line-clamp-2 leading-tight h-5 sm:h-6 font-medium">
        {{ card.description }}
      </p>

      <div v-if="actionLabel" class="pt-1.5">
        <Button variant="gold" size="sm" class="w-full h-7 sm:h-8 text-[9px] sm:text-[10px]"
          @click.stop="emit('action', card.id)">
          {{ actionLabel }}
        </Button>
      </div>
    </div>

    <!-- Selection Indicator -->
    <div v-if="selected"
      class="absolute top-1.5 right-1.5 w-6 h-6 sm:w-7 sm:h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300 border-2 border-white/20">
      <Check class="w-3 h-3 sm:w-4 sm:h-4 stroke-[4]" />
    </div>

    <!-- Decorative Corners -->
    <template v-if="variant === 'full'">
      <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10"></div>
      <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10"></div>
      <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10"></div>
      <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10"></div>
    </template>
  </div>
</template>
