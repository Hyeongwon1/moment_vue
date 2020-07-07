"use strict";

module.exports = (sequelize, DataTypes) => {
  const MomentData = sequelize.define(
    "momentDataMst",
    {
      userId: {
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
      fileId: {
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
    MomentData.belongsTo(models.User);
    // MomentData.belongsToMany(models.MomentFile,{through: 'momentDisplayInfo',foreignKey: 'file_Id'});
  };

  return MomentData;
};
