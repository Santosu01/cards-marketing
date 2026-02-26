<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Card } from '../types'
import Button from '@/components/ui/Button.vue'
import { Plus } from 'lucide-vue-next'
import GameCard from './GameCard.vue'

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
</script>

<template>
  <div class="relative">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-6 pb-20">
      <GameCard v-for="card in cards" :key="card.id" :card="card" :selected="isSelected(card.id)"
        :action-label="actionLabel" @click="handleClick" @action="emit('action', $event)" />
    </div>

    <!-- Floating Action for Multi-Selection -->
    <transition name="page">
      <div v-if="showSelection && localSelectedIds.length > 0"
        class="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-bottom-4">
        <Button variant="gold"
          class="h-14 px-8 rounded-full shadow-[0_10px_40px_-10px_rgba(255,215,0,0.5)] gap-3 border-2 border-white/20"
          :loading="loading" @click="handleConfirm">
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

  </div>
</template>
