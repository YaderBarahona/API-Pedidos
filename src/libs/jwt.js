import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "tu_secreto_para_jwt";

/**
 * Crea un token de acceso (JWT) con un tiempo de expiración de 1 día.
 * Este token se utiliza para autenticar a los usuarios en la API.
 *
 * @param {Object} payload - Los datos que se incluirán en el token. Por lo general, contiene información del usuario (como `id` o `username`).
 * @returns {Promise<string>} - Una promesa que se resuelve con el token generado.
 * @throws {Error} - Si ocurre un error al generar el token.
 */
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        reject(err); // Rechaza la promesa si ocurre un error
      }
      resolve(token); // Resuelve la promesa con el token generado
    });
  });
}
