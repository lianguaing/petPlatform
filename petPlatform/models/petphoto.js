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
      pet_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      photo_url: {
        type: DataTypes.STRING,
        allowNull: true, // 可以为空
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
