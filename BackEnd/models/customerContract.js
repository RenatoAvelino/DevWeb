const Sequelize = require('sequelize')
const db = require('../db')
const customerUser = require('./customerUser')

const customerContract = db.define('customerContract', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  startDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  contractPath: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'customerContracts', // Nome da tabela no banco de dados
  timestamps: true, // Cria automaticamente as colunas createdAt e updatedAt
  underscored: true // Usa underscore_case para os nomes dos campos
})

customerContract.belongsTo(customerUser,{
    constraint: true,
    foreignKey:'CustomerUserId'
})

module.exports = customerContract
