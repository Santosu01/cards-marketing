<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Card } from '../types'
import Button from '@/components/ui/Button.vue'
import { Check, Plus, Maximize2, X } from 'lucide-vue-next'

const props = defineProps<{
  cards: Card[]
  actionLabel?: string
  loading?: boolean
  selectedIds?: string[]
  showSelection?: boolean
}>()

const emit = defineEmits<{
  action: [id: string]
  'toggle-selection': [id: string]
  'confirm-selection': [ids: string[]]
}>()

const localSelectedIds = ref<string[]>([])
const expandedCard = ref<Card | null>(null)

const toggleLocal = (id: string) => {
  if (localSelectedIds.value.includes(id)) {
    localSelectedIds.value = localSelectedIds.value.filter(i => i !== id)
    return
  }
  localSelectedIds.value.push(id)
}

const handleConfirm = () => {
  emit('confirm-selection', localSelectedIds.value)
  localSelectedIds.value = []
}

watch(() => props.showSelection, () => {
  localSelectedIds.value = []
})

const isSelected = (id: string) => {
  if (props.showSelection) return localSelectedIds.value.includes(id)
  return props.selectedIds?.includes(id) || false
}

const handleClick = (id: string) => {
  if (props.showSelection) {
    toggleLocal(id)
    return
  }
  emit('toggle-selection', id)
}

const openExpand = (card: Card) => {
  expandedCard.value = card
}

const closeExpand = () => {
  expandedCard.value = null
}
</script>

<template>
  <div class="relative">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 pb-20">
      <div 
        v-for="card in cards" 
        :key="card.id" 
        class="group relative flex flex-col bg-card border-2 border-white/5 rounded-xl overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,215,0,0.2)] cursor-pointer holographic"
        :class="isSelected(card.id) ? 'ring-2 ring-primary border-primary shadow-[0_0_30px_-5px_hsla(var(--primary),0.4)]' : ''"
        @click="handleClick(card.id)"
      >
        <div class="aspect-[2/3] w-full bg-muted/20 overflow-hidden relative">
          <img 
            :src="card.imageUrl" 
            :alt="card.name" 
            class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          <div class="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[8px] font-black uppercase tracking-tighter text-white/90">
            Rare
          </div>

          <!-- Expand Trigger -->
          <button 
            class="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary/80"
            @click.stop="openExpand(card)"
          >
            <Maximize2 class="w-4 h-4" />
          </button>

          <div v-if="isSelected(card.id)" class="absolute inset-0 bg-primary/10 backdrop-blur-[1px]"></div>
        </div>
        
        <div class="p-2.5 space-y-1 bg-gradient-to-b from-card to-background">
          <h3 class="font-black text-[11px] sm:text-xs uppercase tracking-tight truncate leading-tight italic group-hover:text-primary transition-colors">
            {{ card.name }}
          </h3>
          <p class="text-[9px] text-muted-foreground/80 line-clamp-2 leading-tight h-5 sm:h-6 font-medium">
            {{ card.description }}
          </p>
          
          <div v-if="actionLabel" class="pt-1.5">
            <Button variant="gold" size="sm" class="w-full h-7 sm:h-8 text-[9px] sm:text-[10px]" @click.stop="emit('action', card.id)">
              {{ actionLabel }}
            </Button>
          </div>
        </div>
        
        <!-- Selection Indicator -->
        <div v-if="isSelected(card.id)" class="absolute top-1.5 right-1.5 w-6 h-6 sm:w-7 sm:h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300 border-2 border-white/20">
          <Check class="w-3 h-3 sm:w-4 sm:h-4 stroke-[4]" />
        </div>
        
        <!-- Decoration -->
        <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10"></div>
        <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10"></div>
        <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10"></div>
        <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10"></div>
      </div>
    </div>

    <!-- Floating Action for Multi-Selection -->
    <transition name="page">
      <div v-if="showSelection && localSelectedIds.length > 0" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-4">
        <Button 
          variant="gold" 
          class="h-14 px-8 rounded-full shadow-[0_10px_40px_-10px_rgba(255,215,0,0.5)] gap-3 border-2 border-white/20"
          :loading="loading"
          @click="handleConfirm"
        >
          <div class="flex flex-col items-center -space-y-1">
            <span class="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Adicionar</span>
            <span class="text-sm font-black uppercase tracking-tighter">{{ localSelectedIds.length }} Cartas</span>
          </div>
          <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Plus class="w-5 h-5" />
          </div>
        </Button>
      </div>
    </transition>

    <!-- Expand Modal -->
    <transition name="page">
      <div v-if="expandedCard" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-background/90 backdrop-blur-xl" @click="closeExpand">
        <div class="relative max-w-2xl w-full aspect-[2/3] animate-in zoom-in duration-300 shadow-[0_0_100px_-20px_hsla(var(--primary),0.3)] rounded-3xl overflow-hidden border-2 border-white/10 holographic" @click.stop>
          <img 
            :src="expandedCard.imageUrl" 
            :alt="expandedCard.name" 
            class="object-contain w-full h-full"
          />
          <button 
            class="absolute top-4 right-4 w-12 h-12 bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-colors hover:scale-110 active:scale-95"
            @click="closeExpand"
          >
            <X class="w-6 h-6" />
          </button>

          <div class="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <h2 class="text-3xl font-black uppercase tracking-tighter text-white italic mb-2">{{ expandedCard.name }}</h2>
            <p class="text-muted-foreground text-lg max-w-lg">{{ expandedCard.description }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
