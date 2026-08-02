# meridiana-app

Implementación **MERIDIANA** — web de centro de atención primaria + solicitud de cita (Nivel 1).

## Stack
Angular + Tailwind · NestJS · Prisma · Neon PostgreSQL

## Setup
```bash
# API
cp apps/api/.env.example apps/api/.env
# pegar DATABASE_URL de Neon
npm install --prefix apps/api
npm --prefix apps/api run prisma:migrate
npm --prefix apps/api run prisma:seed
npm run api

# Web (otra terminal)
npm install --prefix apps/web
npm run web
```

- Web: http://localhost:4200
- API: http://localhost:3000/api
- Recepción: http://localhost:4200/recepcion

## Neon
Project ID: `old-glitter-65201301` · branch `main` · database `neondb`

## Case de estudio
`ux-projects/2026-08-02-meridiana/`
