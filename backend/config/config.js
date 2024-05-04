// {
//   "development": {
//     "host": "sql6.freesqldatabase.com",
//     "username": "sql6703840",
//     "password": "Vy3LaFEeCr",
//     "database": "sql6703840",
//     "dialect": "mysql"
//   },
//   "test": {
//     "host": "sql6.freesqldatabase.com",
//     "username": "sql6703840",
//     "password": "Vy3LaFEeCr",
//     "database": "sql6703840",
//     "dialect": "mysql"
//   },
//   "production": {
//     "host": "sql6.freesqldatabase.com",
//     "username": "sql6703840",
//     "password": "Vy3LaFEeCr",
//     "database": "sql6703840",
//     "dialect": "mysql"
//   }
// }


const path = require('path');

require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    process.env.ENVIRONMENT === 'test' ? '.env.test' : '.env',
  ),
});

module.exports = {
  "development": {
    "username": process.env.MYSQL_USER || "root",
    "password": process.env.MYSQL_PASSWORD || 'mysql12345',
    "database": process.env.MYSQL_DATABASE || "byaj-book",
    "host": process.env.MYSQL_HOST || "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
  },
  "test": {
    "username": process.env.MYSQL_USER || "root",
    "password": process.env.MYSQL_PASSWORD || null,
    "database": "byaj-book-test",
    "host": process.env.MYSQL_HOST || "127.0.0.1",
    "dialect": "mysql",
    "logging": false,
   
  },
  "production": {
    "database": process.env.MYSQL_DATABASE || "database_development",
    "dialect": "mysql",
    "logging": false,
    replication: {
      read: [
        { host: process.env.MYSQL_RR1_HOST, username: process.env.MYSQL_RR1_USER, password: process.env.MYSQL_RR1_PASS },
        { host: process.env.MYSQL_HOST, username: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD }
      ],
      write: { host: process.env.MYSQL_HOST, username: process.env.MYSQL_USER, password: process.env.MYSQL_PASSWORD }
    },
  }
}
