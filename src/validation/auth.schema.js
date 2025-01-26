import { z } from "zod";

/**
 * Esquema de validación para el registro de usuarios.
 * 
 * Este esquema valida los datos proporcionados al registrar un usuario.
 * - `username`: Debe tener entre 3 y 20 caracteres.
 * - `password`: Debe tener entre 6 y 50 caracteres.
 * 
 * @constant
 * @type {ZodSchema}
 * @example
 * {
 *   "username": "usuario123",
 *   "password": "contraseñaSegura"
 * }
 */
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres." })
    .max(20, { message: "El nombre de usuario no puede tener más de 20 caracteres." }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres." })
    .max(50, { message: "La contraseña no puede tener más de 50 caracteres." }),
});

/**
 * Esquema de validación para el inicio de sesión de usuarios.
 * 
 * Este esquema valida los datos proporcionados al iniciar sesión.
 * - `username`: Obligatorio.
 * - `password`: Obligatorio.
 * 
 * @constant
 * @type {ZodSchema}
 * @example
 * {
 *   "username": "usuario123",
 *   "password": "contraseñaSegura"
 * }
 */
export const loginSchema = z.object({
  username: z.string({ required_error: "El nombre de usuario es obligatorio." }),
  password: z.string({ required_error: "La contraseña es obligatoria." }),
});
