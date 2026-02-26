<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTradesQuery } from '../composables/use-trades-query'
import { useDeleteTradeMutation } from '../composables/use-delete-trade-mutation'
import { useAuth } from '@/features/auth/composables/use-auth'
import TradeRequestItem from '../components/TradeRequestItem.vue'
import Button from '@/components/ui/Button.vue'
import { Plus, Database, RefreshCw } from 'lucide-vue-next'

const { isAuthenticated, user } = useAuth()
const { data: trades, isLoading, isError, refetch } = useTradesQuery()
const deleteTradeMutation = useDeleteTradeMutation()

const handleDelete = (id: string) => {
  if (!confirm('Tem certeza que deseja excluir esta solicitação de troca?')) return
  deleteTradeMutation.mutate(id)
}
</script>

<template>
  <div class="container mx-auto p-4 md:p-8 space-y-10 max-w-7xl animate-in fade-in duration-500 pb-20">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 relative">
      <div class="space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          <Database class="w-3 h-3" />
          Rede de Duelos Ativa
        </div>
        <div class="space-y-1">
          <h1 class="text-4xl md:text-5xl font-black tracking-tighter uppercase font-serif text-white italic">Mercado</h1>
          <p class="text-muted-foreground text-lg font-medium max-w-md">Negocie suas cartas raras com outros mestres duelistas.</p>
        </div>
      </div>
      
      <div v-if="isAuthenticated" class="shrink-0 flex items-center gap-4">
          <RouterLink to="/create-trade">
            <Button variant="gold" class="gap-3 h-14 px-8 shadow-[0_10px_30px_-10px_rgba(234,179,8,0.3)]">
              <Plus class="w-5 h-5" />
              <span class="text-sm font-black uppercase tracking-tighter">Nova Troca</span>
            </Button>
          </RouterLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="i in 6" :key="i" class="h-80 bg-white/[0.02] border-2 border-white/5 rounded-2xl animate-pulse relative overflow-hidden">
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="!!isError" class="flex flex-col items-center justify-center py-24 px-6 text-center space-y-8 bg-destructive/5 border-2 border-dashed border-destructive/20 rounded-3xl group">
      <div class="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center text-destructive group-hover:scale-110 transition-transform duration-500">
        <Database class="w-10 h-10" />
      </div>
      <div class="space-y-3">
        <h3 class="text-2xl font-black uppercase tracking-tighter text-white">Mercado Instável</h3>
        <p class="text-muted-foreground max-w-md mx-auto leading-relaxed">A conexão com a rede de cartas foi interrompida. Isso pode acontecer se o servidor estiver despertando de um sono profundo.</p>
      </div>
      <Button variant="holographic" @click="() => refetch()" class="gap-2 h-12 px-10">
        <RefreshCw class="w-4 h-4" />
        Tentar Reconectar
      </Button>
    </div>

    <!-- Empty State -->
    <div v-else-if="trades?.list.length === 0" class="text-center py-32 bg-white/[0.02] border-2 border-dashed border-white/5 rounded-3xl group">
      <div class="w-16 h-16 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/10 transition-colors">
        <Plus class="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
      </div>
      <p class="text-muted-foreground text-xl font-medium italic">Nenhuma solicitação de troca encontrada.</p>
      <p class="text-muted-foreground/60 text-sm mt-2">Inaugure o mercado criando o primeiro anúncio!</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
      <TradeRequestItem 
        v-for="trade in trades?.list" 
        :key="trade.id" 
        :trade="trade" 
        :is-own="trade.userId === user?.id"
        @delete="handleDelete"
      />
    </div>
  </div>
</template>
