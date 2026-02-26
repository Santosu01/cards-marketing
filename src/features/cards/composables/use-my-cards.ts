import { useQuery } from '@tanstack/vue-query'
import { getMyCards } from '../service/cards-service'

export const MY_CARDS_QUERY_KEY = ['my-cards'] as const

export function useMyCards() {
  return useQuery({
    queryKey: MY_CARDS_QUERY_KEY,
    queryFn: () => getMyCards(),
  })
}
