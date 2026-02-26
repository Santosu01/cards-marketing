<script setup lang="ts">
import { ref } from 'vue'
import type { Card } from '../types'
import { Maximize2, Check, Plus, Minus } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import CardExpandModal from './CardExpandModal.vue'

interface Props {
  card: Card
  variant?: 'compact' | 'full'
  selected?: boolean
  actionLabel?: string
  isSelectable?: boolean
  showSelection?: boolean
  disableClick?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'full',
  selected: false,
  isSelectable: false,
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
    class="group bg-card holographic relative flex flex-col overflow-hidden rounded-xl border-2 border-white/5 transition-all duration-300"
    :class="[
      variant === 'full'
        ? 'hover:border-primary/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,215,0,0.2)]'
        : 'hover:border-primary/30 hover:z-20 hover:scale-105',
      selected
        ? 'ring-primary border-primary shadow-[0_0_30px_-5px_hsla(var(--primary),0.4)] ring-2'
        : '',
    ]"
    @click="!disableClick && emit('click', card.id)"
  >
    <div class="bg-muted/20 relative aspect-[2/3] w-full overflow-hidden">
      <img
        :src="card.imageUrl"
        :alt="card.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      <!-- Rarity Badge (only in full) -->
      <div
        v-if="variant === 'full'"
        class="absolute top-2 left-2 rounded border border-white/10 bg-black/60 px-1.5 py-0.5 text-[8px] font-black tracking-tighter text-white/90 uppercase backdrop-blur-md"
      >
        Rare
      </div>

      <!-- Selection Overlay -->
      <div v-if="selected" class="bg-primary/10 absolute inset-0 backdrop-blur-[1px]"></div>

      <!-- Quick Action Overlay -->
      <div
        class="absolute inset-x-0 bottom-0 z-30 flex gap-1.5 p-2"
        :class="[
          variant === 'full' ? 'bg-gradient-to-t from-black/80 via-black/40 to-transparent' : '',
        ]"
      >
        <button
          class="group/btn flex h-9 flex-1 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-zinc-800 text-white transition-all hover:bg-zinc-700 active:scale-95"
          title="Ver detalhes"
          @click.stop="handleExpand"
        >
          <Maximize2 class="h-4 w-4 transition-transform group-hover/btn:scale-110" />
        </button>

        <button
          v-if="showSelection || isSelectable"
          class="group/btn flex h-9 flex-1 cursor-pointer items-center justify-center rounded-lg transition-all active:scale-95"
          :class="
            selected
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-primary text-primary-foreground hover:bg-primary/80'
          "
          :title="selected ? 'Remover' : 'Selecionar'"
          @click.stop="emit('click', card.id)"
        >
          <Minus v-if="selected" class="h-4 w-4 transition-transform group-hover/btn:scale-110" />
          <Plus v-else class="h-4 w-4 transition-transform group-hover/btn:scale-110" />
        </button>
      </div>

      <!-- Expand Modal -->
      <Teleport to="body">
        <CardExpandModal :card="isExpanded ? card : null" @close="isExpanded = false" />
      </Teleport>
    </div>

    <!-- Info Section (only in full) -->
    <div v-if="variant === 'full'" class="from-card to-background space-y-1 bg-gradient-to-b p-2.5">
      <h3
        class="group-hover:text-primary truncate text-[11px] leading-tight font-black tracking-tight uppercase italic transition-colors sm:text-xs"
      >
        {{ card.name }}
      </h3>
      <p
        class="text-muted-foreground/80 line-clamp-2 h-5 text-[9px] leading-tight font-medium sm:h-6"
      >
        {{ card.description }}
      </p>

      <div v-if="actionLabel" class="pt-1.5">
        <Button
          variant="gold"
          size="sm"
          class="h-7 w-full text-[9px] sm:h-8 sm:text-[10px]"
          @click.stop="emit('action', card.id)"
        >
          {{ actionLabel }}
        </Button>
      </div>
    </div>

    <!-- Selection Indicator -->
    <div
      v-if="selected"
      class="bg-primary text-primary-foreground animate-in zoom-in absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/20 shadow-lg duration-300 sm:h-7 sm:w-7"
    >
      <Check class="h-3 w-3 stroke-[4] sm:h-4 sm:w-4" />
    </div>

    <!-- Decorative Corners -->
    <template v-if="variant === 'full'">
      <div class="absolute top-0 left-0 h-2 w-2 border-t border-l border-white/10"></div>
      <div class="absolute top-0 right-0 h-2 w-2 border-t border-r border-white/10"></div>
      <div class="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-white/10"></div>
      <div class="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-white/10"></div>
    </template>
  </div>
</template>
