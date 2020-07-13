'use strict'

module.exports = (sequelize, DataTypes) => {
  const momentUserFile = sequelize.define('momentUserFile', {
    fileId: {
      allowNull: false,
      // unique: true,
      type: DataTypes.STRING
    },
    fileName: {
      allowNull: false,
      // unique: true,
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
    tableName: 'momentUserFile',
    timestamps: true,
  })

  momentUserFile.associate = function (models) {
  }
  return momentUserFile
}