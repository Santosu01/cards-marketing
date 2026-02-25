<script setup lang="ts">
import type { Trade } from '../types'
import Button from '@/components/ui/Button.vue'
import { ArrowLeftRight, User, Calendar } from 'lucide-vue-next'

const props = defineProps<{
  trade: Trade
  isOwn?: boolean
}>()

const emit = defineEmits(['delete'])

const offering = props.trade.tradeCards.filter(c => c.type === 'OFFERING')
const receiving = props.trade.tradeCards.filter(c => c.type === 'RECEIVING')

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}
</script>

<template>
  <div class="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-in fade-in slide-in-from-bottom-2 duration-300">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <User class="w-4 h-4 text-primary" />
        </div>
        <div>
          <p class="text-sm font-semibold truncate max-w-[150px]">{{ trade.user.name }}</p>
          <div class="flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
             <Calendar class="w-3 h-3" />
             {{ formatDate(trade.createdAt) }}
          </div>
        </div>
      </div>
      <Button v-if="isOwn" variant="destructive" size="sm" @click="emit('delete', trade.id)">
        Excluir
      </Button>
    </div>

    <div class="grid grid-cols-[1fr,auto,1fr] gap-4 items-center mb-4">
      <div class="space-y-2">
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Oferecendo</p>
        <div class="flex flex-wrap justify-center gap-2">
          <div v-for="tc in offering" :key="tc.id" class="group relative aspect-[2/3] w-full rounded-lg overflow-hidden border bg-muted shadow-sm hover:border-primary/50 transition-colors">
            <img :src="tc.card.imageUrl" :alt="tc.card.name" class="object-cover w-full h-full transition-transform group-hover:scale-110" />
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <p class="text-[10px] text-white font-medium line-clamp-2 leading-tight">{{ tc.card.name }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center">
        <ArrowLeftRight class="w-5 h-5 text-muted-foreground" />
      </div>

      <div class="space-y-2">
        <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">Recebendo</p>
        <div class="flex flex-wrap justify-center gap-2">
          <div v-for="tc in receiving" :key="tc.id" class="group relative aspect-[2/3] w-full rounded-lg overflow-hidden border bg-muted shadow-sm hover:border-primary/50 transition-colors">
             <img :src="tc.card.imageUrl" :alt="tc.card.name" class="object-cover w-full h-full transition-transform group-hover:scale-110" />
             <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
               <p class="text-[10px] text-white font-medium line-clamp-2 leading-tight">{{ tc.card.name }}</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
