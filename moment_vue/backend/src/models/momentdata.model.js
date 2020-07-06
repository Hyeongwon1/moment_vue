"use strict";

module.exports = (sequelize, DataTypes) => {
  const MomentData = sequelize.define(
    "momentDataMst",
    {
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      kind: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      location: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      file_id: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      like: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
      star: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
      },
    },
    {
      tableName: "momentDataMst",
      timestamps: true,
    }
  );

  MomentData.associate = function (models) {
    MomentData.belongsTo(models.User, {
      foreignKey: "id",
    });
  };

  return MomentData;
};
