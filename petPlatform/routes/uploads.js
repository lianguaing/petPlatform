var express = require("express");
var router = express.Router();
const { BadRequest } = require("http-errors");
const { NotFoundError, success, failure } = require("../utils/response");
const { config, client, multipleFilesUpload } = require("../utils/aliyunArray");
const { PetPhoto } = require("../models");

/**
 * 阿里云oss客户端上传
 */
// router.post("/aliyun", function (req, res, next) {
//   try {
//     singleFileUpload(req, res, async function (error) {
//       if (error) {
//         return failure(res, error);
//       }

//       if (!req.file) {
//         return failure(res, new BadRequest("请上传文件"));
//       }
//       //   console.log("Pet ID:", req.body.pet_id);
//       //   记录附件信息
//       await PetPhoto.create({
//         ...req.file,
//         pet_id: req.body.pet_id,
//         fullpath: req.file.path + "/" + req.file.filename,
//       });

//       success(res, "上传成功", { file: req.file });
//     });
//   } catch (err) {
//     failure(res, err);
//   }
// });


/**
 * 阿里云OSS客户端批量上传
 */
router.post("/aliyun/:pet_id", async function (req, res) {
  try {
    const { pet_id } = req.params;

    // 检查 pet_id 是否存在
    if (!pet_id) {
      return failure(res, new BadRequest("pet_id 不能为空"));
    }

    // 查找当前宠物的所有照片记录
    const oldPhotos = await PetPhoto.findAll({ where: { pet_id } });

    // 如果存在旧照片，先删除它们
    if (oldPhotos.length > 0) {
      // 从旧照片记录中获取阿里云OSS上文件的路径
      const pathsToDelete = oldPhotos.map((photo) => photo.fullpath);

      // 删除阿里云OSS上的旧照片
      await client.deleteMulti(pathsToDelete, { quiet: true });

      // 删除数据库中的旧照片记录
      await PetPhoto.destroy({ where: { pet_id } });
    }

    // 上传新照片
    multipleFilesUpload(req, res, async function (error) {
      if (error) {
        return failure(res, error);
      }

      if (!req.files || req.files.length === 0) {
        return failure(res, new BadRequest("请上传文件"));
      }

      // 批量插入新照片记录
      const photoRecords = req.files.map((file) => ({
        pet_id,
        fullpath: file.path + "/" + file.filename,
        ...file,
      }));

      await PetPhoto.bulkCreate(photoRecords);

      success(res, "照片更新成功", { files: req.files.url });
    });
  } catch (err) {
    failure(res, err);
  }
});

module.exports = router;
