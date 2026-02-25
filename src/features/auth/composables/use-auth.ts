import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'

export function useAuth() {
  const router = useRouter()
  const authStore = useAuthStore()
  const { user, isAuthenticated } = storeToRefs(authStore)

  function logout() {
    authStore.logout()
    router.push('/login')
  }

  return {
    logout,
    user,
    isAuthenticated,
  }
}
