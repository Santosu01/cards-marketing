<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, RouterLink } from 'vue-router'
import { useAuth } from '@/features/auth/composables/use-auth'
import { useGetUserInfo } from '@/features/auth/composables/use-get-user-info'
import Button from '@/components/ui/Button.vue'
import { Menu, X } from 'lucide-vue-next'

const { user, isAuthenticated, logout } = useAuth()
// User hydration is handled automatically by this query
useGetUserInfo()

const isMobileMenuOpen = ref(false)

const closeMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col selection:bg-primary selection:text-primary-foreground overflow-x-hidden">
    <!-- Global Decorative Element -->
    <div
      class="fixed inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
    </div>

    <header
      class="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl shadow-2xl transition-all duration-300">
      <div class="container flex h-16 sm:h-20 items-center justify-between px-4 mx-auto max-w-7xl">
        <div class="flex items-center gap-6 lg:gap-16">
          <RouterLink to="/" class="flex items-center space-x-3 group" @click="closeMenu">
            <div
              class="relative w-10 h-10 sm:w-12 sm:h-12 gold-gradient rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-primary/20">
              <span class="text-primary-foreground font-black text-xl sm:text-2xl drop-shadow-sm">IC</span>
              <div
                class="absolute inset-0 rounded-xl animate-ping bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
              </div>
            </div>
            <div class="flex flex-col -space-y-1">
              <span
                class="inline-block font-black text-xl sm:text-2xl tracking-tighter uppercase font-serif text-white group-hover:text-primary transition-colors">Inmeta
                Cards</span>
              <span
                class="text-[8px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground hidden sm:block">Premium
                Trading</span>
            </div>
          </RouterLink>

          <nav class="hidden md:flex gap-10">
            <RouterLink to="/"
              class="text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-primary relative py-2 group"
              active-class="text-primary">
              Mercado
              <span
                class="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </RouterLink>
            <RouterLink v-if="isAuthenticated" to="/my-cards"
              class="text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-primary relative py-2 group"
              active-class="text-primary">
              Coleção
              <span
                class="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </RouterLink>
            <RouterLink v-if="isAuthenticated" to="/my-trades"
              class="text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-primary relative py-2 group"
              active-class="text-primary">
              Trocas
              <span
                class="absolute bottom-0 left-0 w-full h-[3px] bg-primary scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </RouterLink>
          </nav>
        </div>

        <div class="flex items-center gap-2 sm:gap-4">
          <template v-if="!isAuthenticated">
            <RouterLink to="/login"
              class="text-xs font-black uppercase tracking-[0.1em] hover:text-primary transition-colors hidden sm:block px-4">
              Entrar
            </RouterLink>
            <RouterLink to="/register">
              <Button variant="gold" size="sm" class="sm:h-11 sm:px-6 rounded-lg shadow-xl">
                Começar
              </Button>
            </RouterLink>
          </template>
          <template v-else>
            <div class="flex items-center gap-3 sm:gap-6 sm:pl-6 sm:border-l sm:border-white/10">
              <div class="flex flex-col text-right hidden lg:flex">
                <span class="text-xs font-black uppercase tracking-tight text-white italic truncate max-w-[120px]">{{
                  user?.name }}</span>
                <span class="text-[9px] text-primary font-bold uppercase tracking-widest truncate max-w-[120px]">{{
                  user?.email }}</span>
              </div>
              <Button variant="holographic" size="sm" @click="logout"
                class="px-3 sm:px-5 border-white/20 hidden sm:flex">
                Sair
              </Button>
            </div>
          </template>

          <!-- Mobile Menu Toggle -->
          <button @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden p-2 text-white hover:text-primary transition-colors">
            <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
            <X v-else class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu Content -->
      <transition name="page">
        <div v-if="isMobileMenuOpen"
          class="md:hidden absolute top-full left-0 w-full bg-card border-b border-white/5 shadow-2xl p-6 space-y-6 z-50 animate-in slide-in-from-top-4">
          <nav class="flex flex-col gap-4">
            <RouterLink to="/" @click="closeMenu"
              class="text-sm font-black uppercase tracking-widest py-3 border-b border-white/5 hover:text-primary transition-colors">
              Mercado
            </RouterLink>
            <RouterLink v-if="isAuthenticated" to="/my-cards" @click="closeMenu"
              class="text-sm font-black uppercase tracking-widest py-3 border-b border-white/5 hover:text-primary transition-colors">
              Minha Coleção
            </RouterLink>
            <RouterLink v-if="isAuthenticated" to="/my-trades" @click="closeMenu"
              class="text-sm font-black uppercase tracking-widest py-3 border-b border-white/5 hover:text-primary transition-colors">
              Minhas Trocas
            </RouterLink>
          </nav>

          <div v-if="isAuthenticated" class="pt-4 flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-sm font-black uppercase tracking-tight text-white italic">{{ user?.name }}</span>
              <span class="text-[10px] text-primary font-bold uppercase tracking-widest">{{ user?.email }}</span>
            </div>
            <Button variant="destructive" size="sm" @click="() => { logout(); closeMenu(); }">
              Sair
            </Button>
          </div>
          <div v-else class="flex flex-col gap-3 pt-4">
            <RouterLink to="/login" @click="closeMenu" class="w-full">
              <Button variant="outline" class="w-full">Entrar</Button>
            </RouterLink>
          </div>
        </div>
      </transition>
    </header>

    <!-- Main Content -->
    <main class="flex-1 relative pt-16 sm:pt-20">
      <div class="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <RouterView v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </RouterView>
      </div>
    </main>

    <footer class="border-t border-white/5 py-12 bg-card relative overflow-hidden">
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent">
      </div>

      <div class="container mx-auto px-4 text-center space-y-6 max-w-7xl relative z-10">
        <div class="flex justify-center gap-4 opacity-40">
          <div
            class="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-[10px] font-black uppercase tracking-tighter italic">
            V3</div>
          <div
            class="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-[10px] font-black uppercase tracking-tighter italic">
            TCG</div>
          <div
            class="w-8 h-8 rounded border border-white/20 flex items-center justify-center text-[10px] font-black uppercase tracking-tighter italic">
            API</div>
        </div>
        <div class="space-y-2">
          <p class="text-[10px] text-muted-foreground font-black uppercase tracking-[0.5em]">Inmeta Cards &copy; 2026
          </p>
          <p class="text-[10px] text-muted-foreground/30 max-w-xs mx-auto leading-relaxed font-medium">
            Forjado para mestres duelistas.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
