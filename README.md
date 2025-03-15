# petPlatform
基于mevn栈的宠物圈平台

# 运行步骤

需要在nodejs环境下；
需要连接mysql数据库；

## 启动前端项目：
cd 到petPlatform文件夹下；
终端运行 npm install 下载相关依赖；
终端运行 npm run dev 启动项目；

## 启动后端项目：
cd 到petPlatform文件夹下；
终端运行 npm install 下载相关依赖；
终端运行 npm start 启动项目；

## 启动数据库：
使用Sequelize映射数据库；

可运行 sequelize db:migrate 建立数据库表；

Sequelize 会执行 Migrations 文件中的内容来更新数据库。（需要已连接本地MySQL数据库）
