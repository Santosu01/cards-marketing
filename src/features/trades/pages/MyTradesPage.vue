<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTrades } from '../composables/use-trades'
import { useDeleteTrade } from '../composables/use-delete-trade'
import { useAuth } from '@/features/auth/composables/use-auth'
import type { Trade } from '../types'
import TradeRequestItem from '../components/TradeRequestItem.vue'
import Button from '@/components/ui/Button.vue'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog.vue'
import { Plus, History, Sparkles } from 'lucide-vue-next'

const { user } = useAuth()
const { data: trades, isLoading, refetch } = useTrades()
const { mutate: deleteTrade, isPending: isDeleting } = useDeleteTrade()

const currentUser = computed(() => user.value)

const myTrades = computed(() => {
  if (!trades.value || !currentUser.value) return []
  return trades.value.list.filter((t: Trade) => t.userId === currentUser.value?.id)
})

const pendingDeleteId = ref<string | null>(null)
const isConfirmOpen = ref(false)

const handleDelete = (id: string) => {
  pendingDeleteId.value = id
  isConfirmOpen.value = true
}

const confirmDelete = () => {
  if (!pendingDeleteId.value) return
  deleteTrade(pendingDeleteId.value, {
    onSuccess: () => {
      pendingDeleteId.value = null
      isConfirmOpen.value = false
      refetch()
    },
  })
}
</script>

<template>
  <div
    class="animate-in fade-in container mx-auto max-w-7xl space-y-10 p-4 pb-20 duration-500 md:p-8"
  >
    <div
      class="relative flex flex-col justify-between gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end"
    >
      <div class="space-y-4">
        <div
          class="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase"
        >
          <History class="h-3 w-3" />
          Seu Histórico de Duelos
        </div>
        <div class="space-y-1">
          <h1
            class="font-serif text-4xl font-black tracking-tighter text-white uppercase italic md:text-5xl"
          >
            Minhas Trocas
          </h1>
          <p class="text-muted-foreground max-w-md text-lg font-medium">
            Gerencie e monitore suas propostas ativas.
          </p>
        </div>
      </div>

      <RouterLink to="/create-trade" class="flex shrink-0 items-center gap-4">
        <Button
          variant="gold"
          class="h-14 gap-3 px-8 shadow-[0_10px_30px_-10px_rgba(234,179,8,0.3)]"
        >
          <Plus class="h-5 w-5" />
          <span class="text-sm font-black tracking-tighter uppercase">Nova Proposta</span>
        </Button>
      </RouterLink>
    </div>

    <!-- Loading State -->
    <div v-if="!!isLoading" class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 3"
        :key="i"
        class="h-80 animate-pulse rounded-2xl border-2 border-white/5 bg-white/[0.02]"
      ></div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="myTrades.length === 0"
      class="group rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] py-32 text-center"
    >
      <div
        class="bg-muted/10 text-muted-foreground mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
      >
        <Sparkles class="h-10 w-10" />
      </div>
      <div class="space-y-3">
        <h3 class="text-2xl font-black tracking-tighter text-white uppercase">
          Nenhum duelo em curso
        </h3>
        <p class="text-muted-foreground mx-auto max-w-sm leading-relaxed">
          Você ainda não tem propostas de troca ativas. Inicie um novo negócio para ver os
          resultados aqui.
        </p>
      </div>
      <div class="pt-10">
        <RouterLink to="/create-trade">
          <Button variant="holographic" class="h-12 px-10">Iniciar Primeira Troca</Button>
        </RouterLink>
      </div>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <TradeRequestItem
        v-for="trade in myTrades"
        :key="trade.id"
        :trade="trade"
        :is-own="true"
        @delete="handleDelete"
      />
    </div>

    <ConfirmationDialog
      v-model="isConfirmOpen"
      title="Excluir Proposta"
      message="Tem certeza que deseja excluir esta solicitação de troca? Esta ação não pode ser desfeita."
      confirm-label="Excluir"
      cancel-label="Cancelar"
      variant="destructive"
      :loading="isDeleting"
      @confirm="confirmDelete"
    />
  </div>
</template>
