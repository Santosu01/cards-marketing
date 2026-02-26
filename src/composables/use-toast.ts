import { reactive } from 'vue'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
}

let nextId = 0
const toasts = reactive<Toast[]>([])

const add = (message: string, type: ToastType, duration = 4000) => {
  const id = nextId++
  toasts.push({ id, message, type })
  setTimeout(() => remove(id), duration)
}

const remove = (id: number) => {
  const index = toasts.findIndex((t) => t.id === id)
  if (index !== -1) toasts.splice(index, 1)
}

export const useToast = () => ({
  toasts,
  remove,
  success: (message: string, duration?: number) => add(message, 'success', duration),
  error: (message: string, duration?: number) => add(message, 'error', duration),
  info: (message: string, duration?: number) => add(message, 'info', duration),
})
