# Lectura Viva

## Descripción

Lectura Viva es una aplicación web full stack orientada a la consulta y gestión de libros.

Está dirigida a personas interesadas en la lectura que quieran explorar un catálogo, consultar información sobre diferentes obras, conocer datos de sus autores, leer reseñas y descubrir otras lecturas relacionadas.

La aplicación también permite gestionar el catálogo mediante la creación, modificación y eliminación de libros.

## Problema y solución

La información sobre libros puede encontrarse dispersa entre diferentes fuentes o presentarse sin una forma sencilla de explorar obras relacionadas.

Lectura Viva busca reunir esta información en una interfaz clara y accesible, permitiendo consultar libros, autores y reseñas desde un mismo sitio.

El catálogo se alimenta de una API propia conectada a una base de datos MySQL y permite mantener actualizada la información de los libros.

## Integrantes y responsabilidades

Proyecto realizado de forma individual.

Responsabilidades:

- Diseño y planificación de la interfaz.
- Desarrollo del frontend.
- Desarrollo de la API.
- Diseño y gestión de la base de datos MySQL.
- Integración entre frontend y backend.
- Pruebas.
- Documentación y despliegue.

## Tecnologías utilizadas

### Frontend

- Astro
- React
- HTML
- CSS
- JavaScript
- Fetch API

### Backend

- Node.js
- Express
- MySQL
- mysql2
- CORS
- dotenv

### Herramientas

- pnpm
- Thunder Client
- phpMyAdmin

## Cómo instalar y ejecutar el proyecto

Para ejecutar Lectura Viva en local es necesario tener instalado Node.js, pnpm y disponer de una base de datos MySQL.

### Backend

Acceder a la carpeta del backend:

```bash
cd mi-backend
```

Instalar las dependencias:

```bash
pnpm install
```

Crear un archivo `.env` tomando como referencia `.env.example`.

Iniciar el servidor de desarrollo:

```bash
pnpm run dev
```

Por defecto, la API estará disponible en:

```text
http://localhost:3000
```

### Frontend

Acceder a la carpeta del frontend:

```bash
cd mi-frontend
```

Instalar las dependencias:

```bash
pnpm install
```

Iniciar el servidor de desarrollo:

```bash
pnpm run dev
```

Por defecto, la aplicación estará disponible en:

```text
http://localhost:4321
```

## Variables de entorno

### Backend

Crear un archivo `.env` dentro de `mi-backend` con las siguientes variables:

```env
PORT=3000

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

FRONTEND_URL=http://localhost:4321
```

No se deben publicar las credenciales reales de la base de datos.

### Frontend

El frontend necesita conocer la dirección de la API:

```env
PUBLIC_API_URL=http://localhost:3000
```

Los archivos `.env` no deben subirse al repositorio.

### Configuración en producción

- En Render, `FRONTEND_URL` apunta a `https://lectura-vivav3.netlify.app`.
- En Netlify, `PUBLIC_API_URL` apunta a `https://lectura-viva-api.onrender.com`.

## Enlaces

- Frontend publicado: https://lectura-vivav3.netlify.app
- API publicada: https://lectura-viva-api.onrender.com
- Repositorio de GitHub: https://github.com/sebasmza369/Lectura_Viva_V3
- Base de datos externa: MySQL alojada en Aiven
- Mockup: disponible en la carpeta `docs/`

## Documentación de la API

La API utiliza como ruta base:

```text
/api/v3
```

### Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| GET | `/api/v3/libros` | Devuelve todos los libros |
| GET | `/api/v3/libros/:id` | Devuelve un libro por su ID |
| POST | `/api/v3/libros` | Crea un nuevo libro |
| PUT | `/api/v3/libros/:id` | Modifica un libro existente |
| DELETE | `/api/v3/libros/:id` | Elimina un libro |
| GET | `/api/v3/autores` | Devuelve todos los autores |
| GET | `/api/v3/autores/:id` | Devuelve un autor por su ID |
| POST | `/api/v3/autores` | Crea un nuevo autor |
| GET | `/api/v3/resenas` | Devuelve todas las reseñas |
| GET | `/api/v3/resenas/libro/:id` | Devuelve las reseñas de un libro |
| POST | `/api/v3/resenas/libro/:id` | Crea una reseña para un libro |

### Parámetros, filtros y búsquedas

Actualmente la API no implementa filtros, búsquedas ni paginación mediante parámetros de consulta.

Las rutas que contienen `:id` reciben el identificador del recurso mediante la propia URL.

Ejemplo:

```text
GET /api/v3/libros/1
```

## Ejemplos de uso

### Obtener todos los libros

```text
GET /api/v3/libros
```

Ejemplo de respuesta `200`:

```json
[
  {
    "id": 1,
    "titulo": "1984",
    "autor": "George Orwell",
    "ano_publi": 1949,
    "genero": "Distopía clásica",
    "autor_id": 5
  }
]
```

### Obtener un libro por ID

```text
GET /api/v3/libros/1
```

Si el libro existe, devuelve código `200`.

Si no existe, devuelve `404`:

```json
{
  "mensaje": "No se encontró el libro"
}
```

### Crear un libro

```text
POST /api/v3/libros
```

Ejemplo de cuerpo de la petición:

```json
{
  "titulo": "1984",
  "autor": "George Orwell",
  "ano_publi": 1949,
  "genero": "Distopía"
}
```

Si el autor ya existe, no es necesario enviar su nacionalidad.

Si el autor es nuevo, también debe enviarse:

```json
{
  "titulo": "Nuevo libro",
  "autor": "Nuevo autor",
  "nacionalidad": "Española",
  "ano_publi": 2026,
  "genero": "Ficción"
}
```

Una creación correcta devuelve código `201`.

Si faltan datos obligatorios, devuelve `400`.

### Modificar un libro

```text
PUT /api/v3/libros/:id
```

Utiliza los mismos datos que la creación.

Puede devolver:

- `200` si el libro se modifica correctamente.
- `400` si faltan datos obligatorios.
- `404` si el libro no existe.

### Eliminar un libro

```text
DELETE /api/v3/libros/:id
```

Respuesta correcta `200`:

```json
{
  "mensaje": "Se ha eliminado el libro"
}
```

Si el libro no existe, devuelve `404`.

## Autores

### Obtener autores

```text
GET /api/v3/autores
```

Devuelve un array con los autores registrados.

Ejemplo:

```json
[
  {
    "id": 5,
    "nombre": "George Orwell",
    "nacionalidad": "Británica"
  }
]
```

### Obtener un autor por ID

```text
GET /api/v3/autores/:id
```

Si el autor no existe, devuelve `404`:

```json
{
  "error": "Autor no encontrado"
}
```

### Crear un autor

```text
POST /api/v3/autores
```

Ejemplo:

```json
{
  "nombre": "George Orwell",
  "nacionalidad": "Británica"
}
```

Una creación correcta devuelve código `201`.

Si faltan datos o el autor ya existe, devuelve `400`.

## Reseñas

### Obtener todas las reseñas

```text
GET /api/v3/resenas
```

### Obtener las reseñas de un libro

```text
GET /api/v3/resenas/libro/:id
```

Ejemplo de respuesta:

```json
[
  {
    "id": 1,
    "libro_id": 1,
    "puntuacion": 5,
    "comentario": "Una lectura muy recomendable."
  }
]
```

Si el libro no tiene reseñas, devuelve:

```json
[]
```

### Crear una reseña

```text
POST /api/v3/resenas/libro/:id
```

El ID del libro se indica en la URL.

Ejemplo de cuerpo:

```json
{
  "puntuacion": 5,
  "comentario": "Una lectura muy recomendable."
}
```

La puntuación debe ser un número entero entre 1 y 5.

Puede devolver:

- `201` si la reseña se crea correctamente.
- `400` si faltan datos o la puntuación no es válida.
- `404` si el libro no existe.

## Errores generales

Si se intenta acceder a una ruta que no existe, la API devuelve código `404`:

```json
{
  "error": "Ruta no encontrada"
}
```

Si ocurre un error interno inesperado, devuelve código `500`:

```json
{
  "error": "Error interno del servidor"
}
```

La información técnica del error no se envía al cliente.

## API key

La API de Lectura Viva no utiliza API key ni autenticación.