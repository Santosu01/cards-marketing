import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { createTrade } from '../service/trades-service'
import { TRADES_QUERY_KEY } from './use-trades'
import type { CreateTradeRequest } from '../types'

export function useCreateTrade() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTradeRequest) => createTrade(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRADES_QUERY_KEY })
    },
  })
}
