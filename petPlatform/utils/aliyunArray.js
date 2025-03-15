const multer = require("multer");
const MAO = require("multer-xxxx-oss");
const OSS = require("ali-oss");
const { BadRequest } = require("http-errors");

// 阿里云配置信息
const config = {

};

// 阿里云上传
const client = new OSS(config);

// multer配置
const upload = multer({
  storage: MAO({
    config: config,
    destination: "uploadsArray", // 自定义上传目录
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, // 限制文件大小为5MB
  },
  fileFilter: function (req, file, cb) {
    // 限制文件类型--只允许上传图片
    const fileType = file.mimetype.split("/")[0];
    const isImage = fileType === "image";

    if (!isImage) {
      return cb(new BadRequest("只允许上传图片"));
    }
    cb(null, true);
  },
});

// 上传多个文件
const multipleFilesUpload = upload.array("files", 10); // 这里设置最多上传10个文件

module.exports = {
  config,
  client,
  multipleFilesUpload,
};
