<script setup lang="ts">
import { computed } from 'vue'
import type { Trade } from '../types'
import Button from '@/components/ui/Button.vue'
import { ArrowRight, User, Calendar, Trash2, Sparkles } from 'lucide-vue-next'
import GameCard from '@/features/cards/components/GameCard.vue'

const props = defineProps<{
  trade: Trade
  isOwn?: boolean
}>()

const emit = defineEmits<{
  delete: [id: string]
}>()

const offering = computed(() => props.trade.tradeCards.filter((c) => c.type === 'OFFERING'))
const receiving = computed(() => props.trade.tradeCards.filter((c) => c.type === 'RECEIVING'))

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>

<template>
  <div
    class="group bg-card/40 hover:border-primary/30 animate-in fade-in slide-in-from-bottom-4 relative rounded-2xl border-2 border-white/5 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]"
  >
    <!-- Header: Duelist Info -->
    <div class="flex items-center justify-between border-b border-white/5 bg-white/[0.02] p-4">
      <div class="flex items-center gap-3">
        <div
          class="group-hover:border-primary/50 relative h-10 w-10 rounded-full border border-white/10 p-0.5 transition-colors"
        >
          <div
            class="bg-muted/20 flex h-full w-full items-center justify-center overflow-hidden rounded-full"
          >
            <User class="text-muted-foreground h-5 w-5" />
          </div>
          <div
            class="bg-primary border-background absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-full border-2"
          >
            <Sparkles class="text-primary-foreground h-2 w-2" />
          </div>
        </div>
        <div>
          <p
            class="max-w-[120px] truncate text-xs font-black tracking-widest text-white uppercase italic"
          >
            {{ isOwn ? 'Sua Oferta' : trade.user.name }}
          </p>
          <div
            class="text-muted-foreground flex items-center gap-1.5 text-[9px] font-bold tracking-tighter uppercase"
          >
            <Calendar class="h-3 w-3 opacity-50" />
            {{ formatDate(trade.createdAt) }}
          </div>
        </div>
      </div>

      <Button
        v-if="isOwn"
        variant="holographic"
        size="sm"
        class="border-destructive/20 hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-lg p-0"
        @click="emit('delete', trade.id)"
      >
        <Trash2 class="h-4 w-4" />
      </Button>
      <div
        v-else
        class="bg-primary/10 border-primary/20 text-primary animate-pulse rounded border px-2 py-0.5 text-[8px] font-black tracking-widest uppercase"
      >
        Ativa
      </div>
    </div>

    <!-- Body: The Duel Board -->
    <div class="relative flex flex-col gap-6 p-5">
      <!-- Decorative background glow -->
      <div
        class="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-tr via-transparent to-transparent"
      ></div>

      <!-- Offering Section -->
      <div class="relative z-10 space-y-3">
        <h4
          class="text-muted-foreground flex items-center gap-2 text-[9px] font-black tracking-[0.3em] uppercase"
        >
          Oferecendo
          <span class="h-[1px] flex-1 bg-white/5"></span>
          <span class="text-primary">{{ offering.length }}</span>
        </h4>
        <div class="grid grid-cols-4 gap-2">
          <GameCard v-for="tc in offering" :key="tc.id" :card="tc.card" variant="compact" />
        </div>
      </div>

      <!-- VS / Arrow Divider -->
      <div class="flex items-center justify-center py-1">
        <div class="relative">
          <div class="bg-primary absolute inset-0 animate-pulse opacity-20 blur-xl"></div>
          <div
            class="border-primary/30 bg-background relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-2xl"
          >
            <ArrowRight class="text-primary h-5 w-5" />
          </div>
        </div>
      </div>

      <!-- Receiving Section -->
      <div class="relative z-10 space-y-3">
        <h4
          class="text-muted-foreground flex items-center gap-2 text-[9px] font-black tracking-[0.3em] uppercase"
        >
          Desejando
          <span class="h-[1px] flex-1 bg-white/5"></span>
          <span class="text-gold-gradient text-yellow-500">{{ receiving.length }}</span>
        </h4>
        <div class="grid grid-cols-4 gap-2">
          <GameCard v-for="tc in receiving" :key="tc.id" :card="tc.card" variant="compact" />
        </div>
      </div>
    </div>
  </div>
</template>
