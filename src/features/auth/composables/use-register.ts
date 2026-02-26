import { useMutation } from '@tanstack/vue-query'
import { register } from '../service/auth-service'
import type { RegisterFormValues } from '../schemas/register-schema'
import type { RegisterResponse } from '../types'

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterFormValues>({
    mutationFn: (data) => register(data),
  })
}
