const express= require('express')
const db = require('./db')
const app = express()
const cors = require('cors')

require("dotenv-safe").config()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const { verifyJWT, authenticate, authorizeCompany, authorizeAdmin } = require('./middlewares')

const porta = process.env.PORT

const account_controller = require('./controllers/account-controller')
const customerUser_controller = require('./controllers/customerUser-controller')
const customerContract_controller = require('./controllers/customerContract-controller')

const Account = require('./models/account')
const CustomerUser = require('./models/customerUser')
const CustomerContract = require('./models/customerContract')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


class Populate {
  static async popularDados() {
    try {
      // Lógica para popular os dados no banco de dados
      await db.sync({force: true}) // Recria as tabelas (opcional)

      //CustumerUsers:
      const customerUser1 = await CustomerUser.create({ 
        name: 'Vinicius Cortêz', 
        phone: '+55 85 9987654321', 
        cpf:'000.111.222-33',
        birthday:new Date(2000, 5, 15),
        address:'Rua A, Numero B, Bairro C, Cidade D',
        email:'meuemail@gmail.com',
        bankAccount:'1234567-8',
        gender:'Masculino',
        language:'Português', 
      })

      const customerUser2 = await CustomerUser.create({ 
        name: 'Jonathan Joestar', 
        phone: '+55 85 91234-56789', 
        cpf:'444.555.666-77',
        address:'Rua E, Numero F, Bairro G, Cidade H',
        email:'jojo@gmail.com',
        bankAccount:'8765432-1',
        gender:'Masculino',
      })

      const customerUser3 = await CustomerUser.create({ 
        name: 'Joseph Joestar', 
        phone: '+55 85 91234-56789', 
        cpf:'444.555.666-77',
        address:'Rua E, Numero F, Bairro G, Cidade H',
        email:'jojo2@gmail.com',
        bankAccount:'8765432-1',
        gender:'Masculino',
      })

      //Accounts:
      await Account.create({ 
        login: 'Vini', 
        password: '1234', 
        category:'Admin', 
        CustomerUserId: customerUser1.id
      })
      await Account.create({ 
        login: 'Jonathan', 
        password: 'Dio', 
        category:'Customer', 
        CustomerUserId: customerUser2.id
      })
      await Account.create({ 
        login: 'Joseph', 
        password: 'Brando', 
        category:'Company',
        CustomerUserId: customerUser3.id
      })

      //CustomersContracts
      await CustomerContract.create({ 
        startDate: new Date(2023, 1, 1), 
        endDate: new Date(2025, 1, 1), 
        contractPath:'/home/vcortez/Documentos/Repositorio/DevWeb/BackEnd/Contracts/Contract1.pdf',
        CustomerUserId: customerUser1.id
      })

      await CustomerContract.create({ 
        startDate: new Date(2020, 1, 1), 
        endDate: new Date(2025, 1, 1), 
        contractPath:'/home/vcortez/Documentos/Repositorio/DevWeb/BackEnd/Contracts/Contract2.pdf',
        CustomerUserId: customerUser2.id
      })

      await CustomerContract.create({ 
        startDate: new Date(2025, 1, 1), 
        endDate: new Date(2025, 12, 31), 
        contractPath:'/home/vcortez/Documentos/Repositorio/DevWeb/BackEnd/Contracts/Contract3.pdf',
        CustomerUserId: customerUser3.id
      })

      return true
    } catch (error) {
      console.error(`Erro ao popular dados: ${error.message}`)
    }
  }
}

app.get('/popular', async (req, res) => {
  try {
    let popular = await Populate.popularDados()
    if(popular=true){
      res.status(200).send('Dados populados com sucesso')
    } else{
      res.status(500).send(`Erro ao popular dados: ${error.message}`)
    }
  } catch (error) {
    res.status(500).send(`Erro ao popular dados: ${error.message}`)
  }
})

app.post('/login', async (req, res) => {
  const password = req.body.password
  const login = req.body.login

  // Função para verificar se a senha é válida
  function verifyPassword(password, hashedPassword) {
    if (!hashedPassword) {
      return false
    }
    const [salt, hash] = hashedPassword.split(':')
    const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')
    return hash === verifyHash
  }

  try {
    // Encontre a conta com o login fornecido
    const account = await Account.findOne({ where: { login } })
  
    // Verifique se a conta existe
    if (!account) {
      // Conta não encontrada
      return res.status(401).json({ error: 'Conta Inexistente' })
    }

    // Verifique se a senha fornecida é válida
    if (!verifyPassword(password, account.password)) {
      return res.status(401).json({ error: 'usuário e/ou senha inválidos'})
    } else {
        const token = jwt.sign(
            { 
              userid: account.id,
              username: account.login,
              category: account.category
            }, // payload (podem ser colocadas outras infos)
            process.env.SECRET, // chave definida em .env
            { expiresIn: 10*60 }  // em segundos
        )
        return res.json({ auth: true, token })
    }
  } catch (error) {
    res.send(`erro: ${error.message}`)
  }
})

app.get('/decode', verifyJWT, (req, res) => {
res.status(200).send(req.user)
})

app.get('/admin-only', verifyJWT, authorizeAdmin, (req, res) => {
res.json({ message: 'Acesso permitido apenas para administradores' })
})


//Routes
account_controller(app)
customerUser_controller(app)
customerContract_controller(app)


app.listen(porta || 8000, async () => {
  try {
    await db.sync() // Sincroniza o banco de dados
    console.log('Banco de dados sincronizado');
    console.log(`Servidor rodando em http://localhost:${porta || 8000}`)
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error)
  }
})
