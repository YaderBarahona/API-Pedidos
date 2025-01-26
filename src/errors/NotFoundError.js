/**
 * Clase personalizada para manejar errores de recurso no encontrado.
 * Esta clase extiende la clase nativa `Error` y se utiliza para 
 * manejar situaciones donde un recurso solicitado no existe.
 *
 * @class NotFoundError
 * @extends Error
 */
class NotFoundError extends Error {
  /**
   * Crea una instancia de `NotFoundError`.
   * 
   * @param {string} message - Mensaje descriptivo del error.
   */
  constructor(message) {
    super(message); // Llama al constructor de la clase base `Error`
    this.name = "NotFoundError"; // Nombre del error para identificarlo
    this.statusCode = 404; // Código HTTP correspondiente a "Not Found"
  }
}

export default NotFoundError;
