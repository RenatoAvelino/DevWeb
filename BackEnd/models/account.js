const Sequelize = require('sequelize')
const db = require('../db')
const UserAccount = require('./customerUser');
const CustomerUser = require('./customerUser');

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
        allowNull: false,
        get() {
            return undefined; // Retorna undefined para impedir a leitura direta do campo password
        }
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
    foreignKey:'CustomerUserId'
})

module.exports = Account
