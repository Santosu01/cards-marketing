<script setup lang="ts">
import { useMyCardsQuery } from '../composables/use-my-cards-query'
import CardGrid from '../components/CardGrid.vue'
import Button from '@/components/ui/Button.vue'
import { Library, BookOpen, Crown } from 'lucide-vue-next'

const { data: myCards, isLoading: loadingMyCards } = useMyCardsQuery()
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
          <Crown class="h-3 w-3" />
          Soberania de Cartas
        </div>
        <div class="space-y-1">
          <h1
            class="font-serif text-4xl font-black tracking-tighter text-white uppercase italic md:text-5xl"
          >
            Minha Coleção
          </h1>
          <p class="text-muted-foreground max-w-md text-lg font-medium">
            Organize seu deck e adquira novas relíquias da biblioteca central.
          </p>
        </div>
      </div>

      <RouterLink :to="{ name: 'my-cards-library' }">
        <Button variant="gold" class="h-14 min-w-[200px] cursor-pointer gap-3 px-8">
          <BookOpen class="h-5 w-5" />
          <span class="text-sm font-black tracking-tighter uppercase">Recrutar Cartas</span>
        </Button>
      </RouterLink>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loadingMyCards" class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
      <div
        v-for="i in 6"
        :key="i"
        class="aspect-[2/3] animate-pulse rounded-2xl border-2 border-white/5 bg-white/[0.02]"
      ></div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="myCards?.length === 0"
      class="group rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] py-32 text-center"
    >
      <div
        class="bg-muted/10 text-muted-foreground mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-110"
      >
        <Library class="h-12 w-12 opacity-50" />
      </div>
      <div class="space-y-4">
        <h3 class="text-3xl font-black tracking-tighter text-white uppercase">
          Seu Deck está Vazio
        </h3>
        <p class="text-muted-foreground mx-auto max-w-md text-lg leading-relaxed font-medium">
          Nenhum duelo pode ser travado sem cartas. Visite a biblioteca para recrutar seus primeiros
          guerreiros.
        </p>
      </div>
      <div class="pt-12">
        <RouterLink :to="{ name: 'my-cards-library' }">
          <Button variant="gold" class="h-14 cursor-pointer px-12">Recrutar Agora</Button>
        </RouterLink>
      </div>
    </div>

    <!-- Card Grid -->
    <CardGrid v-else :cards="myCards || []" disable-card-click />
  </div>
</template>
