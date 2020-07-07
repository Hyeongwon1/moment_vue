'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('momentFileMst', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      fileName: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      saveFileMame: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contentYype: {
        allowNull: true,
        type: Sequelize.STRING
      },
      deleteFlag: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('momentFileMst')
  }
}