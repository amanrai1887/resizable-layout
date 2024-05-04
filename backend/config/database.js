// config/database.js
const { Sequelize } = require('sequelize');
console.log(process.env.MYSQL_HOST)

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

module.exports = sequelize;
