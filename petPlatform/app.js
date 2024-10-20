var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//处理跨域
const cors = require("cors");
//CORS跨域配置
app.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
//后台路由文件
var adminUsersRouter = require("./routes/admin/users");
var adminPetsRouter = require("./routes/admin/pet");
var adminAdoptionsRouter = require("./routes/admin/adoption");
var adminPhotoRouter = require("./routes/admin/petphoto");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

//后台路由配置
app.use("/admin/users", adminUsersRouter);
app.use("/admin/pet", adminPetsRouter);
app.use("/admin/adoption", adminAdoptionsRouter);
app.use("/admin/petphoto", adminPhotoRouter);

module.exports = app;
