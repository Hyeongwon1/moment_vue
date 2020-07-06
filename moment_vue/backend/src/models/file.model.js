'use strict'

module.exports = (sequelize, DataTypes) => {
  const MomentFile = sequelize.define('momentFileMst', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    file_name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    save_file_name: {
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
    // associations
  }

 
  return MomentFile
}