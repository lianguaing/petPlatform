"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 与 PetPhoto 模型关联，一个 Pet 可以有多个 PetPhoto
      Pet.hasMany(models.PetPhoto, {
        foreignKey: "pet_id",
        onDelete: "CASCADE", // 当 Pet 被删除时，相关的照片也删除
      });

      //关联用户表等
      Pet.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE", // 当用户被删除时，相应的宠物记录也删除
      });

      Pet.belongsTo(models.User, {
        foreignKey: "adopter_id",
        onDelete: "SET NULL", // 当领养者被删除时，宠物的 adopter_id 设为 null
      });
    }
  }
  Pet.init(
    {
      // ID
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      // 名
      name: {
        type: DataTypes.STRING,
        validate: {
          len: [1, 100], // 长度在5到10之间
        },
      },
      // 年龄
      age: DataTypes.INTEGER,
      // 性别
      gender: {
        type: DataTypes.ENUM,
        values: ["male", "female"],
        defaultValue: "male", // 设置默认值
      },
      // 品种
      breed: DataTypes.STRING,
      // 种类
      species: DataTypes.STRING,
      // 描述
      description: DataTypes.TEXT,
      // 标签
      tags: DataTypes.TEXT,
      // 领养者ID
      adopter_id: DataTypes.INTEGER,
      // 状态
      status: {
        type: DataTypes.ENUM,
        values: ["available", "adopted"],
        defaultValue: "available", // 设置默认值
      },
    },
    {
      sequelize,
      modelName: "Pet",
      indexes: [
        {
          fields: ["user_id"],
        },
        {
          fields: ["adopter_id"],
        },
      ],
    }
  );
  return Pet;
};
