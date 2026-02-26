import api from '@/lib/axios'
import type { CardsResponse, Card, AddCardsRequest } from '../types'

export async function getAllCards(page = 1, rpp = 20): Promise<CardsResponse> {
  const response = await api.get<CardsResponse>('/cards', {
    params: { page, rpp },
  })
  return response.data
}

export async function getCardById(id: string): Promise<Card> {
  const response = await api.get<Card>(`/cards/${id}`)
  return response.data
}

export async function getMyCards(): Promise<Card[]> {
  const response = await api.get<Card[]>('/me/cards')
  return response.data
}

export async function addCards(data: AddCardsRequest): Promise<void> {
  await api.post('/me/cards', data)
}
