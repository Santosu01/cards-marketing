import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'
import { cookies } from '@/lib/cookies'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(cookies.get('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  function setUser(newUser: User | null) {
    user.value = newUser
  }

  function setAuth(newToken: string, newUser: User) {
    token.value = newToken
    user.value = newUser
    cookies.set('token', newToken, 7)
  }

  function logout() {
    token.value = null
    user.value = null
    cookies.remove('token')
  }

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    setUser,
    logout,
  }
})
