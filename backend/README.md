# Backend (Node.js + Express)

REST API with JWT authentication and role-based access.

## Getting started

1. Copy environment variables:
   - `cp .env.example .env`
2. Install dependencies:
   - `npm install`
3. Start the dev server:
   - `npm run dev`

## Environment variables

- `PORT` - API server port
- `JWT_SECRET` - Secret for signing JWT tokens
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password

## Folder structure

```
backend/
  src/
    controllers/
    models/
    routes/
    middlewares/
    services/
    utils/
    server.js
  config/
    db.js
```
