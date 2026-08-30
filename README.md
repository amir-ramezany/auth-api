# Authentication API

A phase-by-phase learning project for building authentication fundamentals with Node.js, Express, PostgreSQL, and JWT.

## Current phase

Phase 1 provides the Express application foundation and a health endpoint. Authentication and database features are intentionally deferred to later phases.

## Requirements

- Node.js 22 or later
- npm

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

## Scripts

- `npm run dev` starts the server in Node.js watch mode.
- `npm start` starts the server normally.

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
