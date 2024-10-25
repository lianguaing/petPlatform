"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserAvatars", {
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
          model: "Users", // 关联的表名
          key: "id",
        },
        onDelete: "CASCADE", // 当 Users 表中的某条记录被删除时，所有引用该记录的 user_id 字段也会被自动删除
      },
      fullpath: {
        type: Sequelize.STRING,
      },
      fieldname: {
        type: Sequelize.STRING,
      },
      originalname: {
        type: Sequelize.STRING,
      },
      encoding: {
        type: Sequelize.STRING,
      },
      mimetype: {
        type: Sequelize.STRING,
      },
      destination: {
        type: Sequelize.STRING,
      },
      filename: {
        type: Sequelize.STRING,
      },
      path: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
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
    await queryInterface.addIndex("UserAvatars", { fields: ["user_id"] });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserAvatars");
  },
};
