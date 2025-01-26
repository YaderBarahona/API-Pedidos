# API de Pedidos - Documentación

Esta API permite gestionar usuarios y pedidos.

---

## Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Instalación](#instalación)
3. [Ejecución](#ejecución)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Herramientas para Visualizar la Base de Datos](#herramientas-para-visualizar-la-base-de-datos)
6. [Sembrar Datos Iniciales](#sembrar-datos-iniciales)
7. [Uso de la API](#uso-de-la-api)
   - [Autenticación](#autenticación)
   - [Pedidos](#pedidos)
   - [Productos](#productos)
8. [Probar la API](#probar-la-api)
9. [Tecnologías Utilizadas](#tecnologías-utilizadas)

---

## Requisitos Previos

Asegúrate de tener instalado:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [NPM](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)

---

## Instalación

Clona este repositorio y ejecuta los siguientes comandos:

```bash
# Clonar el repositorio
git clone https://github.com/YaderBarahona/API-PEDIDOS.git

# Acceder al directorio del proyecto
cd API-Pedidos

# Instalar dependencias
npm install

# Instalar Sequelize de forma global
npm install --save sequelize

```

---

## Ejecución

### Entorno de Desarrollo
1. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   NODE_ENV=development
   PORT=4000
   TOKEN_SECRET=tu_secreto_para_jwt
   ```

2. Ejecuta el servidor en modo de desarrollo:
   ```bash
   npm run dev
   ```

El servidor estará disponible en `http://localhost:4000`.

---

## Estructura del Proyecto

```
API-Pedidos
src/
├── config/
│   ├── config.json           # Archivo de configuración de Sequelize.
├── controllers/
│   ├── auth.controller.js    # Controlador para autenticación.
│   ├── order.controller.js   # Controlador para pedidos.
│   ├── product.controller.js # Controlador para productos.
├── database/
│   ├── data/                 # Base de datos SQLite o backups locales.
│   ├── migrations/           # Archivos de migraciones.
│   ├── seeders/              # Archivos de seeders (datos iniciales).
├── docs/
│   ├── swagger.json          # Configuración de la API con Swagger.
├── errors/
│   ├── ConflictError.js      # Manejo de errores personalizados (conflicto).
│   ├── NotFoundError.js      # Error para recursos no encontrados.
├── libs/
│   ├── jwt.js                # Funciones relacionadas con JWT.
├── middlewares/
│   ├── handleInvalidJson.middleware.js # Middleware para JSON inválidos.
│   ├── validateSchema.middleware.js    # Validación de esquemas con Zod.
│   ├── validateToken.middleware.js     # Middleware de autenticación.
├── models/
│   ├── index.js              # Configuración de Sequelize y modelos.
│   ├── order.model.js        # Modelo para los pedidos.
│   ├── orderItem.model.js    # Modelo para los artículos de pedido.
│   ├── product.model.js      # Modelo para productos.
│   ├── user.model.js         # Modelo para usuarios.
├── routes/
│   ├── auth.routes.js        # Rutas relacionadas con autenticación.
│   ├── order.routes.js       # Rutas relacionadas con pedidos.
│   ├── product.routes.js     # Rutas relacionadas con productos.
├── services/
│   ├── auth.service.js       # Lógica de negocio para autenticación.
│   ├── order.service.js      # Lógica de negocio para pedidos.
├── validation/
│   ├── auth.schema.js        # Validaciones para autenticación.
│   ├── order.schema.js       # Validaciones para pedidos.
├── app.js                    # Configuración principal de la aplicación.
├── server.js                 # Inicialización del servidor.

```

---

## Herramientas para Visualizar la Base de Datos

Si deseas inspeccionar directamente la base de datos y sus tablas, puedes utilizar herramientas gráficas como [DB Browser for SQLite](https://sqlitebrowser.org/).

### Pasos para abrir la base de datos:
1. Descarga e instala DB Browser for SQLite desde su [sitio oficial](https://sqlitebrowser.org/dl/).
2. Abre la aplicación y selecciona **"Open Database"**.
3. Navega hasta el archivo de la base de datos, ubicado en:
   ```bash
   src/database/data/pedidos.db
   ```
4. Explora las tablas, realiza consultas o verifica los datos almacenados.

Esto puede ser útil para depuración o para asegurarte de que las migraciones y los seeders funcionen correctamente.

---

## Sembrar Datos Iniciales

Para poblar la base de datos con productos iniciales:

1. Ejecuta las migraciones:
   ```bash
   npx sequelize-cli db:migrate
   ```

2. Ejecuta el seeder:
   ```bash
   npx sequelize-cli db:seed:all
   ```

Esto creará productos como pizzas, sushi, hamburguesas, etc.

---

## Uso de la API

### Autenticación

| Endpoint         | Método | Descripción                  | Autenticación |
|------------------|--------|------------------------------|---------------|
| `/api/users/register` | POST   | Registrar un usuario         | No            |
| `/api/users/login`    | POST   | Iniciar sesión               | No            |

Ejemplo de Registro:
```json
POST /api/users/register
{
  "username": "usuario1",
  "password": "password123"
}
```

Ejemplo de Inicio de Sesión:
```json
POST /api/users/login
{
  "username": "usuario1",
  "password": "password123"
}
```

### Pedidos

| Endpoint                 | Método | Descripción                     | Autenticación |
|--------------------------|--------|---------------------------------|---------------|
| `/api/orders`            | GET    | Listar todos los pedidos        | Sí            |
| `/api/orders`            | POST   | Crear un nuevo pedido           | Sí            |
| `/api/orders/:id`        | PUT    | Actualizar un pedido existente  | Sí            |
| `/api/orders/:id`        | DELETE | Eliminar un pedido              | Sí            |
| `/api/orders/:id/status` | GET    | Obtener el estado de un pedido  | Sí            |

---

### Productos

| Endpoint   | Método | Descripción              | Autenticación |
|------------|--------|--------------------------|---------------|
| `/api/products` | GET    | Listar productos disponibles | No            |

---

## Probar la API

Swagger está integrado en este proyecto para probar los endpoints con su debida documentación. También puedes usar el cliente de tu preferencia, como **Postman**, **Thunder Client**, **Insomnia**, entre otros.

### Opción 1: Probar con Swagger
1. Inicia el servidor (`npm run dev` o `npm start`).
2. Visita la URL: [`http://localhost:4000/api-docs`](http://localhost:4000/api-docs).
3. Explora los endpoints, prueba las solicitudes y revisa las respuestas directamente desde el navegador.

### Opción 2: Probar con un Cliente Externo
1. Usa un cliente REST como Postman, Thunder Client o Insomnia.
2. Configura los endpoints de acuerdo con la documentación de Swagger.
3. Asegúrate de enviar los encabezados y cuerpos de las solicitudes requeridos, como tokens de autenticación para endpoints protegidos.



---

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express**: Framework web para crear la API.
- **Sequelize**: ORM para interactuar con la base de datos.
- **SQLite3**: Base de datos ligera y sencilla.
- **Zod**: Validación de esquemas para los datos de entrada.
- **Swagger**: Documentación interactiva de la API.

---
