"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // 关联到 Users 表
          key: "id",
        },
        onDelete: "CASCADE", // 当用户被删除时，删除相关宠物记录
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["male", "female"],
        defaultValue: "male",
      },
      breed: {
        type: Sequelize.STRING,
      },
      species: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      tags: {
        type: Sequelize.TEXT,
      },
      adopter_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // 关联到 Users 表
          key: "id",
        },
        onDelete: "SET NULL", // 当领养者被删除时，设为 null
      },
      status: {
        type: Sequelize.ENUM,
        values: ["available", "adopted"],
        defaultValue: "available",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    // 添加索引
    await queryInterface.addIndex("Pets", { fields: ["user_id"] });
    await queryInterface.addIndex("Pets", { fields: ["adopter_id"] });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pets");
  },
};
