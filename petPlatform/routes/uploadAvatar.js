var express = require("express");
var router = express.Router();
const { BadRequest } = require("http-errors");
const { NotFoundError, success, failure } = require("../utils/response");
const { config, client, singleFileUpload } = require("../utils/aliyun");
const { User, UserAvatar } = require("../models");

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
      // 查找是否已有旧头像记录
      const existingAvatar = await UserAvatar.findOne({ where: { user_id } });

      // 如果已有头像，删除阿里云上的旧头像文件
      if (existingAvatar) {
        await client.delete(existingAvatar.fullpath); // 删除阿里云旧头像文件
      }

      // 更新用户的头像链接
      const [updated] = await User.update(
        { avatar_url: avatarUrl }, // 要更新的字段
        { where: { id: user_id } } // 更新条件
      );

      // 更新或插入头像附件表信息
      if (existingAvatar) {
        // 如果头像记录存在，更新它
        await existingAvatar.update({
          ...req.file,
          fullpath: req.file.path + "/" + req.file.filename, // 完整路径
        });
      } else {
        // 如果头像记录不存在，插入新的记录
        await UserAvatar.create({
          ...req.file,
          user_id: user_id,
          fullpath: req.file.path + "/" + req.file.filename,
        });
      }

      if (!updated) {
        return failure(res, new NotFoundError("用户未找到"));
      }

      success(res, "上传成功", { file: req.file });
    });
  } catch (err) {
    failure(res, err);
  }
});

module.exports = router;
