"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("momentDataMst", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
        model: 'momentUsers',
        key: 'id',
      },
      }, //외래키 처리
      kind: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      fileId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      like: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      star: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("momentDataMst");
  },
};
