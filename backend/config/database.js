// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'sql6.freesqldatabase.com',
  username: 'sql6703840',
  password: 'Vy3LaFEeCr',
  database: 'sql6703840',
});

module.exports = sequelize;
