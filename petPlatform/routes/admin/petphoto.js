// 引入Express模块
const express = require("express");
const router = express.Router();
const { PetPhoto } = require("../../models");
const { Op } = require("sequelize");
const { NotFoundError, success, failure } = require("../../utils/response");


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
 * 新增照片
 */
router.post("/", async (req, res) => {
  try {
    //白名单过滤
    const body = filterBody(req);
    const petPhoto = await PetPhoto.create(body);
    success(res, "新增成功", { petPhoto }, 201);
  } catch (err) {
    failure(res, err);
  }
});

/**
 * 删除照片
 */
router.delete("/:id", async (req, res) => {
  try {
    const petPhoto = await getPetPhoto(req);
    await petPhoto.destroy();
    success(res, "删除成功");
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

//白名单过滤
function filterBody(req) {
  return {
    pet_id: req.body.pet_id,
    photo_url: req.body.photo_url,
  };
}
// 导出路由模块
module.exports = router;
