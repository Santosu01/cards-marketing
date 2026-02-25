import axios from 'axios'

export const getErrorMessage = (err: unknown) => {
  if (!err) return ''
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 503) {
      return 'A API está acordando. Por favor, tente novamente em alguns segundos.'
    }
    return err.response?.data?.message || 'Ocorreu um erro. Por favor, tente novamente.'
  }
  return err instanceof Error ? err.message : 'Ocorreu um erro inesperado.'
}
