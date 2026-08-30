# Authentication API

A phase-by-phase learning project for building authentication fundamentals with Node.js, Express, PostgreSQL, and JWT.

## Current phase

Phase 2 provides the PostgreSQL persistence foundation and the initial users-table migration. Registration and authentication are intentionally deferred to later phases.

## Requirements

- Node.js 22 or later
- npm
- PostgreSQL

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and adjust the port if needed.

3. Start the development server:

   ```bash
   npm run dev
   ```

## Database setup

1. Create a PostgreSQL database named `auth_api`.

2. Set `DATABASE_URL` in `.env` for your PostgreSQL installation.

3. Apply all pending migrations:

   ```bash
   npm run migrate:up
   ```

4. Roll back the most recent migration when needed:

   ```bash
   npm run migrate:down
   ```

All schema changes belong in `database/migrations`; do not change the database schema manually.

## Scripts

- `npm run dev` starts the server in Node.js watch mode.
- `npm start` starts the server normally.
- `npm run migrate:create -- migration-name` creates a migration file.
- `npm run migrate:up` applies pending migrations.
- `npm run migrate:down` rolls back the most recently applied migration.

## Users schema

| Column | Type | Important constraints |
| --- | --- | --- |
| `id` | `BIGSERIAL` | Primary key |
| `name` | `VARCHAR(100)` | Required and not blank |
| `email` | `VARCHAR(320)` | Required, unique, and lowercase |
| `password_hash` | `VARCHAR(255)` | Required; plain passwords are never stored |
| `role` | `VARCHAR(20)` | Required; `user` or `admin`; defaults to `user` |
| `created_at` | `TIMESTAMPTZ` | Required; defaults to the current time |
| `updated_at` | `TIMESTAMPTZ` | Required; defaults to the current time |

## Health endpoint

```http
GET /api/health
```

Successful response:

```json
{
  "status": "ok"
}
```
