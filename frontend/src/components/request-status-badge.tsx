import { Badge } from '@/components/ui/badge'
import { getStatusLabel, getStatusVariant } from '@/lib/status'
import { type RequestStatus } from '@/types/request'

export function RequestStatusBadge({ status }: { status: RequestStatus }) {
  return <Badge variant={getStatusVariant(status)}>{getStatusLabel(status)}</Badge>
}
