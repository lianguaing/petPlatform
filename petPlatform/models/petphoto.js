"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PetPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 外键关联到 Pet 模型（pets 表），ON DELETE CASCADE
      PetPhoto.belongsTo(models.Pet, {
        foreignKey: "pet_id",
        onDelete: "CASCADE", // 当关联的 Pet 被删除时，删除对应的 PetPhoto
      });
    }
  }
  PetPhoto.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Pets", // 这里使用复数形式，确保与迁移文件一致
          key: "id",
        },
        onDelete: "CASCADE",
      },
      fullpath: {
        type: DataTypes.STRING,
      },
      fieldname: {
        type: DataTypes.STRING,
      },
      originalname: {
        type: DataTypes.STRING,
      },
      encoding: {
        type: DataTypes.STRING,
      },
      mimetype: {
        type: DataTypes.STRING,
      },
      destination: {
        type: DataTypes.STRING,
      },
      filename: {
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
      modelName: "PetPhoto",
      indexes: [
        {
          fields: ["pet_id"], // 为 pet_id 字段添加索引
        },
      ],
    }
  );
  return PetPhoto;
};
