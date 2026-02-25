import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteTrade } from '../service/trades-service'
import { TRADES_QUERY_KEY } from './use-trades-query'

export function useDeleteTradeMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteTrade(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TRADES_QUERY_KEY })
    },
  })
}
