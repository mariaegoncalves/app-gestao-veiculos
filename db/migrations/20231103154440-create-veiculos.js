'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('veiculos', {
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      locadora: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      marca: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ano: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      motor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      portas: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
      },
      cambio: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ar_condicionado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('veiculos');
  }
};
