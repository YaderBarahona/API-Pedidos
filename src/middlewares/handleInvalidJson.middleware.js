/**
 * Middleware para manejar solicitudes con JSON inválido.
 * Este middleware intercepta errores de tipo `SyntaxError` que ocurren cuando
 * el cuerpo de la solicitud (`req.body`) contiene un JSON mal formado.
 *
 * @param {Error} err - El error capturado durante el procesamiento de la solicitud.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {Function} next - La función `next` para pasar el control al siguiente middleware.
 */
const handleInvalidJsonMiddleware = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    // Si el error es un SyntaxError debido a un JSON mal formado, devuelve una respuesta 400
    return res.status(400).json({
      error: "El cuerpo de la solicitud contiene un JSON inválido.",
    });
  }
  // Si no es un error de JSON inválido, pasa el error al siguiente middleware
  next(err);
};

export default handleInvalidJsonMiddleware;
