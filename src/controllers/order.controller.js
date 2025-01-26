import {
  createOrder,
  getOrdersByUser,
  updateOrder,
  deleteOrder,
  getOrderStatus,
} from "../services/order.service.js";
import NotFoundError from "../errors/NotFoundError.js";

/**
 * Controlador para crear un nuevo pedido.
 * Valida los datos de entrada (items), llama al servicio de creación de pedidos
 * y maneja errores en caso de fallos.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const createOrderController = async (req, res) => {
  const userId = req.user.id; // ID del usuario autenticado
  const { items } = req.body; // Items ya validados por el middleware

  try {
    const order = await createOrder(userId, items);
    res.status(201).json({ message: "Pedido creado exitosamente.", order });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador para obtener todos los pedidos de un usuario autenticado.
 * Llama al servicio correspondiente y maneja el caso en el que no haya pedidos.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const getOrdersController = async (req, res) => {
  const userId = req.user.id; // ID del usuario autenticado

  try {
    const orders = await getOrdersByUser(userId);
    if (!orders.length) {
      return res
        .status(404)
        .json({ error: "No se encontraron pedidos para este usuario." });
    }
    res.json(orders);
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    res.status(500).json({ error: "Error al obtener los pedidos." });
  }
};

/**
 * Controlador para actualizar un pedido existente.
 * Valida los datos de entrada, llama al servicio de actualización
 * y maneja errores específicos como pedido no encontrado.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const updateOrderController = async (req, res) => {
  const userId = req.user.id; // ID del usuario autenticado
  const { id } = req.params; // ID del pedido a actualizar
  const { items } = req.body; // Items ya validados por el middleware

  try {
    const order = await updateOrder(userId, id, items);
    res.json({
      message: "Pedido actualizado exitosamente.",
      total: order.total,
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    console.error("Error al actualizar el pedido:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

/**
 * Controlador para eliminar un pedido.
 * Valida que el pedido pertenezca al usuario autenticado antes de eliminarlo.
 * Maneja errores como pedido no encontrado.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const deleteOrderController = async (req, res) => {
  const { id } = req.params; // ID del pedido a eliminar
  const userId = req.user.id; // ID del usuario autenticado

  try {
    await deleteOrder(userId, id);
    res.json({ message: "Pedido eliminado exitosamente." });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    console.error("Error al eliminar el pedido:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

/**
 * Controlador para obtener el estado de un pedido.
 * Valida que el pedido pertenezca al usuario autenticado antes de devolver el estado.
 * Maneja errores como pedido no encontrado.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const getOrderStatusController = async (req, res) => {
  const { id } = req.params; // ID del pedido
  const userId = req.user.id; // ID del usuario autenticado

  try {
    const status = await getOrderStatus(userId, id);
    res.json({ status });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ error: error.message });
    }
    console.error("Error al obtener el estado del pedido:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};
