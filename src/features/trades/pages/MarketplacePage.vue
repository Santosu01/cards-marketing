<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useTrades } from '../composables/use-trades'
import { useDeleteTrade } from '../composables/use-delete-trade'
import { useAuth } from '@/features/auth/composables/use-auth'
import TradeRequestItem from '../components/TradeRequestItem.vue'
import Button from '@/components/ui/Button.vue'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog.vue'
import { Plus, Database, RefreshCw } from 'lucide-vue-next'

const { isAuthenticated, user } = useAuth()
const { data: trades, isLoading, isError, refetch } = useTrades()
const { mutate: deleteTrade, isPending: isDeleting } = useDeleteTrade()

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
    <!-- Header Section -->
    <div
      class="relative flex flex-col justify-between gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end"
    >
      <div class="space-y-4">
        <div
          class="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black tracking-[0.2em] uppercase"
        >
          <Database class="h-3 w-3" />
          Rede de Duelos Ativa
        </div>
        <div class="space-y-1">
          <h1
            class="font-serif text-4xl font-black tracking-tighter text-white uppercase italic md:text-5xl"
          >
            Mercado
          </h1>
          <p class="text-muted-foreground max-w-md text-lg font-medium">
            Negocie suas cartas raras com outros mestres duelistas.
          </p>
        </div>
      </div>

      <div v-if="isAuthenticated" class="flex shrink-0 items-center gap-4">
        <RouterLink to="/create-trade">
          <Button
            variant="gold"
            class="h-14 gap-3 px-8 shadow-[0_10px_30px_-10px_rgba(234,179,8,0.3)]"
          >
            <Plus class="h-5 w-5" />
            <span class="text-sm font-black tracking-tighter uppercase">Nova Troca</span>
          </Button>
        </RouterLink>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!!isLoading" class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="i"
        class="relative h-80 animate-pulse overflow-hidden rounded-2xl border-2 border-white/5 bg-white/[0.02]"
      >
        <div
          class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        ></div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="!!isError"
      class="bg-destructive/5 border-destructive/20 group flex flex-col items-center justify-center space-y-8 rounded-3xl border-2 border-dashed px-6 py-24 text-center"
    >
      <div
        class="bg-destructive/10 text-destructive flex h-20 w-20 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
      >
        <Database class="h-10 w-10" />
      </div>
      <div class="space-y-3">
        <h3 class="text-2xl font-black tracking-tighter text-white uppercase">Mercado Instável</h3>
        <p class="text-muted-foreground mx-auto max-w-md leading-relaxed">
          A conexão com a rede de cartas foi interrompida. Isso pode acontecer se o servidor estiver
          despertando de um sono profundo.
        </p>
      </div>
      <Button variant="holographic" @click="() => refetch()" class="h-12 gap-2 px-10">
        <RefreshCw class="h-4 w-4" />
        Tentar Reconectar
      </Button>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="trades?.list.length === 0"
      class="group rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] py-32 text-center"
    >
      <div
        class="bg-muted/10 group-hover:bg-primary/10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full transition-colors"
      >
        <Plus class="text-muted-foreground group-hover:text-primary h-8 w-8 transition-colors" />
      </div>
      <p class="text-muted-foreground text-xl font-medium italic">
        Nenhuma solicitação de troca encontrada.
      </p>
      <p class="text-muted-foreground/60 mt-2 text-sm">
        Inaugure o mercado criando o primeiro anúncio!
      </p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-1 gap-8 pb-10 md:grid-cols-2 lg:grid-cols-3">
      <TradeRequestItem
        v-for="trade in trades?.list"
        :key="trade.id"
        :trade="trade"
        :is-own="trade.userId === user?.id"
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
