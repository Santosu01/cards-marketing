<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAllCardsQuery } from '../composables/use-all-cards-query'
import { useMyCardsQuery } from '../composables/use-my-cards-query'
import { useAddCardsMutation } from '../composables/use-add-cards-mutation'
import CardGrid from '../components/CardGrid.vue'
import Button from '@/components/ui/Button.vue'
import ConfirmationDialog from '@/components/ui/ConfirmationDialog.vue'
import { Library, Sparkles } from 'lucide-vue-next'

const router = useRouter()

const { data: allCards, isLoading: loadingAllCards } = useAllCardsQuery(1, 100)
const { data: myCards } = useMyCardsQuery()
const { mutateAsync: addCards, isPending: isAddingCards } = useAddCardsMutation()

const isConfirmOpen = ref(false)
const pendingSelection = ref<string[]>([])

const handleAddCards = (cardIds: string[]) => {
  pendingSelection.value = cardIds
  isConfirmOpen.value = true
}

const confirmAddCards = async () => {
  await addCards(pendingSelection.value)
  isConfirmOpen.value = false
  pendingSelection.value = []
  router.push({ name: 'my-cards' })
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
          <Sparkles class="h-3 w-3 animate-pulse" />
          Biblioteca Central
        </div>
        <div class="space-y-1">
          <h1
            class="font-serif text-4xl font-black tracking-tighter text-white uppercase italic md:text-5xl"
          >
            Recrutar Cartas
          </h1>
          <p class="text-muted-foreground max-w-md text-lg font-medium">
            Desperte novas cartas para o seu arsenal. Selecione quantas desejar e confirme no botão
            flutuante.
          </p>
        </div>
      </div>

      <RouterLink :to="{ name: 'my-cards' }">
        <Button variant="holographic" class="h-14 min-w-[200px] cursor-pointer gap-3 px-8">
          <Library class="h-5 w-5" />
          <span class="text-sm font-black tracking-tighter uppercase">Ver Coleção</span>
        </Button>
      </RouterLink>
    </div>

    <!-- Banner -->
    <div
      class="bg-primary/5 border-primary/20 group relative flex flex-col justify-between gap-6 overflow-hidden rounded-3xl border-2 p-8 md:flex-row md:items-center"
    >
      <div
        class="via-primary/30 absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent to-transparent"
      ></div>
      <div class="relative z-10 space-y-2">
        <h2
          class="flex items-center gap-3 text-2xl font-black tracking-tighter text-white uppercase"
        >
          <Sparkles class="text-primary h-6 w-6 animate-pulse" />
          Biblioteca de Relíquias
        </h2>
        <p class="text-muted-foreground max-w-lg font-medium">
          Selecione as cartas que deseja adicionar à sua coleção e confirme no botão flutuante.
        </p>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loadingAllCards" class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      <div
        v-for="i in 12"
        :key="i"
        class="aspect-[2/3] animate-pulse rounded-2xl border-2 border-white/5 bg-white/[0.02]"
      ></div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="allCards?.list.length === 0"
      class="rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] py-20 text-center"
    >
      <Sparkles class="text-muted-foreground mx-auto mb-4 h-12 w-12 opacity-30" />
      <h3 class="text-xl font-bold tracking-tight text-white uppercase">
        Nenhuma Relíquia Disponível
      </h3>
      <p class="text-muted-foreground mt-2">A biblioteca está aguardando novos artefatos.</p>
    </div>

    <!-- Card Grid -->
    <CardGrid
      v-else-if="allCards?.list"
      :cards="(allCards?.list || []).filter((c) => !myCards?.some((m) => m.id === c.id))"
      show-selection
      disable-card-click
      :loading="isAddingCards"
      @confirm-selection="handleAddCards"
    />

    <!-- Confirmation Dialog -->
    <ConfirmationDialog
      v-model="isConfirmOpen"
      title="Confirmar Recrutamento"
      :message="`Deseja realmente adicionar estas ${pendingSelection.length} cartas à sua coleção?`"
      confirm-label="Confirmar"
      cancel-label="Voltar"
      :loading="isAddingCards"
      @confirm="confirmAddCards"
    />
  </div>
</template>
