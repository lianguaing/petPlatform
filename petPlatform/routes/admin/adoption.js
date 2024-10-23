// 引入Express模块
const express = require("express");
const router = express.Router();
const { AdoptionRequest, Pet, User } = require("../../models");
const { Op } = require("sequelize");
const { NotFoundError, success, failure } = require("../../utils/response");

/**
 * 根据用户查询申请表
 */
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const adoptionR = await AdoptionRequest.findAll({
      where: { user_id: user_id },
      //增加关联
      include: [
        {
          model: Pet, // 关联的模型
          attributes: ["name", "age", "gender", "breed"],
        },
      ],
    });
    if (!adoptionR) {
      throw new NotFoundError(`该用户${user_id}没有申请表信息`);
    }
    success(res, "查询成功", { adoptionR });
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 根据宠物id查询申请表
 */
router.get("/:pet_id", async (req, res) => {
  try {
    const { pet_id } = req.params;
    const adoptionR = await AdoptionRequest.findAll({
      where: { pet_id: pet_id },

      //增加关联
      include: [
        {
          model: User, // 关联的模型
          attributes: ["id", "name", "contact_info"],
        },
      ],
    });
    if (!adoptionR) {
      throw new NotFoundError(`${pet_id}宠物没有被申请记录`);
    }
    success(res, "查询成功", { adoptionR });
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 创建申请表
 */
router.post("/", async (req, res) => {
  try {
    //白名单过滤
    const body = filterBody(req);
    const adoptionR = await AdoptionRequest.create(body);
    success(res, "创建成功", { adoptionR }, 201);
  } catch (err) {
    failure(res, err);
  }
});
/**
 * 更新申请表
 */
router.put("/:id", async (req, res) => {
  try {
    const adoptionR = await getAdoptionRequest(req);
    await adoptionR.update(filterBody(req));
    success(res, "更新成功");
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 删除申请表
 */
router.delete("/:id", async (req, res) => {
  try {
    const adoptionR = await getAdoptionRequest(req);
    await adoptionR.destroy();
    success(res, "删除成功");
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 公共方法：查询申请表
 */
async function getAdoptionRequest(req) {
  const { id } = req.params;
  const adoptionR = await AdoptionRequest.findByPk(id);
  if (!adoptionR) {
    throw new NotFoundError(`ID:${id}申请表不存在`);
  }
  return adoptionR;
}

//白名单过滤
function filterBody(req) {
  return {
    status: req.body.status || "pending",
    pet_id: req.body.pet_id,
    user_id: req.body.user_id,
    message: req.body.message,
  };
}
// 导出路由模块
module.exports = router;
