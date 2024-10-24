var express = require("express");
var router = express.Router();
const { BadRequest } = require("http-errors");
const { NotFoundError, success, failure } = require("../utils/response");
const { singleFileUpload } = require("../utils/aliyun");
const { User } = require("../models");

/**
 * 阿里云oss客户端上传
 */
router.post("/avatar", function (req, res, next) {
  try {
    singleFileUpload(req, res, async function (error) {
      if (error) {
        return failure(res, error);
      }

      if (!req.file) {
        return failure(res, new BadRequest("请上传文件"));
      }

      //   插入用户头像信息
      const { user_id } = req.body;

      // 获取阿里云返回的文件链接
      const avatarUrl = req.file.url; // 假设req.file包含了上传后的文件信息

      // 更新用户的头像链接
      const [updated] = await User.update(
        { avatar_url: avatarUrl }, // 要更新的字段
        { where: { id: user_id } } // 更新条件
      );

      if (!updated) {
        return failure(res, new NotFoundError("用户未找到"));
      }

      success(res, "上传成功", { file: req.file.url });
    });
  } catch (err) {
    failure(res, err);
  }
});

module.exports = router;
