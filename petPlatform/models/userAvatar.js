"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAvatar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 外键关联到 User 模型（users 表），ON DELETE CASCADE
      UserAvatar.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE", // 当关联的 User 被删除时，删除对应的 UserAvatar
      });
    }
  }
  UserAvatar.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // 关联 Users 表
          key: "id",
        },
        onDelete: "CASCADE",
      },
      fullpath: {
        type: DataTypes.STRING,
      },
      filename: {
        type: DataTypes.STRING,
      },
      fieldname: {
        type: DataTypes.STRING,
      },
      encoding: {
        type: DataTypes.STRING,
      },
      originalname: {
        type: DataTypes.STRING,
      },
      mimetype: {
        type: DataTypes.STRING,
      },
      destination: {
        type: DataTypes.STRING,
      },
      path: {
        type: DataTypes.STRING,
      },
      size: {
        type: DataTypes.INTEGER,
      },
      url: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "UserAvatar",
      indexes: [
        {
          fields: ["user_id"], // 为 user_id 字段添加索引
        },
      ],
    }
  );
  return UserAvatar;
};
