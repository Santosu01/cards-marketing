<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
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
  <header
    class="bg-background/80 fixed top-0 left-0 z-50 w-full border-b border-white/5 shadow-2xl backdrop-blur-xl transition-all duration-300"
  >
    <div class="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20">
      <div class="flex items-center gap-6 lg:gap-16">
        <RouterLink to="/" class="group flex items-center space-x-3" @click="closeMenu">
          <div
            class="gold-gradient shadow-primary/20 relative flex h-10 w-10 transform items-center justify-center rounded-xl shadow-lg transition-all duration-500 group-hover:rotate-12 sm:h-12 sm:w-12"
          >
            <span class="text-primary-foreground text-xl font-black drop-shadow-sm sm:text-2xl"
              >IC</span
            >
            <div
              class="bg-primary/20 absolute inset-0 animate-ping rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
            ></div>
          </div>
          <div class="flex flex-col -space-y-1">
            <span
              class="group-hover:text-primary inline-block font-serif text-xl font-black tracking-tighter text-white uppercase transition-colors sm:text-2xl"
              >Inmeta Cards</span
            >
            <span
              class="text-muted-foreground hidden text-[8px] font-bold tracking-[0.3em] uppercase sm:block sm:text-[10px]"
              >Premium Trading</span
            >
          </div>
        </RouterLink>

        <nav class="hidden gap-10 md:flex">
          <RouterLink
            to="/"
            class="hover:text-primary group relative py-2 text-xs font-black tracking-[0.2em] uppercase transition-all"
            active-class="text-primary"
          >
            Mercado
            <span
              class="bg-primary absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            ></span>
          </RouterLink>
          <RouterLink
            v-if="isAuthenticated"
            to="/my-cards"
            class="hover:text-primary group relative py-2 text-xs font-black tracking-[0.2em] uppercase transition-all"
            active-class="text-primary"
          >
            Coleção
            <span
              class="bg-primary absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            ></span>
          </RouterLink>
          <RouterLink
            v-if="isAuthenticated"
            to="/my-trades"
            class="hover:text-primary group relative py-2 text-xs font-black tracking-[0.2em] uppercase transition-all"
            active-class="text-primary"
          >
            Trocas
            <span
              class="bg-primary absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            ></span>
          </RouterLink>
        </nav>
      </div>

      <div class="flex items-center gap-2 sm:gap-4">
        <template v-if="!isAuthenticated">
          <RouterLink
            to="/login"
            class="hover:text-primary hidden px-4 text-xs font-black tracking-[0.1em] uppercase transition-colors sm:block"
          >
            Entrar
          </RouterLink>
          <RouterLink to="/register">
            <Button variant="gold" size="sm" class="rounded-lg shadow-xl sm:h-11 sm:px-6">
              Começar
            </Button>
          </RouterLink>
        </template>
        <template v-else>
          <div class="flex items-center gap-3 sm:gap-6 sm:border-l sm:border-white/10 sm:pl-6">
            <div class="flex hidden flex-col text-right lg:flex">
              <span
                class="max-w-[120px] truncate text-xs font-black tracking-tight text-white uppercase italic"
                >{{ user?.name }}</span
              >
              <span
                class="text-primary max-w-[120px] truncate text-[9px] font-bold tracking-widest uppercase"
                >{{ user?.email }}</span
              >
            </div>
            <Button
              variant="holographic"
              size="sm"
              @click="logout"
              class="hidden border-white/20 px-3 sm:flex sm:px-5"
            >
              Sair
            </Button>
          </div>
        </template>

        <!-- Mobile Menu Toggle -->
        <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="hover:text-primary p-2 text-white transition-colors md:hidden"
        >
          <Menu v-if="!isMobileMenuOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Content -->
    <transition name="page">
      <div
        v-if="isMobileMenuOpen"
        class="bg-card animate-in slide-in-from-top-4 absolute top-full left-0 z-50 w-full space-y-6 border-b border-white/5 p-6 shadow-2xl md:hidden"
      >
        <nav class="flex flex-col gap-4">
          <RouterLink
            to="/"
            @click="closeMenu"
            class="hover:text-primary border-b border-white/5 py-3 text-sm font-black tracking-widest uppercase transition-colors"
          >
            Mercado
          </RouterLink>
          <RouterLink
            v-if="isAuthenticated"
            to="/my-cards"
            @click="closeMenu"
            class="hover:text-primary border-b border-white/5 py-3 text-sm font-black tracking-widest uppercase transition-colors"
          >
            Minha Coleção
          </RouterLink>
          <RouterLink
            v-if="isAuthenticated"
            to="/my-trades"
            @click="closeMenu"
            class="hover:text-primary border-b border-white/5 py-3 text-sm font-black tracking-widest uppercase transition-colors"
          >
            Minhas Trocas
          </RouterLink>
        </nav>

        <div v-if="isAuthenticated" class="flex items-center justify-between pt-4">
          <div class="flex flex-col">
            <span class="text-sm font-black tracking-tight text-white uppercase italic">{{
              user?.name
            }}</span>
            <span class="text-primary text-[10px] font-bold tracking-widest uppercase">{{
              user?.email
            }}</span>
          </div>
          <Button
            variant="destructive"
            size="sm"
            @click="
              () => {
                logout()
                closeMenu()
              }
            "
          >
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
</template>
