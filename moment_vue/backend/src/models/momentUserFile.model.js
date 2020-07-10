'use strict'

module.exports = (sequelize, DataTypes) => {
  const MomentFile = sequelize.define('momentDataFile', {
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
    tableName: 'momentDataFile',
    timestamps: true,
  })

  MomentFile.associate = function (models) {
    // MomentFile.belongsToMany(models.MomentData,{through: 'momentDisplayInfoS',foreignKey: 'file_Id'}) 

    // models.User.hasMany(models.momentData,{
    //   foreignKey: "userId",
    //   // allowNull: true,// momentData.user_id
    //   sourceKey: 'id', // the User.id
    // });
    // models.momentDataMst.belongsTo(models.User,{
    //       foreignKey: 'userId', 
    //       targetKey: 'id', // the A.id
    // });
  }
  return MomentFile
}