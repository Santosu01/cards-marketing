<script setup lang="ts">
import { ref } from 'vue'
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

const step = ref<'OFFER' | 'RECEIVE'>('OFFER')
const selectedOffering = ref<string[]>([])
const selectedReceiving = ref<string[]>([])

const toggleOffer = (id: string) => {
  if (selectedOffering.value.includes(id)) {
    selectedOffering.value = selectedOffering.value.filter(i => i !== id)
  } else {
    selectedOffering.value.push(id)
  }
}

const toggleReceive = (id: string) => {
  if (selectedReceiving.value.includes(id)) {
    selectedReceiving.value = selectedReceiving.value.filter(i => i !== id)
  } else {
    selectedReceiving.value.push(id)
  }
}

const handleNext = () => {
  if (step.value === 'OFFER' && selectedOffering.value.length > 0) {
    step.value = 'RECEIVE'
    globalThis.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const handleSubmit = async () => {
  if (selectedOffering.value.length === 0 || selectedReceiving.value.length === 0) return
  
  const cards = [
    ...selectedOffering.value.map(id => ({ cardId: id, type: 'OFFERING' as const })),
    ...selectedReceiving.value.map(id => ({ cardId: id, type: 'RECEIVING' as const })),
  ]
  
  await createTradeMutation.mutateAsync({ cards })
  router.push('/')
}
</script>

<template>
  <div class="container mx-auto p-4 md:p-8 space-y-10 max-w-7xl animate-in fade-in duration-500 pb-20">
    <!-- Header: Step Info -->
    <div class="flex flex-col gap-6">
      <div class="flex items-center gap-4">
        <Button variant="holographic" size="sm" class="h-10 w-10 p-0 rounded-xl" @click="() => step === 'RECEIVE' ? step = 'OFFER' : router.back()">
          <ChevronLeft class="w-5 h-5" />
        </Button>
        <div class="space-y-1">
          <h1 class="text-3xl md:text-4xl font-black tracking-tighter uppercase font-serif text-white italic">Preparar Duelo</h1>
          <p class="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
            Formular Proposta de Troca
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          </p>
        </div>
      </div>

      <!-- Progressive Stepper UI -->
      <div class="grid grid-cols-2 gap-4 relative">
        <div 
          class="h-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden relative group"
          :class="step === 'OFFER' ? 'bg-primary/10 border-primary shadow-[0_0_20px_-5px_hsla(var(--primary),0.3)]' : 'bg-white/[0.02] border-white/5 opacity-60'"
        >
          <div v-if="step === 'OFFER'" class="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-transparent"></div>
          <div class="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-xs font-black italic">01</div>
          <span class="text-[10px] sm:text-xs font-black uppercase tracking-[0.1em]">Ofertando</span>
          <div v-if="selectedOffering.length > 0" class="absolute -top-1 -right-1 px-2 py-0.5 bg-primary text-primary-foreground text-[8px] font-black rounded-full">{{ selectedOffering.length }}</div>
        </div>
        
        <div 
          class="h-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center gap-3 transition-all duration-500 overflow-hidden relative"
          :class="step === 'RECEIVE' ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_20px_-5px_rgba(234,179,8,0.3)]' : 'bg-white/[0.02] border-white/5 opacity-60'"
        >
          <div v-if="step === 'RECEIVE'" class="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-transparent to-transparent"></div>
          <div class="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-xs font-black italic">02</div>
          <span class="text-[10px] sm:text-xs font-black uppercase tracking-[0.1em]">Desejando</span>
          <div v-if="selectedReceiving.length > 0" class="absolute -top-1 -right-1 px-2 py-0.5 bg-yellow-500 text-black text-[8px] font-black rounded-full">{{ selectedReceiving.length }}</div>
        </div>
        
        <!-- Animated Connector (Mobile Only Decoration) -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 sm:hidden">
           <Sword class="w-5 h-5 text-white/10" />
        </div>
      </div>
    </div>

    <!-- Step 1: Offering -->
    <div v-if="step === 'OFFER'" class="space-y-8 animate-in slide-in-from-left-8 duration-500">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
        <div class="space-y-1">
          <h2 class="text-xl font-black uppercase tracking-tight italic flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-primary" />
            Escolha seu Trunfo
          </h2>
          <p class="text-muted-foreground text-sm font-medium">Selecione as cartas que você está disposto a ceder.</p>
        </div>
        
        <Button 
          :disabled="selectedOffering.length === 0" 
          @click="handleNext"
          variant="gold"
          class="h-14 px-10 gap-3 shadow-xl group"
        >
          Confirmar Oferta
          <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>

      <div v-if="!!loadingMyCards" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div v-for="i in 12" :key="i" class="aspect-[2/3] bg-white/[0.02] border-2 border-white/5 animate-pulse rounded-2xl"></div>
      </div>
      
      <div v-else-if="myCards?.length === 0" class="text-center py-28 bg-white/[0.01] border-2 border-dashed border-white/5 rounded-3xl space-y-6 group">
        <div class="w-20 h-20 bg-muted/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-500">
          <Info class="w-10 h-10 text-muted-foreground" />
        </div>
        <div class="space-y-2">
          <p class="text-white text-xl font-black italic uppercase tracking-tighter">Deck Vazio</p>
          <p class="text-muted-foreground text-sm max-w-xs mx-auto font-medium">Você precisa Add cartas à sua coleção antes de poder oferecê-las em uma troca.</p>
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
    <div v-else class="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
        <div class="space-y-1">
          <h2 class="text-xl font-black uppercase tracking-tight italic flex items-center gap-2">
            <Sword class="w-5 h-5 text-yellow-500" />
            Objetivo da Busca
          </h2>
          <p class="text-muted-foreground text-sm font-medium">Quais cartas você deseja receber em troca?</p>
        </div>
        
        <Button 
          :disabled="selectedReceiving.length === 0 || !!createTradeMutation.isPending" 
          @click="handleSubmit"
          variant="gold"
          class="h-14 px-10 gap-3 shadow-[0_10px_40px_-10px_rgba(34,197,94,0.3)] bg-green-600 hover:bg-green-700 hover:text-white"
        >
          <Loader2 v-if="!!createTradeMutation.isPending" class="w-5 h-5 animate-spin" />
          <Check v-else class="w-5 h-5" />
          Finalizar Proposta
        </Button>
      </div>

      <div v-if="!!loadingAllCards" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div v-for="i in 12" :key="i" class="aspect-[2/3] bg-white/[0.02] border-2 border-white/5 animate-pulse rounded-2xl"></div>
      </div>

      <CardGrid 
        v-else 
        :cards="allCards?.list || []" 
        :selected-ids="selectedReceiving"
        @toggle-selection="toggleReceive"
      />
    </div>
  </div>
</template>
