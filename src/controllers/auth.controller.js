import { registerUserService, loginUserService } from "../services/auth.service.js";
import ConflictError from "../errors/ConflictError.js";

/**
 * Controlador para registrar un nuevo usuario.
 * Valida los datos de entrada, llama al servicio para crear el usuario
 * y maneja posibles errores como usuario ya existente.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void}
 */
export const registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Validar que el nombre de usuario y la contraseña estén presentes
  if (!username || !password) {
    return res.status(400).json({
      error: "El nombre de usuario y la contraseña son obligatorios.",
    });
  }

  try {
    // Crear un nuevo usuario llamando al servicio correspondiente
    const newUser = await registerUserService(username, password);
    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      userId: newUser.id,
    });
  } catch (error) {
    // Manejar error si el usuario ya existe
    if (error instanceof ConflictError) {
      return res.status(409).json({ error: error.message });
    }
    // Manejar otros errores inesperados
    console.error("Error al registrar el usuario:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

/**
 * Controlador para iniciar sesión.
 * Valida las credenciales del usuario, genera un token JWT
 * y configura una cookie de sesión.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void}
 */
export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validar que el nombre de usuario y la contraseña estén presentes
  if (!username || !password) {
    return res.status(400).json({
      error: "El nombre de usuario y la contraseña son obligatorios.",
    });
  }

  try {
    // Autenticar al usuario y generar el token
    const { token, user } = await loginUserService(username, password);

    // Configurar la cookie con el token para el navegador
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      sameSite: "strict", // Protección contra CSRF
    });

    res.json({
      message: "Inicio de sesión exitoso.",
      token,
      user: { id: user.id, username: user.username }, // Retornar información básica del usuario
    });
  } catch (error) {
    // Manejar errores de autenticación
    console.error("Error al iniciar sesión:", error.message);
    res.status(401).json({ error: error.message });
  }
};
