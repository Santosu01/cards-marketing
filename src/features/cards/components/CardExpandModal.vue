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
    <div
      v-if="card"
      class="bg-background/95 fixed inset-0 z-[100] overflow-y-auto backdrop-blur-2xl"
      @click="emit('close')"
    >
      <!-- Wrapper to center the modal but allow scrolling -->
      <div class="flex min-h-full items-center justify-center p-4 sm:p-8">
        <!-- Container with max-width and improved layout -->
        <div
          class="bg-card/40 holographic animate-in zoom-in-95 relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border-2 border-white/10 shadow-[0_0_100px_-20px_hsla(var(--primary),0.3)] duration-500 sm:rounded-[2.5rem] md:flex-row"
          @click.stop
        >
          <!-- Close Button - Moved inside for easier containment -->
          <button
            class="hover:bg-primary absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 active:scale-95 sm:top-6 sm:right-6 sm:h-12 sm:w-12"
            @click="emit('close')"
          >
            <X class="h-5 h-6 w-5 sm:w-6" />
          </button>

          <!-- Card Image Side -->
          <div
            class="flex aspect-square w-full items-center justify-center border-b border-white/10 bg-black/40 p-6 sm:p-10 md:aspect-auto md:w-2/5 md:border-r md:border-b-0"
          >
            <div class="group relative h-full max-h-[40vh] w-full md:max-h-full">
              <img
                :src="card.imageUrl"
                :alt="card.name"
                class="h-full w-full transform object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:scale-105"
              />
              <!-- Visual effect behind card -->
              <div
                class="bg-primary/5 absolute inset-0 -z-10 animate-pulse rounded-full blur-[100px]"
              ></div>
            </div>
          </div>

          <!-- Card Details Side -->
          <div
            class="flex w-full flex-col justify-center space-y-6 bg-gradient-to-br from-white/[0.03] to-transparent p-6 sm:space-y-8 sm:p-12 md:w-3/5"
          >
            <div class="space-y-3 sm:space-y-4">
              <div
                class="bg-primary/10 border-primary/20 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[9px] font-black tracking-[0.2em] uppercase sm:text-[10px]"
              >
                Mestre Duelista
              </div>
              <h2
                class="font-serif text-3xl leading-tight font-black tracking-tighter text-white uppercase italic sm:text-6xl"
              >
                {{ card.name }}
              </h2>
            </div>

            <div class="from-primary h-[2px] w-20 bg-gradient-to-r to-transparent"></div>

            <div class="space-y-4 sm:space-y-6">
              <div class="flex items-center gap-4">
                <span
                  class="text-muted-foreground text-[9px] font-black tracking-widest uppercase sm:text-[10px]"
                  >Descrição do Card</span
                >
                <span class="h-[1px] flex-1 bg-white/5"></span>
              </div>
              <p
                class="text-muted-foreground border-primary/20 border-l-4 py-1 pl-4 text-base leading-relaxed font-medium italic sm:py-2 sm:pl-6 sm:text-xl"
              >
                {{ card.description }}
              </p>
            </div>

            <div class="pt-4 sm:pt-8">
              <div class="grid grid-cols-2 gap-4 sm:gap-6">
                <div class="space-y-1 rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:p-4">
                  <p
                    class="text-primary/60 text-[8px] font-black tracking-widest uppercase sm:text-[9px]"
                  >
                    Raridade
                  </p>
                  <p class="text-base font-bold text-white uppercase italic sm:text-lg">
                    Ultra Raro
                  </p>
                </div>
                <div class="space-y-1 rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:p-4">
                  <p
                    class="text-primary/60 text-[8px] font-black tracking-widest uppercase sm:text-[9px]"
                  >
                    Tipo
                  </p>
                  <p class="text-base font-bold text-white uppercase italic sm:text-lg">Monstro</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
