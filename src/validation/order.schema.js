import { z } from "zod";

/**
 * Esquema de validación para la creación de un pedido.
 * 
 * Este esquema valida que el pedido contenga al menos un artículo con:
 * - `product_id`: Obligatorio y debe ser un número positivo.
 * - `quantity`: Obligatorio y debe ser un número positivo.
 * 
 * @constant
 * @type {ZodSchema}
 * @example
 * {
 *   "items": [
 *     {
 *       "product_id": 1,
 *       "quantity": 2
 *     }
 *   ]
 * }
 */
export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        product_id: z
          .number({ required_error: "El ID del producto es obligatorio." })
          .positive({
            message: "El ID del producto debe ser un número positivo.",
          }),
        quantity: z
          .number({ required_error: "La cantidad es obligatoria." })
          .positive({ message: "La cantidad debe ser un número positivo." }),
      })
    )
    .min(1, { message: "Debe incluir al menos un artículo en el pedido." }),
});

/**
 * Esquema de validación para la actualización de un pedido.
 * 
 * Este esquema valida que los datos enviados contengan:
 * - `product_id`: Obligatorio.
 * - `quantity`: Obligatorio, debe ser un entero mayor a 0.
 * 
 * @constant
 * @type {ZodSchema}
 * @example
 * {
 *   "items": [
 *     {
 *       "product_id": 1,
 *       "quantity": 3
 *     }
 *   ]
 * }
 */
export const updateOrderSchema = z.object({
  items: z
    .array(
      z.object({
        product_id: z.number({
          required_error: "El ID del producto es obligatorio.",
        }),
        quantity: z
          .number({ required_error: "La cantidad es obligatoria." })
          .int({ message: "La cantidad debe ser un número entero." })
          .positive({ message: "La cantidad debe ser mayor que 0." }),
      })
    )
    .min(1, {
      message: "Debe incluir al menos un producto para actualizar el pedido.",
    }),
});

/**
 * Esquema de validación para consultar el estado de un pedido.
 * 
 * Este esquema valida que:
 * - `id`: Sea un número válido representado como una cadena.
 * 
 * @constant
 * @type {ZodSchema}
 * @example
 * {
 *   "id": "123"
 * }
 */
export const getOrderStatusSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "El ID debe ser un número válido." }),
});
