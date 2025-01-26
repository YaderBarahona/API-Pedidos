import { Router } from "express";
import { getProductsController } from "../controllers/product.controller.js";

const router = Router();

/**
 * Rutas para la gestión de productos.
 *
 * @module product.routes
 */

/**
 * Listar todos los productos disponibles.
 *
 * @name GET /api/products
 * @function
 * @memberof module:product.routes
 * @inner
 * @param {Function} getProductsController Controlador que devuelve todos los productos disponibles.
 * @description Devuelve una lista de productos con información como nombre, descripción, precio y stock.
 */
router.get("/", getProductsController);

export default router;
