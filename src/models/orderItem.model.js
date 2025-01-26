"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  /**
   * Representa un artículo dentro de un pedido.
   * @class OrderItem
   * @extends Model
   */
  class OrderItem extends Model {
    /**
     * Define las asociaciones del modelo OrderItem con otros modelos.
     * @param {Object} models - Los modelos disponibles para asociar.
     */
    static associate(models) {
      // Relación N:1 con orders
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });

      // Relación N:1 con products
      OrderItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  /**
   * Inicializa el modelo OrderItem con sus atributos y opciones.
   * 
   * @param {Sequelize} sequelize - La instancia de Sequelize.
   * @param {DataTypes} DataTypes - Tipos de datos proporcionados por Sequelize.
   * @returns {OrderItem} - El modelo OrderItem inicializado.
   */
  OrderItem.init(
    {
      /**
       * ID del pedido al que pertenece este artículo.
       * @type {number}
       * @required
       */
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /**
       * ID del producto asociado a este artículo.
       * @type {number}
       * @required
       */
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /**
       * Cantidad del producto en este artículo.
       * @type {number}
       * @required
       */
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
      tableName: "ORDER_ITEMS", // Nombre de la tabla en la base de datos.
      timestamps: true, // Incluye campos createdAt y updatedAt automáticamente.
    }
  );

  return OrderItem;
};
