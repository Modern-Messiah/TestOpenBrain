import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { RequestStatusBadge } from '@/components/request-status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/lib/date'
import { fetchRequestById, updateRequestStatus } from '@/lib/requests-api'
import { getStatusLabel } from '@/lib/status'
import { REQUEST_STATUS, type RequestStatus } from '@/types/request'

export function RequestDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const requestQuery = useQuery({
    queryKey: ['request', id],
    queryFn: () => fetchRequestById(id ?? ''),
    enabled: Boolean(id),
  })

  const updateStatusMutation = useMutation({
    mutationFn: (status: RequestStatus) => updateRequestStatus(id ?? '', status),
    onSuccess: (updated) => {
      toast.success('Статус обновлен')
      queryClient.setQueryData(['request', id], updated)
      queryClient.invalidateQueries({ queryKey: ['requests'] })
    },
    onError: () => {
      toast.error('Не удалось обновить статус')
    },
  })

  if (!id) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-sm text-destructive">Некорректный ID заявки.</p>
        </CardContent>
      </Card>
    )
  }

  if (requestQuery.isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-40 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    )
  }

  if (requestQuery.isError || !requestQuery.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ошибка загрузки</CardTitle>
          <CardDescription>Не удалось получить карточку заявки.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" asChild>
            <Link to="/">Вернуться к списку</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const request = requestQuery.data

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>{request.title}</CardTitle>
            <CardDescription>Заявка от {request.clientName}</CardDescription>
          </div>
          <RequestStatusBadge status={request.status} />
        </CardHeader>
        <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p>{request.email ?? '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Телефон</p>
            <p>{request.phone ?? '—'}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Создана</p>
            <p>{formatDate(request.createdAt)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Обновлена</p>
            <p>{formatDate(request.updatedAt)}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-muted-foreground">Описание</p>
            <p className="whitespace-pre-wrap">{request.description ?? 'Описание не указано.'}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Смена статуса</CardTitle>
          <CardDescription>Обновление отражается сразу в списке заявок.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            className="sm:w-64"
            defaultValue={request.status}
            onChange={(event) =>
              updateStatusMutation.mutate(event.target.value as RequestStatus)
            }
            disabled={updateStatusMutation.isPending}
          >
            {REQUEST_STATUS.map((status) => (
              <option key={status} value={status}>
                {getStatusLabel(status)}
              </option>
            ))}
          </Select>
          <Button variant="outline" asChild>
            <Link to="/">К списку заявок</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
