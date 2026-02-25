<script setup lang="ts">
import { ref } from 'vue'
import { useMyCardsQuery } from '../composables/use-my-cards-query'
import { useAllCardsQuery } from '../composables/use-all-cards-query'
import { useAddCardsMutation } from '../composables/use-add-cards-mutation'
import CardGrid from '../components/CardGrid.vue'
import Button from '@/components/ui/Button.vue'
import { Library, Sparkles } from 'lucide-vue-next'

const showLibrary = ref(false)

const { data: myCards, isLoading: loadingMyCards } = useMyCardsQuery()
const { data: allCards, isLoading: loadingAllCards } = useAllCardsQuery(1, 100, showLibrary.value)
const addCardsMutation = useAddCardsMutation()

const handleAddCards = async (cardIds: string[]) => {
  await addCardsMutation.mutateAsync(cardIds)
  showLibrary.value = false
}
</script>

<template>
  <div class="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl animate-in fade-in duration-500">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-3xl font-extrabold tracking-tight lg:text-4xl text-foreground">Minha Coleção</h1>
        <p class="text-muted-foreground text-lg">Gerencie suas cartas e adicione novas da biblioteca.</p>
      </div>
      <Button 
        @click="showLibrary = !showLibrary" 
        :variant="showLibrary ? 'outline' : 'default'"
        class="gap-2 shadow-md transition-all duration-300"
      >
        <Library v-if="!showLibrary" class="w-4 h-4" />
        <Sparkles v-else class="w-4 h-4" />
        {{ showLibrary ? 'Voltar para Coleção' : 'Adicionar Cartas' }}
      </Button>
    </div>

    <!-- Interface da Biblioteca -->
    <div v-if="showLibrary" class="space-y-6 animate-in slide-in-from-top-4 duration-500">
      <div class="bg-primary/5 border border-primary/10 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1">
          <h2 class="text-xl font-bold flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-primary" />
            Biblioteca de Cartas
          </h2>
          <p class="text-muted-foreground text-sm">Selecione as cartas que deseja adicionar à sua conta.</p>
        </div>
      </div>

      <div v-if="!!loadingAllCards" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div v-for="i in 12" :key="i" class="aspect-[2/3] bg-muted animate-pulse rounded-xl rounded-2xl border border-muted"></div>
      </div>
      
      <CardGrid 
        v-else 
        :cards="allCards?.list || []" 
        show-selection
        :loading="!!addCardsMutation.isPending"
        @confirm-selection="handleAddCards"
      />
    </div>

    <!-- Interface da Coleção -->
    <div v-else class="space-y-6">
      <div v-if="!!loadingMyCards" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div v-for="i in 6" :key="i" class="aspect-[2/3] bg-muted animate-pulse rounded-xl rounded-2xl border border-muted"></div>
      </div>

      <div v-else-if="myCards?.length === 0" class="text-center py-32 bg-muted/10 border-2 border-dashed rounded-3xl space-y-6">
        <div class="w-20 h-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
          <Library class="w-10 h-10" />
        </div>
        <div class="space-y-2">
          <p class="text-muted-foreground text-xl font-medium">Sua coleção está vazia.</p>
          <p class="text-muted-foreground max-w-sm mx-auto">Clique no botão acima para explorar a biblioteca e adicionar suas primeiras cartas.</p>
        </div>
        <Button variant="outline" @click="showLibrary = true">Abrir Biblioteca</Button>
      </div>

      <CardGrid v-else :cards="myCards || []" />
    </div>
  </div>
</template>
