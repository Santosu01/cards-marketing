<script setup lang="ts">
import { computed } from 'vue'
import type { Trade } from '../types'
import Button from '@/components/ui/Button.vue'
import { ArrowRight, User, Calendar, Trash2, Sparkles } from 'lucide-vue-next'

const props = defineProps<{
  trade: Trade
  isOwn?: boolean
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()

const offering = computed(() => props.trade.tradeCards.filter(c => c.type === 'OFFERING'))
const receiving = computed(() => props.trade.tradeCards.filter(c => c.type === 'RECEIVING'))

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}
</script>

<template>
  <div class="group relative bg-card/40 backdrop-blur-xl border-2 border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-4">
    <!-- Header: Duelist Info -->
    <div class="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
      <div class="flex items-center gap-3">
        <div class="relative w-10 h-10 rounded-full border border-white/10 p-0.5 group-hover:border-primary/50 transition-colors">
          <div class="w-full h-full rounded-full bg-muted/20 flex items-center justify-center overflow-hidden">
            <User class="w-5 h-5 text-muted-foreground" />
          </div>
          <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center">
            <Sparkles class="w-2 h-2 text-primary-foreground" />
          </div>
        </div>
        <div>
          <p class="text-xs font-black uppercase tracking-widest text-white italic truncate max-w-[120px]">{{ isOwn ? 'Sua Oferta' : trade.user.name }}</p>
          <div class="flex items-center gap-1.5 text-[9px] text-muted-foreground font-bold uppercase tracking-tighter">
             <Calendar class="w-3 h-3 opacity-50" />
             {{ formatDate(trade.createdAt) }}
          </div>
        </div>
      </div>
      
      <Button v-if="isOwn" variant="holographic" size="sm" class="h-8 w-8 p-0 rounded-lg border-destructive/20 hover:bg-destructive/10 hover:text-destructive" @click="emit('delete', trade.id)">
        <Trash2 class="w-4 h-4" />
      </Button>
      <div v-else class="px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[8px] font-black uppercase tracking-widest text-primary animate-pulse">
        Ativa
      </div>
    </div>

    <!-- Body: The Duel Board -->
    <div class="p-5 flex flex-col gap-6 relative">
      <!-- Decorative background glow -->
      <div class="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none"></div>

      <!-- Offering Section -->
      <div class="space-y-3 relative z-10">
        <h4 class="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
          Oferecendo
          <span class="h-[1px] flex-1 bg-white/5"></span>
          <span class="text-primary">{{ offering.length }}</span>
        </h4>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="tc in offering" :key="tc.id" class="group/card relative aspect-[2/3] rounded-md overflow-hidden border border-white/10 bg-black/20 shadow-lg transform transition-transform group-hover/card:scale-105 group-hover/card:z-20">
            <img :src="tc.card.imageUrl" :alt="tc.card.name" class="object-cover w-full h-full" />
            <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          </div>
          <!-- Empty slots if needed to maintain grid -->
          <div v-for="i in Math.max(0, 0)" :key="i" class="aspect-[2/3] rounded-md border border-dashed border-white/5 bg-white/[0.02]"></div>
        </div>
      </div>

      <!-- VS / Arrow Divider -->
      <div class="flex items-center justify-center py-1">
        <div class="relative">
          <div class="absolute inset-0 bg-primary blur-xl opacity-20 animate-pulse"></div>
          <div class="relative w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center bg-background shadow-2xl">
            <ArrowRight class="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

      <!-- Receiving Section -->
      <div class="space-y-3 relative z-10">
        <h4 class="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
          Desejando
          <span class="h-[1px] flex-1 bg-white/5"></span>
          <span class="text-gold-gradient text-yellow-500">{{ receiving.length }}</span>
        </h4>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="tc in receiving" :key="tc.id" class="group/card relative aspect-[2/3] rounded-md overflow-hidden border border-white/10 bg-black/20 shadow-lg transform transition-transform group-hover/card:scale-105 group-hover/card:z-20">
            <img :src="tc.card.imageUrl" :alt="tc.card.name" class="object-cover w-full h-full" />
            <div class="absolute inset-0 bg-yellow-500/20 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer: Call to action (if not own) -->
    <div v-if="!isOwn" class="p-3 bg-white/[0.05] border-t border-white/5">
       <Button variant="gold" class="w-full h-9 text-[10px] rounded-lg">
         Propor Contraproposta
       </Button>
    </div>
  </div>
</template>
