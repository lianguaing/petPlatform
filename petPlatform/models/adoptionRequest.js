"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AdoptionRequest extends Model {
    static associate(models) {
      // 关联到 Pet 和 User 模型
      AdoptionRequest.belongsTo(models.Pet, {
        foreignKey: "pet_id",
        onDelete: "CASCADE",
      });
      AdoptionRequest.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
      });
    }
  }

  AdoptionRequest.init(
    {
      pet_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      message: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "approved", "rejected"],
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "AdoptionRequest",
      indexes: [
        {
          fields: ['user_id'],
        },
        {
          fields: ['pet_id'],
        }
      ],
    }
  );

  return AdoptionRequest;
};
