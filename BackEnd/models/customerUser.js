const Sequelize = require('sequelize')
const db = require('../db')

const CustomerUser = db.define('customerUser', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATE,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    bankAccount: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
            isIn: [['Masculino', 'Feminino']],
          },
    },
    language: {
        type: Sequelize.STRING,
        allowNull: true
    }
}, {
    tableName: 'customerUsers', // opcional: nome da tabela no banco de dados
    timestamps: true, // opcional: cria automaticamente as colunas createdAt e updatedAt
    underscored: true // opcional: usa underscore_case para os nomes dos campos
})

module.exports = CustomerUser
