const CustomerUser = require('../models/customerUser')
const CustomerContract = require('../models/customerContract')
const Account = require('../models/account')
const { verifyJWT, authenticate, authorizeCompany, authorizeAdmin } = require('../middlewares')

const customerUserFields = [
  `id`,`name`,`phone`,`cpf`,`birthday`,`address`,`email`,`bank_account`,`gender`,`language`
]

module.exports = function(app) {
  app.get('/customerUser-by-id/:id', verifyJWT, authenticate, async (req, res) => {
    const { id } = req.params

    try {
      const customerUser = await CustomerUser.findByPk(id, {
        attributes: customerUserFields
      })
      if (!customerUser) {
        res.status(404).send('Informações do usuario não encontradas')
        return
      }
      res.status(200).send(customerUser)
    } catch (error) {
      res.status(500).send(`Não foi possivel pegar as informações do usuario: ${error.message}`)
    }
  })

  app.get('/get-all-customers', verifyJWT, authorizeCompany, async (req, res) =>{
    try {
      const customerUser = await CustomerUser.findAll({
        attributes: customerUserFields
      })
      res.status(200).send(customerUser)
    } catch (error) {
      res.status(500).send(`Não foi possivel pegar os dados: ${error.message}`)
    }
  })

  app.delete('/customerUser-delete/', verifyJWT, authenticate, async (req, res) => {
    const id = req.user.id
    const category = req.user.category
    if(category == "Customer"){
      try {
      let customerUser = await CustomerUser.findByPk(id, {
        attributes: customerUserFields
      })
      let customerContract = await CustomerContract.findOne({
        where: {
          CustomerUserId: id
        }
      })
      let account = await Account.findOne({
        where: {
          CustomerUserId: id
        }
      })
      if (!customerUser) {
        res.status(404).send('Conta não encontrada')
        return
      }

      await customerUser.destroy()
      await customerContract.destroy()
      await account.destroy()
      res.status(200).send(customerUser)
    } catch (error) {
      res.status(500).send(`Não foi possível apagar a conta: ${error.message}`)
    }
  } else{
    res.status(401).send("Esse endpoint é somente para customers")
  }
  })
}