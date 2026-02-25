import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addCards } from '../service/cards-service'
import { MY_CARDS_QUERY_KEY } from './use-my-cards-query'

export function useAddCardsMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cardIds: string[]) => addCards({ cardIds }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MY_CARDS_QUERY_KEY })
    },
  })
}
