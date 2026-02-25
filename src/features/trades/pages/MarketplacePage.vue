<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useTradesQuery } from '../composables/use-trades-query'
import { useDeleteTradeMutation } from '../composables/use-delete-trade-mutation'
import { useAuth } from '@/features/auth/composables/use-auth'
import TradeRequestItem from '../components/TradeRequestItem.vue'
import Button from '@/components/ui/Button.vue'
import { Plus } from 'lucide-vue-next'

const { isAuthenticated, user } = useAuth()
const { data: trades, isLoading, isError, refetch } = useTradesQuery()
const deleteTradeMutation = useDeleteTradeMutation()

const handleDelete = (id: string) => {
  if (confirm('Tem certeza que deseja excluir esta solicitação de troca?')) {
    deleteTradeMutation.mutate(id)
  }
}
</script>

<template>
  <div class="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl animate-in fade-in duration-500">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-3xl font-extrabold tracking-tight lg:text-4xl text-foreground">Mercado</h1>
        <p class="text-muted-foreground text-lg">Explore e gerencie solicitações de troca de cartas.</p>
      </div>
      <div v-if="isAuthenticated">
          <RouterLink to="/create-trade">
            <Button class="gap-2 shadow-md">
              <Plus class="w-4 h-4" />
              Nova Solicitação
            </Button>
          </RouterLink>
      </div>
    </div>

    <!-- Estado de Carregamento -->
    <div v-if="!!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="h-64 bg-muted/50 animate-pulse rounded-xl border-2 border-muted"></div>
    </div>

    <!-- Estado de Erro -->
    <div v-else-if="!!isError" class="text-center py-20 space-y-6 bg-destructive/5 border border-destructive/20 rounded-3xl">
      <div class="space-y-2">
        <p class="text-destructive font-bold text-xl">O Mercado está temporariamente indisponível.</p>
        <p class="text-muted-foreground max-w-md mx-auto">A API pode estar inicializando. Isso costuma levar cerca de 60 segundos após um período de inatividade.</p>
      </div>
      <Button variant="outline" @click="() => refetch()" class="px-8">Tentar Novamente</Button>
    </div>

    <!-- Estado Vazio -->
    <div v-else-if="trades?.list.length === 0" class="text-center py-32 bg-muted/10 border-2 border-dashed rounded-3xl">
      <p class="text-muted-foreground text-lg italic">Nenhuma solicitação de troca encontrada. Seja o primeiro a criar uma!</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
