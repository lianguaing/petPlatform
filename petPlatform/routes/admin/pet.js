// 引入Express模块
const express = require("express");
const router = express.Router();
const { Pet } = require("../../models");
const { Op } = require("sequelize");
const { NotFoundError, success, failure } = require("../../utils/response");

/**
 * 查询所有宠物
 */
router.get("/", async (req, res) => {
  try {
    const query = req.query;

    //当前是第几页，默认为第1页
    const currentPage = Math.abs(Number.parseInt(query.currentPage)) || 1;
    //每页显示多少条数据，默认为10条
    const pageSize = Math.abs(Number.parseInt(query.pageSize)) || 10;
    //计算起始索引
    const offset = (currentPage - 1) * pageSize;

    const condition = {
      order: [["id", "DESC"]], //根据id降序排列
      offset: offset,
      limit: pageSize,
    };
    //模糊查询
    if (query.name) {
      condition.where = {
        name: {
          [Op.like]: `%${query.name}%`,
        },
      };
    }
    const { count, rows: Pets } = await Pet.findAndCountAll(condition);
    success(res, "查询成功", {
      Pets,
      pagination: { currentPage, pageSize, total: count },
    });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 根据name查询宠物
 */
router.get("/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const pet = await Pet.findOne({ where: { name: name } });
    if (!pet) {
      throw new NotFoundError(`${name}宠物不存在`);
    }
    success(res, "查询成功", { pet });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 创建宠物
 */
router.post("/", async (req, res) => {
  try {
    //白名单过滤
    const body = filterBody(req);
    const pet = await Pet.create(body);
    success(res, "创建成功", { pet }, 201);
  } catch (err) {
    failure(res, err);
  }
});
/**
 * 更新宠物
 */
router.put("/:id", async (req, res) => {
  try {
    const pet = await getPet(req);
    await pet.update(filterBody(req));
    success(res, "更新成功");
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 删除宠物
 */
router.delete("/:id", async (req, res) => {
  try {
    const pet = await getPet(req);
    await pet.destroy();
    success(res, "删除成功");
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 公共方法：查询宠物
 */
async function getPet(req) {
  const { id } = req.params;
  const pet = await Pet.findByPk(id);
  if (!pet) {
    throw new NotFoundError(`ID:${id}宠物不存在`);
  }
  return pet;
}

//白名单过滤
function filterBody(req) {
  return {
    user_id: req.body.user_id,
    name: req.body.name,
    gender: req.body.gender || "male",
    age: req.body.age,
    breed: req.body.breed,
    species: req.body.species,
    description: req.body.description,
    tags: req.body.tags,
  };
}
// 导出路由模块
module.exports = router;