const { Sequelize } = require('sequelize');
const config = require('./config/config.json').development;

// 创建 Sequelize 实例
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

// 测试连接
sequelize.authenticate()
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(err => {
    console.error('无法连接到数据库:', err);
  });

module.exports = sequelize;
