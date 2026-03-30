import { type RequestStatus } from '@/types/request'

export function getStatusLabel(status: RequestStatus) {
  switch (status) {
    case 'NEW':
      return 'Новая'
    case 'IN_PROGRESS':
      return 'В работе'
    case 'WAITING_FOR_RESPONSE':
      return 'Ожидает ответа'
    case 'COMPLETED':
      return 'Завершена'
    case 'REJECTED':
      return 'Отклонена'
  }
}

export function getStatusVariant(status: RequestStatus) {
  switch (status) {
    case 'NEW':
      return 'neutral' as const
    case 'IN_PROGRESS':
      return 'progress' as const
    case 'WAITING_FOR_RESPONSE':
      return 'warning' as const
    case 'COMPLETED':
      return 'success' as const
    case 'REJECTED':
      return 'rejected' as const
  }
}
