<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMyCardsQuery } from '@/features/cards/composables/use-my-cards-query'
import { useAllCardsQuery } from '@/features/cards/composables/use-all-cards-query'
import { useCreateTradeMutation } from '../composables/use-create-trade-mutation'
import CardGrid from '@/features/cards/components/CardGrid.vue'
import Button from '@/components/ui/Button.vue'
import { ArrowRight, Check, Loader2, Info, ChevronLeft, Sparkles, Sword } from 'lucide-vue-next'

const router = useRouter()
const { data: myCards, isLoading: loadingMyCards } = useMyCardsQuery()
const { data: allCards, isLoading: loadingAllCards } = useAllCardsQuery(1, 100)
const createTradeMutation = useCreateTradeMutation()
const isLoading = computed(
  () => loadingMyCards.value || loadingAllCards.value || createTradeMutation.isPending.value,
)

const step = ref<'OFFER' | 'RECEIVE'>('OFFER')
const selectedOffering = ref<string[]>([])
const selectedReceiving = ref<string[]>([])

const toggleOffer = (id: string) => {
  if (selectedOffering.value.includes(id)) {
    selectedOffering.value = selectedOffering.value.filter((i) => i !== id)
    return
  }
  selectedOffering.value.push(id)
}

const toggleReceive = (id: string) => {
  if (selectedReceiving.value.includes(id)) {
    selectedReceiving.value = selectedReceiving.value.filter((i) => i !== id)
    return
  }
  selectedReceiving.value.push(id)
}

const handleNext = () => {
  if (step.value !== 'OFFER' || selectedOffering.value.length === 0) return
  step.value = 'RECEIVE'
  globalThis.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleSubmit = async () => {
  if (selectedOffering.value.length === 0 || selectedReceiving.value.length === 0) return

  const cards = [
    ...selectedOffering.value.map((id) => ({ cardId: id, type: 'OFFERING' as const })),
    ...selectedReceiving.value.map((id) => ({ cardId: id, type: 'RECEIVING' as const })),
  ]

  await createTradeMutation.mutateAsync({ cards })
  router.push('/')
}
</script>

<template>
  <div
    class="animate-in fade-in container mx-auto max-w-7xl space-y-10 p-4 pb-20 duration-500 md:p-8"
  >
    <!-- Header: Step Info -->
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-4">
        <Button
          variant="holographic"
          size="sm"
          class="h-10 w-10 rounded-xl p-0"
          @click="() => (step === 'RECEIVE' ? (step = 'OFFER') : router.back())"
        >
          <ChevronLeft class="h-5 w-5" />
        </Button>
        <div class="space-y-1">
          <h1
            class="font-serif text-3xl font-black tracking-tighter text-white uppercase italic md:text-4xl"
          >
            Preparar Duelo
          </h1>
          <p
            class="text-primary flex items-center gap-2 text-[10px] font-black tracking-[0.3em] uppercase sm:text-xs"
          >
            Formular Proposta de Troca
            <span class="bg-primary h-1.5 w-1.5 animate-pulse rounded-full"></span>
          </p>
        </div>
      </div>

      <!-- Progressive Stepper UI -->
      <div class="relative grid grid-cols-2 gap-4">
        <div
          class="group relative flex h-14 items-center justify-center gap-3 rounded-2xl border-2 transition-all duration-500 sm:h-16"
          :class="
            step === 'OFFER'
              ? 'bg-primary/10 border-primary shadow-[0_0_20px_-5px_hsla(var(--primary),0.3)]'
              : 'border-white/5 bg-white/[0.02] opacity-60'
          "
        >
          <div
            v-if="step === 'OFFER'"
            class="from-primary/20 absolute inset-0 bg-gradient-to-r via-transparent to-transparent"
          ></div>
          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 text-xs font-black italic"
          >
            01
          </div>
          <span class="text-[10px] font-black tracking-[0.1em] uppercase sm:text-xs"
            >Ofertando</span
          >
          <div
            v-if="selectedOffering.length > 0"
            class="bg-primary text-primary-foreground absolute -top-1 -right-1 rounded-full px-2 py-0.5 text-[8px] font-black"
          >
            {{ selectedOffering.length }}
          </div>
        </div>

        <div
          class="relative flex h-14 items-center justify-center gap-3 rounded-2xl border-2 transition-all duration-500 sm:h-16"
          :class="
            step === 'RECEIVE'
              ? 'border-yellow-500/50 bg-yellow-500/10 shadow-[0_0_20px_-5px_rgba(234,179,8,0.3)]'
              : 'border-white/5 bg-white/[0.02] opacity-60'
          "
        >
          <div
            v-if="step === 'RECEIVE'"
            class="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-transparent to-transparent"
          ></div>
          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 text-xs font-black italic"
          >
            02
          </div>
          <span class="text-[10px] font-black tracking-[0.1em] uppercase sm:text-xs"
            >Desejando</span
          >
          <div
            v-if="selectedReceiving.length > 0"
            class="absolute -top-1 -right-1 rounded-full bg-yellow-500 px-2 py-0.5 text-[8px] font-black text-black"
          >
            {{ selectedReceiving.length }}
          </div>
        </div>

        <!-- Animated Connector (Mobile Only Decoration) -->
        <div class="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 sm:hidden">
          <Sword class="h-5 w-5 text-white/10" />
        </div>
      </div>
    </div>

    <!-- Step 1: Offering -->
    <div v-if="step === 'OFFER'" class="animate-in slide-in-from-left-8 space-y-8 duration-500">
      <div
        class="flex flex-col justify-between gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:flex-row sm:items-center"
      >
        <div class="space-y-1">
          <h2 class="flex items-center gap-2 text-xl font-black tracking-tight uppercase italic">
            <Sparkles class="text-primary h-5 w-5" />
            Escolha seu Trunfo
          </h2>
          <p class="text-muted-foreground text-sm font-medium">
            Selecione as cartas que você está disposto a ceder.
          </p>
        </div>

        <Button
          :disabled="selectedOffering.length === 0"
          @click="handleNext"
          variant="gold"
          class="group h-14 gap-3 px-10 shadow-xl"
        >
          Confirmar Oferta
          <ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      <div v-if="!!loadingMyCards" class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        <div
          v-for="i in 12"
          :key="i"
          class="aspect-[2/3] animate-pulse rounded-2xl border-2 border-white/5 bg-white/[0.02]"
        ></div>
      </div>

      <div
        v-else-if="myCards?.length === 0"
        class="group space-y-6 rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.01] py-28 text-center"
      >
        <div
          class="bg-muted/10 mx-auto flex h-20 w-20 items-center justify-center rounded-full transition-all duration-500 group-hover:scale-110"
        >
          <Info class="text-muted-foreground h-10 w-10" />
        </div>
        <div class="space-y-2">
          <p class="text-xl font-black tracking-tighter text-white uppercase italic">Deck Vazio</p>
          <p class="text-muted-foreground mx-auto max-w-xs text-sm font-medium">
            Você precisa Add cartas à sua coleção antes de poder oferecê-las em uma troca.
          </p>
          <div class="pt-6">
            <RouterLink to="/my-cards">
              <Button variant="holographic" class="h-12 px-8">Gerenciar Coleção</Button>
            </RouterLink>
          </div>
        </div>
      </div>

      <CardGrid
        v-else
        :cards="myCards || []"
        :selected-ids="selectedOffering"
        @toggle-selection="toggleOffer"
      />
    </div>

    <!-- Step 2: Receiving -->
    <div v-else class="animate-in slide-in-from-right-8 space-y-8 duration-500">
      <div
        class="flex flex-col justify-between gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:flex-row sm:items-center"
      >
        <div class="space-y-1">
          <h2 class="flex items-center gap-2 text-xl font-black tracking-tight uppercase italic">
            <Sword class="h-5 w-5 text-yellow-500" />
            Objetivo da Busca
          </h2>
          <p class="text-muted-foreground text-sm font-medium">
            Quais cartas você deseja receber em troca?
          </p>
        </div>

        <Button
          :disabled="selectedReceiving.length === 0 || !!isLoading"
          @click="handleSubmit"
          variant="gold"
          class="h-14 gap-3 bg-green-600 px-10 shadow-[0_10px_40px_-10px_rgba(34,197,94,0.3)] hover:bg-green-700 hover:text-white"
        >
          <Loader2 v-if="!!isLoading" class="h-5 w-5 animate-spin" />
          <Check v-else class="h-5 w-5" />
          Finalizar Proposta
        </Button>
      </div>

      <div v-if="!!loadingAllCards" class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        <div
          v-for="i in 12"
          :key="i"
          class="aspect-[2/3] animate-pulse rounded-2xl border-2 border-white/5 bg-white/[0.02]"
        ></div>
      </div>

      <CardGrid
        v-else
        :cards="
          (allCards?.list || []).filter(
            (c) => !selectedOffering.includes(c.id) && !myCards?.some((m) => m.id === c.id),
          )
        "
        :selected-ids="selectedReceiving"
        @toggle-selection="toggleReceive"
      />
    </div>
  </div>
</template>
