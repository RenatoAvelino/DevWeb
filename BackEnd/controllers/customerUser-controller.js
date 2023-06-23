const CustomerUser = require('../models/customerUser')
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
}