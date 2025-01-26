import { Router } from "express";
import {
  createOrderController,
  getOrdersController,
  updateOrderController,
  deleteOrderController,
  getOrderStatusController,
} from "../controllers/order.controller.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import {
  createOrderSchema,
  updateOrderSchema,
} from "../validation/order.schema.js";
import { authenticateToken } from "../middlewares/validateToken.middleware.js";

const router = Router();

/**
 * Rutas para la gestión de pedidos.
 *
 * @module order.routes
 */

/**
 * Obtener todos los pedidos del usuario autenticado.
 *
 * @name GET /api/orders
 * @function
 * @memberof module:order.routes
 * @inner
 * @param {Function} authenticateToken Middleware para verificar el token de autenticación.
 * @param {Function} getOrdersController Controlador que devuelve todos los pedidos del usuario.
 * @description Devuelve todos los pedidos asociados al usuario autenticado.
 */
router.get("/", authenticateToken, getOrdersController);

/**
 * Crear un nuevo pedido.
 *
 * @name POST /api/orders
 * @function
 * @memberof module:order.routes
 * @inner
 * @param {Function} authenticateToken Middleware para verificar el token de autenticación.
 * @param {Function} validateSchema Middleware para validar el cuerpo de la solicitud con el esquema `createOrderSchema`.
 * @param {Function} createOrderController Controlador que maneja la creación de un nuevo pedido.
 * @description Valida el cuerpo de la solicitud y crea un nuevo pedido asociado al usuario autenticado.
 */
router.post(
  "/",
  authenticateToken,
  validateSchema(createOrderSchema),
  createOrderController
);

/**
 * Obtener el estado de un pedido específico.
 *
 * @name GET /api/orders/:id/status
 * @function
 * @memberof module:order.routes
 * @inner
 * @param {Function} authenticateToken Middleware para verificar el token de autenticación.
 * @param {Function} getOrderStatusController Controlador que devuelve el estado de un pedido.
 * @description Devuelve el estado de un pedido específico asociado al usuario autenticado.
 */
router.get("/:id/status", authenticateToken, getOrderStatusController);

/**
 * Actualizar un pedido existente.
 *
 * @name PUT /api/orders/:id
 * @function
 * @memberof module:order.routes
 * @inner
 * @param {Function} authenticateToken Middleware para verificar el token de autenticación.
 * @param {Function} validateSchema Middleware para validar el cuerpo de la solicitud con el esquema `updateOrderSchema`.
 * @param {Function} updateOrderController Controlador que maneja la actualización de un pedido.
 * @description Actualiza un pedido existente, como las cantidades de los productos en el pedido.
 */
router.put(
  "/:id",
  authenticateToken,
  validateSchema(updateOrderSchema),
  updateOrderController
);

/**
 * Eliminar un pedido.
 *
 * @name DELETE /api/orders/:id
 * @function
 * @memberof module:order.routes
 * @inner
 * @param {Function} authenticateToken Middleware para verificar el token de autenticación.
 * @param {Function} deleteOrderController Controlador que maneja la eliminación de un pedido.
 * @description Elimina un pedido asociado al usuario autenticado.
 */
router.delete("/:id", authenticateToken, deleteOrderController);

export default router;
