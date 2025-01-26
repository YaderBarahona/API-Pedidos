import bcrypt from "bcryptjs";
import db from "../models/index.js";
import ConflictError from "../errors/ConflictError.js";
import { createAccessToken } from "../libs/jwt.js";

const { User } = db;

/**
 * Servicio para registrar un nuevo usuario.
 *
 * @async
 * @function registerUserService
 * @param {string} username - El nombre de usuario que se va a registrar.
 * @param {string} password - La contraseña del usuario.
 * @throws {ConflictError} Si el usuario ya está registrado.
 * @returns {Promise<Object>} Retorna un objeto con el ID y el nombre de usuario del nuevo usuario.
 * @description Verifica si el usuario ya existe, encripta la contraseña y guarda el usuario en la base de datos.
 */
export const registerUserService = async (username, password) => {
  const existingUser = await User.findOne({ where: { username } });
  if (existingUser) {
    throw new ConflictError("El usuario ya está registrado.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ username, password: hashedPassword });
  return { id: newUser.id, username: newUser.username };
};

/**
 * Servicio para iniciar sesión de un usuario.
 *
 * @async
 * @function loginUserService
 * @param {string} username - El nombre de usuario del usuario.
 * @param {string} password - La contraseña del usuario.
 * @throws {Error} Si las credenciales son inválidas.
 * @returns {Promise<Object>} Retorna un objeto con el token JWT y los datos del usuario.
 * @description Valida las credenciales del usuario, genera un token JWT si son válidas.
 */
export const loginUserService = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new Error("Credenciales inválidas.");
  }

  // Comparar la contraseña
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Credenciales inválidas.");
  }

  // Crear el token JWT
  const token = await createAccessToken({ id: user.id, username: user.username });
  return { token, user };
};
