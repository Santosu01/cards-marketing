import type { Card } from '@/features/cards/types'

export interface TradeCard {
  id: string
  cardId: string
  tradeId: string
  type: 'OFFERING' | 'RECEIVING'
  card: Card
}

export interface Trade {
  id: string
  userId: string
  createdAt: string
  user: {
    name: string
  }
  tradeCards: TradeCard[]
}

export interface TradesResponse {
  list: Trade[]
  rpp: number
  page: number
  more: boolean
}

export interface CreateTradeRequest {
  cards: {
    cardId: string
    type: 'OFFERING' | 'RECEIVING'
  }[]
}
