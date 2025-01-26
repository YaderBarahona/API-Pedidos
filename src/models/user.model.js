"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  /**
   * Representa un usuario registrado en la plataforma.
   * @class User
   * @extends Model
   */
  class User extends Model {
    /**
     * Define las asociaciones del modelo User con otros modelos.
     * @param {Object} models - Los modelos disponibles para asociar.
     */
    static associate(models) {
      // Relación 1:N con `orders` (un usuario puede tener múltiples pedidos).
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "orders",
      });
    }
  }

  /**
   * Inicializa el modelo User con sus atributos y opciones.
   * 
   * @param {Sequelize} sequelize - La instancia de Sequelize.
   * @param {DataTypes} DataTypes - Tipos de datos proporcionados por Sequelize.
   * @returns {User} - El modelo User inicializado.
   */
  User.init(
    {
      /**
       * Nombre de usuario del cliente.
       * @type {string}
       * @required
       */
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      /**
       * Contraseña del cliente (encriptada).
       * @type {string}
       * @required
       */
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "USERS", // Nombre de la tabla en la base de datos.
      timestamps: true, // Incluye campos createdAt y updatedAt automáticamente.
    }
  );

  return User;
};
