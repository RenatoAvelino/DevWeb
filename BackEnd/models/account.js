const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')
const CustomerUser = require('./customerUser')

const Account = db.define('account', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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
          isIn: [['Customer', 'Company', 'Admin']],
        },
    }
}, {
    tableName: 'accounts', // opcional: nome da tabela no banco de dados
    timestamps: true, // opcional: cria automaticamente as colunas createdAt e updatedAt
    underscored: true // opcional: usa underscore_case para os nomes dos campos
})

Account.belongsTo(CustomerUser,{
    constraint: true,
    foreignKey:'CustomerUserId',
    onDelete: 'CASCADE'
})

// Função para criptografar a senha
function encryptPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return `${salt}:${hash}`
}

// Hook beforeCreate para criptografar a senha
Account.beforeCreate(account => {
    account.password = encryptPassword(account.password)
})

module.exports = Account
