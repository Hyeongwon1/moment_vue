"use strict";
import bcrypt from "bcrypt";
import { uuid } from "../utils/uuid";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      uuid: {
        allowNull: false,
        unique: true,
        type: "BINARY(16)",
        defaultValue: () => Buffer.from(uuid(), "hex"),
        get: function () {
          return Buffer.from(this.getDataValue("uuid")).toString("hex");
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      userName: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      nickName: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      phoneNumber: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      birthDay: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "momentUsers",
      timestamps: true,
    }
  );

  User.associate = function (models) {
    User.hasMany(models.momentDataMst);
  };

  // hooks
  User.beforeSave(async (user, options) => {
    if (user.changed("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  return User;
};
