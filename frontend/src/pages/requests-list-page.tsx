import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function RequestsListPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Список заявок</CardTitle>
        <CardDescription>Таблица, фильтры и статусы будут подключены на следующем шаге.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
          Здесь появится таблица заявок.
        </div>
      </CardContent>
    </Card>
  )
}
