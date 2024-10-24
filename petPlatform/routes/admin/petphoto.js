// 引入Express模块
const express = require("express");
const router = express.Router();
const { PetPhoto } = require("../../models");
const { Op } = require("sequelize");
const { NotFoundError, success, failure } = require("../../utils/response");
const { client, config } = require("../../utils/aliyun");

/**
 * 根据宠物id查询所有照片
 */
router.get("/:pet_id", async (req, res) => {
  try {
    const { pet_id } = req.params;
    const petPhoto = await PetPhoto.findAll({
      where: { pet_id: pet_id },
    });
    if (!petPhoto) {
      throw new NotFoundError(`该宠物${pet_id}没有照片信息`);
    }
    success(res, "查询成功", { petPhoto });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 删除照片-还要删除阿里云oss上面的图片
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const petPhoto = await PetPhoto.findByPk(id);
    if (!petPhoto) {
      throw new NotFoundError(`ID:${id}照片不存在`);
    }

    //删除阿里云上的照片
    await client.delete(petPhoto.fullpath);

    //删除数据库中的记录
    await petPhoto.destroy();

    success(res, "照片删除成功");
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 公共方法：查询照片
 */
async function getPetPhoto(req) {
  const { id } = req.params;
  const petPhoto = await PetPhoto.findByPk(id);
  if (!petPhoto) {
    throw new NotFoundError(`ID:${id}照片不存在`);
  }
  return petPhoto;
}

// 导出路由模块
module.exports = router;
