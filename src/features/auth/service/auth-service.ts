import api from '@/lib/axios'
import type { LoginResponse, RegisterResponse } from '../types'
import type { LoginFormValues } from '../schemas/login-schema'
import type { RegisterFormValues } from '../schemas/register-schema'

export async function login(data: LoginFormValues): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/login', data)
  return response.data
}

export async function register(data: RegisterFormValues): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>('/register', data)
  return response.data
}
