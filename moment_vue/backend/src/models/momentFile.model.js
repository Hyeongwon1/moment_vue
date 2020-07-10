'use strict'

module.exports = (sequelize, DataTypes) => {
  const momentDataFile = sequelize.define('momentDataFile', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    fileName: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    saveFileName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    contentType: {
      allowNull: true,
      type: DataTypes.STRING
    },
    deleteFlag: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'momentDataFile',
    timestamps: true,
  })

  momentDataFile.associate = function (models) {
    // MomentFile.belongsToMany(models.MomentData,{through: 'UserFile'});
  };

  
  return momentDataFile
}