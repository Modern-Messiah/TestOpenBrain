import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { createRequest } from '@/lib/requests-api'

interface FormState {
  title: string
  clientName: string
  email: string
  phone: string
  description: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialState: FormState = {
  title: '',
  clientName: '',
  email: '',
  phone: '',
  description: '',
}

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}

  if (values.title.trim().length < 3) {
    errors.title = 'Минимум 3 символа'
  }

  if (values.clientName.trim().length < 2) {
    errors.clientName = 'Минимум 2 символа'
  }

  if (!values.email.trim() && !values.phone.trim()) {
    errors.email = 'Укажите email или телефон'
    errors.phone = 'Укажите email или телефон'
  }

  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Некорректный email'
  }

  if (values.phone && !/^\+?[0-9()\-\s]{7,20}$/.test(values.phone)) {
    errors.phone = 'Некорректный телефон'
  }

  return errors
}

export function RequestCreatePage() {
  const [values, setValues] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<FormErrors>({})
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createRequest,
    onSuccess: (created) => {
      toast.success('Заявка создана')
      queryClient.invalidateQueries({ queryKey: ['requests'] })
      navigate(`/requests/${created.id}`)
    },
    onError: () => {
      toast.error('Не удалось создать заявку')
    },
  })

  const handleChange =
    (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    createMutation.mutate({
      title: values.title.trim(),
      clientName: values.clientName.trim(),
      email: values.email.trim() || undefined,
      phone: values.phone.trim() || undefined,
      description: values.description.trim() || undefined,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Новая заявка</CardTitle>
        <CardDescription>Заполните форму и сохраните обращение в систему.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="title">Заголовок</Label>
            <Input
              id="title"
              value={values.title}
              onChange={handleChange('title')}
              placeholder="Кратко опишите проблему"
            />
            {errors.title ? <p className="text-sm text-destructive">{errors.title}</p> : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="clientName">Имя клиента</Label>
            <Input
              id="clientName"
              value={values.clientName}
              onChange={handleChange('clientName')}
              placeholder="Иван Петров"
            />
            {errors.clientName ? (
              <p className="text-sm text-destructive">{errors.clientName}</p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange('email')}
                placeholder="client@example.com"
              />
              {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={values.phone}
                onChange={handleChange('phone')}
                placeholder="+77015551234"
              />
              {errors.phone ? <p className="text-sm text-destructive">{errors.phone}</p> : null}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={values.description}
              onChange={handleChange('description')}
              placeholder="Детали заявки"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => navigate('/')}>
              Отмена
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? 'Сохраняем...' : 'Создать заявку'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
