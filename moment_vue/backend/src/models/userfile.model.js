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
    content_type: {
      allowNull: true,
      type: DataTypes.STRING
    },
    delete_flag: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'momentFileMst',
    timestamps: true,
  })

  MomentFile.associate = function (models) {
    // MomentFile.belongsToMany(models.MomentData,{through: 'momentDisplayInfoS',foreignKey: 'file_Id'}) 

  }
  return MomentFile
}