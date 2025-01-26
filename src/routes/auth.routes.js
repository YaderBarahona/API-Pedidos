import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import { registerSchema, loginSchema } from "../validation/auth.schema.js";

const router = express.Router();

/**
 * Rutas de autenticación para usuarios.
 * 
 * @module auth.routes
 */

/**
 * Ruta para registrar un nuevo usuario.
 * 
 * @name POST /api/users/register
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {Function} validateSchema Middleware para validar el esquema del cuerpo de la solicitud.
 * @param {Function} registerUser Controlador para manejar el registro de usuarios.
 * @description 
 * - Valida los datos de entrada usando el esquema `registerSchema`.
 * - Registra un nuevo usuario en la base de datos.
 * - Responde con un código 201 si el registro es exitoso.
 */
router.post("/register", validateSchema(registerSchema), registerUser);

/**
 * Ruta para iniciar sesión de un usuario.
 * 
 * @name POST /api/users/login
 * @function
 * @memberof module:auth.routes
 * @inner
 * @param {Function} validateSchema Middleware para validar el esquema del cuerpo de la solicitud.
 * @param {Function} loginUser Controlador para manejar el inicio de sesión.
 * @description 
 * - Valida los datos de entrada usando el esquema `loginSchema`.
 * - Autentica al usuario y devuelve un token JWT.
 * - Responde con un código 200 si las credenciales son válidas.
 */
router.post("/login", validateSchema(loginSchema), loginUser);

export default router;
