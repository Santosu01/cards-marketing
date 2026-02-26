import { useQuery } from '@tanstack/vue-query'
import { getTrades } from '../service/trades-service'

export const TRADES_QUERY_KEY = ['trades'] as const

export function useTrades(page = 1, limit = 100) {
  return useQuery({
    queryKey: [...TRADES_QUERY_KEY, page, limit],
    queryFn: () => getTrades(page, limit),
    retry: 2,
  })
}
