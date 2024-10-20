"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PetPhotos", {
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
          model: "pets", // 关联的表名
          key: "id",
        },
        //这表示当 pets 表中的某条记录被删除时，所有引用该记录的 pet_id 字段也会被自动删除。这是一种级联删除的机制，用于维护数据的一致性。
        onDelete: "CASCADE",
      },
      photo_url: {
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
    await queryInterface.addIndex("petPhotos", { fields: ["pet_id"] });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("PetPhotos");
  },
};
