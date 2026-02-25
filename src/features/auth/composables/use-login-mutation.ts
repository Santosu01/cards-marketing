import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { login } from '../service/auth-service'
import { useAuthStore } from '../stores/auth'
import type { LoginFormValues } from '../schemas/login-schema'
import type { LoginResponse } from '../types'

export function useLoginMutation() {
  const router = useRouter()
  const authStore = useAuthStore()

  return useMutation<LoginResponse, Error, LoginFormValues>({
    mutationFn: (credentials) => login(credentials),
    onSuccess: (response) => {
      authStore.setAuth(response.token, response.user)
      router.push('/')
    },
  })
}
