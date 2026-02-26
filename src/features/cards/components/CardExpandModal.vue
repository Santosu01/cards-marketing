<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { Card } from '../types'

defineProps<{
  card: Card | null
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <transition name="page">
    <div v-if="card" class="fixed inset-0 z-[100] overflow-y-auto bg-background/95 backdrop-blur-2xl"
      @click="emit('close')">
      <!-- Wrapper to center the modal but allow scrolling -->
      <div class="min-h-full flex items-center justify-center p-4 sm:p-8">
        <!-- Container with max-width and improved layout -->
        <div
          class="relative max-w-5xl w-full bg-card/40 border-2 border-white/10 rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_0_100px_-20px_hsla(var(--primary),0.3)] overflow-hidden holographic flex flex-col md:flex-row animate-in zoom-in-95 duration-500"
          @click.stop>

          <!-- Close Button - Moved inside for easier containment -->
          <button
            class="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary transition-all hover:scale-110 active:scale-95 shadow-2xl z-20"
            @click="emit('close')">
            <X class="w-5 h-5 sm:w-6 h-6" />
          </button>

          <!-- Card Image Side -->
          <div
            class="w-full md:w-2/5 aspect-square md:aspect-auto bg-black/40 flex items-center justify-center p-6 sm:p-10 border-b md:border-b-0 md:border-r border-white/10">
            <div class="relative w-full h-full max-h-[40vh] md:max-h-full group">
              <img :src="card.imageUrl" :alt="card.name"
                class="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform transition-transform duration-700 group-hover:scale-105" />
              <!-- Visual effect behind card -->
              <div class="absolute inset-0 bg-primary/5 blur-[100px] -z-10 rounded-full animate-pulse"></div>
            </div>
          </div>

          <!-- Card Details Side -->
          <div
            class="w-full md:w-3/5 p-6 sm:p-12 flex flex-col justify-center space-y-6 sm:space-y-8 bg-gradient-to-br from-white/[0.03] to-transparent">
            <div class="space-y-3 sm:space-y-4">
              <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                Mestre Duelista
              </div>
              <h2
                class="text-3xl sm:text-6xl font-black uppercase tracking-tighter text-white italic font-serif leading-tight">
                {{ card.name }}
              </h2>
            </div>

            <div class="h-[2px] w-20 bg-gradient-to-r from-primary to-transparent"></div>

            <div class="space-y-4 sm:space-y-6">
              <div class="flex items-center gap-4">
                <span
                  class="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-foreground">Descrição
                  do
                  Card</span>
                <span class="h-[1px] flex-1 bg-white/5"></span>
              </div>
              <p
                class="text-base sm:text-xl text-muted-foreground font-medium leading-relaxed italic border-l-4 border-primary/20 pl-4 sm:pl-6 py-1 sm:py-2">
                {{ card.description }}
              </p>
            </div>

            <div class="pt-4 sm:pt-8">
              <div class="grid grid-cols-2 gap-4 sm:gap-6">
                <div class="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <p class="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-primary/60">Raridade</p>
                  <p class="text-base sm:text-lg font-bold text-white uppercase italic">Ultra Raro</p>
                </div>
                <div class="p-3 sm:p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <p class="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-primary/60">Tipo</p>
                  <p class="text-base sm:text-lg font-bold text-white uppercase italic">Monstro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
