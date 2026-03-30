import { api } from '@/lib/api'
import { type RequestItem, type RequestStatus } from '@/types/request'

export interface CreateRequestPayload {
  title: string
  clientName: string
  email?: string
  phone?: string
  description?: string
}

export async function fetchRequests(status?: RequestStatus): Promise<RequestItem[]> {
  const response = await api.get<RequestItem[]>('/requests', {
    params: status ? { status } : undefined,
  })
  return response.data
}

export async function fetchRequestById(id: string): Promise<RequestItem> {
  const response = await api.get<RequestItem>(`/requests/${id}`)
  return response.data
}

export async function createRequest(payload: CreateRequestPayload): Promise<RequestItem> {
  const response = await api.post<RequestItem>('/requests', payload)
  return response.data
}

export async function updateRequestStatus(
  id: string,
  status: RequestStatus,
): Promise<RequestItem> {
  const response = await api.patch<RequestItem>(`/requests/${id}/status`, { status })
  return response.data
}
