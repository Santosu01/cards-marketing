<script setup lang="ts">
import { X, CheckCircle, AlertCircle, Info } from 'lucide-vue-next'
import { useToast } from '@/composables/use-toast'

const { toasts, remove } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed top-20 right-4 z-[200] flex flex-col gap-3 sm:right-6">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="translate-x-4 opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-4 opacity-0"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border-2 p-4 shadow-2xl backdrop-blur-xl"
          :class="{
            'border-green-500/30 bg-green-950/80 text-green-100': toast.type === 'success',
            'border-red-500/30 bg-red-950/80 text-red-100': toast.type === 'error',
            'border-blue-500/30 bg-blue-950/80 text-blue-100': toast.type === 'info',
          }"
        >
          <!-- Icon -->
          <div
            class="mt-0.5 shrink-0"
            :class="{
              'text-green-400': toast.type === 'success',
              'text-red-400': toast.type === 'error',
              'text-blue-400': toast.type === 'info',
            }"
          >
            <CheckCircle v-if="toast.type === 'success'" class="h-5 w-5" />
            <AlertCircle v-else-if="toast.type === 'error'" class="h-5 w-5" />
            <Info v-else class="h-5 w-5" />
          </div>

          <!-- Message -->
          <p class="flex-1 text-sm leading-snug font-medium">{{ toast.message }}</p>

          <!-- Close -->
          <button
            class="cursor-pointer text-current opacity-50 transition-opacity hover:opacity-100"
            @click="remove(toast.id)"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
