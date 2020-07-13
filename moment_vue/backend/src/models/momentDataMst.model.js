"use strict";

module.exports = (sequelize, DataTypes) => {
  const MomentDataMst = sequelize.define("momentDataMst",{
      // userId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER.UNSIGNED,
      // },
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

  MomentDataMst.associate = function (models) {
      MomentDataMst.belongsTo(models.User);
      MomentDataMst.belongsToMany(models.MomentFile,
        {through: 'momentUserFile',foreignKey: 'file_Id'});
  }
    // models.User.hasMany(models.momentData,{
    //   foreignKey: "userId",
    //   // allowNull: true,// momentData.user_id
    //   sourceKey: 'id', // the User.id
    // });
    // models.momentDataMst.belongsTo(models.User,{
    //       foreignKey: 'userId', 
    //       targetKey: 'id', // the A.id
    // });
   
    
 

  return MomentDataMst;
};
