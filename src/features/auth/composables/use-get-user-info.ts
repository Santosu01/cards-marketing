import { useQuery } from '@tanstack/vue-query'
import { watch } from 'vue'
import { getMe } from '../service/auth-service'
import { useAuthStore } from '../stores/auth'
import type { User } from '../types'

export function useGetUserInfo() {
  const authStore = useAuthStore()

  const query = useQuery<User, Error>({
    queryKey: ['auth', 'me'],
    queryFn: getMe,
    enabled: !!authStore.token && !authStore.user,
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  // Synchronize query data with store
  watch(
    query.data,
    (newData) => {
      if (newData) {
        authStore.setUser(newData)
      }
    },
    { immediate: true }
  )

  // Handle errors (e.g., token expired)
  watch(
    query.error,
    (error) => {
      if (error) {
        console.error('Session expired or user fetch failed:', error)
        authStore.logout()
      }
    }
  )

  return query
}
