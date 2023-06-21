const Account = require('../models/account')

require("dotenv-safe").config()


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

}