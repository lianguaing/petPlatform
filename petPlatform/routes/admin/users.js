// 引入Express模块
const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const { Op } = require("sequelize");
const { NotFoundError, success, failure } = require("../../utils/response");

/**
 * 查询所有用户
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
    const { count, rows: users } = await User.findAndCountAll(condition);
    success(res, "查询成功", {
      users,
      pagination: { currentPage, pageSize, total: count },
    });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 根据id查询用户
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await getUser(req);
    success(res, "查询成功", { user });
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 创建用户
 */
router.post("/", async (req, res) => {
  try {
    //白名单过滤
    const body = filterBody(req);
    const user = await User.create(body);
    success(res, "创建成功", { user }, 201);
  } catch (err) {
    failure(res, err);
  }
});
/**
 * 更新用户
 */
router.put("/:id", async (req, res) => {
  try {
    const user = await getUser(req);
    await user.update(filterBody(req));
    success(res, "更新成功");
  } catch (error) {
    failure(res, error);
  }
});
/**
 * 删除用户
 */
router.delete("/:id", async (req, res) => {
  try {
    const user = await getUser(req);
    await user.destroy();
    success(res, "删除成功");
  } catch (error) {
    failure(res, error);
  }
});

/**
 * 公共方法：查询用户
 */
async function getUser(req) {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    throw new NotFoundError(`ID:${id}用户不存在`);
  }
  return user;
}

//白名单过滤
function filterBody(req) {
  return {
    name: req.body.name || "momo",
    password: req.body.password,
    gender: req.body.gender || "other",
    contact_info: req.body.contact_info,
    avatar_url: req.body.avatar_url,
  };
}
// 导出路由模块
module.exports = router;
