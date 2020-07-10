'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('momentDataFile', {
      attachId: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      seq: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      // fileId: {
      //   allowNull: false,
      //   // autoIncrement: true,
      //   // primaryKey: true,
      //   type: Sequelize.INTEGER.UNSIGNED
      // },
      fileName: {
        allowNull: false,
        // unique: true,
        type: Sequelize.STRING
      },
      saveFileName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contentType: {
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
    return queryInterface.dropTable('momentDataFile')
  }
}