import { useQuery } from '@tanstack/vue-query'
import { toValue, type MaybeRefOrGetter } from 'vue'
import { getAllCards } from '../service/cards-service'

export const ALL_CARDS_QUERY_KEY = ['all-cards'] as const

export function useAllCards(
  page: MaybeRefOrGetter<number> = 1,
  limit: MaybeRefOrGetter<number> = 100,
  enabled: MaybeRefOrGetter<boolean> = true,
) {
  return useQuery({
    queryKey: [...ALL_CARDS_QUERY_KEY, page, limit],
    queryFn: () => getAllCards(toValue(page), toValue(limit)),
    enabled,
  })
}
