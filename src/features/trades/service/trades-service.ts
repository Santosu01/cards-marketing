import api from '@/lib/axios'
import type { TradesResponse, CreateTradeRequest } from '../types'

export async function getTrades(page = 1, rpp = 10): Promise<TradesResponse> {
  const response = await api.get<TradesResponse>('/trades', {
    params: { page, rpp },
  })
  return response.data
}

export async function createTrade(data: CreateTradeRequest): Promise<{ tradeId: string }> {
  const response = await api.post<{ tradeId: string }>('/trades', data)
  return response.data
}

export async function deleteTrade(id: string): Promise<void> {
  await api.delete(`/trades/${id}`)
}
