"use strict";

module.exports = (sequelize, DataTypes) => {
  const MomentDataMst = sequelize.define(
    "momentDataMst",
    {
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
      classMethods:{
         associate:function(models){
           MomentDataMst.belongsTo(models.User, { foreignKey:'company_id', foreignKeyConstraint:true} );
         }
       }
    }
  );

  // MomentDataMst.associate = function (models) {
  //     MomentDataMst.belongsTo(models.User,{
  //   });
    // models.User.hasMany(models.momentData,{
    //   foreignKey: "userId",
    //   // allowNull: true,// momentData.user_id
    //   sourceKey: 'id', // the User.id
    // });
    // models.momentDataMst.belongsTo(models.User,{
    //       foreignKey: 'userId', 
    //       targetKey: 'id', // the A.id
    // });
   
    
    // models.momentDataMst.belongsToMany(models.MomentFile,
    //   {through: 'UserFile',foreignKey: 'file_Id'});
  //};

  return MomentDataMst;
};
