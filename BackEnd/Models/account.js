const Sequelize = require('sequelize')
const db = require('../db')

const Account = db.define('account', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    UserId: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isIn: [['Custumer', 'Company', 'Admin']],
        },
    }

}, {
    tableName: 'accounts', // opcional: nome da tabela no banco de dados
    timestamps: true, // opcional: cria automaticamente as colunas createdAt e updatedAt
    underscored: true // opcional: usa underscore_case para os nomes dos campos
})

module.exports = Account
