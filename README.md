# API GestorPass

API para gestionar credenciales de equipos con NestJS, PostgreSQL y Swagger.

## Requisitos
- Node.js 18+
- Postgres local

## Configuracion
- Revisa .env y actualiza DATABASE_URL si es necesario.
- El ejemplo incluido usa Postgres local en `localhost:5433`, esquema `api_credentials`.

## Ejecutar
1) npm install
2) npm run start:dev

Swagger: http://localhost:3002/api/docs

## Autenticacion
POST /api/autenticacion/iniciar-sesion
Body:
{
  "email": "erwin0pisis@gmail.com",
  "password": "71769118"
}

Usa el token en Authorization: Bearer <token> para los endpoints de equipos.
