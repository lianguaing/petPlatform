// 引入Express模块
const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const { Op } = require("sequelize");

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
    res.json({
      status: true,
      message: "查询成功",
      data: { users, pagination: { currentPage, pageSize, total: count } },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "查询失败",
      data: { error },
    });
  }
});

/**
 * 根据name查询用户
 */
router.get("/:name", async (req, res) => {
  const { name } = req.params;
  const user = await User.findOne({ where: { name: name } });

  if (user) {
    res.json({
      status: true,
      message: "查询成功",
      data: { user },
    });
  } else {
    res.status(404).send("User not found");
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
    res.status(201).json({
      status: true,
      message: "创建成功",
      data: { user },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/**
 * 更新用户
 */
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ status: false, message: "用户不存在" });
  }
  await user.update(filterBody(req));
  res.json({
    status: true,
    message: "更新成功",
  });
});
/**
 * 删除用户
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ status: false, message: "用户不存在" });
  }
  await user.destroy();
  res.json({
    status: true,
    message: "删除成功",
  });
});
//白名单过滤
function filterBody(req) {
  return {
    name: req.body.name||'momo',
    password: req.body.password,
    gender: req.body.gender || "other",
    contact_info: req.body.contact_info,
    avatar_url: req.body.avatar_url,
  };
}
// 导出路由模块
module.exports = router;
