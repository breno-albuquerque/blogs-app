const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME || 'root',
    port: process.env.MYSQL_PORT || '3306',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DB_NAME || 'blogs-api-dev',
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: process.env.USER,
    password: process.env.DATABASE,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.USER,
    password: process.env.DATABASE,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql'
  }
}
