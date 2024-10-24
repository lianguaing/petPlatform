var express = require("express");
var router = express.Router();
const { BadRequest } = require("http-errors");
const { NotFoundError, success, failure } = require("../utils/response");
const { config, client, singleFileUpload } = require("../utils/aliyun");
const { PetPhoto } = require("../models");

/**
 * 阿里云oss客户端上传
 */
router.post("/aliyun", function (req, res, next) {
  try {
    singleFileUpload(req, res, async function (error) {
      if (error) {
        return failure(res, error);
      }

      if (!req.file) {
        return failure(res, new BadRequest("请上传文件"));
      }
      //   console.log("Pet ID:", req.body.pet_id);
      //   记录附件信息
      await PetPhoto.create({
        ...req.file,
        pet_id: req.body.pet_id,
        fullpath: req.file.path + "/" + req.file.filename,
      });

      success(res, "上传成功", { file: req.file });
    });
  } catch (err) {
    failure(res, err);
  }
});

module.exports = router;
