import { useParams } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function RequestDetailsPage() {
  const { id } = useParams()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Детали заявки</CardTitle>
        <CardDescription>ID: {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
          Здесь появится карточка заявки и смена статуса.
        </div>
      </CardContent>
    </Card>
  )
}
