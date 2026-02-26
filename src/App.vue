<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div
    class="bg-background text-foreground selection:bg-primary selection:text-primary-foreground flex min-h-screen flex-col overflow-x-hidden font-sans antialiased"
  >
    <Navbar />

    <!-- Main Content -->
    <main class="relative flex-1 pt-16 sm:pt-20">
      <div class="relative z-10 container mx-auto max-w-7xl px-4 py-8">
        <RouterView v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </main>

    <Footer />
  </div>
</template>
