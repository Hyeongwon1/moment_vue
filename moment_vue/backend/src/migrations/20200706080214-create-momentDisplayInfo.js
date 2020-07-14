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
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'momentDataMst',
          key: 'id',
        },
      },
      fileId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'momentDataFile',
          key: 'attachId',
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