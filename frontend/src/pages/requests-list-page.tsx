import { useQuery } from '@tanstack/react-query'
import { Link, useSearchParams } from 'react-router-dom'
import { RequestStatusBadge } from '@/components/request-status-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatDate } from '@/lib/date'
import { fetchRequests } from '@/lib/requests-api'
import { getStatusLabel } from '@/lib/status'
import { REQUEST_STATUS, type RequestStatus } from '@/types/request'

export function RequestsListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const status = searchParams.get('status') as RequestStatus | null
  const selectedStatus = REQUEST_STATUS.includes(status as RequestStatus)
    ? (status as RequestStatus)
    : undefined

  const requestsQuery = useQuery({
    queryKey: ['requests', selectedStatus],
    queryFn: () => fetchRequests(selectedStatus),
  })

  const handleStatusChange = (value: string) => {
    if (!value) {
      searchParams.delete('status')
    } else {
      searchParams.set('status', value)
    }
    setSearchParams(searchParams)
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Список заявок</CardTitle>
          <CardDescription>Все клиентские обращения в одном месте.</CardDescription>
        </div>
        <div className="flex w-full gap-3 sm:w-auto">
          <Select
            className="w-full sm:w-56"
            value={selectedStatus ?? ''}
            onChange={(event) => handleStatusChange(event.target.value)}
          >
            <option value="">Все статусы</option>
            {REQUEST_STATUS.map((item) => (
              <option key={item} value={item}>
                {getStatusLabel(item)}
              </option>
            ))}
          </Select>
          <Button asChild>
            <Link to="/requests/new">Новая заявка</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {requestsQuery.isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : null}

        {requestsQuery.isError ? (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            Не удалось загрузить заявки. Проверьте backend и попробуйте снова.
          </div>
        ) : null}

        {requestsQuery.isSuccess && requestsQuery.data.length === 0 ? (
          <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
            Заявок пока нет.
          </div>
        ) : null}

        {requestsQuery.isSuccess && requestsQuery.data.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Заголовок</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Контакт</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Создана</TableHead>
                  <TableHead className="w-[120px] text-right">Действие</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requestsQuery.data.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.title}</TableCell>
                    <TableCell>{request.clientName}</TableCell>
                    <TableCell>{request.email ?? request.phone ?? '—'}</TableCell>
                    <TableCell>
                      <RequestStatusBadge status={request.status} />
                    </TableCell>
                    <TableCell>{formatDate(request.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/requests/${request.id}`}>Открыть</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
