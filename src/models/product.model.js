"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  /**
   * Representa un producto disponible en la plataforma.
   * @class Product
   * @extends Model
   */
  class Product extends Model {
    /**
     * Define las asociaciones del modelo Product con otros modelos.
     * @param {Object} models - Los modelos disponibles para asociar.
     */
    static associate(models) {
      // Relación 1:N con `order_items`
      Product.hasMany(models.OrderItem, {
        foreignKey: "product_id",
        as: "order_items",
      });
    }
  }

  /**
   * Inicializa el modelo Product con sus atributos y opciones.
   * 
   * @param {Sequelize} sequelize - La instancia de Sequelize.
   * @param {DataTypes} DataTypes - Tipos de datos proporcionados por Sequelize.
   * @returns {Product} - El modelo Product inicializado.
   */
  Product.init(
    {
      /**
       * Nombre del producto.
       * @type {string}
       * @required
       */
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      /**
       * Descripción del producto.
       * @type {string}
       */
      description: DataTypes.STRING,
      /**
       * Precio del producto.
       * @type {number}
       * @required
       */
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      /**
       * Cantidad disponible en inventario.
       * @type {number}
       * @required
       */
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "PRODUCTS", // Nombre de la tabla en la base de datos.
      timestamps: true, // Incluye campos createdAt y updatedAt automáticamente.
    }
  );

  return Product;
};
