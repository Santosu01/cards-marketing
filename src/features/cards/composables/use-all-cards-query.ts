import { useQuery } from '@tanstack/vue-query'
import { getAllCards } from '../service/cards-service'

export const ALL_CARDS_QUERY_KEY = ['all-cards'] as const

export function useAllCardsQuery(page = 1, limit = 100, enabled = true) {
  return useQuery({
    queryKey: [...ALL_CARDS_QUERY_KEY, page, limit],
    queryFn: () => getAllCards(page, limit),
    enabled,
  })
}
