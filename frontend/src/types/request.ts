export const REQUEST_STATUS = [
  'NEW',
  'IN_PROGRESS',
  'WAITING_FOR_RESPONSE',
  'COMPLETED',
  'REJECTED',
] as const

export type RequestStatus = (typeof REQUEST_STATUS)[number]

export interface RequestItem {
  id: string
  title: string
  clientName: string
  email: string | null
  phone: string | null
  description: string | null
  status: RequestStatus
  createdAt: string
  updatedAt: string
}
