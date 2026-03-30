import { type RequestStatus } from '@/types/request'

export function getStatusLabel(status: RequestStatus) {
  switch (status) {
    case 'NEW':
      return 'New'
    case 'IN_PROGRESS':
      return 'In Progress'
    case 'WAITING_FOR_RESPONSE':
      return 'Waiting for Response'
    case 'COMPLETED':
      return 'Completed'
    case 'REJECTED':
      return 'Rejected'
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
