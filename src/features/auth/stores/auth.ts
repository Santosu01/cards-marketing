import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'
import { cookies } from '@/lib/cookies'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(
    cookies.get('user') ? JSON.parse(cookies.get('user')!) : null
  )
  const token = ref<string | null>(cookies.get('token') || null)

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(newToken: string, newUser: User) {
    token.value = newToken
    user.value = newUser
    cookies.set('token', newToken, 7)
    cookies.set('user', JSON.stringify(newUser), 7)
  }

  function logout() {
    token.value = null
    user.value = null
    cookies.remove('token')
    cookies.remove('user')
  }

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout,
  }
})
