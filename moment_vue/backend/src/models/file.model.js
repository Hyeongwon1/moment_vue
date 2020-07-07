'use strict'

module.exports = (sequelize, DataTypes) => {
  const MomentFile = sequelize.define('momentFileMst', {
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
    tableName: 'momentFileMst',
    timestamps: true,
  })

  MomentFile.associate = function (models) {
    MomentFile.belongsToMany(models.MomentData,{through: 'UserFile'});
  }

 
  return MomentFile
}