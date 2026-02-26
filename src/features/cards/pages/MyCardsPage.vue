<script setup lang="ts">
import { ref } from 'vue'
import { useMyCardsQuery } from '../composables/use-my-cards-query'
import { useAllCardsQuery } from '../composables/use-all-cards-query'
import { useAddCardsMutation } from '../composables/use-add-cards-mutation'
import CardGrid from '../components/CardGrid.vue'
import Button from '@/components/ui/Button.vue'
import { Library, Sparkles, BookOpen, Crown } from 'lucide-vue-next'

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
  <div class="container mx-auto p-4 md:p-8 space-y-10 max-w-7xl animate-in fade-in duration-500 pb-20">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8 relative">
      <div class="space-y-4">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          <Crown class="w-3 h-3" />
          Soberania de Cartas
        </div>
        <div class="space-y-1">
          <h1 class="text-4xl md:text-5xl font-black tracking-tighter uppercase font-serif text-white italic">Minha Coleção</h1>
          <p class="text-muted-foreground text-lg font-medium max-w-md">Organize seu deck e adquira novas relíquias da biblioteca central.</p>
        </div>
      </div>
      
      <Button 
        @click="showLibrary = !showLibrary" 
        :variant="showLibrary ? 'holographic' : 'gold'"
        class="gap-3 h-14 px-8 min-w-[200px]"
      >
        <BookOpen v-if="!showLibrary" class="w-5 h-5" />
        <Library v-else class="w-5 h-5" />
        <span class="text-sm font-black uppercase tracking-tighter">
          {{ showLibrary ? 'Ver Coleção' : 'Recrutar Cartas' }}
        </span>
      </Button>
    </div>

    <!-- Interface da Biblioteca (Modo Adição) -->
    <div v-if="showLibrary" class="space-y-8 animate-in slide-in-from-top-8 duration-500">
      <div class="bg-primary/5 border-2 border-primary/20 p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
        <div class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div class="space-y-2 relative z-10">
          <h2 class="text-2xl font-black uppercase tracking-tighter text-white flex items-center gap-3">
            <Sparkles class="w-6 h-6 text-primary animate-pulse" />
            Biblioteca de Relíquias
          </h2>
          <p class="text-muted-foreground font-medium max-w-lg">Desperte novas cartas para o seu arsenal. Selecione quantas desejar e confirme no botão flutuante.</p>
        </div>
      </div>

      <div v-if="!!loadingAllCards" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div v-for="i in 12" :key="i" class="aspect-[2/3] bg-white/[0.02] border-2 border-white/5 rounded-2xl animate-pulse"></div>
      </div>
      
      <CardGrid 
        v-else 
        :cards="allCards?.list || []" 
        show-selection
        :loading="!!addCardsMutation.isPending"
        @confirm-selection="handleAddCards"
      />
    </div>

    <!-- Interface da Coleção (Personal) -->
    <div v-else class="space-y-8 animate-in fade-in duration-500">
      <div v-if="!!loadingMyCards" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div v-for="i in 6" :key="i" class="aspect-[2/3] bg-white/[0.02] border-2 border-white/5 rounded-2xl animate-pulse"></div>
      </div>

      <div v-else-if="myCards?.length === 0" class="text-center py-32 bg-white/[0.02] border-2 border-dashed border-white/5 rounded-3xl group">
        <div class="w-24 h-24 bg-muted/10 rounded-full flex items-center justify-center mx-auto mb-8 text-muted-foreground group-hover:scale-110 transition-transform duration-500">
          <Library class="w-12 h-12 opacity-50" />
        </div>
        <div class="space-y-4">
          <h3 class="text-3xl font-black uppercase tracking-tighter text-white">Seu Deck está Vazio</h3>
          <p class="text-muted-foreground max-w-md mx-auto leading-relaxed font-medium text-lg">Nenhum duelo pode ser travado sem cartas. Visite a biblioteca para recrutar seus primeiros guerreiros.</p>
        </div>
        <div class="pt-12">
          <Button variant="gold" class="h-14 px-12" @click="showLibrary = true">Recrutar Agora</Button>
        </div>
      </div>

      <CardGrid v-else :cards="myCards || []" />
    </div>
  </div>
</template>
