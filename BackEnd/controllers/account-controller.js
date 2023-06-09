const Account = require('../models/account')

require("dotenv-safe").config()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const accountFields = ['id', 'login', 'category']

module.exports = function(app) {
    app.get('/get-all-accounts', async (req, res) =>{
      try {
        const accounts = await Account.findAll({
          attributes: accountFields
        })
        res.status(200).send(accounts)
      } catch (error) {
        res.status(500).send(`Não foi possivel pegar os dados: ${error.message}`)
      }
    })

    app.get('/get-by-id/:id', async (req, res) =>{
      const { id } = req.params
      
      try {
        const account = await Account.findByPk(id, {
          attributes: accountFields
        })
        if (!account) {
          res.status(404).send('Conta não encontrada')
          return
        }
        res.status(200).send(account)
      } catch (error) {
        res.status(500).send(`Não foi possivel pegar os dados: ${error.message}`)
      }
    })

    app.post('/account-create', async (req, res) => {
      const body = req.body

      try {
        await Account.create({ 
          login: body.login,
          password: body.password, 
          category: body.category,
          UserId: body.UserId
        })
        res.status(200).json(`Conta criada com sucesso:`)
      } catch (error) {
        res.status(500).send(`Erro ao criar conta: ${error.message}`)
      }
    })

    app.patch('/account-update/:id', async (req, res) => {
      const { id } = req.params
      const body = req.body

      try {
        let account = await Account.findByPk(id, {
          attributes: accountFields
        })
        if (!account) {
          res.status(404).send('Conta não encontrada')
          return
        }

        //Campos Alteraveis
        if (body.login) {
          account.login = body.login
        }
        if (body.category) {
          account.category = body.category
        }

        await account.save()
        res.status(200).send(account)
      } catch (error) {
        res.status(500).send(`Não foi possível atualizar a conta: ${error.message}`)
      }
    })
        
    app.delete('/account-delete/:id', async (req, res) => {
      const { id } = req.params

      try {
        let account = await Account.findByPk(id, {
          attributes: accountFields
        })
        if (!account) {
          res.status(404).send('Conta não encontrada')
          return
        }

        await account.destroy()
        res.status(200).send(account)
      } catch (error) {
        res.status(500).send(`Não foi possível apagar a conta: ${error.message}`)
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

  app.post('/decode', (req, res) => {
    const token = req.body.token // Obter o token JWT do corpo da solicitação

    try {
      const decoded = jwt.verify(token, process.env.SECRET) // Verificar e decodificar o token
  
      if (decoded && decoded.category) {
        const user = {
          id: decoded.userid,
          category: decoded.category
        }
        res.status(200).send({ user }) // Retornar os campos descriptografados
      } else {
        res.status(400).json({ error: 'Token JWT inválido' })
      }
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error)
      res.status(500).json({ error: 'Erro ao decodificar o token JWT' })
    }
  })
  
}