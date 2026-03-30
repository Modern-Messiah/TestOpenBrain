# Краткое архитектурное описание

## Почему этот стек

- `NestJS + Prisma + PostgreSQL`:
  - быстрый старт,
  - строгая структура модулей,
  - предсказуемая работа с БД и миграциями.
- `React + TanStack Query + shadcn-style UI`:
  - быстрый и чистый B2B интерфейс,
  - удобная работа с loading/error/cache-состояниями.
- `Swagger + Docker + logging`:
  - улучшает инженерную зрелость решения без лишней сложности.

## Как устроены модули

- `backend/src/requests`:
  - контроллер (REST endpoints),
  - сервис (бизнес-логика),
  - DTO (валидация входных данных).
- `backend/src/prisma`:
  - `PrismaService` для доступа к БД.
- `frontend/src/pages`:
  - страницы списка, создания и деталей заявки.
- `frontend/src/lib/requests-api.ts`:
  - слой API-запросов.

## Как устроена БД

- Основная сущность: `Request` (таблица `requests`).
- Ключевые поля:
  - `id`, `title`, `clientName`, `email`, `phone`, `description`, `status`, `createdAt`, `updatedAt`.
- `status` хранится как enum.
- Индекс по `status` для быстрого фильтра.

## Как обрабатываются ошибки

- DTO-валидация отсекает невалидные входные данные на уровне контроллеров.
- Глобальный фильтр ошибок приводит ответы к единому формату:
  - `{ message, statusCode, timestamp, path }`.
- 404 возвращается при отсутствии заявки по ID.
