var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config(); //加载环境变量

//处理跨域
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//后台路由文件
var adminUsersRouter = require("./routes/admin/users");
var adminPetsRouter = require("./routes/admin/pet");
var adminAdoptionsRouter = require("./routes/admin/adoption");
var adminPhotoRouter = require("./routes/admin/petphoto");
var uploadPhoto = require("./routes/uploads");

var app = express();

//CORS跨域配置
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//路由配置
app.use("/admin/users", adminUsersRouter);
app.use("/admin/pet", adminPetsRouter);
app.use("/admin/adoption", adminAdoptionsRouter);
app.use("/admin/petphoto", adminPhotoRouter);
app.use("/uploads", uploadPhoto);

module.exports = app;
