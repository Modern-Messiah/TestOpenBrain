import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function RequestCreatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Новая заявка</CardTitle>
        <CardDescription>Форма создания заявки будет подключена на следующем шаге.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
          Здесь появится форма.
        </div>
      </CardContent>
    </Card>
  )
}
