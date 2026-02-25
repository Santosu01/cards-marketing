<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMyCardsQuery } from '@/features/cards/composables/use-my-cards-query'
import { useAllCardsQuery } from '@/features/cards/composables/use-all-cards-query'
import { useCreateTradeMutation } from '../composables/use-create-trade-mutation'
import CardGrid from '@/features/cards/components/CardGrid.vue'
import Button from '@/components/ui/Button.vue'
import { ArrowRight, Check, Loader2, Info } from 'lucide-vue-next'

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
  <div class="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl animate-in fade-in duration-500">
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <Button variant="ghost" size="sm" @click="() => step === 'RECEIVE' ? step = 'OFFER' : router.back()">
          Voltar
        </Button>
        <h1 class="text-3xl font-extrabold tracking-tight">Criar Solicitação de Troca</h1>
      </div>

      <!-- Indicador de Passo -->
      <div class="flex items-center gap-2">
        <div :class="['h-2 flex-1 rounded-full transition-all duration-500', step === 'OFFER' ? 'bg-primary' : 'bg-primary/40']"></div>
        <div :class="['h-2 flex-1 rounded-full transition-all duration-500', step === 'RECEIVE' ? 'bg-primary' : 'bg-muted']"></div>
      </div>
    </div>

    <div v-if="step === 'OFFER'" class="space-y-6 animate-in slide-in-from-left-4 duration-300">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold">Passo 1: O que você está oferecendo?</h2>
          <p class="text-muted-foreground">Selecione uma ou mais cartas da sua coleção para oferecer. (Selecionadas: {{ selectedOffering.length }})</p>
        </div>
        <Button 
          :disabled="selectedOffering.length === 0" 
          @click="handleNext"
          class="gap-2 shadow-lg"
        >
          Próximo Passo
          <ArrowRight class="w-4 h-4" />
        </Button>
      </div>

      <div v-if="!!loadingMyCards" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div v-for="i in 12" :key="i" class="aspect-[2/3] bg-muted animate-pulse rounded-xl"></div>
      </div>
      
      <div v-else-if="myCards?.length === 0" class="text-center py-24 bg-muted/10 border-2 border-dashed rounded-3xl space-y-6">
        <div class="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto">
          <Info class="w-8 h-8 text-muted-foreground" />
        </div>
        <div class="space-y-2">
          <p class="text-muted-foreground text-lg">Você ainda não tem cartas para oferecer.</p>
          <p class="text-sm text-muted-foreground max-w-xs mx-auto">Vá para sua coleção e adicione algumas cartas da biblioteca primeiro.</p>
          <RouterLink to="/my-cards" class="inline-block pt-4">
            <Button variant="outline">Gerenciar Coleção</Button>
          </RouterLink>
        </div>
      </div>

      <CardGrid 
        v-else 
        :cards="myCards || []" 
        :selected-ids="selectedOffering"
        @toggle-selection="toggleOffer"
      />
    </div>

    <div v-else class="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <div class="flex items-center justify-between gap-4">
        <div>
          <h2 class="text-xl font-bold">Passo 2: O que você quer em troca?</h2>
          <p class="text-muted-foreground">Selecione as cartas que você deseja receber. (Selecionadas: {{ selectedReceiving.length }})</p>
        </div>
        <Button 
          :disabled="selectedReceiving.length === 0 || !!createTradeMutation.isPending" 
          @click="handleSubmit"
          class="gap-2 shadow-lg bg-green-600 hover:bg-green-700 hover:text-white"
        >
          <Loader2 v-if="!!createTradeMutation.isPending" class="w-4 h-4 animate-spin" />
          <Check v-else class="w-4 h-4" />
          Confirmar e Publicar
        </Button>
      </div>

      <div v-if="!!loadingAllCards" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div v-for="i in 12" :key="i" class="aspect-[2/3] bg-muted animate-pulse rounded-xl"></div>
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
