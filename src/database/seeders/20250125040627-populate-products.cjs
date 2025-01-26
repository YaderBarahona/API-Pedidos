"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar productos iniciales en la tabla "Products"
    await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Pizza Margherita",
          description: "Pizza clásica italiana con queso mozzarella y albahaca fresca.",
          price: 12.99,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hamburguesa BBQ",
          description: "Jugosa hamburguesa con queso cheddar, tocino y salsa BBQ.",
          price: 9.99,
          stock: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sushi Roll de Salmón",
          description: "Rollo de sushi con salmón fresco, aguacate y queso crema.",
          price: 15.99,
          stock: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ensalada César",
          description: "Ensalada con lechuga romana, crutones, parmesano y aderezo César.",
          price: 7.99,
          stock: 70,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tacos al Pastor",
          description: "Tacos tradicionales mexicanos con carne de cerdo marinada.",
          price: 3.50,
          stock: 150,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Café Latte",
          description: "Café expreso con leche vaporizada y un toque de espuma.",
          price: 4.50,
          stock: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Helado de Chocolate",
          description: "Delicioso helado artesanal de chocolate oscuro.",
          price: 5.00,
          stock: 90,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pollo a la Brasa",
          description: "Medio pollo a la brasa con papas fritas y ensalada.",
          price: 18.00,
          stock: 40,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Empanada de Carne",
          description: "Empanada crujiente rellena de carne sazonada.",
          price: 2.99,
          stock: 120,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jugo de Naranja Natural",
          description: "Jugo recién exprimido de naranjas frescas.",
          price: 3.99,
          stock: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Eliminar los productos insertados (por si se necesita revertir el seeder)
    await queryInterface.bulkDelete("Products", null, {});
  },
};
