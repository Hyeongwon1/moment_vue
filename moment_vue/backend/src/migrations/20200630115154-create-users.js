"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("momentUsers", {
      id: { 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      userName: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      nickName: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      phoneNumber: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birthDay: {
        allowNull: false,
        type: Sequelize.DATE,
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
    return queryInterface.dropTable("momentUsers");
  },
};
