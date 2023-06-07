const db = require('../db')
const Account = require('../models/account')

module.exports = function(app) {
    class Populate {
      static async popularDados() {
        try {
          // Lógica para popular os dados no banco de dados
          await db.sync({ force: true }) // Recria as tabelas (opcional)
          await Account.create({ login: 'Vini', password: '1234', category:'Admin'})
          await Account.create({ login: 'Jonathan', password: 'Dio', category:'Customer'})
          await Account.create({ login: 'Joseph', password: 'Brando', category:'Company'})
          return true
        } catch (error) {
          console.error(`Erro ao popular dados: ${error.message}`)
        }
      }
    }
    
    app.get('/populardados', async (req, res) => {
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

    app.get('/get-all-accounts', async (req, res) =>{
      try {
        const accounts = await Account.findAll();
        res.status(200).send(accounts)
      } catch (error) {
        res.status(500).send(`Não foi possivel pegar os dados: ${error.message}`)
      }
    })

    app.get('/get-by-id/:id', async (req, res) =>{
      const { id } = req.params
      
      try {
        const account = await Account.findByPk(id)
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
        let account = await Account.findByPk(id)
        if (!account) {
          res.status(404).send('Conta não encontrada')
          return
        }

        //Campos Alteraveis
        if (body.UserId) {
          account.UserId = body.UserId
        }
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
        let account = await Account.findByPk(id)
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