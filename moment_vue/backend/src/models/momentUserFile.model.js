'use strict'

module.exports = (sequelize, DataTypes) => {
  const MomentUserFile = sequelize.define('momentUserFile', {
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

  MomentUserFile.associate = function (models) {
  }
  return MomentUserFile
}