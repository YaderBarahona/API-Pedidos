import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";
import productRoutes from "./routes/product.routes.js";
import handleInvalidJsonMiddleware from "./middlewares/handleInvalidJson.middleware.js";
import fs from "fs";
import path from "path";

// Leer y cargar el archivo de configuración de Swagger
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("src/docs/swagger.json"), "utf8")
);

// Cargar variables de entorno
dotenv.config();

// Inicializar la aplicación de Express
const app = express();

/**
 * Middleware de registro HTTP.
 * Utiliza `morgan` para registrar las solicitudes HTTP en la consola.
 */
app.use(morgan("dev"));

/**
 * Middleware de CORS.
 * Habilita solicitudes desde otros dominios.
 */
app.use(cors());

/**
 * Middleware para manejar datos JSON.
 * Asegura que los cuerpos de las solicitudes sean analizados como JSON.
 */
app.use(express.json());

/**
 * Middleware de cookies.
 * Permite manejar cookies en las solicitudes y respuestas.
 */
app.use(cookieParser());

/**
 * Middleware para manejar errores de JSON inválido.
 * Devuelve un error 400 si el cuerpo de la solicitud contiene JSON mal formado.
 */
app.use(handleInvalidJsonMiddleware);

/**
 * Configuración de Swagger UI.
 * Sirve la documentación interactiva de la API en `/api/docs`.
 */
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Rutas de la API.
 * - `/api/users`: Endpoints relacionados con autenticación.
 * - `/api/orders`: Endpoints relacionados con pedidos.
 * - `/api/products`: Endpoints relacionados con productos.
 */
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

export default app;
