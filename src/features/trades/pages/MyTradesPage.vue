<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTradesQuery } from '../composables/use-trades-query'
import { useDeleteTradeMutation } from '../composables/use-delete-trade-mutation'
import { useAuth } from '@/features/auth/composables/use-auth'
import type { Trade } from '../types'
import TradeRequestItem from '../components/TradeRequestItem.vue'
import Button from '@/components/ui/Button.vue'
import { Plus, History, Sparkles } from 'lucide-vue-next'

const { user } = useAuth()
const { data: trades, isLoading } = useTradesQuery()
const deleteTradeMutation = useDeleteTradeMutation()

const currentUser = computed(() => user.value)

const myTrades = computed(() => {
  if (!trades.value || !currentUser.value) return []
  return trades.value.list.filter((t: Trade) => t.userId === currentUser.value?.id)
})

const handleDelete = (id: string) => {
  if (confirm('Tem certeza que deseja excluir esta solicitação de troca?')) {
    deleteTradeMutation.mutate(id)
  }
}
</script>

<template>
  <div class="container mx-auto p-4 md:p-8 space-y-10 max-w-7xl animate-in fade-in duration-500 pb-20">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 relative">
      <div class="space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          <History class="w-3 h-3" />
          Seu Histórico de Duelos
        </div>
        <div class="space-y-1">
          <h1 class="text-4xl md:text-5xl font-black tracking-tighter uppercase font-serif text-white italic">Minhas Trocas</h1>
          <p class="text-muted-foreground text-lg font-medium max-w-md">Gerencie e monitore suas propostas ativas.</p>
        </div>
      </div>
      
      <RouterLink to="/create-trade" class="shrink-0 flex items-center gap-4">
        <Button variant="gold" class="gap-3 h-14 px-8 shadow-[0_10px_30px_-10px_rgba(234,179,8,0.3)]">
          <Plus class="w-5 h-5" />
          <span class="text-sm font-black uppercase tracking-tighter">Nova Proposta</span>
        </Button>
      </RouterLink>
    </div>

    <!-- Loading State -->
    <div v-if="!!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 3" :key="i" class="h-80 bg-white/[0.02] border-2 border-white/5 rounded-2xl animate-pulse"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="myTrades.length === 0" class="text-center py-32 bg-white/[0.02] border-2 border-dashed border-white/5 rounded-3xl group">
      <div class="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-6 text-muted-foreground group-hover:scale-110 transition-transform duration-500">
        <Sparkles class="w-10 h-10" />
      </div>
      <div class="space-y-3">
        <h3 class="text-2xl font-black uppercase tracking-tighter text-white">Nenhum duelo em curso</h3>
        <p class="text-muted-foreground max-w-sm mx-auto leading-relaxed">Você ainda não tem propostas de troca ativas. Inicie um novo negócio para ver os resultados aqui.</p>
      </div>
      <div class="pt-10">
        <RouterLink to="/create-trade">
          <Button variant="holographic" class="h-12 px-10">Iniciar Primeira Troca</Button>
        </RouterLink>
      </div>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <TradeRequestItem 
        v-for="trade in myTrades" 
        :key="trade.id" 
        :trade="trade" 
        :is-own="true"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
