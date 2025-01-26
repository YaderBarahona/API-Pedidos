import { ZodError } from "zod";

/**
 * Middleware para validar el esquema de entrada con Zod.
 * Este middleware valida el cuerpo de la solicitud (`req.body`) utilizando
 * el esquema proporcionado. Si la validación falla, devuelve un error 400
 * con detalles sobre los campos que no pasaron la validación.
 *
 * @param {object} schema - Esquema de validación definido con Zod.
 * @returns {Function} Middleware que valida el cuerpo de la solicitud.
 */
export const validateSchema = (schema) => (req, res, next) => {
  try {
    // Intenta validar y parsear el cuerpo de la solicitud según el esquema
    req.body = schema.parse(req.body);
    next(); // Continúa al siguiente middleware o controlador
  } catch (err) {
    // Si ocurre un error de validación de Zod
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: "Validación fallida.",
        details: err.errors.map((e) => ({
          field: e.path[0], // Campo que falló la validación
          message: e.message, // Mensaje de error asociado
        })),
      });
    }
    next(err); // Si no es un error de Zod, pasa el error al siguiente middleware
  }
};
