# API REST de productos

API desarrollada con Node.js y Express para consultar y administrar productos almacenados en Firebase Firestore. Las rutas para crear y eliminar productos requieren autenticación con token JWT.

## Tecnologías utilizadas

- **Node.js**: entorno de ejecución de JavaScript.
- **Express 5**: creación del servidor y definición de rutas REST.
- **Firebase Firestore**: almacenamiento de productos.
- **JSON Web Token (jsonwebtoken)**: generación y validación de tokens para proteger operaciones.
- **dotenv**: carga de configuración desde variables de entorno.
- **CORS**: habilita solicitudes desde otros orígenes.

---

## Requisitos y ejecución

- Node.js instalado.
- Un proyecto de Firebase con Firestore configurado.
- Variables de entorno definidas en un archivo `.env` en la raíz del proyecto.

Instalá las dependencias e iniciá el servidor:

```bash
npm install
npm run dev
```

El servidor usa el puerto `3000` por defecto. Podés cambiarlo con `PORT`.

Variables necesarias en `.env`:

```env
PORT=3000
JWT_SECRET_KEY=una_clave_secreta
USER_ID=1
USER_EMAIL=usuario@example.com
USER_PASSWORD=tu_contrasena
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_PROJECT_ID=...
FIREBASE_STORAGE_BUCKET=...
FIREBASE_MESSAGING_SENDER_ID=...
FIREBASE_APP_ID=...
```

---

## Endpoints

La URL base local es `http://localhost:3000`.

---

### Iniciar sesión

`POST /auth/login`

Envía las credenciales configuradas en `USER_EMAIL` y `USER_PASSWORD`. Si son válidas, devuelve un token JWT con duración de una hora.

Respuesta (`200`):

```json
{"token":"<jwt>"}
```

Credenciales inválidas: `401 Unauthorized`.

---

### Listar productos

`GET /api/products`

Devuelve todos los productos. Se puede filtrar por categoría con el parámetro `category`.

La respuesta es un arreglo de productos, por ejemplo:

```json
[
  {"id":"abc123","category":"electronica","name":"Auriculares","price":25000,"stock":8}
]
```

---

### Obtener un producto

`GET /api/products/:id`

Reemplazá `:id` por el identificador del documento de Firestore.

Devuelve el producto (`200`) o `404` si no existe.

---

### Crear un producto

`POST /api/products/create`

Requiere el encabezado `Authorization: Bearer <token>`. El cuerpo debe incluir `category`, `name`, `price` y `stock`.

Devuelve un mensaje y el ID asignado (`200`). Si faltan campos, devuelve `400`.

---

### Eliminar un producto

`DELETE /api/products/:id`

Requiere el encabezado `Authorization: Bearer <token>`.

Devuelve una confirmación (`200`) o `404` si el producto no existe.

---

## Autenticación

Primero obtené un token con `POST /auth/login`.
Enviá ese valor en el encabezado `Authorization` para crear o eliminar productos. La API responde `401` si no se envía un token y `403` si el token no es válido.
