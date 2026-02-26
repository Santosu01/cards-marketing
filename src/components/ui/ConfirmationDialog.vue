<script setup lang="ts">
import { AlertCircle, X } from 'lucide-vue-next'
import Button from './Button.vue'

const isOpen = defineModel<boolean>({ default: false })

defineProps<{
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'gold' | 'destructive' | 'default'
  loading?: boolean
}>()

const emit = defineEmits<{
  confirm: []
}>()

const close = () => {
  isOpen.value = false
}
</script>

<template>
  <Teleport to="body">
    <transition name="page">
      <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
          class="bg-background/60 absolute inset-0 backdrop-blur-sm transition-opacity"
          @click="close()"
        ></div>

        <!-- Dialog Content -->
        <div
          class="bg-card animate-in zoom-in-95 relative w-full max-w-md overflow-hidden rounded-3xl border-2 border-white/5 shadow-2xl duration-200"
        >
          <!-- Decorative Top Bar -->
          <div
            class="h-1.5 w-full bg-gradient-to-r"
            :class="[
              variant === 'destructive'
                ? 'from-red-500 via-red-400 to-red-500'
                : variant === 'gold'
                  ? 'from-primary to-primary via-yellow-200'
                  : 'from-blue-500 via-cyan-400 to-blue-500',
            ]"
          ></div>

          <div class="space-y-6 p-8">
            <!-- Header -->
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-4">
                <div
                  class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-inner"
                  :class="[
                    variant === 'destructive'
                      ? 'bg-red-500/10 text-red-500'
                      : variant === 'gold'
                        ? 'bg-primary/10 text-primary'
                        : 'bg-blue-500/10 text-blue-500',
                  ]"
                >
                  <AlertCircle class="h-6 w-6" />
                </div>
                <div class="space-y-1">
                  <h3 class="text-xl font-black tracking-tighter text-white uppercase italic">
                    {{ title }}
                  </h3>
                  <p class="text-[10px] font-black tracking-[0.2em] uppercase opacity-40">
                    Confirmação Necessária
                  </p>
                </div>
              </div>
              <button
                @click="close()"
                class="text-muted-foreground rounded-xl p-2 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X class="h-5 w-5" />
              </button>
            </div>

            <!-- Body -->
            <p class="text-muted-foreground leading-relaxed font-medium">
              {{ message }}
            </p>

            <!-- Actions -->
            <div class="flex gap-3 pt-2">
              <Button
                variant="holographic"
                class="h-12 flex-1 text-[10px] font-black tracking-widest uppercase"
                @click="close()"
              >
                {{ cancelLabel || 'Cancelar' }}
              </Button>
              <Button
                :variant="variant || 'gold'"
                class="h-12 flex-1 text-[10px] font-black tracking-widest uppercase shadow-lg"
                :loading="loading"
                @click="emit('confirm')"
              >
                {{ confirmLabel || 'Confirmar' }}
              </Button>
            </div>
          </div>

          <!-- Decorative Glow -->
          <div
            class="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 opacity-20 blur-[80px]"
            :class="[
              variant === 'destructive'
                ? 'bg-red-500'
                : variant === 'gold'
                  ? 'bg-primary'
                  : 'bg-blue-500',
            ]"
          ></div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
