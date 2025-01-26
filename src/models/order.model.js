"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  /**
   * Representa un pedido en el sistema.
   * @class Order
   * @extends Model
   */
  class Order extends Model {
    /**
     * Define las asociaciones del modelo Order con otros modelos.
     * @param {Object} models - Los modelos disponibles para asociar.
     */
    static associate(models) {
      // Relación N:1 con usuarios
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      // Relación 1:N con order_items
      Order.hasMany(models.OrderItem, {
        foreignKey: "order_id",
        as: "items",
      });
    }
  }

  /**
   * Inicializa el modelo Order con sus atributos y opciones.
   * 
   * @param {Sequelize} sequelize - La instancia de Sequelize.
   * @param {DataTypes} DataTypes - Tipos de datos proporcionados por Sequelize.
   * @returns {Order} - El modelo Order inicializado.
   */
  Order.init(
    {
      /**
       * ID del usuario que realizó el pedido.
       * @type {number}
       * @required
       */
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      /**
       * Estado del pedido.
       * Por defecto, el estado inicial es "En preparación".
       * @type {string}
       */
      status: {
        type: DataTypes.STRING,
        defaultValue: "En preparación",
      },
      /**
       * Total del pedido.
       * Por defecto, el total es 0.
       * @type {number}
       */
      total: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "ORDERS",
      timestamps: true, // Incluye campos createdAt y updatedAt automáticamente.
    }
  );

  return Order;
};
