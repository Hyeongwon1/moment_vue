'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('momentUserFile', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      momentId: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'momentDataFile',
          key: 'id',
        },
      },
      fileId: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: 'momentUserFile',
          key: 'id',
        },
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
    return queryInterface.dropTable('momentUserFile')
  }
}