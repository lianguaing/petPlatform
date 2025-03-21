const multer = require("multer");
const MAO = require("multer-aliyun-oss");
const OSS = require("ali-oss");
const { BadRequest } = require("http-errors");

//阿里云配置信息
const config = {
  region: process.env.ALIYUN_REGION,
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
  bucket: process.env.ALIYUN_BUCKET,
};

//阿里云上传
const client = new OSS(config);

//multer配置
const upload = multer({
  storage: MAO({
    config: config,
    destination: "uploads", //自定义上传目录
  }),
  limits: {
    fileSize: 1024 * 1024 * 5, //限制文件大小为5MB
  },
  fileFilter: function (req, file, cb) {
    //限制文件类型--只允许上传图片
    const fileType = file.mimetype.split("/")[0];
    const isImage = fileType === "image";

    if (!isImage) {
      return cb(new BadRequest("只允许上传图片"));
    }
    cb(null, true);
  },
});

const singleFileUpload = upload.single("file");

module.exports = {
  config,
  client,
  singleFileUpload,
};
