/**
 * Clase personalizada para manejar errores de conflicto.
 * Esta clase extiende la clase nativa `Error` y permite manejar
 * situaciones donde ocurre un conflicto, como al intentar registrar
 * un usuario que ya existe.
 *
 * @class ConflictError
 * @extends Error
 */
class ConflictError extends Error {
  /**
   * Crea una instancia de `ConflictError`.
   * 
   * @param {string} message - Mensaje descriptivo del error.
   */
  constructor(message) {
    super(message); // Llama al constructor de la clase base `Error`
    this.name = "ConflictError"; // Nombre del error para identificarlo
    this.statusCode = 409; // Código HTTP correspondiente al conflicto
  }
}

export default ConflictError;
