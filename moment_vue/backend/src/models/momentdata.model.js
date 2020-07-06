'use strict'

module.exports = (sequelize, DataTypes) => {
  const MomentData = sequelize.define('monentDataMst', {
    id: {
      allowNull: false,
      autoIncrement: true,
      unique : true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    user_id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    kind: {
      allowNull: false,
      type: DataTypes.STRING
    },
    location: {
      allowNull: false,
      type: DataTypes.STRING
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
    file_id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    like: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    },
    star: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED
    }
  }, {
    tableName: 'monentDataMst',
    timestamps: true,
  })

  MomentData.associate = function (models) {
    MomentData.belongsTo(models.user, {
      foreignKey: "user_id"
    })
  }

 
  return MomentData
}