export interface User {
  id: string
  name: string
  email: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RegisterResponse {
  userId: string
}

export interface AuthState {
  user: User | null
  token: string | null
}
