<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTradesQuery } from '../composables/use-trades-query'
import { useDeleteTradeMutation } from '../composables/use-delete-trade-mutation'
import { useAuth } from '@/features/auth/composables/use-auth'
import type { Trade } from '../types'
import TradeRequestItem from '../components/TradeRequestItem.vue'
import Button from '@/components/ui/Button.vue'
import { Plus, History } from 'lucide-vue-next'

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
  <div class="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl animate-in fade-in duration-500">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-3xl font-extrabold tracking-tight lg:text-4xl text-foreground">Minhas Trocas</h1>
        <p class="text-muted-foreground text-lg">Gerencie suas solicitações de troca ativas.</p>
      </div>
      <RouterLink to="/create-trade">
        <Button class="gap-2 shadow-md">
          <Plus class="w-4 h-4" />
          Nova Solicitação
        </Button>
      </RouterLink>
    </div>

    <div v-if="!!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="h-64 bg-muted/50 animate-pulse rounded-xl border-2 border-muted"></div>
    </div>

    <div v-else-if="myTrades.length === 0" class="text-center py-32 bg-muted/10 border-2 border-dashed rounded-3xl space-y-6">
      <div class="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
        <History class="w-10 h-10" />
      </div>
      <div class="space-y-2">
        <p class="text-muted-foreground text-xl font-medium">Você não tem trocas ativas no momento.</p>
        <p class="text-muted-foreground max-w-sm mx-auto">Suas solicitações aparecerão aqui assim que você as criar no mercado.</p>
      </div>
      <RouterLink to="/create-trade" class="inline-block mt-4">
        <Button variant="outline">Começar a Trocar</Button>
      </RouterLink>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
