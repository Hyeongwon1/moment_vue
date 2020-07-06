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
      file_name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      save_file_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content_type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      delete_flag: {
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