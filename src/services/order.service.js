import db from "../models/index.js";
import NotFoundError from "../errors/NotFoundError.js";

const { Order, OrderItem, Product } = db;

/**
 * Servicio para crear un nuevo pedido.
 *
 * @async
 * @function createOrder
 * @param {number} userId - ID del usuario que realiza el pedido.
 * @param {Array} items - Lista de artículos del pedido, cada uno con `product_id` y `quantity`.
 * @throws {Error} Si algún producto no existe o el stock es insuficiente.
 * @returns {Promise<Object>} Retorna el pedido creado junto con sus artículos.
 */
export const createOrder = async (userId, items) => {
  const order = await Order.create({ user_id: userId });

  const itemPromises = items.map(async (item) => {
    const product = await Product.findByPk(item.product_id);

    if (!product) throw new Error(`Producto con ID ${item.product_id} no encontrado.`);
    if (product.stock < item.quantity) throw new Error(`Stock insuficiente para ${product.name}.`);

    await product.update({ stock: product.stock - item.quantity });

    return {
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: product.price,
    };
  });

  const orderItems = await Promise.all(itemPromises);

  await OrderItem.bulkCreate(orderItems);

  const total = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  await order.update({ total });

  return order;
};

/**
 * Servicio para obtener todos los pedidos de un usuario.
 *
 * @async
 * @function getOrdersByUser
 * @param {number} userId - ID del usuario.
 * @returns {Promise<Array>} Retorna una lista de pedidos junto con los detalles de los artículos y productos.
 */
export const getOrdersByUser = async (userId) => {
  return await Order.findAll({
    where: { user_id: userId },
    include: {
      model: OrderItem,
      as: "items",
      include: {
        model: Product,
        as: "product",
        attributes: ["id", "name", "description", "price"],
      },
    },
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Servicio para actualizar un pedido.
 *
 * @async
 * @function updateOrder
 * @param {number} userId - ID del usuario.
 * @param {number} orderId - ID del pedido a actualizar.
 * @param {Array} items - Lista de artículos con `product_id` y la nueva `quantity`.
 * @throws {NotFoundError} Si el pedido o algún artículo no existe.
 * @returns {Promise<Object>} Retorna el pedido actualizado con el nuevo total.
 */
export const updateOrder = async (userId, orderId, items) => {
  const order = await Order.findOne({
    where: { id: orderId, user_id: userId },
    include: { model: OrderItem, as: "items" },
  });

  if (!order) throw new NotFoundError("Pedido no encontrado.");

  const updatePromises = items.map(async (item) => {
    const orderItem = await OrderItem.findOne({
      where: { order_id: order.id, product_id: item.product_id },
    });

    if (!orderItem) {
      throw new NotFoundError(`Producto con ID ${item.product_id} no encontrado en el pedido.`);
    }

    return orderItem.update({ quantity: item.quantity });
  });

  await Promise.all(updatePromises);

  const orderItems = await OrderItem.findAll({
    where: { order_id: order.id },
    include: [{ model: Product, as: "product", attributes: ["price"] }],
  });

  const total = orderItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
  await order.update({ total });

  return order;
};

/**
 * Servicio para eliminar un pedido.
 *
 * @async
 * @function deleteOrder
 * @param {number} userId - ID del usuario.
 * @param {number} orderId - ID del pedido a eliminar.
 * @throws {NotFoundError} Si el pedido no existe.
 */
export const deleteOrder = async (userId, orderId) => {
  const order = await Order.findOne({
    where: { id: orderId, user_id: userId },
    include: { model: OrderItem, as: "items" },
  });

  if (!order) throw new NotFoundError("Pedido no encontrado.");

  await Promise.all(
    order.items.map(async (item) => {
      const product = await Product.findByPk(item.product_id);
      if (product) await product.update({ stock: product.stock + item.quantity });
    })
  );

  await OrderItem.destroy({ where: { order_id: order.id } });
  await order.destroy();
};

/**
 * Servicio para obtener el estado de un pedido.
 *
 * @async
 * @function getOrderStatus
 * @param {number} userId - ID del usuario.
 * @param {number} orderId - ID del pedido.
 * @throws {NotFoundError} Si el pedido no existe.
 * @returns {Promise<string>} Retorna el estado del pedido.
 */
export const getOrderStatus = async (userId, orderId) => {
  const order = await Order.findOne({
    where: { id: orderId, user_id: userId },
    attributes: ["status"],
  });
  if (!order) throw new NotFoundError("Pedido no encontrado.");
  return order.status;
};
