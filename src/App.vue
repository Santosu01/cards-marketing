<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useAuth } from '@/features/auth/composables/use-auth'
import Button from '@/components/ui/Button.vue'

const { user, isAuthenticated, logout } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
    <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div class="container flex h-20 items-center justify-between px-4 mx-auto max-w-7xl">
        <div class="flex items-center gap-8 lg:gap-12">
          <RouterLink to="/" class="flex items-center space-x-2 group">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
               <span class="text-primary-foreground font-black text-xl">IC</span>
            </div>
            <span class="inline-block font-extrabold text-2xl tracking-tighter uppercase transition-colors group-hover:text-primary">Inmeta Cards</span>
          </RouterLink>
          
          <nav class="hidden md:flex gap-8">
            <RouterLink to="/" class="text-sm font-semibold transition-all hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full" active-class="text-primary after:w-full">
              Mercado
            </RouterLink>
            <RouterLink v-if="isAuthenticated" to="/my-cards" class="text-sm font-semibold transition-all hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full" active-class="text-primary after:w-full">
              Minha Coleção
            </RouterLink>
            <RouterLink v-if="isAuthenticated" to="/my-trades" class="text-sm font-semibold transition-all hover:text-primary relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full" active-class="text-primary after:w-full">
              Minhas Trocas
            </RouterLink>
          </nav>
        </div>

        <div class="flex items-center gap-3 lg:gap-6">
          <template v-if="!isAuthenticated">
            <RouterLink to="/login" class="text-sm font-semibold hover:text-primary transition-colors hidden sm:block">
              Entrar
            </RouterLink>
            <RouterLink to="/register">
              <Button class="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                Começar Agora
              </Button>
            </RouterLink>
          </template>
          <template v-else>
            <div class="flex items-center gap-4 pl-4 border-l">
              <div class="flex flex-col text-right hidden sm:flex">
                <span class="text-sm font-bold leading-none">{{ user?.name }}</span>
                <span class="text-[10px] text-muted-foreground uppercase tracking-widest">{{ user?.email }}</span>
              </div>
              <Button variant="outline" size="sm" @click="logout" class="rounded-full px-4 border-muted-foreground/20 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all">
                Sair
              </Button>
            </div>
          </template>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-x-hidden">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>

    <footer class="border-t py-12 bg-muted/30">
      <div class="container mx-auto px-4 text-center space-y-4 max-w-7xl">
        <p class="text-sm text-muted-foreground font-medium uppercase tracking-[0.2em]">Inmeta Cards &copy; 2026</p>
        <p class="text-xs text-muted-foreground/60 max-w-md mx-auto leading-relaxed">
          Experiência premium de troca para entusiastas de cartas. Desenvolvido com Vue 3, Tailwind CSS e TanStack Query.
        </p>
      </div>
    </footer>
  </div>
</template>
