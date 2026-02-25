<script setup lang="ts">
import type { Card } from '../types'
import Button from '@/components/ui/Button.vue'
import { Check } from 'lucide-vue-next'

defineProps<{
  cards: Card[]
  actionLabel?: string
  loading?: boolean
  selectedIds?: string[]
}>()

const emit = defineEmits<{
  action: [id: string]
  'toggle-selection': [id: string]
}>()
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    <div 
      v-for="card in cards" 
      :key="card.id" 
      class="group relative flex flex-col bg-card border rounded-xl overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg cursor-pointer"
      :class="selectedIds?.includes(card.id) ? 'ring-2 ring-primary border-primary' : ''"
      @click="emit('toggle-selection', card.id)"
    >
      <div class="aspect-[2/3] w-full bg-muted overflow-hidden relative">
        <img 
          :src="card.imageUrl" 
          :alt="card.name" 
          class="object-cover w-full h-full transition-transform group-hover:scale-105"
          loading="lazy"
        />
        <div v-if="selectedIds?.includes(card.id)" class="absolute inset-0 bg-primary/20 backdrop-blur-[1px]"></div>
      </div>
      <div class="p-3 space-y-1 bg-card">
        <h3 class="font-bold text-sm truncate leading-tight">{{ card.name }}</h3>
        <p class="text-[10px] text-muted-foreground line-clamp-2 leading-tight h-6">
          {{ card.description }}
        </p>
        <div v-if="actionLabel" class="pt-2">
          <Button variant="outline" size="sm" class="w-full h-8 text-[11px]" @click.stop="emit('action', card.id)">
            {{ actionLabel }}
          </Button>
        </div>
      </div>
      
      <div v-if="selectedIds?.includes(card.id)" class="absolute top-2 right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-200">
        <Check class="w-4 h-4" />
      </div>
    </div>
  </div>
</template>
