import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "tu_secreto_para_jwt";

/**
 * Middleware para autenticar el token JWT.
 * Este middleware verifica si la solicitud incluye un token JWT válido en las cookies
 * o en el encabezado `Authorization`. Si el token es válido, el usuario autenticado
 * se adjunta al objeto `req` para que esté disponible en los controladores.
 *
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware o controlador.
 * @returns {void} Devuelve una respuesta con el estado correspondiente si el token no es válido.
 */
export const authenticateToken = (req, res, next) => {
  // Obtener el token de cookies o encabezado Authorization
  const token =
    req.cookies?.token || req.headers["authorization"]?.split(" ")[1];

  // Verificar si el token está presente
  if (!token) {
    return res
      .status(401)
      .json({ error: "Acceso no autorizado, token requerido." });
  }

  // Verificar la validez del token
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error("Error al verificar el token:", err);
      return res.status(403).json({ error: "Token inválido o expirado." });
    }

    // Si el token es válido, agregar el usuario al objeto `req` y continuar
    req.user = user;
    next();
  });
};
