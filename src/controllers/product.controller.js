import db from "../models/index.js";

const { Product } = db;

/**
 * Controlador para obtener todos los productos disponibles.
 * Este controlador devuelve una lista de productos con campos relevantes
 * como `id`, `name`, `description`, `price` y `stock`.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export const getProductsController = async (req, res) => {
  try {
    // Consultar todos los productos y seleccionar campos específicos
    const products = await Product.findAll({
      attributes: ["id", "name", "description", "price", "stock"], // Campos relevantes
    });

    // Respuesta exitosa con la lista de productos
    res.json(products);
  } catch (error) {
    // Manejo de errores y respuesta con código 500
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error al obtener los productos." });
  }
};
