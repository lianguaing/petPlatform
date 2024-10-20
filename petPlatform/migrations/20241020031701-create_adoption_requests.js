"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AdoptionRequests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      pet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Pets", // 关联宠物表
          key: "id",
        },
        onDelete: "CASCADE", // 当宠物删除时，自动删除相关领养申请
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // 关联用户表
          key: "id",
        },
        onDelete: "CASCADE", // 当用户删除时，自动删除相关领养申请
      },
      message: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["pending", "approved", "rejected"],
        defaultValue: "pending",
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
    await queryInterface.addIndex("AdoptionRequests", { fields: ["pet_id"] });
    await queryInterface.addIndex("AdoptionRequests", { fields: ["user_id"] });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AdoptionRequests");
  },
};
