# OpenBrain Test Task (Full Stack)

MVP веб-приложения для управления заявками клиентов.

## Что реализовано

### Backend
- NestJS + Prisma + PostgreSQL.
- REST API:
  - `POST /api/requests`
  - `GET /api/requests`
  - `GET /api/requests/:id`
  - `PATCH /api/requests/:id/status`
- Валидация DTO (`class-validator`) и глобальный `ValidationPipe`.
- Единый формат ошибок: `{ message, statusCode, timestamp, path }`.
- Swagger: `GET /api/docs`.
- Логирование:
  - HTTP-лог: `morgan`
  - application-лог: `winston`
- Health endpoint: `GET /api/health`.

### Frontend
- React + Vite + TanStack Query + shadcn-style UI components.
- Экраны:
  - список заявок (таблица),
  - создание заявки (форма),
  - детали заявки,
  - фильтр по статусу,
  - смена статуса.
- Состояния:
  - loading,
  - empty,
  - error.
- Toast-уведомления на создание заявки и смену статуса.
- Базовая адаптивность.

### Infra / DevOps
- Dockerfile для backend и frontend.
- `docker-compose.yml` для `frontend + backend + postgres`.
- Миграция Prisma (`prisma migrate deploy`).
- `.env.example` для корня, backend и frontend.

## Стек

- Backend: `NestJS`, `Prisma`, `PostgreSQL`, `Swagger`, `morgan`, `winston`.
- Frontend: `React`, `Vite`, `TanStack Query`, `Tailwind`, shadcn-style components.
- Infra: `Docker`, `Docker Compose`.
- Package manager: `pnpm workspaces`.

## Структура проекта

```text
.
├── backend
├── frontend
├── docker-compose.yml
├── .env.example
└── docs
```

## Как запустить (Docker, рекомендуемый вариант)

1. Скопировать переменные окружения:
```bash
cp .env.example .env
```

2. При необходимости поменять порты в `.env`.
   По умолчанию используются не конфликтующие значения:
   - `FRONTEND_PORT=3100`
   - `BACKEND_PORT=8090`
   - `POSTGRES_PORT=5433`

3. Поднять проект:
```bash
docker compose up -d --build
```

4. Проверить:
- Frontend: `http://localhost:3100`
- Backend API: `http://localhost:8090/api`
- Swagger: `http://localhost:8090/api/docs`

## Локальный запуск без полного Docker

1. Установить зависимости:
```bash
npx pnpm install
```

2. Поднять только БД:
```bash
docker compose up -d postgres
```

3. Backend:
```bash
cp backend/.env.example backend/.env
npx pnpm --filter backend prisma generate
npx pnpm --filter backend prisma migrate deploy
npx pnpm --filter backend start:dev
```

4. Frontend:
```bash
cp frontend/.env.example frontend/.env
npx pnpm --filter frontend dev
```

## Допущения

- Авторизация и роли не включены в MVP.
- `AI summary` намеренно не реализован.
- Статусы хранятся enum-ом:
  - `NEW`
  - `IN_PROGRESS`
  - `WAITING_FOR_RESPONSE`
  - `COMPLETED`
  - `REJECTED`

## Что не успел сделать

- Полноценный набор backend e2e тестов с отдельной тестовой БД.
- CI/CD pipeline (GitHub Actions) для автодеплоя.
- Расширенный аудит и rate limiting.

## Что улучшил бы в production-версии

- JWT auth + RBAC.
- Полный integration/e2e coverage (backend + frontend).
- Nginx reverse-proxy + SSL + домен.
- Наблюдаемость: Sentry, Prometheus/Grafana, централизованные логи.
- Soft delete, аудит изменений, pagination + server-side sorting.

## Архитектурное описание

Короткое описание решения находится в файле:
`docs/architecture.md`

## Скриншоты интерфейса

Скриншоты положите в:
`docs/screenshots/`
