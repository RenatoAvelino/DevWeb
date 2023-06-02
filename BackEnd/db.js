const Sequelize = require('sequelize')
const sequelize = new Sequelize('followthesolar', 'root', 'password', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306
})


module.exports = sequelize
